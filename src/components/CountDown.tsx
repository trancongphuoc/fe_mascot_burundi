import { off, onValue, ref } from 'firebase/database';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';

interface CountdownProps {
  className: string;
}

const Countdown: React.FC<CountdownProps> = ({ className }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const stateRef = ref(db, '/zodiacGame/state/countDown');

    const handleData = (snapshot: any) => {
        const data = snapshot.val();
        let amountExpect = data - 2;
        if (amountExpect < 0) { amountExpect = 0; }
        setCount(amountExpect);
    };

    onValue(stateRef, handleData);

    return () => {
        off(stateRef, 'value', handleData);
    };

}, []);

  return (
      <p className={className}>Đếm ngược {count}</p>
  );
};

export default Countdown;
