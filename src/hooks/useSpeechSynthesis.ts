import { useState, useCallback, useRef, useEffect } from 'react';

interface SpeechState {
  isPlaying: boolean;
  isSpeaking: boolean;
}

export interface SpeechOptions {
  rate?: number;
  repeat?: number;
}

const getNaturalEnglishVoice = (voices: SpeechSynthesisVoice[]) => {
  const englishVoices = voices.filter((voice) => /^en(?:-|_)/i.test(voice.lang));
  const preferredNames = [
    /aria/i,
    /jenny/i,
    /samantha/i,
    /google us english/i,
    /microsoft.*(zira|aria|guy)/i,
    /alex/i,
  ];

  return [...englishVoices].sort((a, b) => {
    const score = (voice: SpeechSynthesisVoice) => {
      const preferred = preferredNames.findIndex((pattern) => pattern.test(voice.name));
      const isUsEnglish = /^en(?:-|_)us/i.test(voice.lang);
      return (preferred === -1 ? 100 : preferred) + (isUsEnglish ? 0 : 20);
    };
    return score(a) - score(b);
  })[0];
};

export const useSpeechSynthesis = () => {
  const [state, setState] = useState<SpeechState>({ isPlaying: false, isSpeaking: false });
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const requestRef = useRef(0);

  useEffect(() => {
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  }, []);

  const speak = useCallback((text: string, options: SpeechOptions = {}) => {
    const requestId = ++requestRef.current;
    window.speechSynthesis.cancel();

    const Utterance =
      window.SpeechSynthesisUtterance ||
      (window as typeof window & { webkitSpeechSynthesisUtterance?: typeof SpeechSynthesisUtterance })
        .webkitSpeechSynthesisUtterance;

    if (!Utterance) {
      alert('이 브라우저는 음성 재생을 지원하지 않습니다.');
      return;
    }

    const rate = Math.min(2, Math.max(0.65, options.rate ?? 0.92));
    const repeatCount = Math.min(10, Math.max(1, Math.round(options.repeat ?? 1)));
    let completed = 0;
    const voice = getNaturalEnglishVoice(
      voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices(),
    );

    const speakOnce = () => {
      if (requestRef.current !== requestId) return;
      const utterance = new Utterance(text);
      utterance.lang = voice?.lang || 'en-US';
      if (voice) utterance.voice = voice;
      utterance.rate = rate;
      utterance.pitch = 1.02;
      utterance.volume = 1;
      utterance.onstart = () => setState({ isPlaying: true, isSpeaking: true });
      utterance.onend = () => {
        completed += 1;
        if (completed < repeatCount && requestRef.current === requestId) {
          window.setTimeout(speakOnce, 120);
        } else if (requestRef.current === requestId) {
          setState({ isPlaying: false, isSpeaking: false });
        }
      };
      utterance.onerror = () => {
        if (requestRef.current === requestId) setState({ isPlaying: false, isSpeaking: false });
      };
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    };

    speakOnce();
  }, []);

  const stop = useCallback(() => {
    requestRef.current += 1;
    window.speechSynthesis.cancel();
    setState({ isPlaying: false, isSpeaking: false });
  }, []);

  return { ...state, speak, stop };
};
