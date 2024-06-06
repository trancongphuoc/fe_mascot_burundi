import '../css/index.css';

import tiger from '../assets/tiger.svg';
import buffalo from '../assets/buffalo.svg';
import chicken from '../assets/chicken.svg';
import dragon from '../assets/dragon.svg';
import goat from '../assets/goat.svg';
import snake from '../assets/snake.svg';
import horse from '../assets/horse.svg';
import pig from '../assets/pig.svg';

import PrimaryText from '../assets/primary-text.svg';
import Rule from '../assets/rule.svg';

import MyHistory from '../components/MyBonusToday';
import BestPlayers from '../components/BestPlayers';
import { useEffect, useState } from 'react';
import DialogBetting from '../components/DialogBetting';
import DialogLost from '../components/DialogLost';
import PopupRule from '../components/PopupRule';
import PopupHistoryGame from '../components/PopupHistoryGame';
import PopupMyHistory from '../components/PopupMyHistory';

import { db } from '../firebase/config';
import { ref, onValue, off } from "firebase/database";
import { AnimatePresence } from 'framer-motion';

import OpenCard from '../components/OpenCard';
import Players from '../components/Players';
import { ShortGameHistory } from '../components/ShortGameHistory';

import { joinGameZodiac } from '../api/joinGameZodiac';
import { BettingTable } from '../components/BettingTable';
import { getToken } from '../api/getToken';
import { useLocation } from 'react-router-dom';
import { bettingCard } from '../api/bettingCard';
import toast, { Toaster } from 'react-hot-toast';
import SVG from 'react-inlinesvg';
import { limit } from 'firebase/firestore';


const img: string[] = [buffalo, tiger, dragon, snake, horse, goat, chicken, pig];

interface ZodiacGameData {
  isPause: boolean,
  noGameToday: number,
  status: StatusGame,
  transactionId: number,
  zodiacCard: ZodiacCard,
  topUser?: User[],
  
}

interface ZodiacCard {
  id: string,
  imgUrl: string,
  multiply: number,
  name: string,
}


function Home() {
  // Use the parameters as needed in your component
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const parameters = queryParams.get('parameters');

  const [game, setGame] = useState<ZodiacGameData | null>(null); 

  const [statusGame, setStatusGame] = useState('NONE');
  //open card
  const [openGameResult, setOpenGameResult] = useState(false);
  //open rule
  const [openRule, setOpenRule] = useState(false);
  //open lost win
  const [openLostWin, setOpenLostWin] = useState(false);
  //open history game
  const [openHistoryGame, setOpenHistoryGame] = useState(false);
  //open betting
  const [openBetting, setOpenBetting] = useState(false);
  //open my history
  const [openMyHistory, setOpenMyHistory] = useState(false);

  const [dialogType, setDialogType] = useState<DialogType>('LOST');

  const [fbId, setFbId] = useState('');
  
  //joint game
  const [joinGame, setJoinGame] = useState(false);
  //get select card
  const [selectCard, setSelectCard] = useState<BetZodiacCard | null>(null);

  //failed betting
  const [betSuccess, setBetSuccess] = useState(false);

  const [totalIcoinWin, setTotalIcoinWin] = useState(0);
  //get win or not
  const handleIsWin = (data: { isWin?: boolean | undefined; icoinWin?: number | undefined }) => {
    if (data && data.icoinWin) {
      setTotalIcoinWin(data.icoinWin);
    }
    if (typeof data.isWin === 'boolean') {
      if (data.isWin) {
        setDialogType('WIN');
      } else {
        setDialogType('LOST');
      }
  } else {
      console.log("Win status is undefined or not a boolean.");
  }
};


useEffect(() => {
  const fetchTokenAndJoinGame = async () => {
    if (parameters) {
      try {
        let decodedParams = atob(parameters);
        let data = JSON.parse(decodedParams);
        await getToken(data);
      } catch (error) {
        window.sessionStorage.setItem('token', parameters);
      }
    } else {
      console.log('no parameters');
    }

    try {
      const data = await joinGameZodiac();
      console.log('join game data return', data);
      if (data !== null && data !== "FAILED") {
        window.sessionStorage.setItem('facebookUserId', data);
        setJoinGame(true);
        setFbId(data);
        console.log('join game success');
      } else {
        console.log('call join game failed');
      }
    } catch (error) {
      console.log('error join game', error);
    }
  };

  fetchTokenAndJoinGame();
}, [parameters]);


  useEffect(() => { 
    console.log('joinGame', joinGame)
    const fetchGameInfo = async () => {
      const stateRef = ref(db, 'zodiacGame/state');

      const handleData = (snapshot: any) => {
          const data = snapshot.val();
          if (data) {
              const zodiacCardData = data.zodiacCard;
              const zodiacCard: ZodiacCard = {
                  id: zodiacCardData.id,
                  imgUrl: zodiacCardData.imageUrl,
                  multiply: zodiacCardData.multiply,
                  name: zodiacCardData.name,
              };

              const topUsers: User[] = [];
              if (data.topUsers) {
                  for (const topUserId in data.topUsers) {
                      if (Object.hasOwnProperty.call(data.topUsers, topUserId)) {
                          const user = data.topUsers[topUserId];
                          const topUser: User = {
                              facebookUserId: user.facebookUserId ?? '',
                              name: user.name ?? '',
                              profileImageLink: user.profileImageLink ?? '',
                              totalIcoin: user.totalIcoin ?? 0,
                              uid: user.uid ?? 0,
                          };
                          topUsers.push(topUser);
                      }
                  }
              }

              setGame({
                  isPause: data.isPause,
                  noGameToday: data.noGameToday,
                  status: data.status,
                  transactionId: data.transactionId,
                  zodiacCard: zodiacCard,
                  topUser: topUsers,
              });
          }
      };

      onValue(stateRef, handleData);
      return () => off(stateRef, 'value', handleData);

  };

  //get status
  const fetchStatus = async () => {
      const stateRef = ref(db, 'zodiacGame/state/status');
      onValue(stateRef, (snapshot) => {
        const data = snapshot.val();
        if (data && data !== statusGame) {
          setStatusGame(data);
        }
      });
    };
    fetchStatus();
    fetchGameInfo();

    if (statusGame != "COUNTDOWN") {
      setOpenBetting(false);
    }

    if (statusGame == "COUNTDOWN") {
      setOpenLostWin(false);
    }

    if (statusGame === "RESULT") {
      // close dilog
      setOpenRule(false);
      setOpenLostWin(false);
      setOpenHistoryGame(false);
      setOpenMyHistory(false);
      setOpenBetting(false);

      //open card
      setOpenGameResult(true)
    }
  }, [statusGame]);



  const handleCardSelection = (card: ZodiacCardModel) => {
    const betCard: BetZodiacCard = {
      ...card,
      transactionId: game?.transactionId ?? 0,
    };
    if (game?.status === "COUNTDOWN") {
      setSelectCard(betCard);
      setOpenBetting(true);
    } else {
      toast('Chưa đến giai đoạn đặt cược', { duration: 2000, position: 'bottom-center',  className: 'custom-toast'});
      setOpenBetting(false);
    }
  };


// send icoin betting
const betGame = async (zodiacCard: ZodiacCardModel, stake: number) => {
    await bettingCard(game?.transactionId ?? 0, stake, zodiacCard.id);
};



  return (
    <div className='main'>
      <Toaster position='top-right'/>
      
      <section className='section-header u-margin-top-huge1'>
        <SVG src={PrimaryText} className='u-margin-minus-bottom-big' />
        <p className='heading-secondary'>Hôm nay {game?.noGameToday} Ván</p>
        <SVG
          src={Rule}
          onClick={() => setOpenRule(true)}
          className='section-header__rule'/>
      </section>

      <div className="result mt-7-5px">
        <ShortGameHistory openDialog={()=> {setOpenHistoryGame(true)}}  statusGame={game?.status ?? 'NONE'}/>
        <Players/>
      </div>

      <BettingTable onSelectCard={handleCardSelection} openBetting={true} statusGame={game?.status ?? "NONE"}/>
      <MyHistory
        onOpen={() => setOpenMyHistory(true)}
        onUserDataChange={handleIsWin}
        fbId={fbId}
        statusGame={game?.status ?? 'NONE'}/>
      <BestPlayers statusGame={game?.status ?? "NONE"}/>

      <button onClick={() => {
        console.log('show toast')
      }} className="open-popup-button">Open Popup</button>

      <button onClick={() => {
        setDialogType('LOST');
        setOpenLostWin(true)}} className="open-popup-button">Open Popup</button>
      <button onClick={()=> setOpenGameResult(true)} className="open-popup-result game">Open resul Popup</button>


      {/* Dialog when click */}
      <AnimatePresence>
        {openRule && <PopupRule onClose={()=> setOpenRule(false)} />}
        {openBetting && selectCard && (
                                        <DialogBetting
            onClose={() => {
              setOpenBetting(false);
              setSelectCard(null);
            } }
            zodiacCardSelect={selectCard}
            betIcoin={betGame}
            zodiacGameId={game?.transactionId ?? 0}                                        />
                                      )}
        {openLostWin && <DialogLost
                            onClose={() => setOpenLostWin(false)}
                            dialogType={dialogType} totalIcoin={totalIcoinWin}
                            topUsers={game?.topUser ?? []} zodiac={game?.zodiacCard.imgUrl ?? ''} />}
        {openHistoryGame && <PopupHistoryGame
                              onClose={() => setOpenHistoryGame(false)}
                              zodiacs={img}/>}
        {openMyHistory && <PopupMyHistory onClose={()=> setOpenMyHistory(false)}/>}
      </AnimatePresence>
      {openGameResult && <OpenCard
                              onClose={()=> {
                                              setOpenGameResult(false)
                                               setOpenLostWin(true)}}
                              zodiac={game?.zodiacCard.imgUrl ?? ''}/>}
    </div>
  );
}

export default Home;
