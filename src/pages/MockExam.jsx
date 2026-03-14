import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { gateQuestions } from '../data/questions';

export default function MockExam() {
  const navigate = useNavigate();
  // We will load the 2025 questions as requested
  const examQuestions = gateQuestions.filter(q => q.year === 2025);
  
  const TOTAL_SECONDS = 3 * 60 * 60; 
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [visited, setVisited] = useState(new Set([0])); // track visited question indexes
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- Strict Navigation Blocks ---
  useEffect(() => {
    // Hide standard navbar when exam loads to prevent tab-switching
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.style.display = 'none';

    // Beforeunload warning if they try to close the browser tab
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ''; // Required for Chrome
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // Re-show navbar on unmount
      if (navbar) navbar.style.display = 'flex';
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Timer logic
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const handleAutoSubmit = () => {
    Swal.fire({
      title: 'Time is Up!',
      text: 'Your exam is being submitted automatically.',
      icon: 'info',
      confirmButtonText: 'View Results'
    }).then(() => {
      setIsSubmitted(true);
    });
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (qId, option) => {
    setUserAnswers(prev => ({
      ...prev,
      [qId]: option
    }));
  };

  const clearResponse = (qId) => {
    setUserAnswers(prev => { 
      const newAns = {...prev}; 
      delete newAns[qId]; 
      return newAns; 
    });
  };

  const navigateToQuestion = (index) => {
    setCurrentIndex(index);
    setVisited(prev => new Set(prev).add(index));
  };

  const handleExitRequest = () => {
    Swal.fire({
      title: 'Exit Exam?',
      text: "You will lose all your progress and the exam will not be scored.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, exit now'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/quiz');
      }
    });
  };

  const handleSubmitRequest = () => {
    const answeredCount = Object.keys(userAnswers).length;
    const unansweredCount = examQuestions.length - answeredCount;

    Swal.fire({
      title: 'Submit Exam?',
      html: `
        <div style="text-align: left; padding: 1rem;">
          <p><strong>Attempted:</strong> ${answeredCount}</p>
          <p><strong>Unattempted:</strong> ${unansweredCount}</p>
          <br/>
          <p>Are you sure you submit your final answers?</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Submit and View Score'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsSubmitted(true);
      }
    });
  };

  const getQuestionStatusColor = (index, qId) => {
    if (userAnswers[qId]) return 'var(--success-color)'; // Answered (Green)
    if (visited.has(index)) return 'var(--danger-color)'; // Visited but not answered (Red)
    return 'var(--surface-color)'; // Not visited (White/Default)
  };

  const getQuestionStatusTextColor = (index, qId) => {
    if (userAnswers[qId] || visited.has(index)) return '#fff'; 
    return 'var(--text-color)';
  };

  const calculateScore = () => {
    let score = 0;
    let maxScore = examQuestions.reduce((acc, q) => acc + q.marks, 0);
    let attempted = Object.keys(userAnswers).length;

    examQuestions.forEach(q => {
      const uans = userAnswers[q.id];
      if (!uans) return; 
      
      if (q.type === 'MCQ' || q.type === 'NAT') {
        if (uans === q.correctAnswer) {
          score += q.marks;
        } else if (q.type === 'MCQ') {
          score -= (q.marks / 3);
        }
      }
    });

    return { score: score.toFixed(2), maxScore, attempted };
  };

  if(!examQuestions || examQuestions.length === 0) {
    return <div style={{textAlign: 'center', marginTop: '4rem'}}>Loading exam payload...</div>
  }

  // --- SUBMITTED VIEW --- //
  if (isSubmitted) {
    const { score, maxScore, attempted } = calculateScore();
    
    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto', paddingTop: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '2rem', backgroundColor: 'var(--surface-color)', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
          <h2 style={{ color: 'var(--primary-color)', fontSize: '2rem', marginBottom: '1rem' }}>Exam Completed!</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', margin: '2rem 0' }}>
            <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-color)', borderRadius: '0.5rem', minWidth: '150px' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{score}</div>
              <div style={{ color: 'var(--text-muted)' }}>Score out of {maxScore}</div>
            </div>
            <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-color)', borderRadius: '0.5rem', minWidth: '150px' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{attempted}</div>
              <div style={{ color: 'var(--text-muted)' }}>Attempted out of {examQuestions.length}</div>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/quiz')}>Return to Menu</button>
        </div>

        <h3 style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Detailed Analysis</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {examQuestions.map((q, i) => {
             const uans = userAnswers[q.id];
             const isCorrect = q.type === 'MCQ' || q.type === 'NAT' 
               ? uans === q.correctAnswer 
               : (q.correctAnswers && q.correctAnswers.includes(uans));

             return (
               <div key={q.id} style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem', backgroundColor: isCorrect ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)' }}>
                 <h4 style={{ marginBottom: '1rem' }}>Q{i+1}: {q.questionText}</h4>
                 <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                   <span style={{ color: isCorrect ? 'var(--success-color)' : 'var(--danger-color)', fontWeight: 'bold' }}>
                     {uans ? (isCorrect ? 'Correct' : 'Incorrect') : 'Unattempted'}
                   </span>
                   <span>|</span>
                   <span>Your Answer: {uans || '-'}</span>
                 </div>
                 
                 <div style={{ padding: '1rem', backgroundColor: 'var(--surface-color)', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                   <p><strong>Correct Answer:</strong> {q.correctAnswer || (q.correctAnswers && q.correctAnswers.join(', '))}</p>
                   {q.explanation && <p style={{ marginTop: '0.5rem', color: 'var(--text-color)' }}><strong>Justification:</strong> {q.explanation}</p>}
                   {q.sources && (
                     <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '0.25rem' }}>
                       <p style={{ fontSize: '0.85rem', color: 'var(--primary-hover)' }}><strong>Suggested Sources:</strong> {q.sources}</p>
                     </div>
                   )}
                 </div>
               </div>
             );
          })}
        </div>
      </div>
    );
  }

  // --- ACTIVE EXAM VIEW --- //
  const currentQ = examQuestions[currentIndex];

  return (
    <div style={{ display: 'flex', gap: '2rem', maxWidth: '1400px', margin: '0 auto', height: '100vh', paddingTop: '1rem', paddingBottom: '1rem' }}>
      
      {/* LEFT: Question Panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        
        {/* Top Header Row for Active Exam */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--surface-color)', padding: '1rem 1.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-color)', margin: 0 }}>GATE Computer Science 2025</h2>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <span className="tag" style={{backgroundColor: 'var(--bg-color)'}}>{currentQ?.date || 'Feb 2025'}</span>
              <span className="tag tag-secondary" style={{backgroundColor: 'var(--bg-color)'}}>Morning Shift</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>Time Remaining</span>
              <span style={{ fontSize: '1.8rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: timeLeft < 3600 ? 'var(--danger-color)' : 'var(--text-color)' }}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <button className="btn btn-secondary" style={{ borderColor: 'var(--danger-color)', color: 'var(--danger-color)' }} onClick={handleExitRequest}>
              Exit Test
            </button>
          </div>
        </div>

        {/* Question Content */}
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>Question {currentIndex + 1}</span>
              <span className="tag">{currentQ.type}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-muted)', display: 'block' }}>{currentQ.marks} Mark{currentQ.marks > 1 ? 's' : ''}</span>
              {currentQ.type === 'MCQ' && (
                <span style={{ fontSize: '0.8rem', color: 'var(--danger-color)' }}>Negative: -{(currentQ.marks/3).toFixed(2)}</span>
              )}
            </div>
          </div>

          <h3 style={{ marginBottom: '2.5rem', fontSize: '1.2rem', lineHeight: '1.7', fontWeight: 500, flex: 1 }}>
            {currentQ.questionText}
          </h3>

          <div style={{ marginTop: 'auto' }}>
            {currentQ.options && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {currentQ.options.map((opt, optIdx) => (
                  <label 
                    key={optIdx} 
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', 
                      border: '1px solid', borderColor: userAnswers[currentQ.id] === opt ? 'var(--primary-color)' : 'var(--border-color)', 
                      borderRadius: '0.5rem', cursor: 'pointer',
                      backgroundColor: userAnswers[currentQ.id] === opt ? 'rgba(59, 130, 246, 0.05)' : 'var(--bg-color)',
                      transition: 'all 0.2s ease'
                    }}>
                    <input 
                      type="radio" 
                      name={`question-${currentQ.id}`} 
                      value={opt} 
                      checked={userAnswers[currentQ.id] === opt}
                      onChange={() => handleOptionSelect(currentQ.id, opt)}
                      style={{ transform: 'scale(1.2)' }}
                    />
                    <span style={{ flex: 1, fontSize: '1rem' }}>{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQ.type === 'NAT' && (
              <div style={{ marginBottom: '2rem' }}>
                <input 
                  type="number" 
                  placeholder="Enter your numerical answer here..." 
                  style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', fontSize: '1.1rem', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
                  value={userAnswers[currentQ.id] || ''}
                  onChange={(e) => handleOptionSelect(currentQ.id, e.target.value)}
                />
              </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
               <button className="btn btn-secondary" disabled={!userAnswers[currentQ.id]} onClick={() => clearResponse(currentQ.id)}>
                 Clear Response
               </button>

               <div style={{ display: 'flex', gap: '1rem' }}>
                 <button 
                   className="btn btn-secondary" 
                   disabled={currentIndex === 0} 
                   onClick={() => navigateToQuestion(currentIndex - 1)}
                 >
                   Previous
                 </button>
                 <button 
                   className="btn btn-primary" 
                   onClick={() => {
                     if (currentIndex < examQuestions.length - 1) {
                       navigateToQuestion(currentIndex + 1);
                     } else {
                       handleSubmitRequest();
                     }
                   }}
                 >
                   {currentIndex === examQuestions.length - 1 ? 'Save & Submit' : 'Save & Next'}
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Navigation Panel */}
      <div className="card" style={{ width: '320px', display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
        <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem', fontSize: '1.1rem' }}>Question Palette</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
          {examQuestions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => navigateToQuestion(i)}
              style={{
                padding: '0.75rem 0',
                borderRadius: '0.25rem',
                border: '1px solid var(--border-color)',
                fontWeight: 'bold',
                cursor: 'pointer',
                backgroundColor: getQuestionStatusColor(i, q.id),
                color: getQuestionStatusTextColor(i, q.id),
                outline: currentIndex === i ? '2px solid var(--primary-color)' : 'none',
                outlineOffset: '2px'
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
           <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Legend</h4>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <div style={{ width: '20px', height: '20px', backgroundColor: 'var(--success-color)', borderRadius: '3px' }}></div>
               <span>Answered</span>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <div style={{ width: '20px', height: '20px', backgroundColor: 'var(--danger-color)', borderRadius: '3px' }}></div>
               <span>Not Answered (Visited)</span>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <div style={{ width: '20px', height: '20px', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '3px' }}></div>
               <span>Not Visited</span>
             </div>
           </div>

           <button 
             className="btn btn-primary" 
             style={{ width: '100%', marginTop: '2rem', padding: '1rem' }}
             onClick={handleSubmitRequest}
           >
             Submit Exam
           </button>
        </div>
      </div>

    </div>
  );
}
