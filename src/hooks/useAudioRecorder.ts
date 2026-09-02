import { useState, useRef, useCallback, useEffect } from 'react';

interface AudioRecorderState {
  isRecording: boolean;
  isPlaying: boolean;
  audioURL: string | null;
  duration: number;
}

const RECORDING_MIME_TYPES = [
  'audio/mp4',
  'audio/webm;codecs=opus',
  'audio/webm',
  'audio/ogg;codecs=opus',
];

const getSupportedMimeType = () => {
  if (typeof MediaRecorder === 'undefined') return '';
  return RECORDING_MIME_TYPES.find((type) => MediaRecorder.isTypeSupported(type)) || '';
};

export const useAudioRecorder = () => {
  const [state, setState] = useState<AudioRecorderState>({
    isRecording: false,
    isPlaying: false,
    audioURL: null,
    duration: 0,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const startTimeRef = useRef<number>(0);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recordingMimeTypeRef = useRef('');

  // 녹음 시작
  const startRecording = useCallback(async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
        alert('이 브라우저에서는 음성 녹음을 지원하지 않습니다.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      startTimeRef.current = Date.now();

      const mimeType = getSupportedMimeType();
      const mediaRecorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
      recordingMimeTypeRef.current = mediaRecorder.mimeType || mimeType;
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: recordingMimeTypeRef.current || 'audio/mp4',
        });
        const audioURL = URL.createObjectURL(audioBlob);
        setState((prev) => ({
          ...prev,
          isRecording: false,
          audioURL,
        }));

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setState((prev) => ({
        ...prev,
        isRecording: true,
        isPlaying: false,
        duration: 0,
      }));

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
      mediaRecorderRef.current = null;
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }
  }, [state.isRecording]);

  // 음성 재생
  const playRecording = useCallback(() => {
    if (!state.audioURL) return;

    if (!audioElementRef.current || audioElementRef.current.src !== state.audioURL) {
      audioElementRef.current?.pause();
      audioElementRef.current = new Audio(state.audioURL);
      audioElementRef.current.preload = 'auto';
      audioElementRef.current.playsInline = true;
    }

    const audio = audioElementRef.current;
    if (state.isPlaying) {
      audio.pause();
      setState((prev) => ({ ...prev, isPlaying: false }));
      return;
    }

    audio.currentTime = 0;
    audio.onended = () => setState((prev) => ({ ...prev, isPlaying: false }));
    audio.onerror = () => setState((prev) => ({ ...prev, isPlaying: false }));
    void audio.play()
      .then(() => setState((prev) => ({ ...prev, isPlaying: true })))
      .catch((error) => {
        console.error('Error playing recording:', error);
        setState((prev) => ({ ...prev, isPlaying: false }));
        alert('녹음 파일을 재생할 수 없습니다. 다시 녹음해 주세요.');
      });
  }, [state.audioURL, state.isPlaying]);

  // 녹음 초기화
  const clearRecording = useCallback(() => {
    audioElementRef.current?.pause();
    if (state.audioURL?.startsWith('blob:')) URL.revokeObjectURL(state.audioURL);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    audioElementRef.current = null;
    setState({
      isRecording: false,
      isPlaying: false,
      audioURL: null,
      duration: 0,
    });
  }, [state.audioURL]);

  useEffect(() => () => {
    audioElementRef.current?.pause();
    if (state.audioURL?.startsWith('blob:')) URL.revokeObjectURL(state.audioURL);
  }, [state.audioURL]);

  return {
    ...state,
    startRecording,
    stopRecording,
    playRecording,
    clearRecording,
  };
};
