import { DataSnapshot, get, off, onValue, ref } from 'firebase/database';
import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { log } from '../../utils/log';

export default function Countdown() {
  log('<Countdown />');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const stateRef = ref(db, '/zodiacGame/state/startTime');
    const totalCountdown = 40 * 1000; // total countdown time in milliseconds (50 seconds)
    let initialRemainingTime = 0;

    const handleData = (snapshot: DataSnapshot) => {
      const startTime = snapshot.val() || 0;
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      initialRemainingTime = Math.max(totalCountdown - elapsed, 0);
      
      setCount(Math.floor(initialRemainingTime / 1000)); // convert milliseconds to seconds
    };

    onValue(stateRef, handleData);

    // Set an interval to update the countdown every second
    const interval = setInterval(() => {
      initialRemainingTime -= 1000; // decrease remaining time by 1 second (1000 ms)
      setCount(Math.max(Math.floor(initialRemainingTime / 1000), 0)); // update state with new remaining time
    }, 1000);

    return () => {
      off(stateRef, 'value', handleData);
      clearInterval(interval);
    };
  }, [setCount]);

  return (
    <div className='betting-table--counter'>
      <p >Đếm ngược {count}</p>
    </div>
  );
};
