import '../css/index.css';

import tiger from '../assets/tiger.svg';
import buffalo from '../assets/buffalo.svg';
import chicken from '../assets/chicken.svg';
import dragon from '../assets/dragon.svg';
import goat from '../assets/goat.svg';
import horse from '../assets/horse.svg';
import pig from '../assets/pig.svg';
import snake from '../assets/snake.svg';
// import bettingFrame from '../assets/frame_betting_table.svg';

import FullCard from '../components/FullCard';
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

import CountDown from '../components/CountDown';
import OpenCard from '../components/OpenCard';
import Players from '../components/Players';
import { ShortGameHistory } from '../components/ShortGameHistory';

import { joinGameZodiac } from '../api/joinGameZodiac';

// import SVG from 'react-inlinesvg';




const img: string[] = [buffalo, tiger, dragon, snake, horse, goat, chicken, pig];

const myInfoBetResults = [
  { card: tiger, isSelected: true, number: 7, bonus: 15, players: 7 , show: ""},
  { card: tiger, isSelected: true, number: 7, bonus: 15, players: 7 },
  { card: tiger, isSelected: true, number: 7, bonus: 15, players: 7 },
];

const bettingTable = [
  { card: buffalo, isSelected: false, bonus: 5, players: 0 },
  { card: tiger, isSelected: false, bonus: 5, players: 0 },
  { card: dragon, isSelected: true, bonus: 5, players: 0 },
  { card: snake, isSelected: false, bonus: 8, players: 10 },
  { card: horse, isSelected: false, bonus: 8, players: 0 },
  { card: goat, isSelected: false, bonus: 10, players: 20 },
  { card: chicken, isSelected: false, bonus: 15, players: 0 },
  { card: pig, isSelected: false, bonus: 20, players: 0 },
];
const bestPlayers = [
  { name: "Dong Hoang Linh", avatarUrl: "https://www.ikara.co/avatar/103929910820839711115?type=LARGE&version=8", winningIcoin: 9999 },
  { name: "Doan Dai Hiep", avatarUrl: "https://www.ikara.co/avatar/103929910820839711115?type=LARGE&version=8", winningIcoin: 9999 },
  { name: "Nguyễn Hoàng Chi", avatarUrl: "https://www.ikara.co/avatar/103929910820839711115?type=LARGE&version=8", winningIcoin: 9999 },
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

  let token: string | null  = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTA2Nzg1MTczNDA2MDM3MDUxMzciLCJyb2xlcyI6WyJVU0VSIl0sImZhY2Vib29rVXNlcklkIjoiMTEwNjc4NTE3MzQwNjAzNzA1MTM3IiwicGFja2FnZU5hbWUiOiJjb20ueW9rYXJhLmRldi52MSIsImxhbmd1YWdlIjoiZW4ueW9rYXJhIiwicGxhdGZvcm0iOiJJT1MiLCJ1c2VySWQiOiJuemR5VDhrMERGL3VXbkhlT25peHBCMnVadXRjRStuOEZvZVNabDZ5MDNHVllxY2JmYmtpYTA3ZmZISGZOeHFkZVJtZERnWEd2dnAzY1N2R2VPREJuUT09IiwianRpIjoiMTVmM2YzOTMtMmY5MS00MDMzLTgzOTYtMmQxYzY4ZDQ1MjY4IiwiaWF0IjoxNzE2NjQ3NjMzLCJpc3MiOiJodHRwczovL3d3dy5pa2FyYS5jbyIsImV4cCI6MTcxNzI1MjQzM30.mendnBAJLnoyni-K6qFUqGd_xkS4xsoYfuAko-OGynM";
  window.localStorage.setItem("token", token);

  token = window.localStorage.getItem("token");

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

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const data = await joinGameZodiac(token);
        if (data != null && data === "OK") {
          setJoinGame(true);
          console.log('join game success')
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  },[joinGame])



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
      setOpenRule(false);
      setOpenLostWin(false);
      setOpenHistoryGame(false);
      setOpenMyHistory(false);

      //open card
      setOpenGameResult(true)
    }

    console.log('check data', game);



    // let queryString = window.location.search;
    // queryString = queryString.substring(1);
    // let pair = queryString.split("=");
    // let paramName = decodeURIComponent(pair[0]);
    // let paramValue = decodeURIComponent(pair[1]);
    // let param = paramValue.split("-");
    // let key = decodeURIComponent(param[0]);
       
    // try{
    //   const parameters = Base64.decode(key);
    //   const pa = JSON.parse(parameters);
    //       axios.post(`/rest/auth`, {
    //           userId: pa.userId,
    //           language: pa.language
    //         }).then((res) => {
    //           // setToken(res.data)  
    //           window.localStorage.setItem("token", res.data)

    //       // axios.get(`/rest/feature-request`,{headers  : {
    //       //     'Authorization': `Bearer ${res.data} `
    //       //   }}).then((res)=>{
    //       //     console.log(res.data.list)
    //       //     if(res.data.list){
    //       //     setFeatureRequests(res.data.list)
    //       // }})
    //       }).catch((error) => console.log(error));
    // }
    //   catch {

        // setToken(paramValue)



  }, [statusGame]);


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

      <section className="section-betting mt-5px">
        <CountDown className='section-betting--counter'/>

        <div className="section-betting__content">
          {/* <SVG src={bettingFrame} className="section-betting--bg"/> */}
          {bettingTable.map((bettingCard, index) => (
            <FullCard onOpen={()=> setOpenBetting(true)} key={index} number={index + 1} card={bettingCard.card} isSelected={bettingCard.isSelected} bonus={bettingCard.bonus} players={bettingCard.players} />
          ))}
        </div>

      </section>

      <MyHistory onOpen={()=> setOpenMyHistory(true)} bonusToday={1000} goodBets={4} totalIcoin={15000} myInfoBetReults={myInfoBetResults} />

      <BestPlayers bestPlayers={bestPlayers} />

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
        {openBetting && <DialogBetting onClose={()=> setOpenBetting(false)}/>}
        {openLostWin && <DialogLost onClose={() => setOpenLostWin(false)} dialogType={dialogType} totalIcoin={100} topUsers={topUsers} />}
        {openHistoryGame && <PopupHistoryGame onClose={() => setOpenHistoryGame(false)} zodiacs={img} token={token}/>}
        {openMyHistory && <PopupMyHistory onClose={()=> setOpenMyHistory(false)} mineHistory={mineHistory}/>}
      </AnimatePresence>

      {openGameResult && <OpenCard onClose={()=> setOpenGameResult(false)} zodiac={game?.zodiacCard.id ?? ''} history={[]}/>}
      
     
    </div>
  );
}

export default App;
