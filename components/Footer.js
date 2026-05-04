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
    </footer>
  )
}