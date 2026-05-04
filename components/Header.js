'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

export default function Header() {
  const pathname = usePathname()
  const initialized = useRef(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [user, setUser] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isActive = user?.status === "active"

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    const handleAuthChange = () => {
      const updatedUser = localStorage.getItem("user")
      setUser(updatedUser ? JSON.parse(updatedUser) : null)
    }

    window.addEventListener("authChanged", handleAuthChange)

    return () => {
      window.removeEventListener("authChanged", handleAuthChange)
    }
  }, [])

  // Setup mobile navigation on mount
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("isLoggedIn")
    setUser(null)
    setMobileMenuOpen(false)
    window.dispatchEvent(new Event("authChanged"))
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header id="header" className="header d-flex align-items-center sticky-top">
        <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <Link href="/" className="logo d-flex align-items-center me-auto" onClick={closeMobileMenu}>
            <h1 className="sitename">Insure Connect</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav id="navmenu" className="navmenu">
            <ul className="desktop-nav">
              <li>
                <Link href="/" className={pathname === '/' ? 'active' : ''}>
                  Home
                </Link>
              </li>

              {isActive && (
                <>
                  <li>
                    <Link href="/events" className={pathname === '/events' ? 'active' : ''}>
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link href="/certificates" className={pathname === '/certificates' ? 'active' : ''}>
                      My Certificates
                    </Link>
                  </li>
                </>
              )}

              <li>
                <Link href="/contact" className={pathname === '/contact' ? 'active' : ''}>
                  Contact
                </Link>
              </li>
            </ul>

            {/* Desktop Auth Buttons */}
            <div className="auth-buttons desktop-only">
              {!user ? (
                <>
                  <button
                    className="btn-register-modal"
                    onClick={() => setShowRegisterModal(true)}
                  >
                    Register
                  </button>
                  <button
                    className="btn-login-modal"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Login
                  </button>
                </>
              ) : (
                <div className="user-box" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                  <span className="username">{user.username}</span>
                  <i className="bi bi-box-arrow-right ms-2"></i>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button 
              className="mobile-nav-toggle d-xl-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <i className={`bi ${mobileMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={closeMobileMenu}></div>
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">Menu</span>
          <button className="mobile-menu-close" onClick={closeMobileMenu}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div className="mobile-menu-body">
          <ul className="mobile-nav-list">
            <li>
              <Link href="/" onClick={closeMobileMenu} className={pathname === '/' ? 'active' : ''}>
                <i className="bi bi-house-door me-3"></i>
                Home
              </Link>
            </li>
            {isActive && (
              <>
                <li>
                  <Link href="/events" onClick={closeMobileMenu} className={pathname === '/events' ? 'active' : ''}>
                    <i className="bi bi-calendar-event me-3"></i>
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/certificates" onClick={closeMobileMenu} className={pathname === '/certificates' ? 'active' : ''}>
                    <i className="bi bi-award me-3"></i>
                    My Certificates
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link href="/contact" onClick={closeMobileMenu} className={pathname === '/contact' ? 'active' : ''}>
                <i className="bi bi-envelope me-3"></i>
                Contact
              </Link>
            </li>
          </ul>
          
          <div className="mobile-auth-section">
            {!user ? (
              <>
                <button
                  className="mobile-register-btn"
                  onClick={() => {
                    setShowRegisterModal(true)
                    closeMobileMenu()
                  }}
                >
                  <i className="bi bi-person-plus me-2"></i>
                  Register
                </button>
                <button
                  className="mobile-login-btn"
                  onClick={() => {
                    setShowLoginModal(true)
                    closeMobileMenu()
                  }}
                >
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Login
                </button>
              </>
            ) : (
              <>
                <div className="mobile-user-info">
                  <i className="bi bi-person-circle fs-1"></i>
                  <span className="mobile-username">{user.username}</span>
                </div>
                <button className="mobile-logout-btn" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
      
      <RegisterModal 
        isOpen={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)} 
      />

      <style jsx>{`
        /* Header Styles */
        .header {
          background: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          padding: 0 20px;
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 15px 24px;
          
        }
        
        .container-fluid {
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }
        
        .logo h1 {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #1976d2 0%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }
        
        /* Desktop Navigation */
        .navmenu {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        
        .desktop-nav li a {
          color: #333;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
          font-size: 1rem;
        }
        
        .desktop-nav li a:hover,
        .desktop-nav li a.active {
          color: #1976d2;
        }
        
        /* Desktop Auth Buttons */
        .auth-buttons {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        
        .btn-login-modal {
          padding: 8px 24px;
          background: transparent;
          color: #2563eb;
          border: 2px solid #2563eb;
          border-radius: 30px;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          cursor: pointer;
          font-family: inherit;
        }
        
        .btn-login-modal:hover {
          background: #2563eb;
          color: white;
          transform: translateY(-2px);
        }
        
        .btn-register-modal {
          padding: 8px 24px;
          background: linear-gradient(135deg, #1976d2 0%, #2563eb 100%);
          color: white;
          border: none;
          border-radius: 30px;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          cursor: pointer;
          font-family: inherit;
        }
        
        .btn-register-modal:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(25, 118, 210, 0.3);
        }
        
        .user-box {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          background: linear-gradient(135deg, #1976d2 0%, #2563eb 100%);
          color: white;
          border-radius: 30px;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .user-box:hover {
          transform: translateY(-2px);
        }
        
        /* Mobile Menu Toggle Button */
        .mobile-nav-toggle {
          display: none;
          background: none;
          border: none;
          font-size: 2rem;
          color: #1976d2;
          cursor: pointer;
          padding: 0;
          line-height: 1;
          z-index: 1001;
          position: relative;
        }
        
        /* Mobile Menu Overlay */
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        
        .mobile-menu-overlay.active {
          opacity: 1;
          visibility: visible;
        }
        
        /* Mobile Menu Sidebar */
        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 85%;
          max-width: 350px;
          height: 100vh;
          background: white;
          z-index: 1000;
          transition: right 0.3s ease;
          display: flex;
          flex-direction: column;
          box-shadow: -2px 0 20px rgba(0, 0, 0, 0.1);
        }
        
        .mobile-menu.active {
          right: 0;
        }
        
        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e0e0e0;
          background: white;
        }
        
        .mobile-menu-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #1976d2;
        }
        
        .mobile-menu-close {
          background: none;
          border: none;
          font-size: 1.2rem;
          color: #666;
          cursor: pointer;
          padding: 5px;
        }
        
        .mobile-menu-body {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
        }
        
        .mobile-nav-list {
          list-style: none;
          padding: 0;
          margin: 0 0 30px 0;
        }
        
        .mobile-nav-list li {
          margin-bottom: 15px;
        }
        
        .mobile-nav-list li a {
          display: flex;
          align-items: center;
          padding: 12px 0;
          color: #333;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          transition: color 0.3s ease;
          border-radius: 8px;
        }
        
        .mobile-nav-list li a i {
          font-size: 1.2rem;
          color: #1976d2;
        }
        
        .mobile-nav-list li a:hover,
        .mobile-nav-list li a.active {
          color: #1976d2;
          background: #f0f9ff;
          padding-left: 10px;
        }
        
        .mobile-auth-section {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .mobile-register-btn,
        .mobile-login-btn {
          padding: 12px 20px;
          border-radius: 30px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          width: 100%;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .mobile-register-btn {
          background: linear-gradient(135deg, #1976d2 0%, #2563eb 100%);
          color: white;
          border: none;
        }
        
        .mobile-login-btn {
          background: transparent;
          color: #2563eb;
          border: 2px solid #2563eb;
        }
        
        .mobile-user-info {
          text-align: center;
          padding: 15px 0;
        }
        
        .mobile-username {
          display: block;
          margin-top: 10px;
          font-weight: 600;
          color: #1976d2;
          font-size: 1rem;
        }
        
        .mobile-logout-btn {
          padding: 12px 20px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          transition: all 0.3s ease;
        }
        
        .mobile-logout-btn:hover {
          background: #dc2626;
          transform: translateY(-2px);
        }
        
        /* Responsive */
        @media (max-width: 992px) {
          .desktop-nav {
            display: none;
          }
          
          .desktop-only {
            display: none !important;
          }
          
          .mobile-nav-toggle {
            display: block;
          }
        }

                  .btn-login-modal {
  display: none;
}
        
        @media (min-width: 993px) {
          .mobile-menu,
          .mobile-menu-overlay {
            display: none;
          }
        }
        
        @media (max-width: 576px) {
          .logo h1 {
            font-size: 1.2rem;
          }
          
          .mobile-menu {
            width: 85%;
          }
        }
      `}</style>
    </>
  )
}
