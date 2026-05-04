"use client";

import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { IP } from "../../config";

export default function Events() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState({});
  const [courses, setCourses] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const observerRef = useRef(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${IP}/courses`);
        const data = await res.json();

        if (data.success) {
          setCourses(data.data);
        } else {
          // Fallback mock data if API fails
          setCourses([
            {
              id: 1,
              course_name: "InsurTech Innovation Forum",
              course_catergory: "March 12, 2025 | 9:00 AM - 6:00 PM",
              course_description: "Explore cutting-edge technologies transforming insurance: AI, machine learning, predictive analytics, and automation. Live demos from startups and established tech providers.",
              course_img: "/assets/img/events-item-2.jpg"
            },
            {
              id: 2,
              course_name: "Regulatory Compliance Update",
              course_catergory: "April 8, 2025 | 10:00 AM - 1:00 PM",
              course_description: "Stay ahead of changing regulations. Deep dive into new compliance requirements, data protection laws, and best practices for maintaining regulatory standards.",
              course_img: "/assets/img/events-item-1.jpg"
            },
            {
              id: 3,
              course_name: "Building Client Relationships",
              course_catergory: "May 20, 2025 | 1:00 PM - 4:00 PM",
              course_description: "Learn strategies for building lasting client relationships, effective communication techniques, trust-building methods, and client retention strategies.",
              course_img: "/assets/img/events-item-2.jpg"
            }
          ]);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        // Set fallback data on error
        setCourses([
          {
            id: 1,
            course_name: "InsurTech Innovation Forum",
            course_catergory: "March 12, 2025 | 9:00 AM - 6:00 PM",
            course_description: "Explore cutting-edge technologies transforming insurance: AI, machine learning, predictive analytics, and automation.",
            course_img: "/assets/img/events-item-2.jpg"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Separate effect for Intersection Observer - runs when courses change
  useEffect(() => {
    if (!loading && courses.length > 0) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        const elements = document.querySelectorAll(".animate-on-scroll");
        
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
        
        observerRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
                observerRef.current.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.3 }
        );

        elements.forEach((el) => {
          observerRef.current.observe(el);
        });
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [loading, courses]);

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleWatchVideo = (courseId) => {
    window.open(`/stream/${courseId}`, '_blank');
  };

  return (
    <>
      <Header />

      <main className="main">
        {/* Page Title */}
        <div className="page-title">
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1>Industry Events & Webinars</h1>
                  <p className="mb-0">
                    Join us for transformative insurance industry events,
                    expert-led webinars, and networking opportunities designed
                    to advance your career and keep you at the forefront of
                    industry innovations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Events Section with Loading Spinner */}
        <section id="events" className="events section">
          <div className="container">
            {loading ? (
              <div className="loading-wrapper">
                <div className="loading-container">
                  <div className="spinner-wrapper">
                    <div className="spinner-ring spinner-ring-outer"></div>
                    <div className="spinner-ring spinner-ring-inner"></div>
                    <div className="spinner-center">
                      <i className="bi bi-broadcast"></i>
                    </div>
                  </div>
                  
                  <h3 className="loading-title">Loading Events</h3>
                  
                  <div className="loading-dots">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  
                  <p className="loading-message">
                    Preparing your learning experience...
                  </p>
                </div>
              </div>
            ) : (
              <div className="row">
                {courses && courses.length > 0 ? (
                  courses.map((course, index) => (
                    <div
                      key={course.id}
                      className="col-lg-4 col-md-6 d-flex align-items-stretch mb-4"
                    >
                      <div
                        className={`card animate-on-scroll ${
                          isVisible[`card${course.id}`] ? "fade-in-up" : ""
                        }`}
                        id={`card${course.id}`}
                        onMouseEnter={() => setHoveredCard(course.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        style={{
                          transition: "transform 0.3s ease, box-shadow 0.3s ease",
                          cursor: "pointer",
                          width: "100%",
                          border: "1px solid #e2e8f0",
                          borderRadius: "16px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          overflow: "hidden",
                          background: "white",
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                        }}
                      >
                        <div className="card-img position-relative" style={{ overflow: "hidden" }}>
                          <img
                            src={course.course_img || "/assets/img/events-item-2.jpg"}
                            alt={course.course_name}
                            style={{
                              width: "100%",
                              height: "220px",
                              objectFit: "cover",
                              transition: "transform 0.5s ease",
                              transform: hoveredCard === course.id ? "scale(1.05)" : "scale(1)",
                            }}
                          />
                          <div
                            className="video-overlay"
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: "rgba(0,0,0,0.75)",
                              display: hoveredCard === course.id ? "flex" : "none",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.3s ease",
                              cursor: "pointer",
                              backdropFilter: "blur(4px)",
                            }}
                          >
                            <div
                              className="play-icon"
                              style={{
                                width: "70px",
                                height: "70px",
                                background: "linear-gradient(135deg, #0980bf 0%, #0980bf 100%)",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                animation: hoveredCard === course.id ? "pulse 1.5s ease infinite" : "none",
                                boxShadow: "0 0 20px rgba(37, 99, 235, 0.5)",
                              }}
                            >
                              <i 
                                className="bi bi-play-fill" 
                                style={{ 
                                  fontSize: "40px", 
                                  color: "white", 
                                  marginLeft: "5px" 
                                }}
                              ></i>
                            </div>
                            <span
                              style={{
                                position: "absolute",
                                bottom: "20px",
                                color: "white",
                                fontSize: "14px",
                                fontWeight: "500",
                                background: "rgba(0,0,0,0.6)",
                                padding: "5px 15px",
                                borderRadius: "20px",
                              }}
                            >
                              Click to Watch
                            </span>
                          </div>
                        </div>
                        
                        <div className="card-body" style={{ 
                          padding: "20px", 
                          flex: 1,
                          display: "flex",
                          flexDirection: "column"
                        }}>
                          <h5 className="card-title" style={{ 
                            fontSize: "18px", 
                            fontWeight: "600", 
                            marginBottom: "10px",
                            color: "#0980bf"
                          }}>
                            {course.course_name}
                          </h5>
                          
                          <p className="fst-italic text-center" style={{ 
                            color: "#666", 
                            fontSize: "14px", 
                            marginBottom: "12px" 
                          }}>
                            <i className="bi bi-calendar-event me-1"></i>
                            {course.course_catergory}
                          </p>
                          
                          <div className="description-wrapper" style={{
                            flex: 1,
                            marginBottom: "15px"
                          }}>
                            <p className="card-text" style={{ 
                              color: "#555", 
                              fontSize: "14px", 
                              lineHeight: "1.5",
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              margin: 0
                            }}>
                              {course.course_description}
                            </p>
                          </div>
                          
                          <button
                            className="btn-watch-now"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleWatchVideo(course.id);
                            }}
                            style={{
                              width: "100%",
                              padding: "12px",
                              background: "linear-gradient(135deg, #0980bf 0%, #0980bf 100%)",
                              color: "white",
                              border: "none",
                              borderRadius: "10px",
                              fontWeight: "600",
                              fontSize: "14px",
                              transition: "all 0.3s ease",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "8px",
                              marginTop: "auto",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.transform = "translateY(-2px)";
                              e.target.style.boxShadow = "0 5px 15px rgba(37, 99, 235, 0.3)";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = "translateY(0)";
                              e.target.style.boxShadow = "none";
                            }}
                          >
                            <i className="bi bi-play-circle"></i>
                            Watch Now
                            <i className="bi bi-box-arrow-up-right"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center">
                    <p>No courses available at the moment.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.9;
            box-shadow: 0 0 30px rgba(37, 99, 235, 0.8);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .fade-in-up {
          animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .video-overlay {
          animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12) !important;
          border-color: #0980bf !important;
        }
        
        .description-wrapper {
          min-height: 65px;
        }
        
        .card {
          border: 1px solid #e2e8f0 !important;
        }
        
        .card:hover {
          border-color: #0980bf !important;
        }
        
        .btn-watch-now i.bi-box-arrow-up-right {
          transition: transform 0.3s ease;
        }
        
        .btn-watch-now:hover i.bi-box-arrow-up-right {
          transform: translateX(2px) translateY(-2px);
        }
        
        /* Loading Spinner Styles */
        .loading-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
          padding: 60px 20px;
        }
        
        .loading-container {
          text-align: center;
          background: white;
          padding: 50px 60px;
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          animation: fadeInUp 0.5s ease;
        }
        
        .spinner-wrapper {
          position: relative;
          width: 100px;
          height: 100px;
          margin: 0 auto 30px;
        }
        
        .spinner-ring {
          position: absolute;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        .spinner-ring-outer {
          width: 100%;
          height: 100%;
          border: 3px solid #e2e8f0;
          border-top-color: #0980bf;
          border-right-color: #0980bf;
        }
        
        .spinner-ring-inner {
          width: 70%;
          height: 70%;
          top: 15%;
          left: 15%;
          border: 3px solid #e2e8f0;
          border-bottom-color: #0980bf;
          border-left-color: #0980bf;
          animation-direction: reverse;
          animation-duration: 0.6s;
        }
        
        .spinner-center {
          position: absolute;
          width: 40%;
          height: 40%;
          top: 30%;
          left: 30%;
          background: linear-gradient(135deg, #0980bf 0%, #0980bf 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 20px;
        }
        
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        .loading-title {
          font-size: 22px;
          font-weight: 600;
          color: #1e3a8a;
          margin-bottom: 15px;
        }
        
        .loading-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 15px;
        }
        
        .dot {
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, #0980bf 0%, #0980bf 100%);
          border-radius: 50%;
          animation: bounce 1.4s ease infinite;
        }
        
        .dot:nth-child(1) {
          animation-delay: 0s;
        }
        
        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes bounce {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.3;
          }
          30% {
            transform: translateY(-12px);
            opacity: 1;
          }
        }
        
        .loading-message {
          color: #64748b;
          font-size: 14px;
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .loading-container {
            padding: 40px 30px;
          }
          
          .spinner-wrapper {
            width: 80px;
            height: 80px;
          }
          
          .loading-title {
            font-size: 18px;
          }
        }
      `}</style>
    </>
  );
}