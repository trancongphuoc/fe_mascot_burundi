import { DataSnapshot, off, onValue, ref } from 'firebase/database';
import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { log } from '../../utils/log';

// interface CountdownProps {
//   className: string;
//   statusGame: StatusGame;
// }

export default function Countdown() {
  log('<Countdown />')
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

    onValue(stateRef, handleData)
    return () => off(stateRef, 'value', handleData);
}, [setCount]);

  return (
    <div className='betting-table--counter'>
      <p >Đếm ngược {count}</p>
    </div>
  );
};
