"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { IP } from "../../../config";


export default function CoursePlayer() {
  const { id } = useParams();
  const router = useRouter();
  const videoRef = useRef(null);
  const [course, setCourse] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${IP}/course/${id}`);
        const data = await res.json();

        if (data.success) {
          setCourse(data.data);
        }
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    };

    fetchCourse();

    // Check if already completed
    const done = localStorage.getItem(`course_${id}_completed`);
    if (done) {
      setCompleted(true);
      setProgress(100);
    }
  }, [id]);

  const handleTimeUpdate = () => {
    if (videoRef.current && !completed) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      const percent = (currentTime / duration) * 100;
      setProgress(percent);
      
      // Save progress to localStorage
      localStorage.setItem(`course_${id}_progress`, percent.toString());
    }
  };

  const handleVideoEnd = () => {
    setCompleted(true);
    setProgress(100);
    setShowSuccess(true);
    localStorage.setItem(`course_${id}_completed`, "true");
    localStorage.setItem(`course_${id}_progress`, "100");
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleTakeTest = () => {
    router.push(`/test/${id}`);
  };

  // Calculate stroke dashoffset based on progress
  const circumference = 283; // 2 * PI * 45
  const strokeDashoffset = completed ? 0 : circumference - (circumference * progress / 100);

  if (loading) {
    return (
      <>

        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          padding: "60px 20px"
        }}>
          <div style={{
            textAlign: "center",
            background: "white",
            padding: "50px 60px",
            borderRadius: "24px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
            animation: "fadeInUp 0.5s ease"
          }}>
            <div style={{
              position: "relative",
              width: "100px",
              height: "100px",
              margin: "0 auto 30px"
            }}>
              <div style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                border: "3px solid #e2e8f0",
                borderTopColor: "#60a5fa",
                borderRightColor: "#3b82f6",
                animation: "spin 1s linear infinite"
              }}></div>
              <div style={{
                position: "absolute",
                width: "70%",
                height: "70%",
                top: "15%",
                left: "15%",
                borderRadius: "50%",
                border: "3px solid #e2e8f0",
                borderBottomColor: "#60a5fa",
                borderLeftColor: "#60a5fa",
                animation: "spin 0.6s linear infinite reverse"
              }}></div>
              <div style={{
                position: "absolute",
                width: "40%",
                height: "40%",
                top: "30%",
                left: "30%",
                background: "linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "20px"
              }}>
                <i className="bi bi-broadcast"></i>
              </div>
            </div>
            
            <h3 style={{
              fontSize: "22px",
              fontWeight: "600",
              color: "#1e3a8a",
              marginBottom: "15px"
            }}>Loading Stream</h3>
            
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "15px"
            }}>
              <span style={{
                width: "8px",
                height: "8px",
                background: "linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)",
                borderRadius: "50%",
                animation: "bounce 1.4s ease infinite 0s"
              }}></span>
              <span style={{
                width: "8px",
                height: "8px",
                background: "linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)",
                borderRadius: "50%",
                animation: "bounce 1.4s ease infinite 0.2s"
              }}></span>
              <span style={{
                width: "8px",
                height: "8px",
                background: "linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)",
                borderRadius: "50%",
                animation: "bounce 1.4s ease infinite 0.4s"
              }}></span>
            </div>
            
            <p style={{
              color: "#64748b",
              fontSize: "14px",
              margin: 0
            }}>Preparing your video content...</p>
          </div>
        </div>
        
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes bounce {
            0%, 60%, 100% { transform: translateY(0); opacity: 0.3; }
            30% { transform: translateY(-12px); opacity: 1; }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        
        <Footer />
      </>
    );
  }

  if (!course) {
    return (
      <>

        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
          background: "linear-gradient(135deg, #94cfee 0%, #0980bf 100%)"
        }}>
          <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: "64px", color: "#ef4444", marginBottom: "20px" }}></i>
          <h2 style={{ color: "white", marginBottom: "10px" }}>Course Not Found</h2>
          <p style={{ color: "rgba(255,255,255,0.8)" }}>The course you're looking for doesn't exist.</p>
          <button onClick={() => router.push('/events')} style={{
            marginTop: "20px",
            padding: "10px 24px",
            background: "white",
            color: "#0980bf",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: 600
          }}>
            Back to Courses
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      
      <main className="course-player">
        <div className="container-fluid px-4 py-4">
          <div className="player-wrapper">
            {/* Breadcrumb */}
            <div className="breadcrumb-nav">
              <button style={{color: "#0980bf"}} onClick={() => router.push('/events')} className="breadcrumb-link">
                <i className="bi bi-arrow-left"></i> All Events
              </button>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">{course.course_name}</span>
            </div>

            {/* Main Grid */}
            <div className="player-grid">
              {/* Video Section */}
              <div className="video-section">
                <div className="video-container">
                  <video
                    ref={videoRef}
                    className="video-player"
                    controls
                    autoPlay
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleVideoEnd}
                    poster={course.course_img || "/assets/img/video-poster.jpg"}
                  >
                    <source src={course.course_video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {showSuccess && (
                    <div className="success-overlay">
                      <div className="success-content">
                        <i className="bi bi-check-circle-fill"></i>
                        <h4>Course Completed!</h4>
                        <p>You can now take the assessment test</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="video-info">
                  <div className="info-header">
                    <h2>{course.course_name}</h2>
                    <span className="category-badge">
                      <i className="bi bi-tag"></i> {course.course_catergory}
                    </span>
                  </div>
                  <p className="description">{course.course_description}</p>
                  
                  <div className="info-stats">
                    {/* <div className="stat">
                      <i className="bi bi-clock"></i>
                      <span>Duration: ~45 mins</span>
                    </div> */}
                    {/* <div className="stat">
                      <i className="bi bi-award"></i>
                      <span>CPD Credits: 3</span>
                    </div>
                    <div className="stat">
                      <i className="bi bi-people"></i>
                      <span>Enrolled: 1,234 students</span>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="sidebar">
                <div className="progress-card">
                  <div className="card-header">
                    <i className="bi bi-bar-chart-steps"></i>
                    <h5>Event Progress</h5>
                  </div>
                  
                  <div className="progress-section">
                    <div className="progress-circle">
                      <svg viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" className="progress-bg" />
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="45" 
                          className="progress-fill"
                          style={{ 
                            strokeDasharray: circumference,
                            strokeDashoffset: strokeDashoffset
                          }}
                        />
                      </svg>
                      <div className="progress-percentage">
                        {Math.round(progress)}%
                      </div>
                    </div>
                    
                    <div className="progress-text">
                      <span className="status-badge" style={{
                        background: completed ? '#d1fae5' : '#fef3c7',
                        color: completed ? '#065f46' : '#92400e'
                      }}>
                        {completed ? (
                          <><i className="bi bi-check-circle-fill"></i> Completed</>
                        ) : (
                          <><i className="bi bi-play-circle-fill"></i> In Progress</>
                        )}
                      </span>
                      <p className="progress-message">
                        {completed 
                          ? "Great job! You've completed this event." 
                          : `Watched ${Math.round(progress)}% - Complete the video to unlock the test`}
                      </p>
                    </div>
                  </div>

                  <div className="action-buttons">
                    <button
                      className={`test-btn ${!completed ? "disabled" : ""}`}
                      disabled={!completed}
                      onClick={handleTakeTest}
                    >
                      {completed ? (
                        <>
                          <i className="bi bi-pencil-square"></i>
                          Take Assessment Test
                          <i className="bi bi-arrow-right"></i>
                        </>
                      ) : (
                        <>
                          <i className="bi bi-lock-fill"></i>
                          Complete video to unlock test
                        </>
                      )}
                    </button>
                    
                    {!completed && (
                      <div className="info-note">
                        <i className="bi bi-info-circle-fill"></i>
                        You need to watch the full video to access the test
                        <div className="progress-bar mt-2">
                          <div className="progress-fill-bar" style={{ width: `${progress}%` }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="learn-card">
                  <h5><i className="bi bi-check-lg me-2"></i> What You'll Learn</h5>
                  <ul className="learn-list">
                    <li><i className="bi bi-check-circle"></i> Core insurance principles and practices</li>
                    <li><i className="bi bi-check-circle"></i> Risk assessment strategies</li>
                    <li><i className="bi bi-check-circle"></i> Claims management techniques</li>
                    <li><i className="bi bi-check-circle"></i> Regulatory compliance updates</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .course-player {
          background: linear-gradient(135deg, #94cfee 0%, #0980bf 100%);
          min-height: calc(100vh - 140px);
        }
        
        .player-wrapper {
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .breadcrumb-nav {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          padding: 12px 0;
        }
        
        .breadcrumb-link {
          background: none;
          border: none;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }
        
        .breadcrumb-link:hover {
          transform: translateX(-4px);
        }
        
        .breadcrumb-separator {
          color: rgba(255,255,255,0.6);
        }
        
        .breadcrumb-current {
          color: white;
          font-weight: 500;
        }
        
        .player-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
        }
        
        .video-section {
          background: white;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
        }
        
        .video-container {
          position: relative;
          background: #000;
        }
        
        .video-player {
          width: 100%;
          height: auto;
          min-height: 400px;
          background: black;
        }
        
        .success-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.5s ease;
        }
        
        .success-content {
          text-align: center;
          color: white;
        }
        
        .success-content i {
          font-size: 60px;
          color: #22c55e;
          margin-bottom: 20px;
          display: block;
        }
        
        .success-content h4 {
          font-size: 24px;
          margin-bottom: 10px;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .video-info {
          padding: 24px;
        }
        
        .info-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 16px;
          flex-wrap: wrap;
          gap: 12px;
        }
        
        .info-header h2 {
          font-size: 24px;
          font-weight: 700;
          color: #0980bf;
          margin: 0;
        }
        
        .category-badge {
          background: linear-gradient(135deg, #0980bf 0%, #0980bf 100%);
          color: white;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
        }
        
        .description {
          color: #475569;
          line-height: 1.7;
          margin-bottom: 20px;
        }
        
        .info-stats {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          padding-top: 16px;
          border-top: 1px solid #e2e8f0;
        }
        
        .stat {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #64748b;
          font-size: 14px;
        }
        
        .stat i {
          color: #0980bf;
          font-size: 18px;
        }
        
        .sidebar {
          position: sticky;
          top: 100px;
          height: fit-content;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
        .progress-card, .learn-card {
          background: white;
          border-radius: 24px;
          padding: 35px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
        }
        
        .card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .card-header i {
          font-size: 24px;
          color: #0980bf;
        }
        
        .card-header h5 {
          font-size: 18px;
          font-weight: 600;
          color: #0980bf;
          margin: 0;
        }
        
        .progress-section {
          text-align: center;
          margin-bottom: 24px;
        }
        
        .progress-circle {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 20px;
        }
        
        .progress-circle svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }
        
        .progress-bg {
          fill: none;
          stroke: #e2e8f0;
          stroke-width: 8;
        }
        
        .progress-fill {
          fill: none;
          stroke: url(#gradient);
          stroke-width: 8;
          stroke-linecap: round;
          transition: stroke-dashoffset 0.3s ease;
        }
        
        .progress-percentage {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 24px;
          font-weight: 700;
          color: #0980bf;
        }
        
        .progress-text {
          text-align: center;
        }
        
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 12px;
        }
        
        .progress-message {
          font-size: 13px;
          color: #64748b;
          margin: 0;
        }
        
        .action-buttons {
          margin-top: 20px;
        }
        
        .test-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #0980bf 0%, #0980bf 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .test-btn:hover:not(.disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(9, 128, 191, 0.3);
        }
        
        .test-btn.disabled {
          background: #cbd5e1;
          cursor: not-allowed;
          opacity: 0.6;
        }
        
        .info-note {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 12px;
          padding: 10px;
          background: #fef3c7;
          border-radius: 10px;
          font-size: 12px;
          color: #92400e;
        }
        
        .progress-bar {
          width: 100%;
          height: 6px;
          background: #e2e8f0;
          border-radius: 3px;
          overflow: hidden;
        }
        
        .progress-fill-bar {
          height: 100%;
          background: linear-gradient(135deg, #0980bf 0%, #60a5fa 100%);
          border-radius: 3px;
          transition: width 0.3s ease;
        }
        
        .learn-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .learn-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 0;
          color: #475569;
          font-size: 14px;
          border-bottom: 1px solid #f1f5f9;
        }
        
        .learn-list li:last-child {
          border-bottom: none;
        }
        
        .learn-list li i {
          color: #22c55e;
          font-size: 16px;
        }

        @media (max-width: 968px) {
          .player-grid {
            grid-template-columns: 1fr;
          }
          
          .sidebar {
            position: static;
          }
          
          .info-header {
            flex-direction: column;
          }
          
          .info-stats {
            flex-direction: column;
            gap: 12px;
          }
        }
      `}</style>
      
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0980bf" />
            <stop offset="100%" stopColor="#0980bf" />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
}