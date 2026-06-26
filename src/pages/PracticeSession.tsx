import { useNavigate } from 'react-router-dom';
import { usePracticeStore } from '../store/practiceStore';
import '../styles/session.css';

export default function PracticeSession() {
  const navigate = useNavigate();

  const script = usePracticeStore((state) => state.script);
  const mode = usePracticeStore((state) => state.mode);
  const difficulty = usePracticeStore((state) => state.difficulty);

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

        <div className="session-actions">
          <button type="button" className="button button-secondary">
            Listen
          </button>
          <button type="button" className="button">
            Record
          </button>
        </div>

        <div className="progress-card">
          <div className="progress-labels">
            <span>Progress</span>
            <span>1 / 5</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '20%' }} />
          </div>
        </div>
      </section>

      <section className="page-card">
        <div className="summary-grid">
          <div className="summary-item">
            <span>Mode</span>
            <strong>{mode}</strong>
          </div>
          <div className="summary-item">
            <span>Difficulty</span>
            <strong>{difficulty}</strong>
          </div>
        </div>
      </section>

      <section className="page-card">
        <div className="section-header">
          <div>
            <h2>Script</h2>
            <p>Ready for your turn.</p>
          </div>
        </div>

        <div className="script-list">
          {script.map((line) => (
            <div key={line.id} className="script-item">
              <p className="speaker">{line.speaker}</p>
              <p>{line.english}</p>
              <p>{line.korean}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}