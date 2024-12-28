import Icoin from "../../assets/icoin.svg";
import ArrowWhite from "../../assets/arrow-white.svg";
import { useEffect, useState, useContext, memo } from "react";
import { DataSnapshot, off, onValue, ref } from "firebase/database";
import { db } from "../../firebase/config";
import bgHeader from "../../assets/bg_my_bonus_today.png";
import MyTotalIcoin from "./MyTotalIcoin";
import BettingCard from "./BettingCard";
// import { log } from "../../utils/log";
import DepositIcoin from "./DepositIcoin";
import { GameInfoContext } from "../../store/game-info_context";
import IcoinWinToday from "./IcoinWinTody";
import NoGameToday from "./NoGameToday";
import toast from "react-hot-toast";
import { sortBettingCard } from "../../utils/utils";

import { useTranslation } from 'react-i18next';
import '../../utils/i18n'; // Import file cấu hình i18n

interface BetUser extends User {
  bettingCards?: BetZodiacCard[];
  isWin?: boolean;
  totalIcoinWin?: number;
  totalIcoinWinToday?: number;
}

interface MyInfoBetResultModel {
  onUserDataChange: (data: { isWin?: boolean; totalIcoinWin?: number }) => void;
  betCards: BetZodiacCard[];
  // fbId: string;
  setFirebaseData: (_: BetZodiacCard[]) => void;
  handleCharge: () => void
}

const MyBonusToday = memo(
  ({
    betCards,
    onUserDataChange,
    // fbId,
    setFirebaseData,
    handleCharge
  }: MyInfoBetResultModel) => {
    const { t } = useTranslation();

    const [betUser, setBetUser] = useState<BetUser>();
    const [icoinWinToday, setIcoinWinToday] = useState<number>(0);
    const [bettingCards, setBettingCards] = useState<BetZodiacCard[]>([]);

    const { stateGame, transactionId, fbId } = useContext(GameInfoContext);

    useEffect(() => {
      const stateRef = ref(db, `/zodiacGame/players/${fbId}`);
      const handleData = (snapshot: DataSnapshot) => {
        const data = snapshot.val();
        if (!data) return;

        const firebaseCards: BetZodiacCard[] = data.bettingCards
          ? Object.keys(data.bettingCards).map((cardId) => ({
              id: data.bettingCards[cardId]?.id || "",
              imageUrl: data.bettingCards[cardId]?.imageUrl || "",
              name: data.bettingCards[cardId]?.name || "",
              multiply: data.bettingCards[cardId]?.multiply || 0,
              totalIcoinBetting:
                data.bettingCards[cardId]?.totalIcoinBetting || 0,
            }))
          : [];

        let newFirebaseCards: BetZodiacCard[] = [];

        if (!(firebaseCards.length == 0 && stateGame == "NONE")) {
          setBettingCards((cardsPrev) => {
            newFirebaseCards = sortBettingCard(cardsPrev, firebaseCards);
            setFirebaseData([...newFirebaseCards.map((card) => ({ ...card }))]);
            return newFirebaseCards;
          });
        }


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
        setBetUser({ ...user });

        if (
          stateGame !== "PREPARESTART" &&
          stateGame !== "END" &&
          stateGame !== "NONE"
        ) {
          onUserDataChange({
            isWin: user.isWin,
            totalIcoinWin: user.totalIcoinWin,
          });
        }

        if (
          (stateGame !== "RESULTWAITING" &&
            stateGame !== "RESULT" &&
            stateGame !== "END") ||
          betCards.length === 0
        ) {
          setIcoinWinToday(user.totalIcoinWinToday || 0);
        }
      };

      onValue(stateRef, handleData);

      return () => off(stateRef, "value", handleData);
    }, [stateGame, transactionId, fbId]);

    useEffect(() => {
      try {
        if (betCards.length <= 4) {
          setBettingCards([...betCards.map((card) => ({ ...card }))]);
        } else {
          toast.dismiss();
          toast(t("Bet up to 4 mascot cards"), {
            duration: 2000,
            position: "bottom-center",
          });
        }
      } catch (error: any) {
        // log(error);
      }
    }, [betCards, transactionId]);

    return (
      <>
        <div className="section-myInfo mt-22px">
          <img src={bgHeader} className="section-myInfo__bg" />

          <div className="header-left">
            <p className="header-left--text">{t("Today's bonus")}:</p>
            <IcoinWinToday icoinImg={Icoin} icoinWinToday={icoinWinToday} />
          </div>

          <NoGameToday
            arrowImg={ArrowWhite}
            noGameToday={betUser?.noBettingToday || 0}
          />

          <div className="section-myInfo__cards">
            {bettingCards.map((betCard) => (
              <BettingCard key={betCard.id} betCard={betCard} />
            ))}
          </div>

          <div className="end">
            <MyTotalIcoin fbId={fbId} betCards={betCards} />
            <DepositIcoin handleCharge={handleCharge} />
          </div>
        </div>
      </>
    );
  }
);

export default MyBonusToday;
