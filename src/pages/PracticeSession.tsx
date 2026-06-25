import { useNavigate } from 'react-router-dom';
import { usePracticeStore } from '../store/practiceStore';
import '../styles/practice-setup.css';

export default function PracticeSession() {
  const navigate = useNavigate();

  const { script, mode, difficulty } = usePracticeStore((state) => ({
    script: state.script,
    mode: state.mode,
    difficulty: state.difficulty,
  }));

  if (!script || script.length === 0) {
    return (
      <div className="setup-container">
        <h1>Practice Session</h1>
        <p>No script found. Please generate a practice session first.</p>
        <button
          type="button"
          className="generate-btn"
          onClick={() => navigate('/setup')}
        >
          Back to Setup
        </button>
      </div>
    );
  }

  return (
    <div className="setup-container">
      <h1>Practice Session</h1>

      <div className="section">
        <h2>Session Summary</h2>
        <div className="card-grid">
          <div className="option-card">
            <strong>Mode</strong>
            <p>{mode || 'Not selected'}</p>
          </div>
          <div className="option-card">
            <strong>Difficulty</strong>
            <p>{difficulty || 'Not selected'}</p>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Script</h2>
        <div className="card-grid">
          {script.map((line) => (
            <div key={line.id} className="option-card">
              <p className="script-speaker">{line.speaker}</p>
              <p>{line.english}</p>
              <p className="script-korean">{line.korean}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
