import { create } from 'zustand';

export interface ScriptLine {
  id: number;
  speaker: 'AI' | 'User';
  english: string;
  korean: string;
}

export interface RecordingData {
  lineId: number;
  audioURL: string;
  duration: number;
  timestamp: number;
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
  recordings: RecordingData[];

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
  addRecording: (recording: RecordingData) => void;
  removeRecording: (lineId: number) => void;
  getRecording: (lineId: number) => RecordingData | undefined;
}

export const usePracticeStore = create<PracticeState>((set, get) => ({
  mode: '',
  topic: '',
  place: '',
  person: '',
  mood: '',
  situation: '',
  difficulty: '',

  script: [],
  recordings: [],

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

  addRecording: (recording) =>
    set((state) => {
      // 같은 lineId의 기존 녹음 제거
      const filteredRecordings = state.recordings.filter(
        (r) => r.lineId !== recording.lineId
      );
      return {
        recordings: [...filteredRecordings, recording],
      };
    }),

  removeRecording: (lineId) =>
    set((state) => ({
      recordings: state.recordings.filter((r) => r.lineId !== lineId),
    })),

  getRecording: (lineId) => {
    const state = get();
    return state.recordings.find((r) => r.lineId === lineId);
  },
}));