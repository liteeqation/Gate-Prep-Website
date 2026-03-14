import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { practiceBank } from '../data/questions';

// Simple seeded random to ensure same questions per day
function seededRandom(seed) {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Function to shuffle array with a specific seed
function seededShuffle(array, seed) {
  let currentIndex = array.length, randomIndex;
  let currentSeed = seed;
  
  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(seededRandom(currentSeed) * currentIndex);
    currentIndex--;
    currentSeed++;

    // And swap it with the current element
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

export default function PracticeQuiz() {
  const navigate = useNavigate();
  
  // Setup daily questions
  const [questions, setQuestions] = useState([]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); 

  useEffect(() => {
    // Generate daily seed based on Local Date (Changes at 11:59 PM Local Time)
    const today = new Date();
    // Ex: 20261025
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    // Copy and shuffle the practice questions using today's seed
    const shuffledPool = seededShuffle([...practiceBank], seed);
    
    // Take exactly 10 questions for the daily practice quiz
    const dailyQuestions = shuffledPool.slice(0, 10);
    setQuestions(dailyQuestions);
  }, []);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (isFinished || !currentQuestion) return;

    // 1-2 minutes based on question marks or type
    const initialTime = currentQuestion.marks === 2 ? 120 : 60;
    setTimeLeft(initialTime);
  }, [currentIndex, isFinished, currentQuestion]);

  useEffect(() => {
    if (isFinished || questions.length === 0) return;
    if (timeLeft <= 0) {
      handleNext();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isFinished, questions]);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleOptionSelect = (option) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: option
    }));
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (questions.length === 0) return <div style={{textAlign: 'center', marginTop: '4rem'}}>Loading daily challenge...</div>;

  if (isFinished) {
    let score = 0;
    const TOTAL_QUESTIONS = questions.length;

    questions.forEach(q => {
      const uans = userAnswers[q.id];
      if (!uans) return;

      if (q.type === 'MCQ' || q.type === 'NAT') {
        if (uans === q.correctAnswer) score += 1; // 1 correct = 1 point out of 10
      } else if (q.type === 'MSQ') {
        // Simplified correct logic for MSQ single-selection format
        if (q.correctAnswers && q.correctAnswers.includes(uans)) {
            score += 1;
        }
      }
    });

    return (
      <div className="card" style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '2rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--primary-color)', fontSize: '2rem' }}>Practice Complete!</h2>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '2rem', backgroundColor: 'var(--surface-color)', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '4rem', fontWeight: 'bold' }}>{score} <span style={{fontSize: '2rem', color: 'var(--text-muted)'}}>/ {TOTAL_QUESTIONS}</span></div>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem' }}>Final Score based on correct attempts.</p>
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <span className="tag" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>Today's Challenge Completed</span>
          </div>
        </div>

        <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Detailed Explanations</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {questions.map((q, i) => {
            const uans = userAnswers[q.id];
            const isCorrect = q.type === 'MCQ' || q.type === 'NAT' 
              ? uans === q.correctAnswer 
              : (q.correctAnswers && q.correctAnswers.includes(uans));

            return (
              <div key={q.id} style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem', backgroundColor: isCorrect ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h4 style={{ flex: 1, marginRight: '1rem', lineHeight: '1.5' }}>Q{i+1}: {q.questionText}</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                    <span className="tag" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-muted)' }}>{q.subject}</span>
                    <span className="tag" style={{ backgroundColor: 'var(--bg-color)' }}>{q.topic}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                  <span style={{ color: isCorrect ? 'var(--success-color)' : 'var(--danger-color)', fontWeight: 'bold' }}>
                    {uans ? (isCorrect ? 'Correct' : 'Incorrect') : 'Unattempted'}
                  </span>
                  <span>|</span>
                  <span>Your Answer: <strong style={{color: 'var(--text-color)'}}>{uans || '-'}</strong></span>
                </div>
                
                <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface-color)', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                  <p><strong>Correct Answer:</strong> <span style={{color: 'var(--success-color)'}}>{q.correctAnswer || (q.correctAnswers && q.correctAnswers.join(', '))}</span></p>
                  <p style={{ marginTop: '1rem', color: 'var(--text-color)', lineHeight: '1.6' }}><strong>Explanation:</strong> {q.explanation}</p>
                  <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(59, 130, 246, 0.05)', borderRadius: '0.5rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--primary-hover)' }}><strong>Suggested Reading:</strong> {q.sources}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '3rem' }}>
          <button className="btn btn-primary" onClick={() => navigate('/quiz')}>Return to Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', backgroundColor: 'var(--surface-color)', padding: '1rem 1.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
        <div>
          <h2 style={{ color: 'var(--text-color)', fontSize: '1.2rem' }}>Daily GATE Challenge</h2>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>New questions every midnight</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ fontWeight: 600 }}>{currentIndex + 1} / {questions.length}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: timeLeft < 15 ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-color)', border: '1px solid', borderColor: timeLeft < 15 ? 'var(--danger-color)' : 'var(--border-color)', borderRadius: '2rem', color: timeLeft < 15 ? 'var(--danger-color)' : 'var(--text-color)', fontWeight: 'bold' }}>
            ⏳ {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
           <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span className="tag">{currentQuestion.type}</span>
              <span className="tag tag-secondary" style={{backgroundColor: 'var(--bg-color)'}}>{currentQuestion.topic}</span>
           </div>
           <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{currentQuestion.marks} Mark{currentQuestion.marks > 1 ? 's' : ''}</span>
        </div>

        <h3 style={{ marginBottom: '2.5rem', fontSize: '1.2rem', lineHeight: '1.6', fontWeight: 500 }}>
          {currentQuestion.questionText}
        </h3>

        {currentQuestion.options && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
            {currentQuestion.options.map((opt, i) => (
              <label 
                key={i} 
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', 
                  border: '1px solid', borderColor: userAnswers[currentQuestion.id] === opt ? 'var(--primary-color)' : 'var(--border-color)', 
                  borderRadius: '0.5rem', cursor: 'pointer',
                  backgroundColor: userAnswers[currentQuestion.id] === opt ? 'rgba(59, 130, 246, 0.05)' : 'var(--bg-color)',
                  transition: 'all 0.2s ease'
                }}>
                <input 
                  type="radio" 
                  name={`question-${currentQuestion.id}`} 
                  value={opt} 
                  checked={userAnswers[currentQuestion.id] === opt}
                  onChange={() => handleOptionSelect(opt)}
                  style={{ transform: 'scale(1.2)' }}
                />
                <span style={{ flex: 1, fontSize: '1.05rem' }}>{opt}</span>
              </label>
            ))}
          </div>
        )}

        {currentQuestion.type === 'NAT' && (
          <div style={{ marginBottom: '2.5rem' }}>
            <input 
              type="number" 
              placeholder="Enter numerical answer" 
              style={{ width: '100%', padding: '1.25rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', fontSize: '1.1rem', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
              value={userAnswers[currentQuestion.id] || ''}
              onChange={(e) => handleOptionSelect(e.target.value)}
            />
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <button 
            className="btn btn-primary" 
            style={{ padding: '1rem 2rem', fontSize: '1rem' }}
            onClick={handleNext}
          >
            {currentIndex === questions.length - 1 ? 'Submit Challenge' : 'Save & Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
}
