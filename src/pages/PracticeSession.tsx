import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePracticeStore } from '../store/practiceStore';
import '../styles/session.css';

export default function PracticeSession() {
  const navigate = useNavigate();

  const script = usePracticeStore((state) => state.script);
  const mode = usePracticeStore((state) => state.mode);
  const difficulty = usePracticeStore((state) => state.difficulty);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectedLine = useMemo(() => {
    if (!script || script.length === 0) {
      return null;
    }

    return script[Math.min(activeIndex, script.length - 1)];
  }, [activeIndex, script]);

  if (!script || script.length === 0) {
    return (
      <div className="page-shell session-page">
        <section className="page-card empty-state">
          <h1 className="page-title">Practice Session</h1>
          <p className="page-subtitle">No script found. Please generate a practice session first.</p>
          <div className="hero-actions">
            <button
              type="button"
              className="button"
              onClick={() => navigate('/setup')}
            >
              Back to Speak
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-shell session-page">
      <section className="page-card session-hero">
        <div className="section-header">
          <div>
            <span className="eyebrow">Live practice</span>
            <h1 className="page-title">Practice Session</h1>
            <p className="page-subtitle">Stay calm, speak clearly, and focus on your flow.</p>
          </div>
        </div>

        <div className="session-meta">
          <span>{mode || 'Role Play'} • {difficulty || 'Intermediate'}</span>
        </div>

        <div className="script-card">
          <div className="script-nav">
            {script.map((line, index) => (
              <button
                key={line.id}
                type="button"
                className={`script-step ${activeIndex === index ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show sentence ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {selectedLine && (
            <div className="script-content">
              <p className="speaker">{selectedLine.speaker}</p>
              <p className="script-text">{selectedLine.english}</p>
              <p className="script-translation">{selectedLine.korean}</p>
            </div>
          )}
        </div>
      </section>

      <div className="session-action-bar" aria-label="Practice controls">
        <button type="button" className="control-button listen" title="Listen" aria-label="Listen">
          ▶
        </button>
        <button type="button" className="control-button record" title="Record" aria-label="Record">
          ●
        </button>
      </div>
    </div>
  );
}