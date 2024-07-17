
import Icoin from '../../assets/icoin.svg';
import ArrowWhite from '../../assets/arrow-white.svg';
import { useEffect, useState, useContext } from 'react';
import { DataSnapshot, off, onValue, ref } from 'firebase/database';
import { db } from '../../firebase/config';
// import bgMyBonus from '../assets/bg_my_bonus_new.svg';
import bgHeader from '../../assets/bg_my_bonus_today.png';
import MyTotalIcoin from './MyTotalIcoin';
import BettingCard from './BettingCard';
import { log } from '../../utils/log';
import DepositIcoin from './DepositIcoin';
import { GameInfoContext } from '../../store/game-info_context';
import IcoinWinToday from './IcoinWinTody';
import NoGameToday from './NoGameToday';
import toast from 'react-hot-toast';

interface BetUser extends User {
    bettingCards?: BetZodiacCard[];
    isWin?: boolean;
    totalIcoinWin?: number;
    totalIcoinWinToday?: number;
}

interface MyInfoBetResultModel {
    // onOpen: () => void;
    onUserDataChange: (data: { isWin?: boolean | undefined; totalIcoinWin?: number | undefined }) => void;
    betCards: BetZodiacCard[],
    fbId: string,
    setFirebaseData: (_ : BetZodiacCard[]) => void;
}

function MyBonusToday({ betCards, onUserDataChange, fbId, setFirebaseData} : MyInfoBetResultModel) {
    log('<MyBonusToday />')
    const [betUser, setBetUser] = useState<BetUser>()
    const [icoinWinToday, setIcoinWinToday] = useState<number>(0);
    const [bettingCards, setBettingCards] = useState< BetZodiacCard[]>([]);

    const { stateGame, transactionId } =  useContext(GameInfoContext);

    useEffect(() => {
        const stateRef = ref(db, `/zodiacGame/players/${fbId}`);
        const handleData = (snapshot: DataSnapshot) => {
            const data = snapshot.val();
            if (data && data.bettingCards) {
                const firebaseCards: BetZodiacCard[] = [];
            
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
                            firebaseCards.push(card);
                        }
                    }
              

                setBettingCards(firebaseCards);
                setFirebaseData(firebaseCards);
            
                const user: BetUser = {
                    facebookUserId: data.facebookUserId,
                    profileImageLink: data.profileImageLink,
                    name: data.name,
                    uid: data.uid,
                    totalIcoin: data.totalIcoin,
                    noBettingToday: data.noBettingToday,
                    bettingCards: firebaseCards,
                    isWin: data.isWin,
                    totalIcoinWin: data.totalIcoinWin ?? 0,
                    totalIcoinWinToday: data.totalIcoinWinToday ?? 0,
                };
                setBetUser(user);  
                onUserDataChange({ isWin: user.isWin, totalIcoinWin: user.totalIcoinWin ?? 0});   
                if (stateGame !== "RESULT" && stateGame !== "END") {
                    setIcoinWinToday(user.totalIcoinWinToday ?? 0);
                } else {
                    if (user.isWin) {
                        const iconValue = (user.totalIcoinWinToday ?? 0) - ( user.totalIcoinWin ?? 0)
                        setIcoinWinToday(iconValue)
                    } else {
                        setIcoinWinToday(user.totalIcoinWinToday ?? 0);
                    }
                }
            }
        };

        onValue(stateRef, handleData);
      
        return () => off(stateRef, 'value', handleData);
    }, [stateGame, transactionId, fbId]);

    // useEffect(() => {
    //     if (betSuccess) {
    //         setBettingCards(betCards);
    //     }
    // }, [betSuccess, betCards, transactionId]);
    
    // useEffect(() => {
    //     if (!betSuccess) {
    //         setBettingCards(betUser?.bettingCards ?? []);
    //     }
    // }, [betSuccess, betUser, transactionId]); 

    useEffect(() => {
        if (betCards.length <= 4) {
            setBettingCards(betCards);
        } else {
            toast.dismiss();
            toast('Đặt cược tối đa 4 lá linh vật', { duration: 2000, position: 'bottom-center'});
        }

    },[betCards, transactionId])

    return (
        <>  
            <div className="section-myInfo mt-22px">
                {/* <SVG src={bgMyBonus} className="section-myInfo__bg"/> */}

                <img src={bgHeader} className="section-myInfo__bg"/>
                
                <div className="header-left">
                    <p className='header-left--text'>Thưởng hôm nay:</p>
                    <IcoinWinToday icoinImg={Icoin} icoinWinToday={icoinWinToday} />
                </div>

                <NoGameToday arrowImg={ArrowWhite} noGameToday={betUser?.noBettingToday ?? 0} />
               
                <div className="section-myInfo__cards">
                    {bettingCards.map((betCard) => (<BettingCard key={betCard.cardId} betCard={betCard} />))}
                </div>

                <div className="end">
                    <MyTotalIcoin fbId={fbId} />
                    <DepositIcoin />
                </div>
            </div>
        </>
    );
}

export default MyBonusToday;