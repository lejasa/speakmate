import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import '../styles/opic.css';

type QuestionType =
  | '묘사'
  | '습관 / 루틴'
  | '과거 경험'
  | '비교 / 변화'
  | '의견'
  | '롤플레이';

interface ListeningQuestion {
  id: number;
  day: string;
  topic: string;
  english: string;
  korean: string;
  type: QuestionType;
  coreStory: string;
  keywords: string[];
}

const QUESTION_TYPES: QuestionType[] = [
  '묘사',
  '습관 / 루틴',
  '과거 경험',
  '비교 / 변화',
  '의견',
  '롤플레이',
];

const TOPICS = ['자기소개', '운동', '영화', '음악', '콘서트', '카페', '여행', 'USJ', '돌발 / 교통'];

const QUESTIONS: ListeningQuestion[] = [
  { id: 1, day: 'DAY 1', topic: '자기소개', english: 'Tell me about yourself.', korean: '자기소개를 해주세요.', type: '묘사', coreStory: 'Self Introduction', keywords: ['yourself'] },
  { id: 2, day: 'DAY 1', topic: '자유 시간', english: 'What do you usually do in your free time?', korean: '여가 시간에 보통 무엇을 하나요?', type: '습관 / 루틴', coreStory: 'Free Time Routine', keywords: ['usually', 'free time'] },
  { id: 3, day: 'DAY 2', topic: '운동', english: 'Tell me about a memorable experience you had while walking or jogging.', korean: '걷거나 조깅하면서 있었던 기억에 남는 경험을 말해주세요.', type: '과거 경험', coreStory: 'Jogging Story', keywords: ['memorable', 'experience', 'walking / jogging'] },
  { id: 4, day: 'DAY 2', topic: '운동', english: 'How has your exercise routine changed over time?', korean: '시간이 지나면서 운동 습관이 어떻게 바뀌었나요?', type: '비교 / 변화', coreStory: 'Exercise: Past → Now', keywords: ['changed', 'over time'] },
  { id: 5, day: 'DAY 3', topic: '영화', english: 'What kinds of movies do you like?', korean: '어떤 종류의 영화를 좋아하나요?', type: '의견', coreStory: 'Movie Habit', keywords: ['kinds of movies'] },
  { id: 6, day: 'DAY 3', topic: '영화', english: 'Tell me about a movie you remember well.', korean: '기억에 잘 남는 영화에 대해 말해주세요.', type: '과거 경험', coreStory: 'Moneyball Story', keywords: ['remember well', 'movie'] },
  { id: 7, day: 'DAY 3', topic: '음악', english: 'What kind of music do you usually listen to?', korean: '보통 어떤 음악을 듣나요?', type: '습관 / 루틴', coreStory: 'Coldplay Music', keywords: ['what kind', 'usually'] },
  { id: 8, day: 'DAY 3', topic: '콘서트', english: 'Tell me about a concert you remember well.', korean: '기억에 잘 남는 콘서트에 대해 이야기해주세요.', type: '과거 경험', coreStory: 'Coldplay Concert', keywords: ['concert', 'remember well'] },
  { id: 9, day: 'DAY 4', topic: '카페', english: 'What do you normally do when you go to a cafe?', korean: '카페에 가면 보통 무엇을 하나요?', type: '습관 / 루틴', coreStory: 'Cafe Routine', keywords: ['normally', 'cafe'] },
  { id: 10, day: 'DAY 4', topic: '카페', english: 'Tell me about a memorable experience you had at a cafe.', korean: '카페에서 있었던 기억에 남는 경험을 말해주세요.', type: '과거 경험', coreStory: 'Shake Drink Accident', keywords: ['memorable', 'cafe'] },
  { id: 11, day: 'DAY 5', topic: '여행', english: 'Tell me about a memorable overseas trip.', korean: '기억에 남는 해외여행에 대해 이야기해주세요.', type: '과거 경험', coreStory: 'Osaka Trip', keywords: ['memorable', 'overseas trip'] },
  { id: 12, day: 'DAY 5', topic: 'USJ', english: 'What did you do while you were there?', korean: '그곳에 있는 동안 무엇을 했나요?', type: '과거 경험', coreStory: 'USJ Experience', keywords: ['what did you do', 'there'] },
  { id: 13, day: 'DAY 5', topic: '여행', english: 'How was Osaka different from your hometown?', korean: '오사카는 고향과 어떻게 달랐나요?', type: '비교 / 변화', coreStory: 'Osaka vs. Hometown', keywords: ['different', 'hometown'] },
  { id: 14, day: 'DAY 6', topic: '카페 롤플레이', english: 'You want to visit a cafe. Call the cafe and ask three or four questions.', korean: '카페에 가려고 합니다. 카페에 전화해서 3~4가지 질문을 하세요.', type: '롤플레이', coreStory: 'Role Play Inquiry', keywords: ['call', 'ask', 'three or four questions'] },
  { id: 15, day: 'DAY 6', topic: '문제 해결', english: 'Something went wrong with your reservation. Call the place, explain what happened, and suggest some alternatives.', korean: '예약에 문제가 생겼습니다. 전화해서 상황을 설명하고 대안을 제시하세요.', type: '롤플레이', coreStory: 'Role Play Problem Solving', keywords: ['problem', 'explain', 'alternatives'] },
];

export default function OPicListening() {
  const navigate = useNavigate();
  const tts = useSpeechSynthesis();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [listened, setListened] = useState(false);
  const [selectedType, setSelectedType] = useState<QuestionType | ''>('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [revealStep, setRevealStep] = useState(0);

  const question = useMemo(() => QUESTIONS[questionIndex], [questionIndex]);

  const resetQuestion = (nextIndex: number) => {
    tts.stop();
    setQuestionIndex(nextIndex);
    setListened(false);
    setSelectedType('');
    setSelectedTopic('');
    setRevealStep(0);
  };

  const listen = () => {
    setListened(true);
    tts.speak(question.english);
  };

  const canRevealEnglish = selectedType !== '' && selectedTopic !== '';

  return (
    <div className="page-shell opic-page">
      <section className="opic-hero">
        <div className="hero-content">
          <span className="eyebrow">Listening Support · Beginner → AL</span>
          <h1>질문 듣기 훈련</h1>
          <p>핵심 단어를 듣고 질문 유형과 Core Story를 빠르게 연결해보세요.</p>
        </div>
      </section>

      <section className="page-card">
        <div className="section-header">
          <div>
            <span className="eyebrow">{question.day} · {questionIndex + 1} / {QUESTIONS.length}</span>
            <h2>화면을 보지 않고 먼저 들어보세요</h2>
            <p>목표: 문장 전체 해석보다 <strong>유형 + 주제 + 핵심 단어</strong>를 잡는 것입니다.</p>
          </div>
        </div>

        <div className="listening-practice-card">
          <div className="listening-lock">
            {!listened && <><span className="listening-lock-icon">🔒</span><strong>질문은 아직 공개되지 않았어요</strong><span>아래 버튼을 누르고 한 번만 들어보세요.</span></>}
            {listened && <><span className="listening-lock-icon">👂</span><strong>무슨 질문인지 판단해보세요</strong><span>들린 단어를 바탕으로 유형과 주제를 선택하세요.</span></>}
          </div>
          <button type="button" className="button" onClick={listen}>
            {tts.isPlaying ? '⏸ 듣기 중지' : listened ? '🔊 다시 듣기' : '🔊 질문 듣기'}
          </button>
          <div className="listening-keywords">
            {listened ? '힌트: 핵심 단어를 떠올린 뒤 아래에서 선택하세요.' : '질문 듣기 전에는 영어 원문과 뜻을 숨깁니다.'}
          </div>
        </div>

        {listened && (
          <div className="listening-step">
            <h3>1. 질문 유형을 선택하세요</h3>
            <div className="option-grid">
              {QUESTION_TYPES.map((type) => (
                <button type="button" key={type} className={`option-card ${selectedType === type ? 'selected' : ''}`} onClick={() => { setSelectedType(type); setRevealStep(Math.max(revealStep, 1)); }}>{type}</button>
              ))}
            </div>
            <p className="listening-feedback">{selectedType ? `선택: ${selectedType}` : '예: memorable → 과거 경험, call / ask → 롤플레이'}</p>
          </div>
        )}

        {listened && selectedType && (
          <div className="listening-step">
            <h3>2. 주제를 선택하세요</h3>
            <div className="option-grid">
              {TOPICS.map((topic) => (
                <button type="button" key={topic} className={`option-card ${selectedTopic === topic ? 'selected' : ''}`} onClick={() => { setSelectedTopic(topic); setRevealStep(Math.max(revealStep, 2)); }}>{topic}</button>
              ))}
            </div>
            <p className="listening-feedback">{selectedTopic ? `선택: ${selectedTopic}` : '예: memorable + cafe → 카페 경험'}</p>
          </div>
        )}

        {listened && canRevealEnglish && revealStep >= 2 && (
          <div className="listening-reveal">
            <button type="button" className="button button-block" onClick={() => setRevealStep(3)}>
              📖 영어 원문 공개
            </button>
          </div>
        )}

        {revealStep >= 3 && (
          <div className="listening-reveal revealed">
            <h3>영어 원문</h3>
            <p className="revealed-english">{question.english}</p>
            <button type="button" className="button button-block" onClick={() => setRevealStep(4)}>
              🇰🇷 한국어 뜻 공개
            </button>
          </div>
        )}

        {revealStep >= 4 && (
          <div className="listening-reveal revealed">
            <h3>한국어 뜻</h3>
            <p>{question.korean}</p>
            <button type="button" className="button button-block" onClick={() => setRevealStep(5)}>
              🧠 연결할 Core Story 공개
            </button>
          </div>
        )}

        {revealStep >= 5 && (
          <div className="listening-reveal core-story">
            <h3>🧠 연결할 Core Story</h3>
            <strong>{question.coreStory}</strong>
            <p className="listening-feedback">핵심 단어: {question.keywords.join(' · ')}</p>
            <p className="story-connection">이 질문은 <b>{question.type}</b> 유형 · <b>{question.topic}</b> 주제로 연결됩니다.</p>
          </div>
        )}

        <div className="listening-navigation">
          <button type="button" className="nav-btn" disabled={questionIndex === 0} onClick={() => resetQuestion(questionIndex - 1)}>← 이전 질문</button>
          <button type="button" className="nav-btn next-btn" onClick={() => resetQuestion((questionIndex + 1) % QUESTIONS.length)}>다음 질문 →</button>
        </div>
      </section>

      <section className="page-card opic-guide">
        <h3>🎯 훈련 순서</h3>
        <div className="guide-steps">
          <div className="guide-step"><span className="step-number">1</span><span className="step-text">🔊 질문을 한 번 듣고 핵심 단어를 잡습니다.</span></div>
          <div className="guide-step"><span className="step-number">2</span><span className="step-text">🧩 질문 유형과 주제를 선택합니다.</span></div>
          <div className="guide-step"><span className="step-number">3</span><span className="step-text">📖 영어 원문 → 한국어 뜻 → Core Story 순서로 확인합니다.</span></div>
        </div>
      </section>
    </div>
  );
}
