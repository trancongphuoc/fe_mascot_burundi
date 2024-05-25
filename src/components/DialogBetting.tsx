import React, { useState } from 'react';
import backgroundSelected from '../assets/b.svg';
import dragon from '../assets/dragon.svg';
import Icoin from '../assets/icoin.svg';
import BgContent from '../assets/bg-result-game2.svg';
import BgHeader from '../assets/bg-betting-header.png';
import BgLighter from '../assets/bg_lighter.svg';
import { motion } from 'framer-motion';

interface DialogBettingProps {
  onClose: () => void; // Define onClose prop as a function that takes no arguments and returns void
}

const DialogBetting: React.FC<DialogBettingProps> = ({ onClose }) => {

  const [stake, setStake] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="betting-popup-overlay"
      onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="betting-popup"
        onClick={e => {e.stopPropagation()}}>
        <img src={BgContent} alt="card_background" className='betting--BgContent'></img>
        <img src={backgroundSelected} alt="card_background" className='betting--zodiac-background'></img>
        <img src={dragon} alt="card_zodiac" className='betting--zodiac-card'></img>

        <img src={BgLighter} alt="betting lighter" className='betting--BgLighter'></img>
        <img src={BgHeader} alt="betting header" className='betting--BgHeader'></img>

        <p className="betting--text">Chúc bạn nhận thưởng lớn</p>

        <div className ="betting__totalIcoin mb-15-5px mt-28px">
          <img className='betting__totalIcoin--img' src={Icoin} alt="" />
          <p className='betting__totalIcoin--icoin'>{stake}</p>
        </div>

        <div onClick={()=>setStake((stake) => stake + 10)} className ="betting--button">+10</div>
        <div onClick={()=>setStake((stake) => stake + 100)} className ="betting--button-2">+100</div>
        <div onClick={()=>setStake((stake) => stake + 1000)} className ="betting--button-3">+1000</div>
        <motion.div
          whileTap={{ y: 1}}
          onClick={onClose}
          className ="betting__confirm mb-33px mt-14-5px">
          <p className='betting__confirm--text'>Xác nhận</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DialogBetting;
