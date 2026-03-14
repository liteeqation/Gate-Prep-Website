import React, { useState } from 'react';
import { gateQuestions } from '../data/questions';

export default function QuestionBank() {
  const [filterTopic, setFilterTopic] = useState("All");

  const topics = ["All", ...new Set(gateQuestions.map(q => q.topic))];

  const filteredQuestions = filterTopic === "All" 
    ? gateQuestions 
    : gateQuestions.filter(q => q.topic === filterTopic);

  return (
    <div className="question-bank">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>GATE Question Bank</h2>
        <select 
          value={filterTopic} 
          onChange={(e) => setFilterTopic(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', color: 'var(--text-color)' }}
        >
          {topics.map(topic => <option key={topic} value={topic}>{topic}</option>)}
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {filteredQuestions.map((q) => (
          <div key={q.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span className="tag">GATE {q.year}</span>
                <span className="tag tag-secondary">{q.shift} Shift</span>
                <span className="tag tag-secondary">{q.type}</span>
              </div>
              <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{q.marks} Mark{q.marks > 1 ? 's' : ''}</span>
            </div>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.5' }}>{q.questionText}</h3>
            
            {q.options && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {q.options.map((opt, i) => (
                  <div key={i} style={{ padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem', backgroundColor: 'var(--bg-color)' }}>
                    {opt}
                  </div>
                ))}
              </div>
            )}
            
            <details style={{ marginTop: '1rem', cursor: 'pointer' }}>
              <summary style={{ color: 'var(--primary-color)', fontWeight: 500 }}>View Answer Solution</summary>
              <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: '0.5rem', borderLeft: '4px solid var(--success-color)' }}>
                <p><strong>Correct Answer:</strong> {q.correctAnswer || (q.correctAnswers && q.correctAnswers.join(', '))}</p>
                <p style={{ marginTop: '0.5rem' }}><strong>Explanation:</strong> {q.explanation}</p>
                <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}><em>Source: {q.sources}</em></p>
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}
