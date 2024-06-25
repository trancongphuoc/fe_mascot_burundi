import { useCallback, useEffect, useState } from 'react';
import CountDown from '../CountDown';
import { off, onValue, ref } from 'firebase/database';
import { db } from '../../firebase/config';
// import SVG from 'react-inlinesvg';
// import bgCardNormal from '../../assets/bg_card_nomarl.svg';
// import bgCardSelect from '../../assets/bg_card_selected.svg';
// import bbBettingTable from '../assets/frame_betting_table.svg';
import bettingFrame from '../../assets/bg_betting_frame.png';
import ZodiacCard from './ZodiacCard';


interface BettingTableProps {
    onSelectCard: (card: ZodiacCardModel) => void;
    openBetting: boolean;
    statusGame: StatusGame;
}

export default function BettingTable({ onSelectCard, statusGame }: BettingTableProps) {
    const [betCards, setBetCard] = useState<ZodiacCardModel[]>([]);
    const [selectCardId, setSelectCardId] = useState('');

    useEffect(() => {
        const stateRef = ref(db, '/zodiacGame/zodiacCards');
  
        const handleData = (snapshot: any) => {
            const data = snapshot.val();
            console.log('zodiacCards', data);
            if (data) {
                const betCards: ZodiacCardModel[] = [];
                for (const gameHistoryId in data) {
                    if (Object.hasOwnProperty.call(data, gameHistoryId)) {
                        const gameHistoryData = data[gameHistoryId];
                        const card: ZodiacCardModel = {
                            id: gameHistoryData.id ?? '',
                            imageUrl: gameHistoryData.imageUrl ?? '',
                            name: gameHistoryData.name,
                            multiply: gameHistoryData.multiply,
                            counter: gameHistoryData.counter,
                        };
                        betCards.push(card);
                    }
                }
                setBetCard(betCards);
                window.sessionStorage.setItem('card', JSON.stringify(betCards));
            }
        };
        onValue(stateRef, handleData);
        return () => {
            off(stateRef, 'value', handleData);
        };
    }, []);

    const handleSetectCard = useCallback((cardId: ZodiacCardModel): void => {
        setSelectCardId(cardId.id);
        onSelectCard(cardId);
    }, [selectCardId, statusGame]);

    return (
        <div className="betting-table mt-5px">
            <CountDown className='betting-table--counter' statusGame={statusGame}/>

            {/* <SVG src={bbBettingTable} className='betting-table__bg' cacheRequests={true}/> */}

            <img src={bettingFrame} className='betting-table__bg'/>

            <div className="betting-table__content">
                {betCards.map((betCard, index) => (
                    <ZodiacCard key={betCard.id} index={index} betCard={betCard} selectCardId={selectCardId} handleSelectedCard={handleSetectCard}/>
                    // <div 
                    //     key={index}
                    //     onClick={() => handleSetectCard(betCard)}
                    //     className="betting-table__card">

                    //     <p className='betting-table__card--no'>{index + 1}</p>

                    //     <SVG
                    //         src={bgCardSelect}
                    //         className='betting-table__card--bgNormal'
                    //         style={{zIndex: betCard.id === selectCardId ? 2 : 1,
                    //             opacity: betCard.id === selectCardId ? 1 : 0
                    //         }}/> 
                    //     <SVG
                    //         src={bgCardNormal}
                    //         className='betting-table__card--bgSelected'
                    //         style={{zIndex: betCard.id === selectCardId ? 1 : 2,
                    //             opacity: betCard.id === selectCardId ? 0 : 1
                    //         }}/>

                        
                    //     <SVG src={betCard.imageUrl} cacheRequests={true} className='betting-table__card--zodiac'/>
                    //     <p className='betting-table__card--bonus'>x{betCard.multiply}</p> 
                    //     <p className='betting-table__card--players'>{betCard.counter} người</p>
                    // </div>
                ))}
            </div>
        </div>
    );
}