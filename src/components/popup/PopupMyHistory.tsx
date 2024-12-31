import BgCardLost from '../../assets/bg_card_nomarl.svg';
import BgCardWin from '../../assets/bg_card_selected.svg';

import TextHistory from '../../assets/text-mine-history-2.svg';
import IcoinLost from '../../assets/icoin-lost.svg';
import IcoinWin from '../../assets/icoin_small.svg';
import SVG from 'react-inlinesvg';
import { useEffect, useState, useContext } from 'react';
import { fetchMyHistory } from '../../api/getMyHistory';
// import bgMyHistory from '../../assets/bg_my_history.svg';
import bgMyHistory from '../../assets/bg_my_history.png';
import bgMyHistory075x from '../../assets/bg_my_history_075x.png';
import Loading from '../Loading';
import PopupCenter from './PopupCenter';
import LazyImage from '../LazyImage';
import { formatNumber } from '../../utils/utils';
import { GameInfoContext } from '../../store/game-info_context';  
import { useTranslation } from 'react-i18next';
import '../../utils/i18n'; // Import file cấu hình i18n

const PopupMineResult = () => {

  const [myHistory, setMyHistory] = useState<MyHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { setModal, stateGame } = useContext(GameInfoContext);
  const { t } = useTranslation();
  useEffect(() => {
      new Image().src = bgMyHistory;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMyHistory();
        if (data != null && data != "FAILED") {
          const myHistories = [...data.map((item) => ({...item}))];
          if (stateGame !== "RESULTWAITING" && stateGame !== "RESULT" && stateGame !== "END") {
            setMyHistory([...myHistories]);
          }
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <PopupCenter
      className='popup-overlay-history'
      onClick={() => setModal({ state: "CLOSE", type: "MYHISTORY"})}
      classNameChild='mine-popup'>

        {/* <SVG src={bgMyHistory} className="mine-popup__bg"/> */}

        {/* <img src={bgMyHistory} className="mine-popup__bg"/> */}

        <LazyImage
          lowResSrc={bgMyHistory075x}
          highResSrc={bgMyHistory}
          alt='my history'
          className="mine-popup__bg"
        />

        <SVG style={{width: "60%"}} src={ loading ? TextHistory : ''} className="mine-popup--header mt-7px mb-12-5px"/>
        
        <div className="mine-popup__title mb-7px">
            <p className="mine-popup__title--head1">{t("Round")}</p>
            <p className="mine-popup__title--head2">{t("Betting level")}</p>
        </div>

        {
          loading ? ( <Loading />) : (
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
                        mine.zodiacCards.map((card) => (
                          <div key={card.id} className="bet">
                            <p className="bet--index">{card.id.slice(-1)}</p>
                            <SVG src={card.id === mine.zodiacCardId ? BgCardWin : BgCardLost} className="bet__card--bg"/>
                            <SVG src={card.imageUrl} className="bet__card--zodiac"/>
                            <p className="bet--bonus">x{card.multiply}</p>
                            <div className="bet__icoin">
                              <SVG className="bet__icoin--img" src={card.id === mine.zodiacCardId ? IcoinWin : IcoinLost}/>
                              <p className="bet__icoin--data">{formatNumber(card.totalIcoinBetting ?? 0)}</p>
                            </div>
                          </div>
                        ))
                      }
                    </div>
             
                    <div className="item__icoin">
                      <p className={mine.totalIcoinWin > 0 ? "item__icoin--data-win" : "item__icoin--data-lost"}>
                            {mine.totalIcoinWin > 0 ? `+${formatNumber(mine.totalIcoinWin)}` : 0}</p>
                      <SVG className="item__icoin--img" src={IcoinWin}/>
                    </div>
                  </div>
                ))
             }
          </div>
          )
        }
      </PopupCenter>
  );
};

export default PopupMineResult;
