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
              Start Speaking
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