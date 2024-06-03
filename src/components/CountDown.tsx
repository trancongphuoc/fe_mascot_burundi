import { DataSnapshot, off, onValue, ref } from 'firebase/database';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';

interface CountdownProps {
  className: string;
  statusGame: StatusGame;
}

const Countdown: React.FC<CountdownProps> = ({ className, statusGame }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const stateRef = ref(db, '/zodiacGame/state/countDown');

    const handleData = (snapshot: DataSnapshot) => {
        const data: number | null = snapshot.val();
        if (typeof data === 'number') {
          const amountExpect = Math.max(data - 1, 0);
          setCount(amountExpect);
        }
    };
    if (statusGame === 'COUNTDOWN') {
      onValue(stateRef, handleData);
    } else {
      off(stateRef, 'value', handleData);
    }

    return () => off(stateRef, 'value', handleData);

}, [statusGame]);

  return (
      <p className={className}>Đếm ngược {count}</p>
  );
};

export default Countdown;
