import React, { useState } from 'react';
import bgCardSelect from '../../assets/bg_card_selected.svg';
import Icoin from '../../assets/icoin.svg';
import BgContent from '../../assets/bg_content_win.svg';
import BgHeader from '../../assets/bg_header_betting.svg';
import BgLighter from '../../assets/bg_lighter.svg';
import { motion } from 'framer-motion';
import SVG from 'react-inlinesvg';
// import useAudio from './UseAudio';
import toast from 'react-hot-toast';

interface DialogBettingProps {
  onClose: () => void;
  zodiacGameId: number;
  zodiacCardSelect: ZodiacCardModel;
  betIcoin: (zodiacCard: BetZodiacCard) => void;
  openDepositPupup: () => void;
}

const DialogBetting: React.FC<DialogBettingProps> = ({ onClose, zodiacGameId, zodiacCardSelect, betIcoin, openDepositPupup }) => {
  const [stakes, setStakes] = useState(0);

  // const clickAudioRef = useAudio('/zodiac-game/public/sounds/confirm_button.wav');
  // const confirmRef = useAudio('/zodiac-game/public/sounds/stake_button.wav');


  const sendDataOut = () => {
    if (!stakes || !zodiacGameId || !zodiacCardSelect) {
      if (!stakes) {
        toast.dismiss();
        toast(`Thiếu stake`, { duration: 2000, position: 'bottom-center'});
      } else if (!zodiacGameId) {
        toast.dismiss();
        toast(`Thiếu thông tin game id`, { duration: 2000, position: 'bottom-center'});
      } else if (!zodiacCardSelect) {
        toast.dismiss();
        toast(`Thiếu card select`, { duration: 2000, position: 'bottom-center'});
      }
      // toast(`Thiếu thông tin ${stakes}-${zodiacGameId}-${zodiacCardSelect}`, { duration: 2000, position: 'bottom-center',  className: 'custom-toast'});
      onClose();
      return;
    }
    const betCard: BetZodiacCard = {
      ...zodiacCardSelect,
      totalIcoinBetting: stakes ?? 0,
    }
    onClose();
    betIcoin(betCard);
  };


  const handleStake = (stake: number) => {
    if (stake) {
      const totalIcoinString = window.sessionStorage.getItem('totalIcoin');
      const totalIcoin = totalIcoinString !== null ? parseInt(totalIcoinString, 10) : 0;
      console.log('xxxx', totalIcoin)
      if (stake <= totalIcoin) {
        setStakes(prevStake => prevStake + stake)
      } else {
        openDepositPupup();
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="betting-popup-overlay"
      onClick={onClose}
      transition={{ type: 'just'}}
      aria-labelledby="betting-dialog-title"
      role="dialog">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="betting-popup"
        aria-modal="true">
        
        <SVG src={BgContent} className="betting--BgContent" onClick={(e) => e.stopPropagation()}/>
        <SVG src={bgCardSelect} className="betting--zodiac-background" onClick={(e) => e.stopPropagation()}/>
        {zodiacCardSelect.imageUrl && <SVG
                                        src={zodiacCardSelect.imageUrl}
                                        onClick={(e) => e.stopPropagation()}
                                        className="betting--zodiac-card" />}
        <SVG src={BgLighter} className="betting--BgLighter" onClick={(e) => e.stopPropagation()}/>
        <SVG src={BgHeader} className="betting--BgHeader" onClick={(e) => e.stopPropagation()}/>

        <p className="betting--text" onClick={(e) => e.stopPropagation()}>Chúc bạn nhận thưởng lớn</p>

        <div className="betting__totalIcoin mb-15px mt-28px" onClick={(e) => e.stopPropagation()}>
          <img className="betting__totalIcoin--img" src={Icoin} alt="Icoin" />
          <p className="betting__totalIcoin--icoin">{stakes}</p>
        </div>

        <div key={'stake-10'}
          onClick={(e) => {
            e.stopPropagation()
            console.log(window.sessionStorage.getItem('totalIcoin')); 
            handleStake(10);
          }}
          className="betting--button">+10
        </div>
        <div
          key={'stake-100'}
          onClick={(e) => {
            e.stopPropagation();
            // clickAudioRef();
            handleStake(100)
          }}
          className="betting--button-2">+100
        </div>
        <div
          key={'stake-1000'}
          onClick={(e) => {
            e.stopPropagation()
            // clickAudioRef();
            handleStake(1000)
          }}
          className="betting--button-3">+1000
        </div>

        <div
          onClick={sendDataOut}
          className="betting__confirm mb-34px mt-14-5px">
          <p className="betting__confirm--text">Xác nhận</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DialogBetting;