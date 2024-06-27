import { DataSnapshot, off, onValue, ref } from 'firebase/database';
import { useState, useEffect } from 'react';
import { db } from '../firebase/config';

interface CountdownProps {
  className: string;
  statusGame: StatusGame;
}

export default function Countdown({ className, statusGame } : CountdownProps) {
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
    onValue(stateRef, handleData);
    return () => off(stateRef, 'value', handleData);

}, [statusGame]);

  return (
    <div className={className}>
      <p >Đếm ngược {count}</p>
    </div>
  );
};
