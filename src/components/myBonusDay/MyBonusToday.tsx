
import Icoin from '../../assets/icoin.svg';
import ArrowWhite from '../../assets/arrow-white.svg';
import SVG from 'react-inlinesvg';
import { useEffect, useState } from 'react';
import { DataSnapshot, off, onValue, ref } from 'firebase/database';
import { db } from '../../firebase/config';
// import bgMyBonus from '../assets/bg_my_bonus_new.svg';
import bgHeader from '../../assets/bg_my_bonus_today.png';
import { formatNumber } from '../../utils/utils';
import { callbackFlutter } from '../../utils/functions';
import MyTotalIcoin from './MyTotalIcoin';
import BettingCard from './BettingCard';

interface BetUser extends User {
    bettingCards?: BetZodiacCard[];
    isWin?: boolean;
    totalIcoinWin?: number;
    totalIcoinWinToday?: number;
}

interface MyInfoBetResultModel {
    onOpen: () => void;
    onUserDataChange: (data: { isWin?: boolean | undefined; totalIcoinWin?: number | undefined }) => void;
    statusGame: StatusGame,
    betCards: BetZodiacCard[],
    betSuccess: boolean,
    fbId: string,
    // deposit: () => void;
}

function MyHistory({onOpen, statusGame, betCards, betSuccess, onUserDataChange, fbId} : MyInfoBetResultModel) {
    const [betUser, setBetUser] = useState<BetUser>()
    const [icoinWinToday, setIIcoinWinToday] = useState<number>(0);
    const [bettingCards, setBettingCards] = useState< BetZodiacCard[]>([]);

    useEffect(() => {
        const stateRef = ref(db, `/zodiacGame/players/${fbId}`);
        const handleData = (snapshot: DataSnapshot) => {
            const data = snapshot.val();
            if (data) {
                const cards: BetZodiacCard[] = [];
                if (data.bettingCards) {
                    for (const cardsId in data.bettingCards) {
                        if (Object.hasOwnProperty.call(data.bettingCards, cardsId)) {
                            const cardId = data.bettingCards[cardsId];
                            const card: BetZodiacCard = {
                                id: cardId.id ?? '',
                                imageUrl: cardId.imageUrl ?? '',
                                name: cardId.name ?? '',
                                multiply: cardId.multiply ?? 0,
                                totalIcoinBetting: cardId.totalIcoinBetting ?? 0,
                            };
                            cards.push(card);
                        }
                    }
                }
            
                const user: BetUser = {
                    facebookUserId: data.facebookUserId,
                    profileImageLink: data.profileImageLink,
                    name: data.name,
                    uid: data.uid,
                    totalIcoin: data.totalIcoin,
                    noBettingToday: data.noBettingToday,
                    bettingCards: cards,
                    isWin: data.isWin,
                    totalIcoinWin: data.totalIcoinWin ?? 0,
                    totalIcoinWinToday: data.totalIcoinWinToday ?? 0,
                };
                setBetUser(user);  
                onUserDataChange({ isWin: user.isWin, totalIcoinWin: user.totalIcoinWin ?? 0});   
                if (statusGame === 'PREPARESTART') {
                    setIIcoinWinToday(user.totalIcoinWinToday ?? 0);
                }       
            }
        };

        //listen when fail betting
        // if (statusGame !== "RESULT" && statusGame !== "END" && statusGame !== "RESULTWAITING") {
            onValue(stateRef, handleData);
        // } else {
        //     off(stateRef, 'value', handleData);
        // }        
        return () => off(stateRef, 'value', handleData);
    }, [statusGame, fbId]);

    useEffect(() => {
        if (betSuccess) {
            setBettingCards(betCards);
        }
    }, [betSuccess, betCards]);
    
    useEffect(() => {
        if (!betSuccess) {
            setBettingCards(betUser?.bettingCards ?? []);
        }
    }, [betSuccess, betUser]); 

    return (
        <>  
            <div className="section-myInfo mt-22px">
                {/* <SVG src={bgMyBonus} className="section-myInfo__bg"/> */}

                <img src={bgHeader} className="section-myInfo__bg"/>
                
                <div className="header-left">
                    <p className='header-left--text'>Thưởng hôm nay:</p>
                    <div className="totalIcoin">
                        <SVG className='header-left--img' src={Icoin}/>
                        <p className='header-left--icoin'>{formatNumber(icoinWinToday)}</p>
                    </div>
                </div>

                <div onClick={onOpen} className="header-right">
                    <p className='header-right--text'>Số lần đoán hôm nay: {betUser?.noBettingToday ?? 0}</p>
                    <SVG className='header-right--arrow' src={ArrowWhite}/>
                </div>
               
                <div className="section-myInfo__cards">
                    {bettingCards.map((betCard) => (<BettingCard betCard={betCard} />))}
                </div>

                <div className="end">
                    <MyTotalIcoin fbId={fbId}/>
                    <h4 className='end-right' onClick={() => callbackFlutter('callbackMyWallet')}>
                        <p className='end-right--text'>Nạp ngay</p>
                        <SVG src={ArrowWhite} className="end-right--img"/>
                    </h4>
                </div>
            </div>
        </>
    );
}

export default MyHistory;