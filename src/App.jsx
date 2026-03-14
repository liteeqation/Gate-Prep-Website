import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Sun, Moon, BookOpen, Clock, Layers } from 'lucide-react';
import QuestionBank from './pages/QuestionBank';
import QuizMenu from './pages/QuizMenu';
import PracticeQuiz from './pages/PracticeQuiz';
import MockExam from './pages/MockExam';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <nav className="navbar">
        <div className="container nav-container">
          <div className="nav-logo">
            <Layers className="logo-icon" size={28} color="var(--primary-color)" />
            <span>GATE Prep</span>
          </div>
          
          <div className="nav-links">
            <NavLink to="/questions" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <BookOpen size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
              Question Bank
            </NavLink>
            <NavLink to="/quiz" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <Clock size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
              Quiz Center
            </NavLink>
            {/* Future tabs space */}
            
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content container">
        <Routes>
          <Route path="/" element={<QuestionBank />} />
          <Route path="/questions" element={<QuestionBank />} />
          <Route path="/quiz" element={<QuizMenu />} />
          <Route path="/quiz/practice" element={<PracticeQuiz />} />
          <Route path="/quiz/mock" element={<MockExam />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
