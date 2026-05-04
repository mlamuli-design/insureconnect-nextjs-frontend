"use client";

import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'


export default function Home() {


   const [user, setUser] = useState(null);
    const isActive = user?.status === "active";


  useEffect(() => {
    // Initialize AOS for scroll animations
    const initAOS = () => {
      if (typeof window !== "undefined" && window.AOS) {
        window.AOS.init({
          duration: 800,
          easing: "ease-in-out",
          once: true,
          mirror: false,
          offset: 120,
        });
        window.AOS.refresh();
      } else {
        setTimeout(initAOS, 200);
      }
    };
    
    initAOS();

    // Initialize PureCounter for number counting
    const initPureCounter = () => {
      if (typeof window !== "undefined" && window.PureCounter) {
        new window.PureCounter();
      } else {
        setTimeout(initPureCounter, 200);
      }
    };
    
    initPureCounter();

    // Add smooth scroll behavior for anchor links
    const handleAnchorClick = (e) => {
      const targetId = e.currentTarget.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);




    useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }

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

  const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");
  setUser(null);
  window.dispatchEvent(new Event("authChanged"));
};

  return (
    <>
      <Header/>

      <main className="main">
        {/* Hero Section */}
        <section id="hero" className="hero section dark-background">
          <img src="/assets/img/hero-bg.jpg" alt="" data-aos="fade-in" />
          <div className="container">
            <h2 data-aos="fade-up" data-aos-delay="100">InsureConnect,<br />Leading Tomorrow</h2>
            <p data-aos="fade-up" data-aos-delay="200">Connecting Insurance Professionals, Driving Innovation</p>
<div className="d-flex mt-4" data-aos="fade-up" data-aos-delay="300">

    {!user ? (
    <>
  <button 
    onClick={() => {
      const loginBtn = document.querySelector('.btn-login-modal')
      if (loginBtn) loginBtn.click()
    }} 
    className="btn-get-started btn-getstarted"
  >
    Login
  </button>
    </>
  ) : (
    <button 
      onClick={() => {
     logout();
      }} 
      className="btn-get-started btn-getstarted btn-logout"
    >
      Logout
    </button>
  )}

</div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about section">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-up" data-aos-delay="100">
                <img src="/assets/img/about.jpg" className="img-fluid" alt="" />
              </div>
              <div className="col-lg-6 order-2 order-lg-1 content" data-aos="fade-up" data-aos-delay="200">
                <h2 className="mb-4 section-title1">About Us.</h2>
                <p className="fst-italic">
                  InsureConnect is the must-attend event for insurance industry professionals. We are the most inclusive, forward thinking & innovative conference in the industry.<br /><br /><b>*Join us as we:*</b>
                </p>
                <ul>
                  <li><i className="bi bi-check-circle"></i> <span>Explore the evolving landscape of insurance, featuring keynotes, panels & networking access.</span></li>
                  <li><i className="bi bi-check-circle"></i> <span>Offer unparalleled access to the latest trends and connections shaping the future of insurance.</span></li>
                  <li><i className="bi bi-check-circle"></i> <span>Seasoned experts, connect with peers and discover new opportunities to drive the industry forward.</span></li>
                </ul>

                  {!user ? (
    <>
                   <button  
  onClick={() => {
    const registerBtn = document.querySelector('.btn-register-modal')
    if (registerBtn) registerBtn.click()
  }} 
  className="more-btn"
  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
>
  <span className="read-more">Be Part Of Us</span>
</button></>
 ) :("")}
           
              </div>
            </div>
          </div>
        </section>

        {/* Counts Section */}
        <section id="counts" className="section counts light-background">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4">
              <div className="col-lg-3 col-md-6">
                <div className="stats-item text-center w-100 h-100">
                  <span data-purecounter-start="0" data-purecounter-end="6000" data-purecounter-duration="2" className="purecounter">0</span>
                  <p>Contacts</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="stats-item text-center w-100 h-100">
                  <span data-purecounter-start="0" data-purecounter-end="64" data-purecounter-duration="2" className="purecounter">0</span>
                  <p>Professionals</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="stats-item text-center w-100 h-100">
                  <span data-purecounter-start="0" data-purecounter-end="42" data-purecounter-duration="2" className="purecounter">0</span>
                  <p>Events</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="stats-item text-center w-100 h-100">
                  <span data-purecounter-start="0" data-purecounter-end="24" data-purecounter-duration="2" className="purecounter">0</span>
                  <p>Certificates</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section id="why-us" className="section why-us">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                <div className="why-box">
                  <h3>Why Work With InsureConnect?</h3>
                  <p>
                    InsureConnect Virtual Editions is free for all to join. The InsureConnect website hosts all CPD Certificates where people can re-watch InsureConnect, watch previous episodes
                    and download their Certificates
                  </p>
                                  {!user ? (
    <>
               <button 
  onClick={() => {
    const registerBtn = document.querySelector('.btn-register-modal')
    if (registerBtn) registerBtn.click()
  }} 
  className="more-btn"
  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
>
  <span>Join Now</span> <i className="bi bi-chevron-right"></i>
</button></>
 ) :("")}
                </div>
              </div>
              <div className="col-lg-8 d-flex align-items-stretch">
                <div className="row gy-4" data-aos="fade-up" data-aos-delay="200">
                  <div className="col-xl-4">
                    <div className="icon-box d-flex flex-column justify-content-center align-items-center" data-aos="zoom-in" data-aos-delay="300">
                      <i className="bi bi-clipboard-data"></i>
                      <h4>Exclusive Industry Insights</h4>
                      <p>Gain exclusive insights into the latest trends & challenges impacting the insurance industry</p>
                    </div>
                  </div>
                  <div className="col-xl-4" data-aos="fade-up" data-aos-delay="300">
                    <div className="icon-box d-flex flex-column justify-content-center align-items-center" data-aos="zoom-in" data-aos-delay="400">
                      <i className="bi bi-gem"></i>
                      <h4>Professionals Networking</h4>
                      <p>Expand your professional network & forge valuable connections with industry peers & thought leaders</p>
                    </div>
                  </div>
                  <div className="col-xl-4" data-aos="fade-up" data-aos-delay="400">
                    <div className="icon-box d-flex flex-column justify-content-center align-items-center" data-aos="zoom-in" data-aos-delay="500">
                      <i className="bi bi-inboxes"></i>
                      <h4>Innovative Solutions Sights</h4>
                      <p>Discover innovative solutions and best practices to optimize your insurance business</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Courses / Trainers Section */}
        <section id="courses" className="courses section">
          <div className="container" data-aos="fade-up">
            <div className="container section-title" data-aos="fade-up">
              <h2>Check Out</h2>
            </div>
            
            <section id="trainers" className="section trainers">
              <div className="container">
                <div className="row gy-5">
                  <div className="col-lg-4 col-md-6 member" data-aos="fade-up" data-aos-delay="100">
                    <div className="member-img">
                      <img src="/assets/img/team/team-4.jpg" className="img-fluid" alt="" />
                      <div className="social">
                        <a href="#"><i className="bi bi-youtube" style={{ fontSize: '4em' }}></i></a>
                      </div>
                    </div>
                    <div className="member-info text-center">
                      <h4>Introduction to Insurance</h4>
                      <span>Amanda Jepson</span>
                      <p>Magni voluptatem accusamus assumenda cum nisi aut qui dolorem voluptate sed et veniam quasi quam consectetur</p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 member" data-aos="fade-up" data-aos-delay="200">
                    <div className="member-img">
                      <img src="/assets/img/team/team-5.jpg" className="img-fluid" alt="" />
                      <div className="social">
                        <a href="#"><i className="bi bi-youtube" style={{ fontSize: '4em' }}></i></a>
                      </div>
                    </div>
                    <div className="member-info text-center">
                      <h4>Search Engine Optimization</h4>
                      <span>Brian Doe</span>
                      <p>Qui consequuntur quos accusamus magnam quo est molestiae eius laboriosam sunt doloribus quia impedit laborum velit</p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 member" data-aos="fade-up" data-aos-delay="300">
                    <div className="member-img">
                      <img src="/assets/img/team/team-6.jpg" className="img-fluid" alt="" />
                      <div className="social">
                        <a href="#"><i className="bi bi-youtube" style={{ fontSize: '4em' }}></i></a>
                      </div>
                    </div>
                    <div className="member-info text-center">
                      <h4>Content Stability</h4>
                      <span>Josepha Palas</span>
                      <p>Sint sint eveniet explicabo amet consequatur nesciunt error enim rerum earum et omnis fugit eligendi cupiditate vel</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* Trainers Index Section */}
        <section id="trainers-index" className="section trainers-index">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="100">
                <div className="member">
                  <img src="/assets/img/trainers/trainer-1.jpg" className="img-fluid" alt="" />
                  <div className="member-content">
                    <h4>Rumanne Akoob</h4>
                    <span>Event Planner</span>
                    <p>Magni qui quod omnis unde et eos fuga et exercitationem. Odio veritatis perspiciatis quaerat qui aut aut aut</p>
                    <div className="social">
                      <a href="#"><i className="bi bi-twitter-x"></i></a>
                      <a href="#"><i className="bi bi-facebook"></i></a>
                      <a href="#"><i className="bi bi-instagram"></i></a>
                      <a href="#"><i className="bi bi-linkedin"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="200">
                <div className="member">
                  <img src="/assets/img/trainers/trainer-2.jpg" className="img-fluid" alt="" />
                  <div className="member-content">
                    <h4>Sarah Jhinson</h4>
                    <span>Marketing</span>
                    <p>Repellat fugiat adipisci nemo illum nesciunt voluptas repellendus. In architecto rerum rerum temporibus</p>
                    <div className="social">
                      <a href="#"><i className="bi bi-twitter-x"></i></a>
                      <a href="#"><i className="bi bi-facebook"></i></a>
                      <a href="#"><i className="bi bi-instagram"></i></a>
                      <a href="#"><i className="bi bi-linkedin"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="300">
                <div className="member">
                  <img src="/assets/img/trainers/trainer-3.jpg" className="img-fluid" alt="" />
                  <div className="member-content">
                    <h4>Rumain Akoob</h4>
                    <span>Content</span>
                    <p>Voluptas necessitatibus occaecati quia. Earum totam consequuntur qui porro et laborum toro des clara</p>
                    <div className="social">
                      <a href="#"><i className="bi bi-twitter-x"></i></a>
                      <a href="#"><i className="bi bi-facebook"></i></a>
                      <a href="#"><i className="bi bi-instagram"></i></a>
                      <a href="#"><i className="bi bi-linkedin"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer/>

      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>
      {/* <div id="preloader"></div> */}

      <style jsx global>{`
        /* Additional animation enhancements */
        .member, .icon-box, .stats-item, .why-box {
          transition: all 0.3s ease;
        }
        
        .member:hover, .icon-box:hover, .stats-item:hover {
          transform: translateY(-5px);
        }
        
        /* Smooth image transitions */
        .member-img img, .icon-box img {
          transition: transform 0.5s ease;
        }
        
        .member-img:hover img {
          transform: scale(1.05);
        }
        
        /* Stats counter styling */
        .stats-item span {
          font-size: 2.5rem;
          font-weight: bold;
          display: inline-block;
        }
      `}</style>
    </>
  )
}