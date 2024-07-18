
import Icoin from '../../assets/icoin.svg';
import ArrowWhite from '../../assets/arrow-white.svg';
import { useEffect, useState, useContext } from 'react';
import { DataSnapshot, off, onValue, ref } from 'firebase/database';
import { db } from '../../firebase/config';
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

function MyBonusToday({betCards, onUserDataChange, fbId, setFirebaseData} : MyInfoBetResultModel) {
    log('<MyBonusToday />')
    const [betUser, setBetUser] = useState<BetUser>()
    const [icoinWinToday, setIcoinWinToday] = useState<number>(0);
    const [bettingCards, setBettingCards] = useState< BetZodiacCard[]>([]);

    const { stateGame, transactionId } =  useContext(GameInfoContext);

    useEffect(() => {
        const stateRef = ref(db, `/zodiacGame/players/${fbId}`);
        const handleData = (snapshot: DataSnapshot) => {
            const data = snapshot.val();
            if (data) {
                const firebaseCards: BetZodiacCard[] = [];
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
                            firebaseCards.push({...card});
                        }
                    }
              
                }
                setBettingCards([...firebaseCards.map(card => ({...card}))]);
                setFirebaseData([...firebaseCards.map(card => ({...card}))]);
            
                const user: BetUser = {
                    facebookUserId: data.facebookUserId,
                    profileImageLink: data.profileImageLink,
                    name: data.name,
                    uid: data.uid,
                    totalIcoin: data.totalIcoin,
                    noBettingToday: data.noBettingToday,
                    bettingCards: firebaseCards,
                    isWin: data.isWin,
                    totalIcoinWin: data.totalIcoinWin || 0,
                    totalIcoinWinToday: data.totalIcoinWinToday || 0,
                };
                setBetUser({...user});  

                if ((stateGame !== "PREPARESTART" && stateGame !== "END" && stateGame !== "NONE")) {
                    onUserDataChange({ isWin: user.isWin, totalIcoinWin: user.totalIcoinWin }); 
                }  
                
                if ((stateGame !== "RESULTWAITING" && stateGame !== "RESULT" && stateGame !== "END") || betCards.length === 0) {
                    setIcoinWinToday(user.totalIcoinWinToday || 0);
                }
            }
        };

        onValue(stateRef, handleData);
      
        return () => off(stateRef, 'value', handleData);
    }, [stateGame, transactionId, fbId]);

    useEffect(() => {
        if (betCards.length <= 4) {
            setBettingCards([...betCards.map(card => ({...card}))]);
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
                    {bettingCards.map((betCard) => (<BettingCard key={betCard.id} betCard={betCard} />))}
                </div>

                <div className="end">
                    <MyTotalIcoin fbId={fbId} betCards={betCards}/>
                    <DepositIcoin />
                </div>
            </div>
        </>
    );
}

export default MyBonusToday;