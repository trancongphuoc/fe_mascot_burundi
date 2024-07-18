import { DataSnapshot, get, ref } from 'firebase/database';
import { useState, useEffect, useContext } from 'react';
import { db } from '../../firebase/config';
import { log } from '../../utils/log';
import { GameInfoContext } from '../../store/game-info_context';

const TOTAL_COUNTDOWN : number = 40;

export default function Countdown() {
  log('<Countdown />');
  const [count, setCount] = useState(0);
  const { stateGame } = useContext(GameInfoContext)

  const differentTime = (startTime: number): number => {
    const currentTime = Date.now();
    const elapsed = Math.floor((currentTime - startTime) / 1000)
    return Math.max(TOTAL_COUNTDOWN - elapsed, 0);
  }

  useEffect(() => {
    let initialRemainingTime = 40;
    if (stateGame === "COUNTDOWN") {
      const stateRef = ref(db, '/zodiacGame/state/startTime');

      get(stateRef).then((snapshot: DataSnapshot) => {
        const startTime = snapshot.val() || 0;
        initialRemainingTime = differentTime(startTime);
      });
        
      const interval = setInterval(() => {
        initialRemainingTime -= 1;
        setCount(Math.max(initialRemainingTime, 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [stateGame]);

  return (
    <div className='betting-table--counter'>
      <p >Đếm ngược {count}</p>
    </div>
  );
};
