
import Icoin from '../assets/icoin.svg';
import ArrowWhite from '../assets/arrow-white.svg';
import Background from '../assets/background_card_small.svg';
import SVG from 'react-inlinesvg';
import { useEffect, useState } from 'react';
import { DataSnapshot, off, onValue, ref } from 'firebase/database';
import { db } from '../firebase/config';
import bgMyBonus from '../assets/bg_my_bonus_new.svg';

interface BetUser extends User {
    bettingCards?: BetZodiacCard[];
    isWin?: boolean;
    totalIcoinWin?: number;
}



interface MyInfoBetResultModel {
    onOpen: () => void;
    onUserDataChange: (data: { isWin?: boolean | undefined; totalIcoinWin?: number | undefined }) => void;
    statusGame: StatusGame,
    // bettingCards?: BetZodiacCard[];
}

function MyHistory({onOpen, onUserDataChange, statusGame} : MyInfoBetResultModel) {
    const facebookUserId = window.sessionStorage.getItem('facebookUserId');
    const [betUser, setBetUser] = useState<BetUser>()
    const [totalIcoin, setTotalIcoin] = useState<number>(0);

    useEffect(()=> {
        const stateRef = ref(db, `/ikara/users/${facebookUserId}/totalIcoin`);
        const handleData = (snapshot: any) => {
            const data = snapshot.val();
            if (data) setTotalIcoin(data);                
        };
        onValue(stateRef, handleData);
        return () => off(stateRef, 'value', handleData);
    },[totalIcoin])

    useEffect(() => {
        const stateRef = ref(db, `/zodiacGame/players/${facebookUserId}`);
        const handleData = (snapshot: DataSnapshot) => {
            const data = snapshot.val();
            console.log('check data', data)
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
                };
                setBetUser(user);  
                onUserDataChange({ isWin: user.isWin, totalIcoinWin: user.totalIcoinWin ?? 0});          
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
        <>  
            <div className="section-myInfo mt-22px">
                <SVG src={bgMyBonus} className="section-myInfo__bg"/>
                
                <div className="header-left">
                    <p className='header-left--text'>Thưởng hôm nay:</p>
                    <SVG className='header-left--img' src={Icoin}/>
                    <p className='header-left--icoin'>{(betUser?.totalIcoinWin ?? 0).toLocaleString('en-US').replace(/,/g, '.')}</p>
                </div>

                <div onClick={onOpen} className="header-right">
                    <p className='header-right--text'>Số lần đã đoán hôm nay: {betUser?.noBettingToday ?? 0}</p>
                    <SVG className='header-right--arrow' src={ArrowWhite}/>
                </div>
               
                <div className="section-myInfo__cards">
                    {  
                    betUser?.bettingCards && 
                    betUser.bettingCards.map((betCard, index) => (
                            <div key={index} className="card__main">
                                <p className="card__main--background-color">&nbsp;</p>
                                <p className="card__main--header">{betCard.id.split('_').slice(-1)}</p>
                                <SVG src={Background} className="card__main--background"/>
                                <SVG src={betCard.imageUrl} className="card__main--zodiac"/>
                                <p className='card__main--bonus'>x{betCard.multiply}</p>
                                <h4 className='card__main--icoin'>{betCard.totalIcoinBetting} iCoin</h4>
                            </div>
                        ))
                    }
                </div>

                <div className="end-left">
                    <p className='end-left--text'>Tổng của tôi:</p>
                    <SVG src={Icoin} className="end-left--img"/>
                    <p className='end-left--icoin'>{totalIcoin.toLocaleString('en-US').replace(/,/g, '.')}</p>
                </div>
                <h4 className='end-right'>
                    <p className='end-right--text'>Nạp ngay</p>
                    <SVG src={ArrowWhite} className="end-right--img"/>
                </h4>
            </div>
        </>
    );
}

export default MyHistory;