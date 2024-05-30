import { useCallback, useEffect, useState } from 'react';
import CountDown from './CountDown';
import { off, onValue, ref } from 'firebase/database';
import { db } from '../firebase/config';
import SVG from 'react-inlinesvg';
import bgCardNormal from '../assets/bg_card_nomarl.svg';
import bgCardSelect from '../assets/bg_card_selected.svg';
import bbBettingTable from '../assets/frame_betting_table.svg';

interface BettingTableProps {
    onSelectCard: (card: ZodiacCardModel) => void;
    openBetting: boolean;
}

export function BettingTable({ onSelectCard, openBetting }: BettingTableProps) {
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
    }, [selectCardId]);

    return (
        <div className="section-betting mt-5px">
            <CountDown className='section-betting--counter'/>

            <SVG src={bbBettingTable} className='section-betting__bg'/>

            <div className="section-betting__content">
                {betCards.map((betCard, index) => (
                    <div 
                        key={index}
                        onClick={() => handleSetectCard(betCard)}
                        className="betting-card">

                        <p className='betting-card--no'>{index + 1}</p>
                        <SVG src={betCard.id === selectCardId && openBetting ? bgCardSelect : bgCardNormal}
                            className='betting-card--background'/>
                        <SVG src={betCard.imageUrl} className='betting-card--zodiac'/>
                        <p className='betting-card--bonus'>x{betCard.multiply}</p> 
                        <p className='betting-card--players'>{betCard.counter} người</p>
                    </div>
                ))}
            </div>
        </div>
    );
}