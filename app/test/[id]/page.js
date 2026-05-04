"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { IP } from "../../../config";


export default function TestPage() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const [noQuestions, setNoQuestions] = useState(false);

  useEffect(() => {
    const fetchCourseAndTest = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const courseRes = await fetch(`${IP}/course/${id}`);
        if (!courseRes.ok) throw new Error("Failed to fetch course");
        const courseData = await courseRes.json();
        if (courseData.success) {
          setCourse(courseData.data);
        }

        const testRes = await fetch(`${IP}/api/tests/${id}`);
        if (!testRes.ok) throw new Error("Failed to fetch test");
        const testData = await testRes.json();
        
        if (testData.success && testData.data && testData.data.length > 0) {
          const transformedQuestions = testData.data.map((q) => {
            const options = [
              { letter: 'A', value: q.answer_a, number: '1' },
              { letter: 'B', value: q.answer_b, number: '2' },
              { letter: 'C', value: q.answer_c, number: '3' },
              { letter: 'D', value: q.answer_d, number: '4' }
            ].filter(opt => opt.value);
            
            const correctOption = options.find(opt => opt.number === q.correct_answer);
            const correctAnswerText = correctOption ? correctOption.value : null;
            
            return {
              id: q.id,
              question: q.question,
              options: options,
              correct_answer_text: correctAnswerText,
              correct_answer_number: q.correct_answer
            };
          });
          setQuestions(transformedQuestions);
          setNoQuestions(false);
        } else {
          // No questions found - show message instead of sample questions
          setQuestions([]);
          setNoQuestions(true);
        }
      } catch (err) {
        console.error("Error fetching test:", err);
        setError("Failed to load test. Please try again.");
        setQuestions([]);
        setNoQuestions(true);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    if (id) {
      fetchCourseAndTest();
    }
  }, [id]);

  const handleAnswer = (questionId, selectedAnswerText) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedAnswerText }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      const userAnswer = answers[q.id];
      const isCorrect = userAnswer === q.correct_answer_text;
      if (isCorrect) {
        correctCount++;
      }
    });
    const percentage = (correctCount / questions.length) * 100;
    setScore(percentage);
    setSubmitted(true);
    setTestCompleted(true);
  };

  const handleRetry = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setSubmitted(false);
    setScore(0);
    setTestCompleted(false);
  };

  const handleViewCertificate = () => {
    router.push('/certificates');
  };

  const getProgressPercentage = () => {
    if (questions.length === 0) return 0;
    return (Object.keys(answers).length / questions.length) * 100;
  };

  if (loading) {
    return (
      <>
        <Header />
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
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)"
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
                background: "linear-gradient(135deg, #0980bf 0%, #60a5fa 100%)",
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
            <h3 style={{ fontSize: "22px", fontWeight: "600", color: "#1e3a8a", marginBottom: "15px" }}>Loading Assessment</h3>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "15px" }}>
              <span style={{ width: "8px", height: "8px", background: "linear-gradient(135deg, #0980bf 0%, #60a5fa 100%)", borderRadius: "50%", animation: "bounce 1.4s ease infinite 0s" }}></span>
              <span style={{ width: "8px", height: "8px", background: "linear-gradient(135deg, #0980bf 0%, #60a5fa 100%)", borderRadius: "50%", animation: "bounce 1.4s ease infinite 0.2s" }}></span>
              <span style={{ width: "8px", height: "8px", background: "linear-gradient(135deg, #0980bf 0%, #60a5fa 100%)", borderRadius: "50%", animation: "bounce 1.4s ease infinite 0.4s" }}></span>
            </div>
            <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>Preparing your test questions...</p>
          </div>
        </div>
        <style jsx>{`
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          @keyframes bounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.3; } 30% { transform: translateY(-12px); opacity: 1; } }
        `}</style>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", padding: "40px 20px" }}>
          <div style={{ textAlign: "center", background: "white", padding: "50px", borderRadius: "24px", maxWidth: "500px" }}>
            <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: "64px", color: "#ef4444" }}></i>
            <h2 style={{ color: "#1e3a8a", marginTop: "20px" }}>Unable to Load Test</h2>
            <p style={{ color: "#64748b", marginBottom: "20px" }}>{error}</p>
            <button onClick={() => window.location.reload()} style={{ background: "linear-gradient(135deg, #0980bf 0%, #1e3a8a 100%)", color: "white", border: "none", padding: "12px 24px", borderRadius: "30px", cursor: "pointer" }}>Try Again</button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // No Questions Available - Show message instead of test
  if (noQuestions || questions.length === 0) {
    return (
      <>
        <Header />
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          minHeight: "60vh", 
          padding: "40px 20px",
          background: "#f5f7fa"
        }}>
          <div style={{ 
            textAlign: "center", 
            background: "white", 
            padding: "60px 40px", 
            borderRadius: "24px", 
            maxWidth: "500px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)"
          }}>
            <i className="bi bi-journal-x" style={{ fontSize: "80px", color: "#0980bf", opacity: 0.5 }}></i>
            <h2 style={{ color: "#1e3a8a", marginTop: "20px", marginBottom: "15px" }}>No Test Questions Available</h2>
            <p style={{ color: "#64748b", marginBottom: "30px", lineHeight: "1.6" }}>
              There are currently no assessment questions for this course. 
              Please check back later or contact the course administrator.
            </p>
            <button 
              onClick={() => router.push('/events')}
              style={{ 
                background: "linear-gradient(135deg, #0980bf 0%, #1e3a8a 100%)", 
                color: "white", 
                border: "none", 
                padding: "12px 32px", 
                borderRadius: "40px", 
                fontWeight: "600", 
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 10px 25px rgba(9, 128, 191, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              <i className="bi bi-arrow-left"></i> Back to Courses
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (submitted) {
    const isPerfect = score === 100;
    const correctCount = Math.round(score / 100 * questions.length);

if (submitted && isPerfect && testCompleted) {

  const user = JSON.parse(localStorage.getItem("user"));

  console.log("uuuuuuuuzzzzzzzzzz ", user)
   fetch(`${IP}/api/createCertificates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      certificate_name: course.course_name,
      username: user.username,
      fullnames: `${user.name} ${user.surname}`, 
      email: user.email,
      course_id: id
    })
  });
}
    
    return (
      <>
        <Header />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "calc(100vh - 200px)", padding: "40px 20px", background: "#f5f7fa" }}>
          <div style={{ background: "white", borderRadius: "32px", padding: "50px", maxWidth: "550px", width: "100%", textAlign: "center", boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)" }}>
            <div style={{ fontSize: "64px", marginBottom: "20px" }}>{isPerfect ? "🏆" : "📊"}</div>
            <h2 style={{ fontSize: "32px", color: "#1e3a8a", marginBottom: "30px" }}>{isPerfect ? "Perfect Score!" : "Test Completed"}</h2>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
              <div style={{ position: "relative", width: "160px", height: "160px" }}>
                <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#0980bf" strokeWidth="10" strokeLinecap="round" style={{ strokeDasharray: 283, strokeDashoffset: 283 - (283 * score / 100), transition: "stroke-dashoffset 1s ease" }} />
                </svg>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "36px", fontWeight: "800", color: "#0980bf" }}>{Math.round(score)}<span style={{ fontSize: "18px" }}>%</span></div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginBottom: "30px", padding: "20px", background: "#f8fafc", borderRadius: "20px" }}>
              <div style={{ textAlign: "center" }}><div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "5px" }}>Correct Answers</div><strong style={{ fontSize: "24px", color: "#1e3a8a" }}>{correctCount} / {questions.length}</strong></div>
            </div>
            {isPerfect ? (
              <>
                <div style={{ background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)", color: "#065f46", padding: "12px 20px", borderRadius: "40px", fontWeight: "600", marginBottom: "20px", display: "inline-flex", alignItems: "center", gap: "10px" }}><i className="bi bi-star-fill"></i>Congratulations! You've mastered this course<i className="bi bi-star-fill"></i></div>
                <p style={{ color: "#64748b", marginBottom: "25px" }}>Your certificate is ready to be claimed.</p>
                <button onClick={handleViewCertificate} style={{ background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)", color: "white", border: "none", padding: "14px 28px", borderRadius: "40px", fontWeight: "600", cursor: "pointer", transition: "all 0.3s ease", display: "inline-flex", alignItems: "center", gap: "10px" }}><i className="bi bi-award"></i>View My Certificate<i className="bi bi-arrow-right"></i></button>
              </>
            ) : (
              <>
                <div style={{ background: "#fef3c7", color: "#92400e", padding: "12px 20px", borderRadius: "12px", marginBottom: "25px", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}><i className="bi bi-info-circle-fill"></i>You need 100% to earn your certificate. Please review and try again.</div>
                <button onClick={handleRetry} style={{ background: "linear-gradient(135deg, #0980bf 0%, #1e3a8a 100%)", color: "white", border: "none", padding: "14px 28px", borderRadius: "40px", fontWeight: "600", cursor: "pointer", transition: "all 0.3s ease", display: "inline-flex", alignItems: "center", gap: "10px" }}><i className="bi bi-arrow-repeat"></i>Retry Test</button>
              </>
            )}
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <div style={{ 
        maxWidth: "1200px", 
        margin: "0 auto", 
        padding: "40px 20px", 
        minHeight: "calc(100vh - 200px)",
        background: "#f5f7fa"  // Soft background color for eye comfort
      }}>
        {/* Test Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "30px", marginBottom: "40px", flexWrap: "wrap" }}>
          <div style={{ flex: 2 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#e0e7ff", color: "#1e3a8a", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", marginBottom: "15px" }}>
              <i className="bi bi-pencil-square"></i>Knowledge Assessment
            </div>
            <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e3a8a", marginBottom: "10px" }}>{course?.course_name || "Course Assessment"}</h1>
            <p style={{ color: "#64748b", fontSize: "14px" }}>Test your understanding. Score 100% to earn your certificate.</p>
          </div>
          
          <div style={{ flex: 1, display: "flex", gap: "15px" }}>
            <div style={{ background: "white", borderRadius: "16px", padding: "15px 20px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)", flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b", marginBottom: "8px" }}>
                <span>Questions Answered</span>
                <span>{Object.keys(answers).length} / {questions.length}</span>
              </div>
              <div style={{ height: "6px", background: "#e2e8f0", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ height: "100%", background: "linear-gradient(90deg, #0980bf, #60a5fa)", borderRadius: "3px", width: `${getProgressPercentage()}%`, transition: "width 0.3s ease" }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Question Card */}
        <div style={{ background: "white", borderRadius: "24px", boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)", overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 30px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: "14px", color: "#64748b" }}>
              Question <span style={{ fontWeight: "700", color: "#0980bf", fontSize: "18px" }}>{currentQuestion + 1}</span> of {questions.length}
            </div>
          </div>
          
          {questions.length > 0 && questions[currentQuestion] && (
            <div style={{ padding: "40px" }}>
              <h3 style={{ fontSize: "22px", fontWeight: "600", color: "#1e293b", marginBottom: "30px", lineHeight: "1.4" }}>
                {questions[currentQuestion].question}
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                {questions[currentQuestion].options.map((option, idx) => (
                  <label 
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      padding: "18px 20px",
                      background: answers[questions[currentQuestion].id] === option.value ? "#e0e7ff" : "#f8fafc",
                      border: `2px solid ${answers[questions[currentQuestion].id] === option.value ? "#0980bf" : "#e2e8f0"}`,
                      borderRadius: "16px",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      if (answers[questions[currentQuestion].id] !== option.value) {
                        e.currentTarget.style.borderColor = "#60a5fa";
                        e.currentTarget.style.background = "#eff6ff";
                        e.currentTarget.style.transform = "translateX(5px)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (answers[questions[currentQuestion].id] !== option.value) {
                        e.currentTarget.style.borderColor = "#e2e8f0";
                        e.currentTarget.style.background = "#f8fafc";
                        e.currentTarget.style.transform = "translateX(0)";
                      }
                    }}
                  >
                    <input type="radio" name={`question-${questions[currentQuestion].id}`} value={option.value} checked={answers[questions[currentQuestion].id] === option.value} onChange={() => handleAnswer(questions[currentQuestion].id, option.value)} style={{ display: "none" }} />
                    <span style={{ width: "32px", height: "32px", background: answers[questions[currentQuestion].id] === option.value ? "#0980bf" : "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", color: answers[questions[currentQuestion].id] === option.value ? "white" : "#0980bf", border: "1px solid #e2e8f0" }}>{option.letter}</span>
                    <span style={{ flex: 1, fontSize: "16px", color: "#334155" }}>{option.value}</span>
                    {answers[questions[currentQuestion].id] === option.value && <span style={{ color: "#22c55e", fontSize: "20px" }}><i className="bi bi-check-circle-fill"></i></span>}
                  </label>
                ))}
              </div>
            </div>
          )}
          
          {/* Bottom Navigation - Previous & Next Buttons */}
          <div style={{ padding: "30px 40px", borderTop: "1px solid #e2e8f0", background: "#fafbfd" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "15px" }}>
              <button 
                onClick={handlePrevious} 
                disabled={currentQuestion === 0}
                style={{
                  padding: "12px 28px",
                  background: currentQuestion === 0 ? "#e2e8f0" : "linear-gradient(135deg, #0980bf 0%, #1e3a8a 100%)",
                  color: currentQuestion === 0 ? "#94a3b8" : "white",
                  border: "none",
                  borderRadius: "40px",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: currentQuestion === 0 ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  opacity: currentQuestion === 0 ? 0.6 : 1
                }}
              >
                <i className="bi bi-chevron-left"></i> Previous
              </button>
              
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                {currentQuestion < questions.length - 1 ? (
                  <button 
                    onClick={handleNext}
                    style={{
                      padding: "12px 28px",
                      background: "linear-gradient(135deg, #0980bf 0%, #1e3a8a 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "40px",
                      fontWeight: "600",
                      fontSize: "14px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                  >
                    Next <i className="bi bi-chevron-right"></i>
                  </button>
                ) : (
                  <button 
                    onClick={handleSubmit}
                    disabled={Object.keys(answers).length !== questions.length}
                    style={{
                      padding: "12px 32px",
                      background: Object.keys(answers).length !== questions.length ? "#cbd5e1" : "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "40px",
                      fontWeight: "600",
                      fontSize: "14px",
                      cursor: Object.keys(answers).length !== questions.length ? "not-allowed" : "pointer",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      opacity: Object.keys(answers).length !== questions.length ? 0.6 : 1
                    }}
                  >
                    <i className="bi bi-check2-circle"></i> Submit Test
                  </button>
                )}
              </div>
            </div>
            
            {currentQuestion === questions.length - 1 && Object.keys(answers).length !== questions.length && (
              <p style={{ marginTop: "15px", color: "#f59e0b", fontSize: "13px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <i className="bi bi-exclamation-triangle-fill"></i>
                Please answer all questions before submitting
              </p>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}