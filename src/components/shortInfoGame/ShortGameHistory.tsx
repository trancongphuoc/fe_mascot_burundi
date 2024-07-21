import { useEffect, useState, useContext } from "react";
import Card from "../Card";
import Arrow from "../../assets/arrow.svg";
import { db } from "../../firebase/config";
import { off, onValue, ref } from "firebase/database";
import { log } from "../../utils/log";
import { GameInfoContext } from "../../store/game-info_context";

// interface ShortGameHistoryProps {
//   openDialog: () => void;
// }

interface ZodiacCardHistory extends ZodiacCardModel {
  lastUpdate: number;
}

const ShortGameHistory = function ShortGameHistory() {
  log("<ShortGameHistory />");
  const [gameHistories, setGameHistories] = useState<ZodiacCardHistory[]>([]);

  const { stateGame, transactionId, setModal } = useContext(GameInfoContext);

  useEffect(() => {
    const stateRef = ref(db, "/zodiacGame/state/zodiacCardsRecent");

    const handleData = (snapshot: any) => {
      const data = snapshot.val();
      if (data) {
        const gameHistoriesList: ZodiacCardHistory[] = [];
        for (const gameHistoryId in data) {
          if (Object.hasOwnProperty.call(data, gameHistoryId)) {
            const gameHistoryData = data[gameHistoryId];
            // const idCard = Math.random() * 1000;
            const player: ZodiacCardHistory = {
              lastUpdate: gameHistoryData.lastUpdate ?? 0,
              id: gameHistoryData.id ?? "",
              imageUrl: gameHistoryData.imageUrl ?? "",
              name: gameHistoryData.name,
              multiply: gameHistoryData.multiply,
            };
            gameHistoriesList.push(player);
          }
        }
        if (stateGame === "PREPARESTART" || gameHistories.length === 0) {
          setGameHistories([...gameHistoriesList.map((card) => ({ ...card }))]);
        }
      }
    };
    onValue(stateRef, handleData);
    return () => off(stateRef, "value", handleData);
  }, [stateGame, transactionId]);

  const handleOpenGameHistory = () => {
    if (stateGame !== "RESULT" && stateGame !== "END") {
      setModal({ state: "OPEN", type: "GAMEHISTORY" });
    }
  };

  return (
    <div className="result__left" onClick={handleOpenGameHistory}>
      <p className="result__left--text">Kết quả</p>
      {gameHistories.map((result) => (
        <Card
          key={result.lastUpdate}
          card={result.imageUrl}
          className="card--zodiac__small"
          classNameBackground="card--zodiac__background--small mr-4px"
        />
      ))}
      <img src={Arrow} alt="card_background" />
    </div>
  );
};

export default ShortGameHistory;
