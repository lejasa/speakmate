import { useState, useCallback, useRef, useEffect } from 'react';

interface SpeechState {
  isPlaying: boolean;
  isSpeaking: boolean;
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
      // Prefer a known conversational voice, then en-US, then any English voice.
      return (preferred === -1 ? 100 : preferred) + (isUsEnglish ? 0 : 20);
    };
    return score(a) - score(b);
  })[0];
};

export const useSpeechSynthesis = () => {
  const [state, setState] = useState<SpeechState>({ isPlaying: false, isSpeaking: false });
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  }, []);

  const speak = useCallback((text: string) => {
    // Always cancel the previous utterance before starting a new one.
    window.speechSynthesis.cancel();

    const Utterance =
      window.SpeechSynthesisUtterance ||
      (window as typeof window & { webkitSpeechSynthesisUtterance?: typeof SpeechSynthesisUtterance })
        .webkitSpeechSynthesisUtterance;

    if (!Utterance) {
      alert('이 브라우저는 음성 재생을 지원하지 않습니다.');
      return;
    }

    const utterance = new Utterance(text);
    const voice = getNaturalEnglishVoice(
      voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices(),
    );

    utterance.lang = voice?.lang || 'en-US';
    if (voice) utterance.voice = voice;
    // Slightly slower, conversational pacing sounds more natural for practice.
    utterance.rate = 0.92;
    utterance.pitch = 1.02;
    utterance.volume = 1;

    utterance.onstart = () => setState({ isPlaying: true, isSpeaking: true });
    utterance.onend = () => setState({ isPlaying: false, isSpeaking: false });
    utterance.onerror = () => setState({ isPlaying: false, isSpeaking: false });

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setState({ isPlaying: false, isSpeaking: false });
  }, []);

  return { ...state, speak, stop };
};
