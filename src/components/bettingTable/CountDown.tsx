import { DataSnapshot, get, ref } from "firebase/database";
import { useState, useEffect, useContext } from "react";
import { db } from "../../firebase/config";
// import { log } from "../../utils/log";
import { GameInfoContext } from "../../store/game-info_context";
import { useTranslation } from 'react-i18next';
import '../../utils/i18n'; // Import file cấu hình i18n

const TOTAL_COUNTDOWN: number = 39;

export default function Countdown() {
  const { t } = useTranslation();
  // log("<Countdown />");
  const [count, setCount] = useState(0);
  const { stateGame, transactionId, setModal, setBettingTimeEnd } = useContext(GameInfoContext);

  const differentTime = (startTime: number): number => {
    const currentTime = Date.now();
    const elapsed = Math.floor((currentTime - startTime) / 1000);
    return Math.max(TOTAL_COUNTDOWN - elapsed, 0);
  };

  useEffect(() => {
    let initialRemainingTime = 39;
    const stateRef = ref(db, "/zodiacGame/state/startTime");

    get(stateRef).then((snapshot: DataSnapshot) => {
      const startTime = snapshot.val() || 0;
      initialRemainingTime = differentTime(startTime);
    });

    const interval = setInterval(() => {
      initialRemainingTime -= 1;

      if (initialRemainingTime == 0) {
        setBettingTimeEnd();
        setModal({ state: "CLOSE", type: "BETTING" });
        setModal({ state: "CLOSE", type: "DEPOSIT" });
      }

      setCount(Math.max(initialRemainingTime, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [stateGame, transactionId]);

  return (
    <div className="betting-table--counter">
      <p>{t('Countdown')} {count}</p>
    </div>
  );
}
