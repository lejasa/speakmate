import { useState, useCallback, useRef } from 'react';

interface SpeechState {
  isPlaying: boolean;
  isSpeaking: boolean;
}

export const useSpeechSynthesis = () => {
  const [state, setState] = useState<SpeechState>({
    isPlaying: false,
    isSpeaking: false,
  });

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string) => {
    // 이전 재생 중지
    if (state.isPlaying) {
      window.speechSynthesis.cancel();
    }

    // 브라우저가 Web Speech API를 지원하는지 확인
    const SpeechSynthesisUtterance =
      window.SpeechSynthesisUtterance || (window as any).webkitSpeechSynthesisUtterance;

    if (!SpeechSynthesisUtterance) {
      alert('이 브라우저는 음성 재생을 지원하지 않습니다.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // 영어로 설정
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setState((prev) => ({
        ...prev,
        isPlaying: true,
        isSpeaking: true,
      }));
    };

    utterance.onend = () => {
      setState((prev) => ({
        ...prev,
        isPlaying: false,
        isSpeaking: false,
      }));
    };

    utterance.onerror = () => {
      setState((prev) => ({
        ...prev,
        isPlaying: false,
        isSpeaking: false,
      }));
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [state.isPlaying]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setState((prev) => ({
      ...prev,
      isPlaying: false,
      isSpeaking: false,
    }));
  }, []);

  return {
    ...state,
    speak,
    stop,
  };
};
