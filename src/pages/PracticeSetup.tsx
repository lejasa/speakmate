import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  usePracticeStore,
  type ScriptLine,
} from '../store/practiceStore';

import {
  LEARNING_MODES,
  ROLE_PLAY_PLACES,
  ROLE_PLAY_PEOPLE,
  ROLE_PLAY_SITUATIONS,
  TOPICS,
  DESCRIPTION_PLACES,
  DESCRIPTION_PEOPLE,
  MOODS,
  DIFFICULTIES,
} from '../constants/practiceOptions';

import '../styles/practice-setup.css';

export default function PracticeSetup() {
  const navigate = useNavigate();

  const setPractice = usePracticeStore((state) => state.setPractice);
  const setScript = usePracticeStore((state) => state.setScript);

  const [mode, setMode] = useState('');
  const [topic, setTopic] = useState('');
  const [place, setPlace] = useState('');
  const [person, setPerson] = useState('');
  const [mood, setMood] = useState('');
  const [situation, setSituation] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const canGenerate = () => {
    if (!mode || !difficulty) {
      return false;
    }

    if (mode === 'Situation Description') {
      return Boolean(topic && place && person && mood);
    }

    if (mode === 'Role Play') {
      return Boolean(place && person && situation);
    }

    return true;
  };

  const estimatedTime =
    difficulty === 'Beginner'
      ? '30 sec'
      : difficulty === 'Intermediate'
        ? '45 sec'
        : difficulty === 'Advanced'
          ? '60–90 sec'
          : '—';

  const handleGenerate = () => {
    if (!canGenerate()) {
      alert('Please complete all required selections.');
      return;
    }

    const mockScript: ScriptLine[] = [
      {
        id: 1,
        speaker: 'AI',
        english: 'Hello, welcome to our cafe.',
        korean: '안녕하세요. 카페에 오신 것을 환영합니다.',
      },
      {
        id: 2,
        speaker: 'User',
        english: 'I would like a cup of coffee.',
        korean: '커피 한 잔 주세요.',
      },
      {
        id: 3,
        speaker: 'AI',
        english: 'Sure. What would you like?',
        korean: '물론입니다. 무엇을 드릴까요?',
      },
      {
        id: 4,
        speaker: 'User',
        english: 'I will have a latte please.',
        korean: '라떼 하나 주세요.',
      },
      {
        id: 5,
        speaker: 'AI',
        english: 'That will be five dollars.',
        korean: '5달러입니다.',
      },
    ];

    setPractice({
      mode,
      topic,
      place,
      person,
      mood,
      situation,
      difficulty,
    });

    setScript(mockScript);

    navigate('/session');
  };

  const renderOptionGroup = (
    title: string,
    options: string[],
    selected: string,
    setSelected: (value: string) => void
  ) => (
    <div className="field-group">
      <h2>{title}</h2>

      <div className="option-grid">
        {options.map((option) => (
          <button
            type="button"
            key={option}
            className={`option-card ${selected === option ? 'selected' : ''}`}
            onClick={() => setSelected(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="page-shell setup-page">
      <section className="page-card">
        <div className="section-header">
          <div>
            <span className="eyebrow">Build your practice</span>
            <h1 className="page-title">Speak</h1>
            <p className="page-subtitle">Pick a mode, set the scene, and start speaking.</p>
          </div>
        </div>

        <div className="selection-stack">
          {renderOptionGroup('Learning Mode', LEARNING_MODES, mode, setMode)}

          {mode === 'Situation Description' && (
            <>
              {renderOptionGroup('Topic', TOPICS, topic, setTopic)}
              {renderOptionGroup('Where?', DESCRIPTION_PLACES, place, setPlace)}
              {renderOptionGroup('Who?', DESCRIPTION_PEOPLE, person, setPerson)}
              {renderOptionGroup('Mood', MOODS, mood, setMood)}
            </>
          )}

          {mode === 'Role Play' && (
            <>
              {renderOptionGroup('Where?', ROLE_PLAY_PLACES, place, setPlace)}
              {renderOptionGroup('Who?', ROLE_PLAY_PEOPLE, person, setPerson)}
              {renderOptionGroup('Situation', ROLE_PLAY_SITUATIONS, situation, setSituation)}
            </>
          )}

          {renderOptionGroup('Difficulty', DIFFICULTIES, difficulty, setDifficulty)}
        </div>

        <div className="time-card">
          <div className="section-header">
            <h2>Estimated speaking time</h2>
            <span className="muted">{estimatedTime}</span>
          </div>

          <div className="time-list">
            <div className="time-pill">
              <span>Beginner</span>
              <strong>30 sec</strong>
            </div>
            <div className="time-pill">
              <span>Intermediate</span>
              <strong>45 sec</strong>
            </div>
            <div className="time-pill">
              <span>Advanced</span>
              <strong>60–90 sec</strong>
            </div>
          </div>
        </div>

        <div className="setup-actions">
          <button
            type="button"
            className="button"
            onClick={handleGenerate}
            disabled={!canGenerate()}
          >
            Generate Practice
          </button>
        </div>
      </section>
    </div>
  );
}