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

import MyHistory from '../components/MyHistory';
import BestPlayers from '../components/BestPlayers';
import { useEffect, useState } from 'react';
import DialogBetting from '../components/DialogBetting';
import DialogLost from '../components/DialogLost';
import PopupRule from '../components/PopupRule';
import PopupHistoryGame from '../components/PopupHistoryGame';
import PopupMyHistory from '../components/PopupMyHistory';

import { db } from '../firebase/config';
import { ref, onValue } from "firebase/database";
import { AnimatePresence } from 'framer-motion';

import OpenCard from '../components/OpenCard';
import Players from '../components/Players';
import { ShortGameHistory } from '../components/ShortGameHistory';

import { joinGameZodiac } from '../api/joinGameZodiac';
import { BettingTable } from '../components/BettingTable';
import { getToken } from '../api/getToken';

// import SVG from 'react-inlinesvg';


const img: string[] = [buffalo, tiger, dragon, snake, horse, goat, chicken, pig];

const myInfoBetResults = [
  { card: tiger, isSelected: true, number: 7, bonus: 15, players: 7 , show: ""},
  { card: tiger, isSelected: true, number: 7, bonus: 15, players: 7 },
  { card: tiger, isSelected: true, number: 7, bonus: 15, players: 7 },
];

const topUsers = [
  { url: 'https://www.ikara.co/avatar/103929910820839711115?type=LARGE&version=8', name: 'Lê Hải Yến', icoin: 3000 },
  { url: 'https://www.ikara.co/avatar/103929910820839711115?type=LARGE&version=8', name: 'Trần Tuấn Hùng', icoin: 1000 },
  { url: 'https://www.ikara.co/avatar/103929910820839711115?type=LARGE&version=8', name: 'Ngọc Hoàng', icoin: 9000 },
];


let mineHistory: BetInfo[] = [
  {
    time: new Date(),
    bettings: [{ zodiac: tiger, bonus: 'x3', icoin: 10 }, { zodiac: tiger, bonus: 'x5', icoin: -20 }],
    totalIcoin: -10
  },
  {
    time: new Date(),
    bettings: [{ zodiac: buffalo, bonus: 'x3', icoin: -10 }, { zodiac: tiger, bonus: 'x5', icoin: 20 }],
    totalIcoin: 10
  },
  {
    time: new Date(),
    bettings: [{ zodiac: snake, bonus: 'x3', icoin: -20 }, { zodiac: tiger, bonus: 'x5', icoin: 10 }],
    totalIcoin: -10
  },
  {
    time: new Date(),
    bettings: [{ zodiac: snake, bonus: 'x3', icoin: -20 }, { zodiac: tiger, bonus: 'x5', icoin: 10 }],
    totalIcoin: -10
  },
  {
    time: new Date(),
    bettings: [{ zodiac: snake, bonus: 'x3', icoin: -20 }, { zodiac: tiger, bonus: 'x5', icoin: 10 }],
    totalIcoin: -10
  },
  {
    time: new Date(),
    bettings: [{ zodiac: snake, bonus: 'x3', icoin: -20 }, { zodiac: tiger, bonus: 'x5', icoin: 10 }],
    totalIcoin: -10
  },
  {
    time: new Date(),
    bettings: [{ zodiac: snake, bonus: 'x3', icoin: -20 }, { zodiac: tiger, bonus: 'x5', icoin: 10 }],
    totalIcoin: -10
  },

];



interface ZodiacGameData {
  isPause: boolean,
  noGameToday: number,
  status: string,
  transactionId: number,
  zodiacCard: ZodiacCard,
  
}

interface ZodiacCard {
  id: string,
  imgUrl: string,
  multiply: number,
  name: string,
}


function App() {



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
  
  //joint game
  const [joinGame, setJoinGame] = useState(false);
  //get select card
  const [selectCard, setSelectCard] = useState<ZodiacCardModel | null>(null);


  useEffect(()=> {
    console.log('step 1');
    const fetchData = async () => {
      try {
        const data = await joinGameZodiac();
        if (data != null && data !== "FAILED") {
          window.sessionStorage.setItem('facebookUserId', data);
          setJoinGame(true);
          console.log('join game success', window.sessionStorage.getItem('facebookUserId'))
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    const fetchToken = async () => {
      let queryString = window.location.search;
      let urlParams = new URLSearchParams(queryString);
      let parameters = urlParams.get('parameters');

      if (parameters) {
        try {
          let decodedParams = atob(parameters);
          let data = JSON.parse(decodedParams);
          await getToken(data);
        } catch (error) {
          window.sessionStorage.setItem('token', parameters);
        }
      } else {
        // Remove this when running live
        let token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTA2Nzg1MTczNDA2MDM3MDUxMzciLCJyb2xlcyI6WyJVU0VSIl0sImZhY2Vib29rVXNlcklkIjoiMTEwNjc4NTE3MzQwNjAzNzA1MTM3IiwicGFja2FnZU5hbWUiOiJjb20ueW9rYXJhLmRldi52MSIsImxhbmd1YWdlIjoiZW4ueW9rYXJhIiwicGxhdGZvcm0iOiJJT1MiLCJ1c2VySWQiOiJuemR5VDhrMERGL3VXbkhlT25peHBCMnVadXRjRStuOEZvZVNabDZ5MDNHVllxY2JmYmtpYTA3ZmZISGZOeHFkZVJtZERnWEd2dnAzY1N2R2VPREJuUT09IiwianRpIjoiMTVmM2YzOTMtMmY5MS00MDMzLTgzOTYtMmQxYzY4ZDQ1MjY4IiwiaWF0IjoxNzE2NjQ3NjMzLCJpc3MiOiJodHRwczovL3d3dy5pa2FyYS5jbyIsImV4cCI6MTcxNzI1MjQzM30.mendnBAJLnoyni-K6qFUqGd_xkS4xsoYfuAko-OGynM";
        window.sessionStorage.setItem('token', token);
        console.log('now use default token');
      }
    };

    const execute = async () => {
      await fetchToken();
      await fetchData();
    };

    execute();

    const facebookUserId = window.sessionStorage.getItem('facebookUserId');
    console.log('check fb', facebookUserId);
  }, [joinGame]);



  useEffect(() => { 
    const fetchGameInfo = async () => {
      const stateRef = ref(db, 'zodiacGame/state');

      onValue(stateRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const zodiacCardData = data.zodiacCard;
          const zodiacCard: ZodiacCard = {
            id: zodiacCardData.id,
            imgUrl: zodiacCardData.imgUrl,
            multiply: zodiacCardData.multiply,
            name: zodiacCardData.name,
          };

          setGame({
            isPause: data.isPause,
            noGameToday: data.noGameToday,
            status: data.status,
            transactionId: data.transactionId,
            zodiacCard: zodiacCard,
          });
        }
      });
    };

 const fetchStatus = async () => {
      const stateRef = ref(db, 'zodiacGame/state/status');

      onValue(stateRef, (snapshot) => {
        const data = snapshot.val();
        if (data && data !== statusGame) {
          setStatusGame(data);
          console.log('status', data)
        }
      });
    };

    fetchStatus();
    fetchGameInfo();
    setDialogType('LOST');

    if (statusGame === "RESULT") {
      //close dilog
      // setOpenRule(false);
      // setOpenLostWin(false);
      // setOpenHistoryGame(false);
      // setOpenMyHistory(false);

      // // //open card
      // setOpenGameResult(true)
    }

    console.log('check data', game);

  }, [statusGame]);

  const handleCardSelection = (card: ZodiacCardModel) => {
    console.log('Selected Card ID:', card.id);
    setSelectCard(card)
    setOpenBetting(true)
};


  return (
    <div className='main'>
      <section className='section-header u-margin-top-huge1'>
        <img src={PrimaryText} alt="primary_text" className='u-margin-minus-bottom-big' />
        <p className='heading-secondary'>Hôm nay {game?.noGameToday} Ván</p>
        <img
          src={Rule}
          onClick={() => setOpenRule(true)}
          alt="card_background"
          className='section-header__rule'/>
      </section>

      <div className="result mt-7-5px">
        <ShortGameHistory openDialog={()=> {setOpenHistoryGame(true)}}/>
        <Players/>
      </div>

      <BettingTable onSelectCard={handleCardSelection} openBetting={true}/>

      <MyHistory onOpen={()=> setOpenMyHistory(true)} bonusToday={1000} goodBets={4} totalIcoin={15000} myInfoBetReults={myInfoBetResults} />
      <BestPlayers />

      <button onClick={() => {
        setDialogType('WIN');
        setOpenLostWin(true)}} className="open-popup-button">Open Popup</button>

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
                                          }}
                                          zodiacGameId={game?.transactionId ?? 0}
                                          zodiacCardSelect={selectCard}
                                        />
                                      )}
        {openLostWin && <DialogLost
                          onClose={() => setOpenLostWin(false)}
                          dialogType={dialogType} totalIcoin={100}
                          topUsers={topUsers} />}
        {openHistoryGame && <PopupHistoryGame
                              onClose={() => setOpenHistoryGame(false)}
                              zodiacs={img}/>}
        {openMyHistory && <PopupMyHistory onClose={()=> setOpenMyHistory(false)} mineHistory={mineHistory}/>}
      </AnimatePresence>
      {openGameResult && <OpenCard onClose={()=> setOpenGameResult(false)} zodiac={game?.zodiacCard.id ?? ''} history={[]}/>}
    </div>
  );
}

export default App;
