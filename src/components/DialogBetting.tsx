import React, { useState, useCallback, useRef } from 'react';
import bgCardSelect from '../assets/bg_card_selected_light.svg';
import Icoin from '../assets/icoin.svg';
import BgContent from '../assets/bg_content_win.svg';
import BgHeader from '../assets/bg_header_betting.svg';
import BgLighter from '../assets/bg_lighter.svg';
import { motion } from 'framer-motion';
import { bettingCard } from '../api/bettingCard';
import SVG from 'react-inlinesvg';

interface DialogBettingProps {
  onClose: () => void;
  zodiacGameId: number;
  zodiacCardSelect: ZodiacCardModel;
}

const DialogBetting: React.FC<DialogBettingProps> = ({ onClose, zodiacGameId, zodiacCardSelect }) => {
  const [stake, setStake] = useState(0);
  const clickAudioRef = useRef<HTMLAudioElement>(new Audio('zodiac-game/public/sounds/stake_button.wav'));
  const confirmRef = useRef<HTMLAudioElement>(new Audio('zodiac-game/public/sounds/confirm_button.wav'));


  const fetchData = useCallback(async () => {
    if (!stake || !zodiacGameId || !zodiacCardSelect) {
      console.log('Incomplete data');
      return;
    }

    onClose();

    try {
      const data = await bettingCard(zodiacGameId, stake, zodiacCardSelect.id);
      if (data === "OK") {
        console.log('Betting successful');
      } else {
        console.log('Betting failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [stake, zodiacGameId, zodiacCardSelect, onClose]);

  const playClickAudio = () => {
    const audio = clickAudioRef.current;
    audio.currentTime = 0; // Reset the audio to start from the beginning
    audio.play().catch((error) => {
      console.error('Audio play error:', error);
    });
  };


  const confirmAudio = () => {
    const audio = confirmRef.current;
    audio.currentTime = 0; // Reset the audio to start from the beginning
    audio.play().catch((error) => {
      console.error('Audio play error:', error);
    });
  };

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
          <p className="betting__totalIcoin--icoin">{stake}</p>
        </div>

        <motion.div
          whileTap={{ y: 1 }}
          onClick={() => {
            playClickAudio();
            setStake((prevStake) => prevStake + 10);
          }}
          className="betting--button">+10
        </motion.div>
        <motion.div
          whileTap={{ y: 1 }}
          onClick={() => {
            playClickAudio();
            setStake((prevStake) => prevStake + 100);
          }}
          className="betting--button-2">+100
        </motion.div>
        <motion.div
          whileTap={{ y: 1 }}
          onClick={() => {
            playClickAudio();
            setStake((prevStake) => prevStake + 1000);
          }}
          className="betting--button-3">+1000
        </motion.div>

        <motion.div
          whileTap={{ y: 1 }}
          onClick={() => {
            fetchData()
            confirmAudio()}}
          className="betting__confirm mb-33px mt-14-5px">
          <p className="betting__confirm--text">Xác nhận</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DialogBetting;
