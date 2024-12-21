import "../css/index.css";
import "../css/mps.css";

import tiger from "../assets/tiger.svg";
import buffalo from "../assets/buffalo.svg";
import chicken from "../assets/chicken.svg";
import dragon from "../assets/dragon.svg";
import goat from "../assets/goat.svg";
import snake from "../assets/snake.svg";
import horse from "../assets/horse.svg";
import pig from "../assets/pig.svg";

import MyBonusToday from "../components/myBonusDay/MyBonusToday";
import BestPlayers from "../components/bestPlayer/BestPlayers.tsx";
import { useCallback, useEffect, useRef, useState } from "react";
import DialogBetting from "../components/Modal/DialogBetting.tsx";
import DialogWinLost from "../components/Modal/DialogLostWin.tsx";
import PopupRule from "../components/popup/PopupRule";

import PopupGameHistory from "../components/popup/PopupGameHistory";
import PopupMyHistory from "../components/popup/PopupMyHistory";

import { db } from "../firebase/config";
import { ref, onValue, off } from "firebase/database";
import { AnimatePresence } from "framer-motion";

import PopupOpenCard from "../components/openCard/PopupOpenCard";

import BettingTable from "../components/bettingTable/BettingTable";

import Header from "../components/Header.tsx";

import { bettingCard } from "../api/bettingCard";
import toast, { Toaster, resolveValue } from "react-hot-toast";

import { useOnlineStatus } from "../api/checkDisconnect";
import { doNothing } from "../api/doNothing";
import Loading from "../components/Loading";
// import useNetworkStatus from '../api/useNetworkStatus';
import setHidden from "../utils/setBodyScroll";
import { updateNewBetCards, useQueryParams } from "../utils/utils";
import { fetchTokenAndJoinGame } from "../utils/fetchTokenAndJoinGame";
import { callbackFlutter } from "../utils/functions";
// import { log } from "../utils/log";
import { GameInfoContext } from "../store/game-info_context.tsx";
// import { useContext } from 'react';
import ShortInfoGame from "../components/shortInfoGame/ShortInfoGame.tsx";
import PopupDisconnect from "../components/popup/PopupDisconnect.tsx";
import PopupDeposit from "../components/popup/PopupDeposit.tsx";
import PopupOpenCircle from "../components/openCard/PopupOpenCircle.tsx";
// import MaintainModal from '../components/Modal/MaintainModal.tsx';
// import PopupCenter from '../components/popup/PopupCenter.tsx';
import MaintainModal from "../components/Modal/MaintainModal.tsx";

import useAudio from "../components/UseAudio.tsx";
import winAudio from "../../public/sounds/audio_win.wav";
import lostAudio from "../../public/sounds/audio_lost.wav";
import PopupInputPhone from "../components/popup/mps/PopupInputPhone.tsx";
import PopupInputOTP from "../components/popup/mps/PopupInputOTP.tsx";
import PopupNotify from "../components/popup/mps/PopupNotify.tsx";
import PopupPrepareRegister from "../components/popup/mps/PopupPrepageRegister.tsx";
// import { setLogCat } from "../api/sendLogcat.ts";

import * as mps from '../api/mps.ts';

const img: string[] = [
  buffalo,
  tiger,
  dragon,
  snake,
  horse,
  goat,
  chicken,
  pig,
];

// const label = "RESUT"

export default function Home() {
  const parameters = useQueryParams();

  const [statusGame, setStatusGame] = useState<StatusGame>("NONE");

  const [openGameResult, setOpenGameResult] = useState(false);
  const [openGameCircle, setopenGameCircle] = useState(false);

  const [openRule, setOpenRule] = useState(false);
  const [openLostWin, setOpenLostWin] = useState(false);
  const [openGameHistory, setOpenGameHistory] = useState(false);
  const [openBetting, setOpenBetting] = useState(false);
  const [openMyHistory, setOpenMyHistory] = useState(false);
  const [openDepositIcoin, setOpenDepositIcoin] = useState(false);
  const [openDisconnect, setOpenDisconnect] = useState(false);
  const [maintain, setMaintain] = useState(false);

  const isLoadingRef = useRef<boolean>(true);
  const dialogTypeRef = useRef<DialogType>("LOST");
  const selectedCardRef = useRef<BetZodiacCard | null>(null);
  const totalIcoinWinRef = useRef<number>(0);
  // const fbIdRef = useRef<string>("");
  const [fbId, setFbId] = useState<string>('')

  const cardResultRef = useRef<ZodiacCard | null>(null);
  const topUserRef = useRef<User[]>([]);
  const noGameRef = useRef<number>(0);
  const transactionId = useRef<number>(0);
  const bettingTimeEnd = useRef<boolean>(false);
  const pauseGameRef = useRef<boolean>(false);
  const totalIcoinRef = useRef<number>(0);

  const handleIsWin = useCallback(
    (data: {
      isWin?: boolean | undefined;
      totalIcoinWin?: number | undefined;
    }) => {
      if (data.totalIcoinWin) {
        totalIcoinWinRef.current = data.totalIcoinWin;
      }

      if (typeof data.isWin === "boolean") {
        if (data.isWin) {
          dialogTypeRef.current = "WIN";
        } else {
          dialogTypeRef.current = "LOST";
        }
      } else if ((data.totalIcoinWin || 0) > 0) {
        dialogTypeRef.current = "WIN";
      } else {
        dialogTypeRef.current = "LOST";
      }
    },
    []
  );

  useEffect(() => {
    const fetchAndSetFbId = async () => {
      const fbId = await fetchTokenAndJoinGame();
      setFbId(fbId)
    };

    fetchAndSetFbId();
  }, [parameters]);

  const playLostAudio = useAudio(lostAudio);
  const playWinAudio = useAudio(winAudio);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setOpenInputPhone(true);
    }

    const fetchGameInfo = async () => {
      const stateRef = ref(db, "zodiacGame/state");

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
                  facebookUserId: user.facebookUserId || "",
                  name: user.name || "",
                  profileImageLink: user.profileImageLink || "",
                  totalIcoin: user.totalIcoin || 0,
                  uid: user.uid || 0,
                };
                topUsers.push(topUser);
              }
            }
          }
          cardResultRef.current = { ...zodiacCard };
          topUserRef.current = [...topUsers].sort(
            (a, b) => (b.totalIcoin || 0) - (a.totalIcoin || 0)
          );
          noGameRef.current = data.noGameToday || 0;
          transactionId.current = data.transactionId || 0;
          setStatusGame(data.status);

          if (data.isPause !== pauseGameRef.current) {
            if (data.isPause) {
              handleModal({ state: "OPEN", type: "MAINTAIN" });
              pauseGameRef.current = true;
            } else {
              handleModal({ state: "CLOSE", type: "MAINTAIN" });
              pauseGameRef.current = false;
            }
          }

          if (isLoadingRef.current) {
            callbackFlutter("callbackDisableLoading");
            isLoadingRef.current = false;
          }
        }
      };

      onValue(stateRef, handleData);
      return () => off(stateRef, "value", handleData);
    };

    fetchGameInfo();
    switch (statusGame) {
      case "NONE":
        setOpenRule((statePrev) => {
          if (statePrev) return !statePrev;
          else return statePrev;
        });

        setOpenBetting((statePrev) => {
          if (statePrev) return !statePrev;
          else return statePrev;
        });

        setOpenGameHistory((statePrev) => {
          if (statePrev) return !statePrev;
          else return statePrev;
        });

        setOpenDepositIcoin((statePrev) => {
          if (statePrev) return !statePrev;
          else return statePrev;
        });

        setHidden("hidden");
        break;
      case "PREPARESTART":
        betCardRef.current = [];

        setOpenRule((statePrev) => {
          if (statePrev) return !statePrev;
          else return statePrev;
        });

        setOpenBetting((statePrev) => {
          if (statePrev) return !statePrev;
          else return statePrev;
        });

        break;
      case "COUNTDOWN":
        doNothing();
        bettingTimeEnd.current = false;

        setOpenLostWin((statePrev) => {
          if (statePrev) return !statePrev;
          else return statePrev;
        });

        setOpenGameResult((statePrev) => {
          if (statePrev) return !statePrev;
          else return statePrev;
        });

        setHidden("scroll");
        break;
      case "RESULTWAITING":
        setOpenDepositIcoin((statePrev) => {
          if (statePrev) return !statePrev;
          else return statePrev;
        });

        setOpenBetting((statePrev) => {
          if (statePrev) return !statePrev;
          else return statePrev;
        });

        break;  
      case "RESULT":
        setOpenRule((statePrev) => {
          if (statePrev) return !statePrev;
          else return statePrev;
        });

        setOpenGameHistory((statePrev) => {
          if (statePrev) return !statePrev;
          else return statePrev;
        });

        setOpenMyHistory((statePrev) => {
          if (statePrev) return !statePrev;
          else return statePrev;
        });

        setOpenDepositIcoin((statePrev) => {
          if (statePrev) return !statePrev;
          else return statePrev;
        });

        setOpenBetting((statePrev) => {
          if (statePrev) return !statePrev;
          else return statePrev;
        });

        setopenGameCircle((statePrev) => {
          if (statePrev) return statePrev;
          else return !statePrev;
        });

        setHidden("hidden");
        break;
      case "END":
        setopenGameCircle((statePrev) => {
          if (statePrev) return !statePrev;
          else return statePrev;
        });
        setOpenGameResult((statePrev) => {
          if (statePrev) return statePrev;
          else return !statePrev;
        });

        setHidden("hidden");
        break;
    }

  }, [statusGame]);

  const handleCardSelection = (card: ZodiacCardModel) => {
    try {
      if (statusGame === "COUNTDOWN" && !bettingTimeEnd.current) {
        const betCard: BetZodiacCard = {
          ...card,
          transactionId: transactionId.current || 0,
        };

        selectedCardRef.current = { ...betCard };
        handleModal({ state: "OPEN", type: "BETTING" });
      } else {
        toast.remove();
        toast("Chưa đến thời gian đặt cược", {
          duration: 2000,
          position: "bottom-center",
        });
      }
    } catch (error) {
      toast.remove();
      toast("Chưa đến thời gian đặt cược", {
        duration: 2000,
        position: "bottom-center",
      });
    }
  };

  const betCardRef = useRef<BetZodiacCard[]>([]);

  const setFirebaseData = useCallback((zodiacCards: BetZodiacCard[]) => {
    betCardRef.current = zodiacCards;
  }, []);

  // send icoin betting
  const handleBetting = async (zodiacCard: BetZodiacCard) => {
    const oldBetCards = [...betCardRef.current.map((card) => ({ ...card }))];
    try {
      const updatedBetCards = updateNewBetCards(zodiacCard, betCardRef.current);

      if (updatedBetCards.length > 4) {
        toast.dismiss();
        toast("Đặt cược tối đa 4 lá linh vật", {
          duration: 2000,
          position: "bottom-center",
        });
      } else {
        toast.dismiss();
        betCardRef.current = updatedBetCards;
        const data = await bettingCard(
          transactionId.current || 0,
          zodiacCard.totalIcoinBetting || 0,
          zodiacCard.id
        );
        if (data !== "OK") {
          betCardRef.current = oldBetCards;
        }
      }
    } catch (error) {
      console.error("Error betting:", error);
      betCardRef.current = oldBetCards;
    }

  };

  const updateOnlineStatus = useCallback(() => {
    // log("function update online status");
    const onlineStatus = navigator.onLine;
    setOpenDisconnect(!onlineStatus);
  }, []);

  useOnlineStatus(updateOnlineStatus);

  const handleModal = useCallback((stateModal: ModalSet) => {
    if (stateModal.state === "OPEN") {
      setHidden("hidden");
      switch (stateModal.type) {
        case "RULE":
          setOpenRule((statePrev) => {
            if (statePrev) return statePrev;
            else return !statePrev;
          });
          break;
        case "BETTING":
          setOpenBetting((statePrev) => {
            if (statePrev) return statePrev;
            else return !statePrev;
          });
          break;
        case "WINLOST":
          setOpenLostWin((statePrev) => {
            if (statePrev) return statePrev;
            else return !statePrev;
          });
          break;
        case "GAMEHISTORY":
          setOpenGameHistory((statePrev) => {
            if (statePrev) return statePrev;
            else return !statePrev;
          });
          break;
        case "MYHISTORY":
          setOpenMyHistory((statePrev) => {
            if (statePrev) return statePrev;
            else return !statePrev;
          });
          break;
        case "DEPOSIT":
            setOpenDepositIcoin((statePrev) => {
              if (statePrev) return statePrev;
              else return !statePrev;
            });
          break;
        case "DISCONNECT":
          setOpenDisconnect((statePrev) => {
            if (statePrev) return statePrev;
            else return !statePrev;
          });
          break;
        case "GAMECIRCLE":
          setopenGameCircle((statePrev) => {
            if (statePrev) return statePrev;
            else return !statePrev;
          });
          break;
        case "GAMERESULT":
          setOpenGameResult((statePrev) => {
            if (statePrev) return statePrev;
            else return !statePrev;
          });
          setOpenLostWin((statePrev) => {
            if (statePrev) return statePrev;
            else return !statePrev;
          });
          break;
        case "MAINTAIN":
          setMaintain((statePrev) => {
            if (statePrev) return statePrev;
            else return !statePrev;
          });
          break;
        default:
          break;
      }
    } else {
      switch (stateModal.type) {
        case "RULE":
          setOpenRule((statePrev) => {
            if (statePrev) return !statePrev;
            else return statePrev;
          });
          setHidden("scroll");
          break;
        case "BETTING":
          setOpenBetting((statePrev) => {
            if (statePrev) return !statePrev;
            else return statePrev;
          });
          if (openDepositIcoin) {
            setOpenDepositIcoin((statePrev) => {
              if (statePrev) return !statePrev;
              else return statePrev;
            });
          }
          setHidden("scroll");
          break;
        case "WINLOST":
          setOpenLostWin((statePrev) => {
            if (statePrev) return !statePrev;
            else return statePrev;
          });
          setHidden("scroll");
          break;
        case "GAMEHISTORY":
          setOpenGameHistory((statePrev) => {
            if (statePrev) return !statePrev;
            else return statePrev;
          });
          setHidden("scroll");
          break;
        case "MYHISTORY":
          setOpenMyHistory((statePrev) => {
            if (statePrev) return !statePrev;
            else return statePrev;
          });
          setHidden("scroll");
          break;
        case "DEPOSIT":
          setOpenDepositIcoin((statePrev) => {
            if (statePrev) return !statePrev;
            else return statePrev;
          });
          break;
        case "DISCONNECT":
          setHidden("scroll");
          setOpenDisconnect((statePrev) => {
            if (statePrev) return !statePrev;
            else return statePrev;
          });
          break;
        case "GAMECIRCLE":
          setopenGameCircle((statePrev) => {
            if (statePrev) return !statePrev;
            else return statePrev;
          });
          break;
        case "GAMERESULT":
          setOpenGameResult((statePrev) => {
            if (dialogTypeRef.current === "WIN") {
              playWinAudio();
            } else {
              playLostAudio();
            }
            if (statePrev) return !statePrev;
            else return statePrev;
          });
          setOpenLostWin((statePrev) => {
            if (statePrev) return statePrev;
            else return !statePrev;
          });
          break;
        case "MAINTAIN":
          setHidden("scroll");
          setMaintain((statePrev) => {
            if (statePrev) return !statePrev;
            else return statePrev;
          });
          break;
        default:
          break;
      }
    }
  }, []);


  // MPS
  
  const [openInputPhone, setOpenInputPhone] = useState(false);
  const [openInputOTP, setOpenInputOTP] = useState(false);
  const [openInputNotify, setOpenInputNotify] = useState(false);
  const [openPrepageRegister, setOpenPrepageRegister] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [titleOTP, setTitleOTP] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [popupCallback, setPopupCallback] = useState(() => () => {
    console.log("Default callback executed");
  });

  const mpsSendOTP = async (_phoneNumber?: string) => {
    if(_phoneNumber != null) {
      setPhoneNumber(_phoneNumber)
    }

    if(openInputPhone) {
      setOpenInputPhone(false);
    }

    if(!openInputOTP) {
      setOpenInputOTP(true);
    }

    const res = await mps.sendOTP(_phoneNumber || phoneNumber)
    console.log(res)

    if(res.data.status == "OK") {
      //
    } else {
      setErrorMessage(res.data.message);

    }

    alert(`OTP sent to ${phoneNumber}`);
  }



  const mpsVerifyOTP = async (otp: string) => {
    const res = await mps.verifyOTP(phoneNumber, otp)
    console.log(res)

    if(res.data.status == "OK") {
      setOpenInputOTP(false);
      
      localStorage.setItem('token', res.data.accessToken);
    } else {
      setErrorMessage(res.data.message);
    }
  }

  
  // const mpsRegister = (OTP: string) => {
  //   alert(`OTP sent to ${OTP}`);
  // }


  // const temp = () => {
  //   setPopupCallback(() => () => {
  //     setOpenInputOTP(false);
  //   });
  // }
  // END MPS

  const handleBettingTimeEnd = () => {
    bettingTimeEnd.current = true;
  };

  const handleTotalIcoin = (icoin: number) => {
    totalIcoinRef.current = icoin;
  };

  const ctxValue = {
    stateGame: statusGame,
    transactionId: transactionId.current,
    noGame: noGameRef.current,
    cardResult: cardResultRef.current,
    selectedCard: selectedCardRef.current,
    topUsers: topUserRef.current,
    setModal: handleModal,
    setSelectedCard: handleCardSelection,
    betting: handleBetting,
    iCoinWinTheGame: totalIcoinWinRef.current || 0,
    setBettingTimeEnd: handleBettingTimeEnd,
    totalIcoin: totalIcoinRef.current,
    setTotalIcoin: handleTotalIcoin,
    fbId: fbId,
  };

  if (isLoadingRef.current) {
    return <Loading className="home_loading" />;
  }

  return (
    <GameInfoContext.Provider value={ctxValue}>
      <div className="main">
        <Toaster>
          {(t) => (
            <div
              style={{
                opacity: t.visible ? 1 : 0,
                transition: "opacity 0.3s linear",
                background: "rgba(0, 0 , 0, 0.5)",
                fontSize: 12,
                paddingTop: 6,
                paddingBottom: 5,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: "20px",
                color: "#fff",
              }}
            >
              {resolveValue(t.message, t)}
            </div>
          )}
        </Toaster>

        <Header />
        <ShortInfoGame />
        <BettingTable />
        <MyBonusToday
          onUserDataChange={handleIsWin}
          betCards={betCardRef.current}
          setFirebaseData={setFirebaseData}
        />
        <BestPlayers />

        {/* Dialog when click */}

        <AnimatePresence>
          {openRule && <PopupRule />}

          {openBetting && selectedCardRef.current && <DialogBetting />}

          {openLostWin && (
            <DialogWinLost
              dialogType={dialogTypeRef.current}
              totalIcoin={totalIcoinWinRef.current}
              zodiac={cardResultRef.current?.imgUrl || ""}
            />
          )}

          {openGameHistory && <PopupGameHistory zodiacs={img} />}

          {openMyHistory && <PopupMyHistory />}

          {openDepositIcoin && <PopupDeposit key={"deposit"} />}

          {openDisconnect && <PopupDisconnect />}

          {maintain && <MaintainModal />}

          {/* MPS */}
          {openInputPhone && 
            <PopupInputPhone 
              mpsSendOTP={mpsSendOTP} 
              errorMessage={errorMessage}
            />  
          }

          {openInputOTP && 
            <PopupInputOTP 
              resendOTP={mpsSendOTP}
              _title={titleOTP} 
              mpsVerifyOTP={mpsVerifyOTP} 
              errorMessage={errorMessage}
            />
          }

          {openInputNotify && 
            <PopupNotify 
              _buttonName={buttonName}
              _title={title}
              _message={message}
              callback={popupCallback} 
            />}

          {openPrepageRegister && 
            <PopupPrepareRegister 
              phoneNumber="123213" 
              callback={null} 
            />
          }

          {/* END MPS */}
        </AnimatePresence>

        {/* {openGameResult && <PopupOpenCard />} */}
        {/* {openGameCircle && <PopupOpenCircle />} */}
      </div>
    </GameInfoContext.Provider>
  );
}
