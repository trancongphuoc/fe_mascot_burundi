import React, { useState, useCallback, useRef } from 'react';
import bgCardSelect from '../assets/bg_card_selected_light.svg';
import Icoin from '../assets/icoin.svg';
import BgContent from '../assets/bg_content_win.svg';
import BgHeader from '../assets/bg_header_betting.svg';
import BgLighter from '../assets/bg_lighter.svg';
import { motion } from 'framer-motion';
import SVG from 'react-inlinesvg';
import useAudio from './UseAudio';

interface DialogBettingProps {
  onClose: () => void;
  zodiacGameId: number;
  zodiacCardSelect: ZodiacCardModel;
  betIcoin: (zodiacCard: ZodiacCardModel, stake: number) => void;
}

const DialogBetting: React.FC<DialogBettingProps> = ({ onClose, zodiacGameId, zodiacCardSelect, betIcoin }) => {
  const [stakes, setStakes] = useState(0);
  const clickAudioRef = useAudio('/zodiac-game/public/sounds/confirm_button.wav');
  const confirmRef = useAudio('/zodiac-game/public/sounds/stake_button.wav');


  const sendDataOut = useCallback(async () => {
    if (!stakes || !zodiacGameId || !zodiacCardSelect) {
      console.log('Incomplete data');
      return;
    }
    betIcoin(zodiacCardSelect, stakes);
    onClose();
    
  }, [stakes, zodiacGameId, zodiacCardSelect, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="betting-popup-overlay"
      onClick={onClose}
      aria-labelledby="betting-dialog-title"
      role="dialog">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="betting-popup"
        onClick={(e) => e.stopPropagation()}
        aria-modal="true">
        
        <SVG src={BgContent} className="betting--BgContent" />
        <SVG src={bgCardSelect} className="betting--zodiac-background" />
        {zodiacCardSelect.imageUrl && <SVG src={zodiacCardSelect.imageUrl} className="betting--zodiac-card" />}
        <SVG src={BgLighter} className="betting--BgLighter" />
        <SVG src={BgHeader} className="betting--BgHeader" />

        <p className="betting--text">Chúc bạn nhận thưởng lớn</p>

        <div className="betting__totalIcoin mb-15px mt-28px">
          <img className="betting__totalIcoin--img" src={Icoin} alt="Icoin" />
          <p className="betting__totalIcoin--icoin">{stakes}</p>
        </div>

        <motion.div
          whileTap={{ y: 1 }}
          onClick={() => {
            clickAudioRef();
            setStakes((prevStake) => prevStake + 10);
          }}
          className="betting--button">+10
        </motion.div>
        <motion.div
          whileTap={{ y: 1 }}
          onClick={() => {
            clickAudioRef();
            setStakes((prevStake) => prevStake + 100);
          }}
          className="betting--button-2">+100
        </motion.div>
        <motion.div
          whileTap={{ y: 1 }}
          onClick={() => {
            clickAudioRef();
            setStakes((prevStake) => prevStake + 1000);
          }}
          className="betting--button-3">+1000
        </motion.div>

        <motion.div
          whileTap={{ y: 1 }}
          onClick={() => {
            sendDataOut()
            confirmRef()}}
          className="betting__confirm mb-33px mt-14-5px">
          <p className="betting__confirm--text">Xác nhận</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DialogBetting;
