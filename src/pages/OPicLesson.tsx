import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { usePracticeStore } from '../store/practiceStore';
import { ALL_LESSONS, LessonContent } from '../constants/opicContent';
import '../styles/opic-lesson.css';

export default function OPicLesson() {
  const navigate = useNavigate();
  const { dayId } = useParams<{ dayId: string }>();

  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [scriptMode, setScriptMode] = useState<'explanation' | 'script' | 'full-view'>('explanation');
  const [selectedSentenceId, setSelectedSentenceId] = useState<number | null>(null);
  const [pendingRecordingSentenceId, setPendingRecordingSentenceId] = useState<number | null>(null);

  const recorder = useAudioRecorder();
  const tts = useSpeechSynthesis();
  const addRecording = usePracticeStore((state) => state.addRecording);
  const getRecording = usePracticeStore((state) => state.getRecording);

  // URL에서 day와 lesson 인덱스 파싱
  useEffect(() => {
    if (dayId) {
      const [dayNum, lessonNum] = dayId.split('-').map(Number);
      setCurrentDayIndex(dayNum - 1);
      setCurrentLessonIndex(lessonNum - 1);
    }
  }, [dayId]);

  const currentDay = ALL_LESSONS[currentDayIndex];
  if (!currentDay) {
    return (
      <div className="page-shell">
        <section className="page-card empty-state">
          <h1 className="page-title">OPIc Course</h1>
          <p className="page-subtitle">코스를 찾을 수 없습니다.</p>
          <button className="button" onClick={() => navigate('/opic')}>
            돌아가기
          </button>
        </section>
      </div>
    );
  }

  const currentLesson = currentDay.lessons[currentLessonIndex];
  if (!currentLesson) {
    return (
      <div className="page-shell">
        <section className="page-card empty-state">
          <h1 className="page-title">OPIc Course</h1>
          <p className="page-subtitle">수업을 찾을 수 없습니다.</p>
          <button className="button" onClick={() => navigate('/opic')}>
            돌아가기
          </button>
        </section>
      </div>
    );
  }

  const selectedSentence = currentLesson.completedScript.sentences.find(
    (s) => s.id === selectedSentenceId
  );
  const currentRecording = selectedSentenceId
    ? getRecording(selectedSentenceId)
    : null;

  // 전체 스크립트 텍스트
  const fullScriptEnglish = currentLesson.completedScript.sentences
    .map((s) => s.english)
    .join(' ');

  // 문장별 음성 재생
  const handlePlaySentence = (sentenceId: number) => {
    const sentence = currentLesson.completedScript.sentences.find(
      (s) => s.id === sentenceId
    );
    if (sentence && !tts.isPlaying) {
      tts.speak(sentence.english);
    } else if (tts.isPlaying) {
      tts.stop();
    }
  };

  // 전체 스크립트 음성 재생
  const handlePlayAllScript = () => {
    if (tts.isPlaying) {
      tts.stop();
    } else {
      tts.speak(fullScriptEnglish);
    }
  };

  // 문장 녹음
  const handleRecordSentence = (sentenceId: number) => {
    if (recorder.isRecording) {
      recorder.stopRecording();
      return;
    }

    // Remember the target before async recording setup completes.
    setSelectedSentenceId(sentenceId);
    setPendingRecordingSentenceId(sentenceId);
    recorder.clearRecording();
    recorder.startRecording();
  };

  // 녹음 저장
  useEffect(() => {
    if (
      !recorder.isRecording &&
      recorder.audioURL &&
      pendingRecordingSentenceId !== null
    ) {
      addRecording({
        lineId: pendingRecordingSentenceId,
        audioURL: recorder.audioURL,
        duration: recorder.duration,
        timestamp: Date.now(),
      });
      setPendingRecordingSentenceId(null);
    }
  }, [recorder.isRecording, recorder.audioURL, pendingRecordingSentenceId, addRecording]);

  const handleNextLesson = () => {
    if (currentLessonIndex < currentDay.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setSelectedSentenceId(null);
    } else if (currentDayIndex < ALL_LESSONS.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
      setCurrentLessonIndex(0);
      setSelectedSentenceId(null);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setSelectedSentenceId(null);
    } else if (currentDayIndex > 0) {
      const prevDay = ALL_LESSONS[currentDayIndex - 1];
      setCurrentDayIndex(currentDayIndex - 1);
      setCurrentLessonIndex(prevDay.lessons.length - 1);
      setSelectedSentenceId(null);
    }
  };

  return (
    <div className="page-shell opic-lesson-page">
      {/* 헤더 */}
      <section className="opic-header">
        <button className="back-btn" onClick={() => navigate('/opic')}>
          ← 뒤로
        </button>
        <div className="breadcrumb">
          <span className="day-badge">DAY {currentDay.dayNumber}</span>
          <span className="lesson-title">{currentLesson.title}</span>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <section className="opic-content">
        {/* 탭 버튼 */}
        <div className="opic-tabs">
          <button
            className={`tab-btn ${scriptMode === 'explanation' ? 'active' : ''}`}
            onClick={() => setScriptMode('explanation')}
          >
            📚 학습
          </button>
          <button
            className={`tab-btn ${scriptMode === 'script' ? 'active' : ''}`}
            onClick={() => setScriptMode('script')}
          >
            🎙️ 스크립트
          </button>
          <button
            className={`tab-btn ${scriptMode === 'full-view' ? 'active' : ''}`}
            onClick={() => setScriptMode('full-view')}
          >
            📖 전체 보기
          </button>
        </div>

        {/* 학습 모드 */}
        {scriptMode === 'explanation' && (
          <div className="explanation-section">
            {/* 목표 */}
            <div className="lesson-section">
              <h3 className="section-title">🎯 학습 목표</h3>
              <ul className="goal-list">
                {currentLesson.goal.map((goal, idx) => (
                  <li key={idx}>{goal}</li>
                ))}
              </ul>
            </div>

            {/* 예상 질문 */}
            <div className="lesson-section">
              <h3 className="section-title">❓ 예상 질문</h3>
              <div className="question-box">
                {currentLesson.completedScript.title}
              </div>
            </div>

            {/* 답변 전략 */}
            <div className="lesson-section">
              <h3 className="section-title">💡 답변 전략</h3>
              <div className="strategy-flow">
                {currentLesson.strategy.map((item, idx) => (
                  <div key={idx} className="strategy-item">
                    <span className="strategy-number">{idx + 1}</span>
                    <span className="strategy-text">{item}</span>
                    {idx < currentLesson.strategy.length - 1 && (
                      <span className="strategy-arrow">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 핵심 표현 */}
            <div className="lesson-section">
              <h3 className="section-title">🔑 핵심 표현</h3>
              <div className="expressions-list">
                {currentLesson.coreExpressions.map((expr, idx) => (
                  <div key={idx} className="expression-item">
                    <div className="expression-header">
                      <span className="expression-text">{expr.expression}</span>
                    </div>
                    <div className="expression-meaning">{expr.meaning}</div>
                    {expr.example && (
                      <div className="expression-example">
                        예: {expr.example}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 키워드 */}
            <div className="lesson-section">
              <h3 className="section-title">📝 기억할 키워드</h3>
              <div className="keywords-grid">
                {currentLesson.keywords.map((keyword, idx) => (
                  <span key={idx} className="keyword-badge">
                    {keyword.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 스크립트 모드 */}
        {scriptMode === 'script' && (
          <div className="script-section">
            {/* 스크립트 헤더 */}
            <div className="script-header">
              <h3 className="script-question">{currentLesson.completedScript.title}</h3>
              <button
                className={`play-all-btn ${tts.isPlaying ? 'playing' : ''}`}
                onClick={handlePlayAllScript}
                title="전체 스크립트 재생"
              >
                {tts.isPlaying ? '⏸ 중지' : '▶ 전체 재생'}
              </button>
            </div>

            {/* 스크립트 문장들 */}
            <div className="sentences-container">
              {currentLesson.completedScript.sentences.map((sentence, idx) => {
                const sentenceRecording = getRecording(sentence.id);
                const isSelected = selectedSentenceId === sentence.id;

                return (
                  <div
                    key={sentence.id}
                    className={`sentence-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedSentenceId(sentence.id)}
                  >
                    {/* 문장 번호 */}
                    <div className="sentence-number">{idx + 1}</div>

                    {/* 문장 콘텐츠 */}
                    <div className="sentence-content">
                      <p className="sentence-english">{sentence.english}</p>
                      <p className="sentence-korean">{sentence.korean}</p>
                    </div>

                    {/* 콘트롤 버튼 */}
                    <div className="sentence-controls">
                      <button
                        className={`control-btn play-btn ${tts.isPlaying && isSelected ? 'playing' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlaySentence(sentence.id);
                        }}
                        title="원어민 발음 듣기"
                      >
                        🔊
                      </button>

                      <button
                        className={`control-btn record-btn ${recorder.isRecording && isSelected ? 'recording' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRecordSentence(sentence.id);
                        }}
                        title={
                          recorder.isRecording && isSelected
                            ? '녹음 중지'
                            : '목소리 녹음'
                        }
                      >
                        {recorder.isRecording && isSelected ? '⏹' : '🎙️'}
                      </button>

                      {sentenceRecording && (
                        <button
                          className="control-btn playback-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            const audio = new Audio(sentenceRecording.audioURL);
                            audio.play();
                          }}
                          title="녹음 재생"
                        >
                          ▶
                        </button>
                      )}
                    </div>

                    {/* 녹음 상태 표시 */}
                    {sentenceRecording && (
                      <div className="recording-badge">
                        ✓ {sentenceRecording.duration}s
                      </div>
                    )}

                    {recorder.isRecording && isSelected && (
                      <div className="recording-timer">
                        {recorder.duration}s
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 전체 보기 모드 */}
        {scriptMode === 'full-view' && (
          <div className="full-view-section">
            {/* 전체 스크립트 헤더 */}
            <div className="full-view-header">
              <h3>{currentLesson.completedScript.title}</h3>
              <button
                className={`play-all-btn ${tts.isPlaying ? 'playing' : ''}`}
                onClick={handlePlayAllScript}
              >
                {tts.isPlaying ? '⏸ 중지' : '▶ 전체 재생'}
              </button>
            </div>

            {/* 전체 스크립트 표시 */}
            <div className="full-script-content">
              {currentLesson.completedScript.sentences.map((sentence, idx) => (
                <div key={sentence.id} className="full-script-line">
                  <div className="line-number">{idx + 1}</div>
                  <div className="line-content">
                    <div className="line-speaker">{sentence.speaker}</div>
                    <div className="line-english">{sentence.english}</div>
                    <div className="line-korean">{sentence.korean}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* 프린트/복사 옵션 */}
            <div className="full-view-actions">
              <button
                className="action-btn"
                onClick={() => {
                  const fullText = currentLesson.completedScript.sentences
                    .map((s) => `${s.speaker}\n${s.english}\n${s.korean}\n`)
                    .join('\n');
                  navigator.clipboard.writeText(fullText);
                  alert('스크립트가 복사되었습니다!');
                }}
              >
                📋 복사
              </button>
              <button className="action-btn" onClick={() => window.print()}>
                🖨️ 프린트
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 네비게이션 버튼 */}
      <div className="lesson-navigation">
        <button
          className="nav-btn prev-btn"
          onClick={handlePrevLesson}
          disabled={currentDayIndex === 0 && currentLessonIndex === 0}
        >
          ← 이전
        </button>

        <span className="lesson-counter">
          {currentDayIndex + 1}-{currentLessonIndex + 1}
        </span>

        <button
          className="nav-btn next-btn"
          onClick={handleNextLesson}
          disabled={
            currentDayIndex === ALL_LESSONS.length - 1 &&
            currentLessonIndex === currentDay.lessons.length - 1
          }
        >
          다음 →
        </button>
      </div>
    </div>
  );
}
