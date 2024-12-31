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
import { exitGameZodiac } from "../api/exitGameZodiac.ts";
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

import { useTranslation } from 'react-i18next';
import '../utils/i18n.ts'; // Import file cấu hình i18n
import PopupTopdaily from "../components/popup/mps/PopupTopDaily.tsx";
import PopupTopMonthly from "../components/popup/mps/PopupTopMonthly.tsx";

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
  // const parameters = useQueryParams();
  const { t, i18n } = useTranslation();

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

  const fetchAndSetFbId = async () => {
    const response = await fetchTokenAndJoinGame();
    setFbId(response?.data?.user.facebookUserId || "");
    handleTotalIcoin(response?.data?.user.totalIcoin || 0);
    setPremium(response?.data?.user.premium || false)
    setPhoneNumber(response?.data?.user.phone || "")
    setTotalStar(response?.data?.user.totalStar || 0)
    setTotalStarMonth(response?.data?.user.totalStarMonth || 0)

  };

  useEffect(() => {
    console.log(t('Wel come'))
    fetchAndSetFbId();

    const onBeforeUnload = () => {
      exitGameZodiac();
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

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
    if (!fbId) return;
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

        // setHidden("hidden"); //EDIT
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
        toast(t("Time to bet not yet"), {
          duration: 2000,
          position: "bottom-center",
        });
      }
    } catch (error) {
      toast.remove();
      toast(t("Time to bet not yet"), {
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
        toast(t("Bet up to 4 mascot cards"), {
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
    // console.log(stateModal.type);
    // console.log(stateModal.state);

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
        case "REGISTERANDCANCEL":
          setOpenPrepageRegisterAndCancel((statePrev) => {
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
        case "REGISTERANDCANCEL":
          setOpenPrepageRegisterAndCancel((statePrev) => {
            if (statePrev) return !statePrev;
            else return statePrev;
          });
          break;
        case "NOTIFY":
          setOpenNotify((statePrev) => {
            if (statePrev) return !statePrev;
            else return statePrev;
          });
          break;
        case "TOPDAILY":
          setOpenTopDaily((statePrev) => {
            if (statePrev) return !statePrev;
            else return statePrev;
          });
          break;
        case "TOPMONTHLY":
          setOpenTopMonthly((statePrev) => {
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
  const [openNotify, setOpenNotify] = useState(false);
  const [openPrepageRegisterAndCancel, setOpenPrepageRegisterAndCancel] = useState(false);

  const [openTopDaily, setOpenTopDaily] = useState(false);
  const [openTopMonthly, setOpenTopMonthly] = useState(false);


  const [errorMessage, setErrorMessage] = useState("");
  const [titleOTP, setTitleOTP] = useState("");
  const [titleNotify, setTitleNotify] = useState("");
  const [messageNotify, setMessageNotify] = useState("");
  const [buttonNameNotify, setButtonNameNotify] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [premium, setPremium] = useState(false);
  const [totalStar, setTotalStar] = useState(0);
  const [totalStarMonth, setTotalStarMonth] = useState(0);

  const [loading, setLoading] = useState(false);

  const [typeRegisterAndCancel, setTypeRegisterAndCancel] = useState("REGISTER")
  const [callbackNotify, setCallbackNotify] = useState(() => () => {
    // console.log("Default callback executed");
  });

  const [registerAndCancelCallBack, setRegisterAndCancelCallBack] = useState(() => () => {
    // console.log("Register and Cancel");
  });

  const mpsSendOTP = async (_phoneNumber?: string) => {
    if (_phoneNumber != null) {
      setPhoneNumber(_phoneNumber)
    }

    // if (openInputPhone) {
    //   setOpenInputPhone(false);
    // }

    // if (!openInputOTP) {
    //   setOpenInputOTP(true);
    // }

    setLoading(true)
    const res = await mps.sendOTP(_phoneNumber || phoneNumber)

    if (res.data.status == "OK") {
      setOpenInputPhone(false);
      setOpenInputOTP(true);
    } else {
      setErrorMessage(res.data.message);

    }

    setLoading(false)

    // alert(`OTP sent to ${phoneNumber}`);
  }



  const mpsVerifyOTP = async (otp: string) => {
    setLoading(true);
    const res = await mps.verifyOTP(phoneNumber, otp)

    if (res.data.status == "OK") {
      setOpenInputOTP(false);

      localStorage.setItem('token', res.data.accessToken);
      // window.location.reload();
      await fetchAndSetFbId();
    } else {
      setErrorMessage(res.data.message);
    }

    setLoading(false);
  }

  const mpsRegister = async () => {
    setLoading(true);
    const res = await mps.register()

    if (res.data.status == "OK") {
      setPremium(true);
      setOpenPrepageRegisterAndCancel(false);

      setTitleNotify(t("Success"));
      setMessageNotify(t("You registed MASCOT successfully. Service fee 120Fbu/1000 coins/day"));
      setButtonNameNotify(t("Go"));
      setCallbackNotify(() => () => {
        setOpenNotify(false);
        // location.reload();
      });

      setOpenNotify(true)
    } else {
      // setErrorMessage(res.data.message);

      setTitleNotify(t("OOP!"));
      setMessageNotify(res.data.message);
      setButtonNameNotify(t("CLOSE"));
      setCallbackNotify(() => () => {
        setOpenNotify(false);
        // location.reload();
      });

      setOpenNotify(true)
    }

    setLoading(false)
  }


  const mpsCancel = async () => {
    setLoading(true)
    const res = await mps.cancel()

    if (res.data.status == "OK") {
      setPremium(false);
      setOpenPrepageRegisterAndCancel(false);

      setTitleNotify(t("Success"));
      setMessageNotify(t("You canceled MASCOT successfully."));
      setButtonNameNotify(t("CLOSE"));
      setCallbackNotify(() => () => {
        setOpenNotify(false);
      });

      setOpenNotify(true)
    } else {
      setErrorMessage(res.data.message);
    }

    setLoading(false)
  }

  const mpsCharge = async () => {
    setLoading(true)
    const res = await mps.charge()

    if (res.data.status == "OK") {
      setTitleNotify(t("Buy more"));
      setMessageNotify(t("You have 1000 coins to join MASCOT, fee 100Fbu. Good luck to you!"));
      setButtonNameNotify(t("CLOSE"));
      setCallbackNotify(() => () => {
        setOpenNotify(false);
      });

      setOpenNotify(true)
    } else {
      setTitleNotify(t("OPPS!"));
      setMessageNotify(res.data.message);
      setButtonNameNotify(t("CLOSE"));
      setCallbackNotify(() => () => {
        setOpenNotify(false);
      });
    }
    setLoading(false)
  }

  const logout = async () => {
    exitGameZodiac()
    mps.logout();
  }

  const handleCharge = () => {
    setTitleNotify(t("Buy more"));
    setMessageNotify(t("Fee 100Fbu/1000 coins Join to MASCOT now for a chance to win 500.000 Fbu every month"));
    setButtonNameNotify(t("BUY"));
    setCallbackNotify(() => () => {
      mpsCharge();
    });

    setOpenNotify(true)
  }

  const handleRegisterAndCancel = (type: string) => {
    setOpenPrepageRegisterAndCancel(true)
    setTypeRegisterAndCancel(type);

    if (type === "REGISTER") {
      setRegisterAndCancelCallBack(() => () => {
        mpsRegister();
      });
    } else {
      setRegisterAndCancelCallBack(() => () => {
        mpsCancel();
      });
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
    premium: premium,
    totalStar: totalStar,
    totalStarMonth: totalStarMonth,
    phone: phoneNumber
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

        <Header logout={logout} openRanking={() => setOpenTopDaily(true)} cancel={() => handleRegisterAndCancel("CANCEL")} />
        <ShortInfoGame />
        <BettingTable />

        {/* {premium ? (
          <div style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px",
          }}>
            <button className="mps-button-register-and-cancel" onClick={() => { handleRegisterAndCancel("CANCEL") }} style={{ marginTop: 10, width: 100 }}><strong>{t('Cancel')}</strong></button>
          </div>
        ) : (
          <div style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px",
          }}>
            <button className="mps-button-register-and-cancel" onClick={() => { handleRegisterAndCancel("REGISTER") }} style={{ marginTop: 10, width: 100 }}><strong>{t("Register")}</strong></button>
          </div>
        )} */}

        {!premium &&
          <div style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px",
          }}>
            <button className="mps-button-register-and-cancel" onClick={() => { handleRegisterAndCancel("REGISTER") }} style={{ marginTop: 10, width: 100 }}><strong>{t("Register")}</strong></button>
          </div>}

        <MyBonusToday
          onUserDataChange={handleIsWin}
          betCards={betCardRef.current}
          setFirebaseData={setFirebaseData}
          handleCharge={handleCharge}
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
              loading={loading}
            />
          }

          {openInputOTP &&
            <PopupInputOTP
              resendOTP={mpsSendOTP}
              _title={titleOTP}
              mpsVerifyOTP={mpsVerifyOTP}
              errorMessage={errorMessage}
              loading={loading}
            />
          }

          {openNotify &&
            <PopupNotify
              _buttonName={buttonNameNotify}
              _title={titleNotify}
              _message={messageNotify}
              callback={callbackNotify}
              loading={loading}
            />}

          {openPrepageRegisterAndCancel &&
            <PopupPrepareRegister
              type={typeRegisterAndCancel}
              phoneNumber={phoneNumber}
              // callback={registerAndCancelCallBack} 
              callback={registerAndCancelCallBack}
              loading={loading}
            />
          }


          {openTopDaily && <PopupTopdaily />}
          {openTopMonthly && <PopupTopMonthly />}

          {/* END MPS */}
        </AnimatePresence>

        {openGameResult && <PopupOpenCard />}
        {openGameCircle && <PopupOpenCircle />}
      </div>
    </GameInfoContext.Provider>
  );
}
