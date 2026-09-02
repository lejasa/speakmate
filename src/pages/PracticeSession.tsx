import { useMemo, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePracticeStore } from '../store/practiceStore';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import '../styles/session.css';

export default function PracticeSession() {
  const navigate = useNavigate();

  const script = usePracticeStore((state) => state.script);
  const mode = usePracticeStore((state) => state.mode);
  const difficulty = usePracticeStore((state) => state.difficulty);
  const addRecording = usePracticeStore((state) => state.addRecording);
  const getRecording = usePracticeStore((state) => state.getRecording);

  const [activeIndex, setActiveIndex] = useState(0);
  const [playMode, setPlayMode] = useState<'ai' | 'user'>('ai'); // ai = 원어민 음성, user = 내 목소리
  const [pendingRecordingLineId, setPendingRecordingLineId] = useState<number | null>(null);

  const recorder = useAudioRecorder();
  const tts = useSpeechSynthesis();

  // 현재 선택된 문장
  const selectedLine = useMemo(() => {
    if (!script || script.length === 0) {
      return null;
    }
    return script[Math.min(activeIndex, script.length - 1)];
  }, [activeIndex, script]);

  // 현재 문장의 녹음 데이터
  const currentRecording = useMemo(() => {
    if (!selectedLine) return null;
    return getRecording(selectedLine.id);
  }, [selectedLine, getRecording]);

  // 음성 재생 핸들러 (문장 단위)
  const handlePlaySentence = () => {
    if (!selectedLine) return;

    if (playMode === 'ai') {
      // 원어민 음성 재생
      if (tts.isPlaying) {
        tts.stop();
      } else {
        tts.speak(selectedLine.english);
      }
    } else {
      // 내 목소리 재생
      if (currentRecording) {
        const audio = new Audio(currentRecording.audioURL);
        if (recorder.isPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
      }
    }
  };

  // 전체 음성 재생 핸들러
  const handlePlayAll = () => {
    if (!script || script.length === 0) return;

    if (playMode === 'ai') {
      // 전체 원어민 음성
      const fullText = script.map((line) => line.english).join(' ');
      if (tts.isPlaying) {
        tts.stop();
      } else {
        tts.speak(fullText);
      }
    } else {
      // 모든 녹음 순서대로 재생 (기본 구현)
      console.log('전체 녹음 재생 기능');
    }
  };

  // 녹음 시작/중지 핸들러
  const handleRecordToggle = () => {
    if (!selectedLine) return;

    if (recorder.isRecording) {
      recorder.stopRecording();
    } else {
      // Keep the target line until MediaRecorder finishes creating the audio URL.
      setPendingRecordingLineId(selectedLine.id);
      recorder.clearRecording();
      recorder.startRecording();
    }
  };

  // 녹음 저장
  useEffect(() => {
    if (
      !recorder.isRecording &&
      recorder.audioURL &&
      pendingRecordingLineId !== null
    ) {
      addRecording({
        lineId: pendingRecordingLineId,
        audioURL: recorder.audioURL,
        duration: recorder.duration,
        timestamp: Date.now(),
      });
      setPendingRecordingLineId(null);
    }
  }, [recorder.isRecording, recorder.audioURL, pendingRecordingLineId, addRecording]);

  if (!script || script.length === 0) {
    return (
      <div className="page-shell session-page">
        <section className="page-card empty-state">
          <h1 className="page-title">Practice Session</h1>
          <p className="page-subtitle">
            No script found. Please generate a practice session first.
          </p>
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
            <p className="page-subtitle">
              Stay calm, speak clearly, and focus on your flow.
            </p>
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

              {currentRecording && (
                <div className="recording-indicator">
                  ✓ Recorded ({currentRecording.duration}s)
                </div>
              )}
            </div>
          )}
        </div>

        {/* 플레이 모드 토글 */}
        <div className="play-mode-toggle">
          <button
            type="button"
            className={`toggle-btn ${playMode === 'ai' ? 'active' : ''}`}
            onClick={() => setPlayMode('ai')}
          >
            🔊 AI Voice
          </button>
          <button
            type="button"
            className={`toggle-btn ${playMode === 'user' ? 'active' : ''}`}
            onClick={() => setPlayMode('user')}
          >
            🎙️ My Voice
          </button>
        </div>

        {/* 컨트롤 버튼들 */}
        <div className="control-group">
          <button
            type="button"
            className={`control-button listen ${tts.isPlaying ? 'playing' : ''}`}
            onClick={handlePlaySentence}
            title={playMode === 'ai' ? 'Play native pronunciation' : 'Play your recording'}
            aria-label="Play sentence"
          >
            {playMode === 'ai' ? '🔊' : '🎧'}
          </button>
          <button
            type="button"
            className="control-button secondary"
            onClick={handlePlayAll}
            title="Play all sentences"
            aria-label="Play all"
          >
            ▶▶
          </button>
        </div>
      </section>

      <div className="session-action-bar" aria-label="Practice controls">
        <button
          type="button"
          className={`record-button ${recorder.isRecording ? 'recording' : ''}`}
          onClick={handleRecordToggle}
          title={recorder.isRecording ? 'Stop recording' : 'Start recording'}
          aria-label="Record"
        >
          <div className={`record-dot ${recorder.isRecording ? 'active' : ''}`} />
          {recorder.isRecording && (
            <span className="recording-time">{recorder.duration}s</span>
          )}
        </button>

        {currentRecording && (
          <button
            type="button"
            className="control-button playback"
            onClick={() => {
              const audio = new Audio(currentRecording.audioURL);
              audio.play();
            }}
            title="Play your recording"
            aria-label="Playback recording"
          >
            ▶
          </button>
        )}

        {currentRecording && (
          <button
            type="button"
            className="control-button delete"
            onClick={() => {
              if (selectedLine) {
                recorder.clearRecording();
              }
            }}
            title="Delete recording"
            aria-label="Delete"
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  );
}