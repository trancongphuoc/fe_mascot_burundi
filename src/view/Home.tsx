import '../css/index.css';

import tiger from '../assets/tiger.svg';
import buffalo from '../assets/buffalo.svg';
import chicken from '../assets/chicken.svg';
import dragon from '../assets/dragon.svg';
import goat from '../assets/goat.svg';
import horse from '../assets/horse.svg';
import pig from '../assets/pig.svg';
import snake from '../assets/snake.svg';

import Card from '../components/Card';
import FullCard from '../components/FullCard';
import AvatarCircle from '../components/AvatarCircle';
import PrimaryText from '../assets/primary-text.svg';
import Rule from '../assets/rule.svg';
import Arrow from '../assets/arrow.svg';
import avatar from '../assets/avatar.png';

import MyBonusToday from '../components/MyBonusToday';
import BestPlayers from '../components/BestPlayers';
import { useEffect, useState } from 'react';
import DialogBetting from '../components/DialogBetting';
import DialogLost from '../components/DialogLost';
import PopupRule from '../components/PopupRule';
import PopupHistoryGame from '../components/PopupHistoryGame';
import PopupMineResult from '../components/PopupMineResult';
import OpenCard from '../components/OpenCard';

import { db } from '../firebase/config';
import { ref, onValue } from "firebase/database";
import { AnimatePresence } from 'framer-motion';
// import { Base64 } from 'js-base64';
import axios from 'axios';

import api, { BASE_URL_DEV } from '../api/axios'
import { GameHistory } from '../model/GameHistory';
import { fetchGameHistory } from '../api/getGameHistory';


const img: string[] = [buffalo, tiger, dragon, snake, horse, goat, chicken, pig];

const myInfoBetResults = [
  { card: tiger, isSelected: true, number: 7, bonus: 15, players: 7 , show: ""},
  { card: tiger, isSelected: true, number: 7, bonus: 15, players: 7 },
  { card: tiger, isSelected: true, number: 7, bonus: 15, players: 7 },
];
const leftResults = [horse, goat, pig];
const rightResults = [avatar, avatar, avatar, avatar];
const numberResult = 29;
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
// const counter = 30;
const topUsers = [
  { url: 'https://www.ikara.co/avatar/103929910820839711115?type=LARGE&version=8', name: 'Lê Hải Yến', icoin: 3000 },
  { url: 'https://www.ikara.co/avatar/103929910820839711115?type=LARGE&version=8', name: 'Trần Tuấn Hùng', icoin: 1000 },
  { url: 'https://www.ikara.co/avatar/103929910820839711115?type=LARGE&version=8', name: 'Ngọc Hoàng', icoin: 9000 },
];

let history: string[] = ['tiger', 'buffalo', 'chicken', 'dragon', 'goat', 'horse', 'pig', 'snake', 'tiger', 'buffalo', 'chicken', 'dragon', 'goat', 'horse', 'pig', 'snake', 'tiger', 'buffalo', 'chicken', 'dragon', 'goat', 'horse', 'pig', 'snake', 'tiger', 'buffalo', 'chicken', 'dragon', 'goat', 'horse', 'pig', 'snake']


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

let dialogType: DialogType = 'WIN';

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

  let token: string | null  = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJGSVJFQkFTRSs4NDk0NTk3OTA3NyIsInJvbGVzIjpbIlVTRVIiXSwiZmFjZWJvb2tVc2VySWQiOiJGSVJFQkFTRSs4NDk0NTk3OTA3NyIsInBhY2thZ2VOYW1lIjoiY29tLnlva2FyYS5kZXYudjEiLCJsYW5ndWFnZSI6ImVuLnlva2FyYSIsInBsYXRmb3JtIjoiSU9TIiwidXNlcklkIjoibnpkeVQ4azBERi91V25IZU9uaXhwQjJ1WnV0Y0UrbjhGb2VTWmw2eTAzR1ZZcWNiZmJraWEwN2ZmSEhmTnhxZGVSbWREZ1hHdnZwM2NTdkdlT0RCblE9PSIsImp0aSI6ImE2ZGRiNjk2LTQ2NjgtNDMzMi04MmVkLTc3YjJmODMwNzhhOCIsImlhdCI6MTcxNjUzNTE5NSwiaXNzIjoiaHR0cHM6Ly93d3cuaWthcmEuY28iLCJleHAiOjE3MTcxMzk5OTV9.h40nj5NUU7KTMtMUIGM-lDgmr-Y8B3-WrBhebhLnq-s";
  window.localStorage.setItem("token", token);

  token = window.localStorage.getItem("token");

  

  const [game, setGame] = useState<ZodiacGameData | null>(null); 
  

  // const fetchGameHistory = async () => {
  //   api.get(`/rest/zodiac-game/history`, {
  //     headers: { 'Authorization': `Bearer ${token}` }
  //   }).then((res) => {
  //     console.log('history', res.data);
  //     if (res.data.status === "OK") {
        
  //     }
  //   })
  //   .catch((error) => console.log(error));
  // }

  useEffect(() => { 
    const fetchStatus = async () => {
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

    fetchStatus();



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


        api.get(`/rest/zodiac-game/history`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then((res) => {
          console.log('history', res.data);
          // Uncomment the following lines if you want to use the response data
          // if (res.data.list) {
          //   setFeatureRequests(res.data.list);
          // }
        })
        .catch((error) => console.log(error));
      // }
   

    if (game?.zodiacCard.id.includes("1") ||
        game?.zodiacCard.id.includes("2") ||
        game?.zodiacCard.id.includes("3") ||
        game?.zodiacCard.id.includes("4")) {
          console.log("step 1");
          console.log("check id",game?.zodiacCard.id);
          handleOpenPopup();
    } else  {
      console.log("step 2");
      console.log("check id", game?.zodiacCard.id);
      handleOpenLostPopup();
    }
  }, []);

  // If game data is null, return loading or handle appropriately
  // if (!game) {
  //   return <div>Loading...</div>;
  // }

  // Now you can access game properties safely
  // const { status, zodiacCard } = game;

  // const [statusGame, setStatusGame] = useState('PREPARESTART');


  
  const [popupState, setPopupState] = useState({
    isWinLostVisible: false,
    ruleShow: false,
    resultShow: false,
    bettingtShow: false,
    mineResultShow: false,
    selectCard: false,
  });

  // const [myBet, setMyBet] = useState()


  const handleOpenPopup = () => {
    dialogType = 'WIN';
    setPopupState({ ...popupState, isWinLostVisible: true });
  };


  const handleOpenLostPopup = () => {
    dialogType = 'LOST';
    setPopupState({ ...popupState, isWinLostVisible: true });
  };

  const handleCloseWinLostPopup = () => setPopupState({ ...popupState, isWinLostVisible: false });
  const handleOpenRulePopup = () => setPopupState({ ...popupState, ruleShow: true });
  const handleCloseRulePopup = () => setPopupState({ ...popupState, ruleShow: false });
  const handleOpenResultPopup = () => setPopupState({ ...popupState, resultShow: true });
  const handleCloseResultPopup = () => setPopupState({ ...popupState, resultShow: false });
  const handleOpenBettingPopup = () => { setPopupState({ ...popupState, bettingtShow: true })};
  const handleCloseBettingPopup = () => setPopupState({ ...popupState, bettingtShow: false });
  const handleOpenMineResultPopup = () => { setPopupState({ ...popupState, mineResultShow: true })};
  const handleCloseMineResultPopup = () => setPopupState({ ...popupState, mineResultShow: false });


  return (
    <div className='main'>
      <section className='section-header u-margin-top-huge1'>
        <img src={PrimaryText} alt="primary_text" className='u-margin-minus-bottom-big' />
        <p className='heading-secondary'>Hôm nay {game?.noGameToday} Ván</p>
        <img src={Rule} onClick={handleOpenRulePopup} alt="card_background" className='section-header__rule' />
      </section>

      <div className="result mt-7-5px">
        <div className="result__left" onClick={handleOpenResultPopup}>
          <p className='result__left--text'>Kết quả</p>
          {leftResults.map((result, index) => (
            <Card key={index} card={result} className="card--zodiac__small" classNameBackground="card--zodiac__background--small mr-4px" />
          ))}
          <img src={Arrow} alt="card_background" />
        </div>
        <div className="result__right">
          {rightResults.map((result, index) => (
            <AvatarCircle key={index} avatarUrl={result} className="avatar mr-5px" />
          ))}
          <h2 className='result__right--number'>{numberResult}</h2>
        </div>
      </div>

      <section className="section-betting mt-5px">
        <p className="section-betting--counter">Đếm ngược {30}</p>
        <div className="section-betting__content">
          {bettingTable.map((bettingCard, index) => (
            <FullCard onOpen={handleOpenBettingPopup} key={index} number={index + 1} card={bettingCard.card} isSelected={bettingCard.isSelected} bonus={bettingCard.bonus} players={bettingCard.players} />
          ))}
        </div>
      </section>

      <MyBonusToday onOpen={handleOpenMineResultPopup} bonusToday={1000} goodBets={4} totalIcoin={15000} myInfoBetReults={myInfoBetResults} />

      <BestPlayers bestPlayers={bestPlayers} />

      <button onClick={handleOpenPopup} className="open-popup-button">Open Popup</button>
      <button onClick={handleOpenLostPopup} className="open-popup-button">Open Popup</button>





      {/* Dialog when click */}
      
      <AnimatePresence>
        {/* {popupState.ruleShow && <PopupRule onClose={handleCloseRulePopup} />} */}
        {popupState.bettingtShow && <DialogBetting onClose={handleCloseBettingPopup}/>}
        {popupState.isWinLostVisible && <DialogLost onClose={handleCloseWinLostPopup} dialogType={dialogType} totalIcoin={100} topUsers={topUsers} />}
        {popupState.resultShow && <PopupHistoryGame onClose={handleCloseResultPopup} zodiacs={img} history={history} />}
        
      </AnimatePresence>

          {popupState.ruleShow  &&<OpenCard onClose={handleCloseRulePopup} zodiacs={[]} token={token}></OpenCard>}
      
      <PopupMineResult show={popupState.mineResultShow} onClose={handleCloseMineResultPopup} mineHistory={mineHistory}/>
    </div>
  );
}

export default App;
