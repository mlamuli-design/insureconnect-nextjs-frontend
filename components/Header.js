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
  const [user, setUser] = useState(null);
  const isActive = user?.status === "active";

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // Setup mobile navigation after component mounts
    const setupMobileNav = () => {
      const mobileNavToggle = document.querySelector('.mobile-nav-toggle')
      const navmenu = document.querySelector('#navmenu')
      
      if (mobileNavToggle && navmenu) {
        const toggleNav = () => {
          navmenu.classList.toggle('mobile-nav-active')
          mobileNavToggle.classList.toggle('bi-list')
          mobileNavToggle.classList.toggle('bi-x')
        }
        
        mobileNavToggle.addEventListener('click', toggleNav)
        
        return () => {
          mobileNavToggle.removeEventListener('click', toggleNav)
        }
      }
    }

    const cleanup = setupMobileNav()
    return () => {
      if (cleanup) cleanup()
    }
  }, [])

  useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }

  const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");
  setUser(null);
  window.dispatchEvent(new Event("authChanged"));
};

  // listen for login updates
  const handleAuthChange = () => {
    const updatedUser = localStorage.getItem("user");
    setUser(updatedUser ? JSON.parse(updatedUser) : null);
  };

  window.addEventListener("authChanged", handleAuthChange);

  return () => {
    window.removeEventListener("authChanged", handleAuthChange);
  };
}, []);

  return (
    <>
      <header id="header" className="header d-flex align-items-center sticky-top">
        <div className="container-fluid container-xl position-relative d-flex align-items-center">
          <Link href="/" className="logo d-flex align-items-center me-auto">
            <h1 className="sitename">Insure Connect</h1>
          </Link>

          <nav id="navmenu" className="navmenu">
          <ul>
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
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

  <div className="auth-buttons">
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
    <div className="user-box">
      <span className="username">
        {user.username}
      </span>
    </div>
  )}
</div>
        </div>
      </header>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
      
      <RegisterModal 
        isOpen={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)} 
      />

      <style jsx>{`
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
          box-shadow: 0 5px 15px rgba(37, 99, 235, 0.2);
        }
        
        .btn-register-modal {
          padding: 8px 24px;
          background: linear-gradient(135deg, #1976d2 0%, #1976d2 100%);
          color: white;
          border: none;
          border-radius: 30px;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          cursor: pointer;
          font-family: inherit;
          margin-left: 35px;
        }
        
        .btn-register-modal:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(25, 118, 210, 0.3);
        }
          .btn-login-modal {
  display: none;
}

.user-box {  display: flex;
    padding: 8px 24px;
          background: linear-gradient(135deg, #1976d2 0%, #1976d2 100%);
          color: white;
          border: none;
          border-radius: 30px;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          // cursor: pointer;
          font-family: inherit;
          margin-left: 35px;
}
        
        @media (max-width: 768px) {
          .auth-buttons {
            gap: 8px;
          }
          
          .btn-login-modal,
          .btn-register-modal {
            padding: 6px 16px;
            font-size: 12px;
          }

        }
      `}</style>
    </>
  )
}