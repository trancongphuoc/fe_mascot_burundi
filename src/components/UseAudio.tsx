import { useRef, useCallback } from 'react';

const useAudio = (audioSrc: string) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio(audioSrc));

  const playAudio = useCallback(() => {
    const audio = audioRef.current;
    audio.currentTime = 0;
    audio.play().catch((error) => {
      console.error('Audio play error:', error);
    });
  }, []);

  return playAudio;
};

export default useAudio;