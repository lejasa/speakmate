import { useNavigate } from 'react-router-dom';
import { ALL_LESSONS } from '../constants/opicContent';
import '../styles/opic.css';

export default function OPic() {
  const navigate = useNavigate();

  return (
    <div className="page-shell opic-page">
      {/* 헤더 */}
      <section className="opic-hero">
        <div className="hero-content">
          <span className="eyebrow">OPIc AL Master Course</span>
          <h1>7-Day Intensive Program</h1>
          <p>기초부터 AL 레벨까지 체계적으로 학습하세요</p>
        </div>
      </section>

      {/* 코스 소개 */}
      <section className="page-card opic-intro">
        <div className="intro-grid">
          <div className="intro-item">
            <span className="intro-icon">🎯</span>
            <h3>학습 목표</h3>
            <p>OPIc AL 달성</p>
          </div>
          <div className="intro-item">
            <span className="intro-icon">📅</span>
            <h3>학습 기간</h3>
            <p>7일 집중 코스</p>
          </div>
          <div className="intro-item">
            <span className="intro-icon">🎤</span>
            <h3>학습 방식</h3>
            <p>스크립트 + 음성 연습</p>
          </div>
          <div className="intro-item">
            <span className="intro-icon">💡</span>
            <h3>핵심 전략</h3>
            <p>구체적이고 자연스러운 표현</p>
          </div>
        </div>
      </section>

      {/* DAY별 레슨 */}
      <section className="page-card opic-lessons">
        <div className="section-header">
          <div>
            <h2>일일 커리큘럼</h2>
            <p>각 DAY를 선택하여 학습을 시작하세요</p>
          </div>
        </div>

        <div className="days-grid">
          {ALL_LESSONS.map((day) => (
            <div key={day.dayNumber} className="day-card">
              <div className="day-number">DAY {day.dayNumber}</div>
              <h3 className="day-theme">{day.theme}</h3>

              <div className="lessons-list">
                {day.lessons.map((lesson, idx) => (
                  <div
                    key={lesson.id}
                    className="lesson-item"
                    onClick={() =>
                      navigate(
                        `/opic/lesson/${day.dayNumber}-${idx + 1}`
                      )
                    }
                  >
                    <span className="lesson-number">{idx + 1}</span>
                    <span className="lesson-name">{lesson.title}</span>
                    <span className="lesson-arrow">→</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 학습 안내 */}
      <section className="page-card opic-guide">
        <h3>📖 학습 방법</h3>
        <div className="guide-steps">
          <div className="guide-step">
            <span className="step-number">1</span>
            <span className="step-text">📚 학습 탭에서 목표, 전략, 핵심 표현을 학습합니다</span>
          </div>
          <div className="guide-step">
            <span className="step-number">2</span>
            <span className="step-text">🎙️ 스크립트 탭에서 완성 스크립트를 확인합니다</span>
          </div>
          <div className="guide-step">
            <span className="step-number">3</span>
            <span className="step-text">🔊 각 문장의 원어민 발음을 듣고 따라합니다</span>
          </div>
          <div className="guide-step">
            <span className="step-number">4</span>
            <span className="step-text">🎤 문장을 녹음하고 자신의 발음을 확인합니다</span>
          </div>
          <div className="guide-step">
            <span className="step-number">5</span>
            <span className="step-text">✅ 키워드만 보고 답변을 즉흥적으로 말합니다</span>
          </div>
        </div>
      </section>

      {/* 핵심 가이드 */}
      <section className="page-card opic-tips">
        <h3>💡 학습 팁</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <h4>✓ 문장 암기하지 않기</h4>
            <p>스크립트의 의미와 흐름을 이해하세요</p>
          </div>
          <div className="tip-card">
            <h4>✓ 핵심 표현 활용</h4>
            <p>제시된 표현을 다양한 상황에 응용하세요</p>
          </div>
          <div className="tip-card">
            <h4>✓ 키워드 연습</h4>
            <p>키워드만 보고 자신의 영어로 말하세요</p>
          </div>
          <div className="tip-card">
            <h4>✓ 반복 연습</h4>
            <p>음성 재생과 녹음을 반복해서 실력을 높이세요</p>
          </div>
        </div>
      </section>
    </div>
  );
}
