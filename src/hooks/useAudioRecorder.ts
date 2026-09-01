import { useState, useRef, useCallback } from 'react';

interface AudioRecorderState {
  isRecording: boolean;
  isPlaying: boolean;
  audioURL: string | null;
  duration: number;
}

export const useAudioRecorder = () => {
  const [state, setState] = useState<AudioRecorderState>({
    isRecording: false,
    isPlaying: false,
    audioURL: null,
    duration: 0,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const startTimeRef = useRef<number>(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 녹음 시작
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      startTimeRef.current = Date.now();

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioURL = URL.createObjectURL(audioBlob);
        setState((prev) => ({
          ...prev,
          isRecording: false,
          audioURL,
        }));

        // 스트림 종료
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setState((prev) => ({
        ...prev,
        isRecording: true,
        duration: 0,
      }));

      // 타이머 시작
      timerIntervalRef.current = setInterval(() => {
        setState((prev) => ({
          ...prev,
          duration: Math.floor((Date.now() - startTimeRef.current) / 1000),
        }));
      }, 100);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('마이크 접근 권한이 필요합니다.');
    }
  }, []);

  // 녹음 중지
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording) {
      mediaRecorderRef.current.stop();
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
  }, [state.isRecording]);

  // 음성 재생
  const playRecording = useCallback(() => {
    if (state.audioURL) {
      if (!audioElementRef.current) {
        audioElementRef.current = new Audio(state.audioURL);
      }

      if (state.isPlaying) {
        audioElementRef.current.pause();
        setState((prev) => ({
          ...prev,
          isPlaying: false,
        }));
      } else {
        audioElementRef.current.play();
        setState((prev) => ({
          ...prev,
          isPlaying: true,
        }));

        audioElementRef.current.onended = () => {
          setState((prev) => ({
            ...prev,
            isPlaying: false,
          }));
        };
      }
    }
  }, [state.audioURL, state.isPlaying]);

  // 녹음 초기화
  const clearRecording = useCallback(() => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setState({
      isRecording: false,
      isPlaying: false,
      audioURL: null,
      duration: 0,
    });
  }, []);

  return {
    ...state,
    startRecording,
    stopRecording,
    playRecording,
    clearRecording,
  };
};
