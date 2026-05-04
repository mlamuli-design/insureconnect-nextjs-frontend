'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer id="footer" className="footer position-relative light-background">
      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6 footer-about">
            <Link href="/" className="logo d-flex align-items-center">
              <span className="sitename">Insure Connect</span>
            </Link>
            <div className="footer-contact pt-3">
              <p>A108 keygen Street</p>
              <p>Killarney | Johannesburg <br />Capetown | Observatory</p>
              <p className="mt-3"><strong>Phone:</strong> <span>+27 65 852 9028</span></p>
              <p><strong>Email:</strong> <span>sayhi@judavaworx.co.za</span></p>
            </div>
            <div className="social-links d-flex mt-4">
              <a href="#"><i className="bi bi-twitter-x"></i></a>
              <a href="#"><i className="bi bi-facebook"></i></a>
              <a href="#"><i className="bi bi-instagram"></i></a>
              <a href="#"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            {/* Empty column - kept for spacing */}
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li><a href="#">Advertising/Marketing</a></li>
              <li><a href="#">Event Planner</a></li>
              <li><a href="#">Communication</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Our Commitments</h4>
            <ul>
              <li><a href="#">Advertising/Marketing</a></li>
              <li><a href="#">Event Planner</a></li>
              <li><a href="#">Communication</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>© <span>Copyright</span> <strong className="px-1 sitename">InsureConnect</strong> <span>All Rights Reserved</span></p>
        <div className="credits">
          Designed by <a href="#">mandela mandela</a>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: #f8fafc;
          padding: 60px 0 20px;
          margin-top: 60px;
          border-top: 1px solid #e2e8f0;
        }
        
        .footer-top {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        /* Logo Styles */
        .logo {
          text-decoration: none;
          display: inline-block;
          margin-bottom: 15px;
        }
        
        .sitename {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1976d2;
        }
        
        /* Footer Contact */
        .footer-contact p {
          margin-bottom: 8px;
          color: #64748b;
          font-size: 0.9rem;
          line-height: 1.5;
        }
        
        .footer-contact strong {
          color: #1e293b;
        }
        
        /* Social Links */
        .social-links {
          gap: 12px;
          flex-wrap: wrap;
        }
        
        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: white;
          border-radius: 50%;
          color: #1976d2;
          transition: all 0.3s ease;
          text-decoration: none;
          border: 1px solid #e2e8f0;
        }
        
        .social-links a:hover {
          background: #1976d2;
          color: white;
          transform: translateY(-3px);
        }
        
        /* Footer Links */
        .footer-links h4 {
          font-size: 1rem;
          font-weight: 600;
          color: #1976d2;
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 10px;
        }
        
        .footer-links h4::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 35px;
          height: 2px;
          background: #1976d2;
          border-radius: 2px;
        }
        
        .footer-links ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .footer-links li {
          margin-bottom: 10px;
        }
        
        .footer-links a {
          color: #64748b;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 0.85rem;
        }
        
        .footer-links a:hover {
          color: #1976d2;
          padding-left: 5px;
        }
        
        /* Copyright Section */
        .copyright {
          border-top: 1px solid #e2e8f0;
          padding-top: 20px;
          margin-top: 40px;
        }
        
        .copyright p {
          color: #64748b;
          font-size: 0.85rem;
          margin-bottom: 5px;
        }
        
        .credits {
          color: #94a3b8;
          font-size: 0.75rem;
        }
        
        .credits a {
          color: #1976d2;
          text-decoration: none;
        }
        
        .credits a:hover {
          text-decoration: underline;
        }
        
        /* ===== MOBILE RESPONSIVE ===== */
        
        /* Tablet (768px - 992px) */
        @media (max-width: 992px) {
          .footer {
            padding: 50px 0 20px;
          }
          
          .footer-links h4::after {
            width: 30px;
          }
        }
        
        /* Mobile (576px - 768px) */
        @media (max-width: 768px) {
          .footer {
            padding: 40px 0 15px;
            margin-top: 40px;
          }
          
          .footer-top {
            padding: 0 15px;
          }
          
          /* Center align for mobile */
          .footer-about {
            text-align: center;
          }
          
          .logo {
            justify-content: center;
            display: flex;
          }
          
          .sitename {
            font-size: 1.4rem;
          }
          
          .footer-contact p {
            font-size: 0.85rem;
          }
          
          .social-links {
            justify-content: center;
          }
          
          .footer-links {
            text-align: center;
          }
          
          .footer-links h4::after {
            left: 50%;
            transform: translateX(-50%);
          }
          
          .footer-links a:hover {
            padding-left: 0;
          }
        }
        
        /* Small Mobile (below 576px) */
        @media (max-width: 576px) {
          .footer {
            padding: 30px 0 15px;
          }
          
          .sitename {
            font-size: 1.3rem;
          }
          
          .footer-contact p {
            font-size: 0.8rem;
          }
          
          .footer-links h4 {
            font-size: 0.95rem;
            margin-bottom: 15px;
          }
          
          .footer-links li {
            margin-bottom: 8px;
          }
          
          .footer-links a {
            font-size: 0.8rem;
          }
          
          .copyright p {
            font-size: 0.75rem;
          }
          
          .credits {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </footer>
  )
}
