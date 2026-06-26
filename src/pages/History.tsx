import '../styles/home.css';

export default function History() {
  return (
    <div className="page-shell">
      <section className="page-card">
        <div className="section-header">
          <div>
            <span className="eyebrow">Reflection</span>
            <h1 className="page-title">Practice History</h1>
            <p className="page-subtitle">Track your progress over time.</p>
          </div>
        </div>

        <div className="empty-state">
          <p>No practice history yet.</p>
        </div>
      </section>
    </div>
  );
}
