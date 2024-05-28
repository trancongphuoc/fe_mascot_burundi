import BgCardLost from '../assets/bg_card_nomarl.svg';
import BgCardWin from '../assets/bg_card_selected.svg';

import TextHistory from '../assets/text-mine-history.svg';
import IcoinLost from '../assets/icoin-lost.svg';
import IcoinWin from '../assets/icoin.svg'
import SVG from 'react-inlinesvg';
import { useEffect, useState } from 'react';
import { fetchMyHistory } from '../api/getMyHistory';

interface PopupMineResultProps {
  onClose: () => void;
  mineHistory: BetInfo[];
}

const PopupMineResult: React.FC<PopupMineResultProps> = ({ onClose, mineHistory }) => {

  // const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchMyHistory();
  //       if (data != null) {
  //         setGameHistory(data);
  //       }
  //     } catch (error) {
  //       console.log('error', error);
  //     }
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div onClick={onClose} className="popup-overlay">

      <div className="mine-popup" onClick={e => e.stopPropagation()}>

        <SVG src={TextHistory} className="mine-popup--header mt-7px mb-12-5px"/>
        <div className="mine-popup__title mb-7px">
            <p className="mine-popup__title--head1">Ván</p>
            <p className="mine-popup__title--head2">Mức cược</p>
        </div>

        <div className="mine-popup__content">
           {
              mineHistory.map((mine, index) => (
                <div key={index} className="item">
                  <div className="item__time">
                    <p className="item__time--index">{index}</p>
                    <p className="item__time--hour">{mine.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
                    <p className="item__time--date">{mine.time.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })}</p>
                  </div>
                  <div className="bets">
                    {
                      mine.bettings.map((bet, index) => (
                        <div className="bet">
                          <p className="bet--index">{index + 1}</p>
                          <SVG src={bet.icoin > 0 ? BgCardWin : BgCardLost} className="bet__card--bg"/>
                          <SVG src={bet.zodiac} className="bet__card--zodiac"/>
                          <p className="bet--bonus">{bet.bonus}</p>
                          <div className="bet__icoin">
                            <SVG className="bet__icoin--img" src={bet.icoin > 0 ? IcoinWin : IcoinLost}/>
                            <p className="bet__icoin--data">{bet.icoin}</p>
                          </div>
                        </div>
                      ))
                    }
                  </div>

                  <div className="item__icoin">
                    <p className={mine.totalIcoin > 0 ? "item__icoin--data-win" : "item__icoin--data-lost"}>{mine.totalIcoin > 0 ? `+${mine.totalIcoin}` : mine.totalIcoin}</p>
                    <SVG className="item__icoin--img" src={IcoinWin}/>
                  </div>
                </div>
              ))
           }
        </div>
      </div>
    </div>
  );
};

export default PopupMineResult;
