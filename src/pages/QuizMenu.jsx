import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Clock } from 'lucide-react';

export default function QuizMenu() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
      <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Select Your Quiz Mode</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
        Choose between a quick 10-question practice mode to sharp up your skills with instant feedback, or a full 3-hour immersive mock exam simulation using past year GATE papers.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem 2rem', cursor: 'pointer', transition: 'all 0.3s' }} onClick={() => navigate('/quiz/practice')}>
          <div style={{ padding: '1rem', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
            <Play size={32} />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>10-Question Practice</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', flex: 1 }}>
            Focus on quick bursts of practice. 1-2 minutes per question based on type. Detailed explanations at the end.
          </p>
          <button className="btn btn-primary" style={{ width: '100%' }}>Start Practice</button>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem 2rem', cursor: 'pointer', transition: 'all 0.3s' }} onClick={() => navigate('/quiz/mock')}>
          <div style={{ padding: '1rem', borderRadius: '50%', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning-color)', marginBottom: '1.5rem' }}>
            <Clock size={32} />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Full Mock Exam</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', flex: 1 }}>
            Simulate the actual GATE test environment. 3 hours timer, 65 questions from past year papers.
          </p>
          <button className="btn btn-secondary" style={{ width: '100%', borderColor: 'var(--warning-color)', color: 'var(--warning-color)' }}>Enter Exam Hall</button>
        </div>

      </div>
    </div>
  );
}
