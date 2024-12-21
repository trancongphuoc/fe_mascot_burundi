import { useEffect, useState, useContext } from "react";
import CountDown from "./CountDown";
import { off, onValue, ref } from "firebase/database";
import { db } from "../../firebase/config";
// import SVG from 'react-inlinesvg';
// import bgCardNormal from '../../assets/bg_card_nomarl.svg';
// import bgCardSelect from '../../assets/bg_card_selected.svg';
// import bbBettingTable from '../assets/frame_betting_table.svg';
import bettingFrame from "../../assets/bg_betting_frame.png";
import ZodiacCard from "./ZodiacCard";
import { GameInfoContext } from "../../store/game-info_context";

// interface BettingTableProps {
//     onSelectCard: (card: ZodiacCardModel) => void;
// }

export default function BettingTable() {
  const [betCards, setBetCard] = useState<ZodiacCardModel[]>([]);
  const { stateGame, transactionId } = useContext(GameInfoContext);

  useEffect(() => {
    const stateRef = ref(db, "/zodiacGame/zodiacCards");

    const handleData = (snapshot: any) => {
      const data = snapshot.val();
      if (data) {
        const betCards: ZodiacCardModel[] = [];
        for (const gameHistoryId in data) {
          if (Object.hasOwnProperty.call(data, gameHistoryId)) {
            const gameHistoryData = data[gameHistoryId];
            const card: ZodiacCardModel = {
              id: gameHistoryData.id || "",
              imageUrl: gameHistoryData.imageUrl || "",
              name: gameHistoryData.name || "",
              multiply: gameHistoryData.multiply || 0,
              counter: gameHistoryData.counter || 0,   
            };
            betCards.push(card);
          }
        }
        setBetCard(betCards);
        localStorage.setItem("card", JSON.stringify(betCards));
      }
    };
    onValue(stateRef, handleData);
    return () => {
      off(stateRef, "value", handleData);
    };
  }, [stateGame, transactionId]);

  // const handleSetectCard = useCallback((cardId: ZodiacCardModel): void => {
  //     // setSelectCardId(cardId.id);
  //     onSelectCard(cardId);
  // }, [stateGame, transactionId]);

  return (
    <div className="betting-table mt-5px">
      <CountDown />

      {/* <SVG src={bbBettingTable} className='betting-table__bg' cacheRequests={true}/> */}

      <img src={bettingFrame} className="betting-table__bg" />

      <div className="betting-table__content">
        {betCards.map((betCard, index) => (
          <ZodiacCard key={betCard.id} index={index} betCard={betCard} />
        ))}
      </div>
    </div>
  );
}
