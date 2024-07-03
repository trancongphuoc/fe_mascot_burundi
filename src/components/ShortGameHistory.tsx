import { memo, useEffect, useState } from "react";
import Card from "./Card";
import Arrow from '../assets/arrow.svg';
import { db } from "../firebase/config";
import { off, onValue, ref } from "firebase/database";
import { log } from "../utils/log";

interface ShortGameHistoryProps {
  openDialog: () => void;
  statusGame: StatusGame;
}

const ShortGameHistory = memo(function ShortGameHistory ({openDialog, statusGame}: ShortGameHistoryProps) {
    log('<ShortGameHistory />')
    const [gameHistories, setGameHistories] = useState<ZodiacCardModel[]>([])

    useEffect(()=> {
      const stateRef = ref(db, '/zodiacGame/state/zodiacCardsRecent');

      const handleData = (snapshot: any) => {
          const data = snapshot.val();
          console.log('short history', data);
          if (data) {
              const gameHistoriesList: ZodiacCardModel[] = [];
              for (const gameHistoryId in data) {
                  if (Object.hasOwnProperty.call(data, gameHistoryId)) {
                      const gameHistoryData = data[gameHistoryId];
                      const player: ZodiacCardModel = {
                          id: gameHistoryData.id ?? '',
                          imageUrl: gameHistoryData.imageUrl ?? '',
                          name: gameHistoryData.name,
                          multiply: gameHistoryData.multiply,
                      };
                      gameHistoriesList.push(player);
                  }
              }
              setGameHistories(gameHistoriesList);
          }
      };
      if (statusGame === "COUNTDOWN") {
        onValue(stateRef, handleData);
      } else {
        off(stateRef, 'value', handleData);
      }
      
      return () => off(stateRef, 'value', handleData);
        
  }, [statusGame]);


    return (
        <div className="result__left" onClick={openDialog}>
          <p className='result__left--text'>Kết quả</p>
          {gameHistories.map((result, index) => (
            <Card key={index} card={result.imageUrl} className="card--zodiac__small" classNameBackground="card--zodiac__background--small mr-4px" />
          ))}
          <img src={Arrow} alt="card_background" />
        </div>
    );
})

export default ShortGameHistory;