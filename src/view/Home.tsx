import '../css/index.css';

import tiger from '../assets/tiger.svg';
import buffalo from '../assets/buffalo.svg';
import chicken from '../assets/chicken.svg';
import dragon from '../assets/dragon.svg';
import goat from '../assets/goat.svg';
import snake from '../assets/snake.svg';
import horse from '../assets/horse.svg';
import pig from '../assets/pig.svg';

import MyBonusToday from '../components/myBonusDay/MyBonusToday';
import BestPlayers from '../components/bestPlayer/BestPlayers.tsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import DialogBetting from '../components/Modal/DialogBetting.tsx';
import DialogWinLost from '../components/Modal/DialogLostWin.tsx';
import PopupRule from '../components/popup/PopupRule';
import PopupGameHistory from '../components/popup/PopupGameHistory';
import PopupMyHistory from '../components/popup/PopupMyHistory';

import { db } from '../firebase/config';
import { ref, onValue, off } from "firebase/database";
import { AnimatePresence } from 'framer-motion';

import PopupOpenCard from '../components/openCard/PopupOpenCard';

import BettingTable from '../components/bettingTable/BettingTable';

import Header from '../components/Header.tsx';

import { bettingCard } from '../api/bettingCard';
import toast, { Toaster, resolveValue } from 'react-hot-toast';

import { useOnlineStatus } from '../api/checkDisconnect';
import { doNothing } from '../api/doNothing';
import Loading from '../components/Loading';
// import useNetworkStatus from '../api/useNetworkStatus';
import setHidden from '../utils/setBodyScroll';
import { updateNewBetCards, useQueryParams } from '../utils/utils';
import { fetchTokenAndJoinGame } from '../utils/fetchTokenAndJoinGame';
import { callbackFlutter } from '../utils/functions';
import { log } from '../utils/log';
import { GameInfoContext } from '../store/game-info_context.tsx';
// import { useContext } from 'react';
import ShortInfoGame from '../components/shortInfoGame/ShortInfoGame.tsx';
import PopupDisconnect from '../components/popup/PopupDisconnect.tsx';
import PopupDeposit from '../components/popup/PopupDeposit.tsx';
import PopupOpenCircle from '../components/openCard/PopupOpenCircle.tsx';
// import MaintainModal from '../components/Modal/MaintainModal.tsx';
// import PopupCenter from '../components/popup/PopupCenter.tsx';
// import MaintainModal from '../components/Modal/MaintainModal.tsx';


const img: string[] = [buffalo, tiger, dragon, snake, horse, goat, chicken, pig];

export default function Home() {
  const parameters = useQueryParams();

  // const [game, setGame] = useState<ZodiacGameData | null>(null); 

  const [statusGame, setStatusGame] = useState<StatusGame>("NONE");

  const [gameInfo, setGameInfo] = useState<GameInfo>({stateGame: "NONE", transactionId: 0 })

  const [openGameResult, setOpenGameResult] = useState(false);
  const [openGameCircle, setopenGameCircle] = useState(false);

  const [openRule, setOpenRule] = useState(false);
  const [openLostWin, setOpenLostWin] = useState(false);
  const [openGameHistory, setOpenGameHistory] = useState(false);
  const [openBetting, setOpenBetting] = useState(false);
  const [openMyHistory, setOpenMyHistory] = useState(false);
  const [openDepositIcoin, setOpenDepositIcoin] = useState(false);
  const [openDisconnect, setOpenDisconnect] = useState(false);
  // const [maintain, setMaintain] = useState(false);

  const isLoadingRef = useRef<boolean>(true);
  const dialogTypeRef = useRef<DialogType>('LOST');
  const selectedCardRef = useRef<BetZodiacCard | null>(null);
  const totalIcoinWinRef = useRef<number>(0);
  const fbIdRef = useRef<string>('');

  const cardResultRef = useRef<ZodiacCard | null>(null);
  const topUserRef = useRef<User[]>([]);
  const noGameRef = useRef<number>(0);
  const transactionId = useRef<number>(0);

  // const zodiacImgs = useRef<ZodiacCardModel[]>([])

  // const gameInfoCtx = useContext(GameInfoContext);


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
    } else if ((data.totalIcoinWin || 0) > 0 ) {
      dialogTypeRef.current = 'WIN';
    } else {
      dialogTypeRef.current = 'LOST';
    }
  };

  useEffect(() => {
    const fetchAndSetFbId = async () => {
      const fbId = await fetchTokenAndJoinGame(parameters);
      fbIdRef.current = fbId;
    };

    fetchAndSetFbId();
  }, [parameters]);

  // const handleLoading = () => {
  //   setIsLoading(false);
  // }

  // useEffect(()=>{
  //   window.addEventListener("load",handleLoading);
  //   return () => window.removeEventListener("load",handleLoading);
  // },[])



  useEffect(() => { 
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
              cardResultRef.current = { ...zodiacCard }
              topUserRef.current = [...topUsers].sort((a, b) => (b.totalIcoin ?? 0) - (a.totalIcoin ?? 0));
              noGameRef.current = data.noGameToday ?? 0;
              transactionId.current = data.transactionId ?? 0;
              setStatusGame(data.status);
              // setMaintain(data.isPause);
          
              setGameInfo(prevState => ({
                ...prevState,
                stateGame: data.status ?? "NONE",
                transactionId: data.transactionId ?? 0,
              }))

              if (isLoadingRef.current) {
                callbackFlutter('callbackDisableLoading');
                isLoadingRef.current = false;
              }
          }
      };

      onValue(stateRef, handleData);
      return () => off(stateRef, 'value', handleData);

  };

    fetchGameInfo();

    if (statusGame != "COUNTDOWN") {
      if (openDepositIcoin) {
        setOpenDepositIcoin(false);
        setHidden('scroll');
      };
      
      if (openBetting) {
        setOpenBetting(false);
        setHidden('scroll');
      };
    }

    if (statusGame == "COUNTDOWN") {
      doNothing();
    }

    switch (statusGame) {
      case 'NONE':
        if (openGameResult) {
          setOpenGameResult(false)
          setHidden('scroll');
        };
        break;
      case 'PREPARESTART':

        betCardRef.current = [];

        if (openGameResult) {
          setOpenGameResult(false)
          setHidden('scroll');
        };

        break;
      case 'COUNTDOWN':
        if (openGameResult) {
          setOpenGameResult(false)
          setHidden('scroll');
        };

        if (openLostWin) {
          setOpenLostWin(false);
          setHidden('scroll');
        };
        if (openRule) {
          setOpenRule(false)
          setHidden('scroll');
        };
        if (openGameHistory) {
          setOpenGameHistory(false)
          setHidden('scroll');
        };
        if (openMyHistory) {
          setOpenMyHistory(false)
          setHidden('scroll');
        };
        break;
      case 'RESULTWAITING':
        if (openDepositIcoin) {
          setOpenDepositIcoin(false);
          setHidden('scroll');
        }

        if (openGameResult) {
          setOpenGameResult(false)
          setHidden('scroll');
        };     
        break;
      case 'RESULT':
        if (openRule) {
          setOpenRule(false)
          setHidden('scroll');
        };
        if (openGameHistory) {
          setOpenGameHistory(false)
          setHidden('scroll');
        };
        if (openMyHistory) {
          setOpenMyHistory(false)
          setHidden('scroll');
        };

        if (!openGameCircle) {
          setopenGameCircle(true)
          setHidden('hidden');
        };
        break;
      case 'END':

      if (openGameCircle) {
        setopenGameCircle(false)
        setHidden('scroll');
      };
        if (!openGameResult) {
          setOpenGameResult(true)
          setHidden('hidden');
        };
        break;
    }

    toast.dismiss();
    toast(`giai doan ${statusGame}`, { duration: 2000, position: 'bottom-center'});

  }, [statusGame]);



  const handleCardSelection = (card: ZodiacCardModel) => {
    log('function select card');
    if (statusGame === "COUNTDOWN") {
        const betCard: BetZodiacCard = {
        ...card,
        transactionId: transactionId.current ?? 0,
      };

      selectedCardRef.current = {...betCard};
      setOpenBetting(true);
      setHidden('hidden');
    } else {
      toast.remove();
      toast('Chưa đến thời gian đặt cược', { duration: 2000, position: 'bottom-center'});
    }
  };

const betCardRef = useRef<BetZodiacCard[]>([]);
// const betSuccessRef = useRef<boolean>(false);

const setFirebaseData = (zodiacCards: BetZodiacCard[]) => {
  betCardRef.current = zodiacCards;
}

// send icoin betting
const handleBetting = async (zodiacCard: BetZodiacCard) => {
  log('function betting');
  const oldBetCards = [...betCardRef.current.map(card => ({...card}))]
  try {
    const updatedBetCards = updateNewBetCards(zodiacCard, betCardRef.current);
    
    if (updatedBetCards.length > 4) {
      toast.dismiss();
      toast('Đặt cược tối đa 4 lá linh vật', { duration: 2000, position: 'bottom-center'});
    } else {
      toast.dismiss();
      betCardRef.current = updatedBetCards;
      const data = await bettingCard(transactionId.current ?? 0, zodiacCard.totalIcoinBetting ?? 0, zodiacCard.id);
      if (data !== "OK") {
        betCardRef.current = oldBetCards;
      }
    }
  } catch (error) {
    console.error('Error betting:', error);
    betCardRef.current = oldBetCards;
  }
  
  // selectedCardRef.current = null;
};

  const updateOnlineStatus = useCallback(() => {
    log('function update online status');
    const onlineStatus = navigator.onLine;
    setOpenDisconnect(!onlineStatus)
  }, []);


  useOnlineStatus(updateOnlineStatus);


const handleModal = useCallback((stateModal : ModalSet) => {

  if (stateModal.state === "OPEN") {
    setHidden('hidden');
    switch (stateModal.type) {
      case "RULE":
        setOpenRule(true)
        break;
      case "BETTING":
        setOpenBetting(true);
        break;
      case "WINLOST":
        setOpenLostWin(true)
        break;
      case "GAMEHISTORY":
        setOpenGameHistory(true)
        break;
      case "MYHISTORY":
        setOpenMyHistory(true)
        break;
      case "DEPOSIT":
        setOpenDepositIcoin(true);
        break;
      case "DISCONNECT":
        setOpenDisconnect(true);
        break;
      case "GAMECIRCLE":
        setopenGameCircle(true);
        break;
      case "GAMERESULT":
        setOpenGameResult(true);
        setOpenLostWin(true);
        break;
      default:
        break;
    }
  } else {
    setHidden('scroll');
    switch (stateModal.type) {
      case "RULE":
        setOpenRule(false)
        break;
      case "BETTING":
        setOpenBetting(false);
        break;
      case "WINLOST":
        setOpenLostWin(false)
        break;
      case "GAMEHISTORY":
        setOpenGameHistory(false)
        break;
      case "MYHISTORY":
        setOpenMyHistory(false)
        break;
      case "DEPOSIT":
        setOpenDepositIcoin(false);
        break;
      case "DISCONNECT":
        setOpenDisconnect(false);
        break;
      case "GAMECIRCLE":
        setopenGameCircle(false);
        break;
      case "GAMERESULT":
        setOpenGameResult(false);
        setOpenLostWin(true);
        break;
      default:
        break;
    }
  }
},[]); 

  const ctxValue = {
    stateGame: gameInfo.stateGame,
    transactionId: gameInfo.transactionId,
    noGame: noGameRef.current,
    cardResult: cardResultRef.current,
    selectedCard: selectedCardRef.current,
    topUsers: topUserRef.current,
    setModal: handleModal,
    setSelectedCard: handleCardSelection,
    betting: handleBetting,
    iCoinWinTheGame: totalIcoinWinRef.current ?? 0,
  }

  if (isLoadingRef.current) {
    return <Loading className='home_loading'/>
  }

  return (
    <GameInfoContext.Provider value={ctxValue}>
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
        <Header/>
        <ShortInfoGame/>
        <BettingTable />
        <MyBonusToday
          onUserDataChange={handleIsWin}
          betCards={betCardRef.current}
          fbId={fbIdRef.current}
          setFirebaseData={setFirebaseData}
        />
        <BestPlayers/>

        {/* Dialog when click */}

        <AnimatePresence>
          {openRule && <PopupRule />}

          {openBetting && selectedCardRef.current && <DialogBetting />}

          {openLostWin && <DialogWinLost
                              dialogType={dialogTypeRef.current}
                              totalIcoin={totalIcoinWinRef.current}
                              zodiac={cardResultRef.current?.imgUrl ?? ''} />}

          {openGameHistory && <PopupGameHistory zodiacs={img}/>}

          {openMyHistory && <PopupMyHistory />}

          {openDepositIcoin && <PopupDeposit />}

          {openDisconnect && <PopupDisconnect />}

          {/* {true && <MaintainModal/>} */}

        </AnimatePresence>

        {openGameResult && <PopupOpenCard />}
        {openGameCircle && <PopupOpenCircle />}
      </div>
    </GameInfoContext.Provider>
    
  );
}