import { useCallback, useRef } from 'react';
import audioStake from  '../../../public/sounds/stake_audio.wav';

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = useCallback((e: any) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  },[]);

  return (
    <div>
      <button onClick={(e) => handleClick(e)}>Play Sound</button>
      <audio ref={audioRef} src={audioStake} />
    </div>
  );
};

export default AudioPlayer;