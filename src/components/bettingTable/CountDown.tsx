import { DataSnapshot, get, ref } from "firebase/database";
import { useState, useEffect, useContext } from "react";
import { db } from "../../firebase/config";
import { log } from "../../utils/log";
import { GameInfoContext } from "../../store/game-info_context";

const TOTAL_COUNTDOWN: number = 35;

export default function Countdown() {
  log("<Countdown />");
  const [count, setCount] = useState(0);
  const { stateGame, transactionId, setModal } = useContext(GameInfoContext);

  const differentTime = (startTime: number): number => {
    const currentTime = Date.now();
    const elapsed = Math.floor((currentTime - startTime) / 1000);
    return Math.max(TOTAL_COUNTDOWN - elapsed, 0);
  };

  useEffect(() => {
    let initialRemainingTime = 40;
    const stateRef = ref(db, "/zodiacGame/state/startTime");

    get(stateRef).then((snapshot: DataSnapshot) => {
      const startTime = snapshot.val() || 0;
      initialRemainingTime = differentTime(startTime);
    });

    const interval = setInterval(() => {
      initialRemainingTime -= 1;

      if (initialRemainingTime == 0) {
        setModal({ state: "CLOSE", type: "BETTING" });
        setModal({ state: "CLOSE", type: "DEPOSIT" });
      }

      setCount(Math.max(initialRemainingTime, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [stateGame, transactionId]);

  return (
    <div className="betting-table--counter">
      <p>Đếm ngược {count}</p>
    </div>
  );
}
