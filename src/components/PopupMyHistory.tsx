import BgCardLost from '../assets/bg_card_nomarl.svg';
import BgCardWin from '../assets/bg_card_selected.svg';

import TextHistory from '../assets/text-mine-history.svg';
import IcoinLost from '../assets/icoin-lost.svg';
import IcoinWin from '../assets/icoin.svg'
import SVG from 'react-inlinesvg';
import { useEffect, useState } from 'react';
import { fetchMyHistory } from '../api/getMyHistory';
import bgMyHistory from '../assets/bg_my_history.svg';
import ScaleLoader from 'react-spinners/ScaleLoader';

interface PopupMineResultProps {
  onClose: () => void;
}

interface MyHistory {
  time: Date,
  noGame: number,
  totalIcoinWin: number | null,
  totalIcoinBetting: number,
  zodiacCardId: string,
  zodiacCards: BetZodiacCard[],
  netIcoin: number,
}

interface BetZodiacCard extends ZodiacCardModel {
  totalIcoinBetting: number,
}

const PopupMineResult: React.FC<PopupMineResultProps> = ({ onClose }) => {

  const [myHistory, setMyHistory] = useState<MyHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMyHistory();
        if (data != null) {
          const myHistories: MyHistory[] = data.map((history: any) => ({
            time: new Date(history.addTime),
            noGame: history.noGame,
            totalIcoinWin: history.totalIcoinWin ?? 0,
            totalIcoinBetting: history.totalIcoinBetting ?? 0,
            zodiacCardId: history.zodiacCardId,
            zodiacCards: history.zodiacCards,
            netIcoin: (history.totalIcoinWin ?? 0) - (history.totalIcoinBetting ?? 0),
          }));
          setMyHistory(myHistories);
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div onClick={onClose} className="popup-overlay">

      <div className="mine-popup" onClick={e => e.stopPropagation()}>

        <SVG src={bgMyHistory} className="mine-popup__bg"/>

        <SVG src={ loading ? TextHistory : ''} className="mine-popup--header mt-7px mb-12-5px"/>
        <div className="mine-popup__title mb-7px">
            <p className="mine-popup__title--head1">Ván</p>
            <p className="mine-popup__title--head2">Mức cược</p>
        </div>

        {
          loading ? (
            <div className="mine-popup__loading">
              <ScaleLoader color='#F15350' />
            </div>
          ) : (
            <div className="mine-popup__content">
            {
                myHistory.map((mine, index) => (
                  <div key={index} className="item">
                    <div className="item__time">
                      <p className="item__time--index">{mine.noGame}</p>
                      <p className="item__time--hour">{mine.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
                      <p className="item__time--date">{mine.time.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })}</p>
                    </div>
                    <div className="bets">
                      {
                        mine.zodiacCards.map((card, index) => (
                          <div key={index} className="bet">
                            <p className="bet--index">{index + 1}</p>
                            <SVG src={card.id === mine.zodiacCardId ? BgCardWin : BgCardLost} className="bet__card--bg"/>
                            <SVG src={card.imageUrl} className="bet__card--zodiac"/>
                            <p className="bet--bonus">x{card.multiply}</p>
                            <div className="bet__icoin">
                              <SVG className="bet__icoin--img" src={card.id === mine.zodiacCardId ? IcoinWin : IcoinLost}/>
                              <p className="bet__icoin--data">{card.totalIcoinBetting}</p>
                            </div>
                          </div>
                        ))
                      }
                    </div>
             
                    <div className="item__icoin">
                      <p className={mine.netIcoin > 0 ? "item__icoin--data-win" : "item__icoin--data-lost"}>
                            {mine.netIcoin > 0 ?
                            `+${mine.netIcoin}` :
                            mine.netIcoin}</p>
                      <SVG className="item__icoin--img" src={mine.netIcoin > 0 ? IcoinWin : IcoinLost}/>
                    </div>
                  </div>
                ))
             }
          </div>
          )
        }
      </div>
    </div>
  );
};

export default PopupMineResult;
