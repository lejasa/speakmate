import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="hero">
        <h1>SpeakMate</h1>

        <p>Improve your English speaking with AI</p>

        <button
          className="start-btn"
          onClick={() => navigate('/setup')}
        >
          Start Practice
        </button>
      </div>

      <div className="history">
        <h2>Practice History</h2>

        <ul>
          <li>Ordering Coffee</li>
          <li>Hotel Check-in</li>
          <li>Job Interview</li>
        </ul>
      </div>
    </div>
  );
}