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
import { useCallback, useEffect, useRef, useState } from 'react';
import DialogBetting from '../components/dialog/DialogBetting';
import DialogLost from '../components/dialog/DialogLostWin';
import PopupRule from '../components/popup/PopupRule';
import PopupGameHistory from '../components/popup/PopupGameHistory';
import PopupMyHistory from '../components/popup/PopupMyHistory';
import PopupNotification from '../components/popup/PopupNotification';

import { db } from '../firebase/config';
import { ref, onValue, off } from "firebase/database";
import { AnimatePresence } from 'framer-motion';

import Players from '../components/Players';
import { ShortGameHistory } from '../components/ShortGameHistory';
import PopupOpenCard from '../components/openCard/PopupOpenCard';

import { joinGameZodiac } from '../api/joinGameZodiac';
import BettingTable from '../components/bettingTable/BettingTable';
import { getToken } from '../api/getToken';
import { useLocation } from 'react-router-dom';
import { bettingCard } from '../api/bettingCard';
import toast, { Toaster, resolveValue } from 'react-hot-toast';
import SVG from 'react-inlinesvg';
import { useOnlineStatus } from '../api/checkDisconnect';
import { doNothing } from '../api/doNothing';
import Loading from '../components/Loading';
import useNetworkStatus from '../api/useNetworkStatus';
import setHidden from '../utils/setBodyScroll';


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

export default function Home() {
  // Use the parameters as needed in your component

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const parameters = queryParams.get('parameters');

  const [game, setGame] = useState<ZodiacGameData | null>(null); 

  const [statusGame, setStatusGame] = useState<StatusGame>('NONE');
  const [openGameResult, setOpenGameResult] = useState(false);
  const [openRule, setOpenRule] = useState(false);
  const [openLostWin, setOpenLostWin] = useState(false);
  const [openHistoryGame, setOpenHistoryGame] = useState(false);
  const [openBetting, setOpenBetting] = useState(false);
  const [openMyHistory, setOpenMyHistory] = useState(false);
  const [openDepositIcoin, setOpenDepositIcoin] = useState(false);
  const [openDisconnect, setOpenDisconnect] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dialogTypeRef = useRef<DialogType>('LOST');
  const fbIdRef = useRef<string>('')
  const jointGameRef = useRef<boolean>(false);
  const selectedCardRef = useRef<BetZodiacCard | null>(null);
  const totalIcoinWinRef = useRef<number>(0);


  const handleIsWin = (data: { isWin?: boolean | undefined; totalIcoinWin?: number | undefined }) => {
    if (data.totalIcoinWin) {
      totalIcoinWinRef.current = data.totalIcoinWin;
    }
   console.log('check icoin win: ', data.totalIcoinWin)

    if (typeof data.isWin === 'boolean') {
      if (data.isWin) {
        dialogTypeRef.current = 'WIN';
      } else {
        dialogTypeRef.current = 'LOST';
      }
  } else {
      console.log("Win status is undefined or not a boolean.");
  }
};

useEffect(() => {
  const fetchTokenAndJoinGame = async () => {
    if (parameters) {
      try {
        console.log('step 1')
        let decodedParams = atob(parameters);
        let data = JSON.parse(decodedParams);
        await getToken(data);
      } catch (error) {
        console.log('step ', parameters)
        window.sessionStorage.setItem('token', parameters);
      }
    } else {
      console.log('no parameters');
    }

    try {
      const data = await joinGameZodiac();
      console.log('join game data return', data);
      if (data !== null && data !== "FAILED") {
        console.log('step 4');
        window.sessionStorage.setItem('facebookUserId', data);
        jointGameRef.current = true;
        fbIdRef.current = data;
        console.log('join game success');
      } else {
        console.log('call join game failed');
      }
    } catch (error) {
      console.log('error join game', error);
    }
  };

  fetchTokenAndJoinGame();
}, []);

const handleLoading = () => {
  setIsLoading(false);
}

  useEffect(()=>{
    window.addEventListener("load",handleLoading);
    return () => window.removeEventListener("load",handleLoading);
  },[])


  useEffect(() => { 
    console.log('joinGame', jointGameRef.current)
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

              if (isLoading) setIsLoading(false)
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

    // if (statusGame != "COUNTDOWN") {

    // }

    if (statusGame == "COUNTDOWN") {
      doNothing();
    }

    switch (statusGame) {
      case 'NONE':
        if (openDepositIcoin) setOpenDepositIcoin(false);
        if (openBetting) setOpenBetting(false);
        break;
      case 'PREPARESTART':
        if (openDepositIcoin) setOpenDepositIcoin(false);
        if (openBetting) setOpenBetting(false);
        break;
      case 'COUNTDOWN':
        if (openLostWin) setOpenLostWin(false);
        if (openRule) setOpenRule(false);
        if (openHistoryGame) setOpenHistoryGame(false);
        if (openMyHistory) setOpenMyHistory(false);

        // set for 
        setHidden('scroll');

        betCardRef.current = [];
        betSuccessRef.current = true;
        break;
      case 'RESULTWAITING':
        if (openDepositIcoin) setOpenDepositIcoin(false);
        if (openBetting) setOpenBetting(false);

        setHidden('scroll');
        
        break;
      case 'RESULT':
        if (openDepositIcoin) setOpenDepositIcoin(false);
        if (openBetting) setOpenBetting(false);

        if (openRule) setOpenRule(false);
        if (openHistoryGame) setOpenHistoryGame(false);

        if (openMyHistory) setOpenMyHistory(false);

        setHidden('hidden');
        if (!openGameResult) setOpenGameResult(true);
        break;
      case 'END':

        if (openDepositIcoin) setOpenDepositIcoin(false);
        if (openBetting) setOpenBetting(false);
        break;

    }

    toast.dismiss();
    toast(`giai doan ${statusGame}`, { duration: 2000, position: 'bottom-center'});

  }, [statusGame]);



  const handleCardSelection = (card: ZodiacCardModel) => {
    console.log('step 1')
    if (statusGame === "COUNTDOWN") {
      const betCard: BetZodiacCard = {
        ...card,
        transactionId: game?.transactionId ?? 0,
      };

      selectedCardRef.current = betCard;
      setOpenBetting(true);
      setHidden('hidden');
    } else {
      toast.remove();
      toast('Chưa đến thời gian đặt cược', { duration: 2000, position: 'bottom-center'});
      // if (openBetting) setOpenBetting((prevRule) => !prevRule);
    }
  };

const betCardRef = useRef<BetZodiacCard[]>([]);
const betSuccessRef = useRef<boolean>(true);

// send icoin betting
const betGame = async (zodiacCard: BetZodiacCard) => {
  let cardFound = false;
  const updatedBetCards = betCardRef.current.map((card) => {
    if (card.id === zodiacCard.id) {
      cardFound = true;
      return {
        ...card,
        totalIcoinBetting: (card.totalIcoinBetting || 0) + (zodiacCard.totalIcoinBetting || 0),
      };
    }
    return card;
  });

  if (!cardFound) {
    updatedBetCards.push(zodiacCard);
  }

  if (updatedBetCards.length > 4) {
    toast.dismiss();
    toast('Đặt cược tối đa 4 lá linh vật', { duration: 2000, position: 'bottom-center'});
  } else {
    toast.dismiss();
    betCardRef.current = updatedBetCards;
    try {
      const data = await bettingCard(game?.transactionId ?? 0, zodiacCard.totalIcoinBetting ?? 0, zodiacCard.id);
      if (data !== "OK") {
        betSuccessRef.current = false;
      }
    } catch (error) {
      console.error('Error betting:', error);
      betSuccessRef.current = false;
    }
  }
};

  const updateOnlineStatus = useCallback(() => {
    const onlineStatus = navigator.onLine;
    setOpenDisconnect(!onlineStatus)
  }, []);

  useOnlineStatus(updateOnlineStatus);

  // call flutter
  const callbackMyWallet = () => {
    // Check if flutter_inappwebview object and callHandler method are available
    if (window.flutter_inappwebview && typeof window.flutter_inappwebview.callHandler === 'function') {
      // Call the callHandler method with the handler name and shareLink variable
      window.flutter_inappwebview.callHandler('callbackMyWallet');
      setOpenDepositIcoin(false);
    } else {
      // Log an error message if flutter_inappwebview or callHandler is not available
      console.log('window.flutter_inappwebview or callHandler is not available');
    }
  }

  //use effect to this networkstatus
  const effectiveType = useNetworkStatus();

  if (isLoading) {
    return <Loading className='home_loading'/>
  }

  return (
    <div className='main'>
    
      <Toaster>
        {(t) => (
          <div
            style={{
              opacity: t.visible ? 1 : 0,
              transition: 'opacity 0.3s linear',
              background: 'rgba(0, 0 , 0, 0.5)',
              fontSize: 12,
              paddingTop: 6,
              paddingBottom: 5,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: '20px',
              color: '#fff'}}
          >
            {resolveValue(t.message, t)}
          </div>
        )}
      </Toaster>
      <h1>{effectiveType}</h1>
      <header className='section-header u-margin-top-huge1'>
        <SVG src={PrimaryText} className='u-margin-minus-bottom-big' />
        <p className='heading-secondary'>Hôm nay {game?.noGameToday} Ván</p>
        <SVG
          src={Rule}
          onClick={() => {
            setHidden('hidden');
            setOpenRule(true)}}
          className='section-header__rule'/>
      </header>

      <div className="result mt-7-5px">
        <ShortGameHistory openDialog={()=> {
          setHidden('hidden');
          setOpenHistoryGame(true);}}  statusGame={game?.status ?? 'NONE'}/>
        <Players/>
      </div>

      <BettingTable onSelectCard={handleCardSelection} openBetting={true} statusGame={statusGame ?? "NONE"}/>
      <MyHistory
        onOpen={() => {
          setHidden('hidden');
          setOpenMyHistory(true)}}
        onUserDataChange={handleIsWin}
        fbId={fbIdRef.current}
        betCards={betCardRef.current}
        betSuccess={betSuccessRef.current}
        statusGame={game?.status ?? 'NONE'}
        />
   
      <BestPlayers statusGame={game?.status ?? "NONE"}/>

      {/* Dialog when click */}
      <AnimatePresence>
        {openRule && <PopupRule onClose={()=> {
          setHidden('scroll');
          setOpenRule(false)}} />}

        {openBetting && selectedCardRef.current && (
                                        <DialogBetting
                                            onClose={() => {
                                              setHidden('scroll');
                                              setOpenBetting(false);
                                              selectedCardRef.current = null
                                            }}
                                            zodiacCardSelect={selectedCardRef.current}
                                            betIcoin={betGame}
                                            openDepositPupup={() => setOpenDepositIcoin(true)}
                                            zodiacGameId={game?.transactionId ?? 0}/>)}



        {openLostWin && <DialogLost
                            onClose={() => {
                              setHidden('scroll');
                              setOpenLostWin(false)}
                            }
                      
                            dialogType={dialogTypeRef.current}
                            totalIcoin={totalIcoinWinRef.current}
                            topUsers={game?.topUser ?? []}
                            zodiac={game?.zodiacCard.imgUrl ?? ''} />}




        {openHistoryGame && <PopupGameHistory
                              onClose={() => {
                                setHidden('scroll');
                                setOpenHistoryGame(false)}
                              }
                              zodiacs={img}/>}
        {openMyHistory && <PopupMyHistory onClose={()=> {
                                setHidden('scroll');
                                setOpenMyHistory(false)}
                              }/>}

        {openDepositIcoin && <PopupNotification 
                                key={'deposit'}
                                onClose={() => {
                                  setHidden('scroll');
                                  setOpenDepositIcoin(false)}} 
                                title = 'Bạn không đủ iCoin để chơi vui lòng nạp thêm!'
                                leftContentButton = 'Huỷ'
                                rightContentButton = 'Nạp thêm'
                                rightHandlerButton = {callbackMyWallet}
                                />}

        {openDisconnect && <PopupNotification 
                                key={'disconnect'}
                                onClose={() => {
                                  setHidden('scroll');
                                  setOpenDisconnect(false)}} 
                                title = 'Đường truyền không ổn định, vui lòng kiểm tra kết nối mạng'
                                leftContentButton = 'Thoát'
                                rightContentButton = 'Kết nối lại'
                                rightHandlerButton = {() => {
                                  window.location.reload();
                                }}
                                />}

      </AnimatePresence>

      {openGameResult && <PopupOpenCard
                              onClose={()=> {
                                setOpenGameResult(false)
                                setOpenLostWin(true)}}
                                zodiacUrl={game?.zodiacCard.imgUrl ?? ''}
      />}
    </div>
  );
}