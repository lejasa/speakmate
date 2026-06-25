import { create } from 'zustand';

export interface ScriptLine {
  id: number;
  speaker: 'AI' | 'User';
  english: string;
  korean: string;
}

interface PracticeState {
  mode: string;
  topic: string;
  place: string;
  person: string;
  mood: string;
  situation: string;
  difficulty: string;

  script: ScriptLine[];

  setPractice: (data: {
    mode: string;
    topic: string;
    place: string;
    person: string;
    mood: string;
    situation: string;
    difficulty: string;
  }) => void;

  setScript: (script: ScriptLine[]) => void;
}

export const usePracticeStore = create<PracticeState>((set) => ({
  mode: '',
  topic: '',
  place: '',
  person: '',
  mood: '',
  situation: '',
  difficulty: '',

  script: [],

  setPractice: (data) =>
    set({
      mode: data.mode,
      topic: data.topic,
      place: data.place,
      person: data.person,
      mood: data.mood,
      situation: data.situation,
      difficulty: data.difficulty,
    }),

  setScript: (script) =>
    set({
      script,
    }),
}));