"use client";

import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";

export default function Contact() {
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    loading: false,
    error: null,
    success: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

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
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, submitted: true, error: null, success: false });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus({ loading: false, submitted: true, error: null, success: true });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => {
          setFormStatus({ loading: false, submitted: false, error: null, success: false });
        }, 5000);
      } else {
        setFormStatus({ loading: false, submitted: true, error: "Failed to send message. Please try again.", success: false });
      }
    } catch (error) {
      setFormStatus({ loading: false, submitted: true, error: "Network error. Please try again.", success: false });
    }
  };

  const contactInfo = [
    {
      icon: "bi bi-geo-alt",
      title: "Visit Us",
      details: ["A108 Keygen Street", "Killarney | Johannesburg", "Capetown | Observatory"],
      color: "#4361ee",
    },
    {
      icon: "bi bi-telephone",
      title: "Call Us",
      details: ["+27 65 852 9028", "Mon-Fri: 9am - 5pm"],
      color: "#2ec4b6",
    },
      {
      icon: "bi bi-clock",
      title: "Business Hours",
      details: ["Monday - Friday: 9:00 AM - 5:00 PM", "Saturday: 10:00 AM - 2:00 PM", "Sunday: Closed"],
      color: "#ff9f1c",
    },
    
    {
      icon: "bi bi-envelope",
      title: "Email Us",
      details: ["sayhi@judavaworx.co.za", "support@insureconnect.co.za"],
      color: "#e63946",
    },
  
  ];

  return (
    <>
      <Header />

      <main className="main">
        {/* Hero Section */}
        <div className="page-title position-relative" data-aos="fade">
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <div>
                    <span className="badge bg-primary px-4 py-2 rounded-pill mb-3">
                      <i className="bi bi-chat-dots me-2"></i>
                      Get in Touch
                    </span>
                  </div>
                  <p className="lead mb-0 text-muted">
                    Have questions about our insurance training programs? Need assistance with your CPD certificates?
                    Our dedicated support team is here to help you succeed in your insurance career.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information & Form */}
        <section id="contact" className="contact section py-5" style={{ background: '#f0f9ff' }}>
          <div className="container">
            <div className="text-center mb-5" data-aos="fade-up">
              <p className="text-muted">We'd love to hear from you. We'll respond as soon as possible.</p>
            </div>

            <div className="row g-4">
              {/* Contact Information Cards - 2 Rows of 2 Cards Each */}
              <div className="col-lg-6">
                <div className="row g-4">
                  {/* First 2 Cards */}
                  {contactInfo.slice(0, 2).map((info, index) => (
                    <div key={index} className="col-12" data-aos="fade-up" data-aos-delay={300 + (index * 100)}>
                      <div className="contact-card h-100 p-4 rounded-4 bg-white shadow-sm" style={{ borderTop: `4px solid ${info.color}` }}>
                        <div className="contact-icon mb-3" style={{ color: info.color }}>
                          <i className={`${info.icon} fs-1`}></i>
                        </div>
                        <h3 className="h5 fw-bold mb-3" style={{ color: '#1e3a8a' }}>{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-muted mb-1">{detail}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="row g-4">
                  {/* Last 2 Cards */}
                  {contactInfo.slice(2, 4).map((info, index) => (
                    <div key={index} className="col-12" data-aos="fade-up" data-aos-delay={500 + (index * 100)}>
                      <div className="contact-card h-100 p-4 rounded-4 bg-white shadow-sm" style={{ borderTop: `4px solid ${info.color}` }}>
                        <div className="contact-icon mb-3" style={{ color: info.color }}>
                          <i className={`${info.icon} fs-1`}></i>
                        </div>
                        <h3 className="h5 fw-bold mb-3" style={{ color: '#1e3a8a' }}>{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-muted mb-1">{detail}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* FAQ Section */}
        {/* <section className="faq-section py-5" style={{ background: '#f0f9ff' }}>
          <div className="container" data-aos="fade-up">
            <div className="text-center mb-5">
              <h2 className="fw-bold" style={{ color: '#1e3a8a' }}>Frequently Asked Questions</h2>
              <p className="text-muted">Quick answers to common questions</p>
            </div>
            <div className="row g-4 justify-content-center">
              <div className="col-md-6">
                <div className="faq-item p-4 rounded-4 bg-white shadow-sm" style={{ borderLeft: `4px solid #2563eb` }}>
                  <i className="bi bi-question-circle-fill fs-3 mb-3 d-block" style={{ color: '#2563eb' }}></i>
                  <h4 style={{ color: '#1e3a8a' }}>How do I access my certificates?</h4>
                  <p className="text-muted mb-0">After completing a course, your certificate will be available for download from your dashboard within 24 hours.</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="faq-item p-4 rounded-4 bg-white shadow-sm" style={{ borderLeft: `4px solid #3b82f6` }}>
                  <i className="bi bi-clock-history fs-3 mb-3 d-block" style={{ color: '#2563eb' }}></i>
                  <h4 style={{ color: '#1e3a8a' }}>What are CPD credits?</h4>
                  <p className="text-muted mb-0">Continuing Professional Development credits are earned by completing our accredited insurance courses.</p>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </main>

      <Footer />

      {/* Scroll Top */}
      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>

      <style jsx global>{`
        /* Map Card */
        .map-card {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .map-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
        }
        
        .map-overlay {
          position: absolute;
          bottom: 20px;
          left: 0;
          right: 0;
          text-align: center;
        }
        
        .map-badge {
          display: inline-block;
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 8px 20px;
          border-radius: 30px;
          font-size: 14px;
          backdrop-filter: blur(10px);
        }
        
        /* Contact Cards */
        .contact-card {
          transition: all 0.3s ease;
          border: 1px solid rgba(0,0,0,0.05);
        }
        
        .contact-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
        }
        
        .contact-icon {
          transition: all 0.3s ease;
        }
        
        .contact-card:hover .contact-icon {
          transform: scale(1.1);
        }
        
        /* Form Styles */
        .form-card {
          transition: all 0.3s ease;
        }
        
        .form-floating > .form-control {
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        
        .form-floating > .form-control:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 0.2rem rgba(37, 99, 235, 0.1);
        }
        
        .submit-btn {
          background: linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%);
          color: white;
          border: none;
          padding: 14px 40px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(37, 99, 235, 0.3);
        }
        
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        /* FAQ Items */
        .faq-item {
          transition: all 0.3s ease;
          height: 100%;
        }
        
        .faq-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.08) !important;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2rem;
          }
          
          .form-card {
            padding: 1.5rem !important;
          }
          
          .submit-btn {
            padding: 12px 30px;
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}