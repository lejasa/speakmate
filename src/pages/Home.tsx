import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-shell home-page-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="eyebrow">AI English coach</span>
          <h1>SpeakMate</h1>
          <p>Improve your English speaking with AI in calm, focused sessions.</p>

          <div className="hero-actions">
            <button
              type="button"
              className="button"
              onClick={() => navigate('/setup')}
            >
              START
            </button>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => navigate('/opic')}
            >
              OPIc AL Course
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-card">
            <span>Daily focus</span>
            <strong>5 minutes a day</strong>
            <p className="muted">Build confidence through short, guided practice.</p>
          </div>
        </div>
      </section>

      <section className="page-card">
        <div className="section-header">
          <div>
            <h2>OPIc AL Master Course</h2>
            <p>7일 집중 코스로 OPIc AL 레벨을 목표로 하세요</p>
          </div>
        </div>

        <div className="opic-preview">
          <div className="preview-item">
            <span className="preview-icon">📚</span>
            <p>체계적인 학습 커리큘럼</p>
          </div>
          <div className="preview-item">
            <span className="preview-icon">🎤</span>
            <p>음성 녹음 및 재생</p>
          </div>
          <div className="preview-item">
            <span className="preview-icon">✍️</span>
            <p>핵심 표현 학습</p>
          </div>
          <div className="preview-item">
            <span className="preview-icon">🎯</span>
            <p>AL 레벨 달성</p>
          </div>
        </div>

        <button
          type="button"
          className="button button-block"
          onClick={() => navigate('/opic')}
        >
          OPIc AL Course 시작하기 →
        </button>
      </section>

      <section className="page-card">
        <div className="section-header">
          <div>
            <h2>Recent Practice</h2>
            <p>Your latest speaking sessions will appear here.</p>
          </div>
        </div>

        <div className="empty-state">
          <p>No recent practice yet.</p>
        </div>
      </section>
    </div>
  );
}