import React, { useState, useEffect } from 'react';

interface CountdownProps {
  startTimer: boolean;
  className: string;
}

const Countdown: React.FC<CountdownProps> = ({ startTimer, className }) => {
  const [count, setCount] = useState(30);
  let timer: NodeJS.Timeout;

  useEffect(() => {
    if (startTimer && count > 0) {
      timer = setInterval(() => {
        setCount(prevCount => prevCount - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [startTimer, count]);

  useEffect(() => {
    if (startTimer) {
      setCount(30);
    } else {
      clearInterval(timer);
      setCount(0);
    }
  }, [startTimer]);

  return (
      <p className={className}>Đếm ngược {count}</p>
  );
};

export default Countdown;
