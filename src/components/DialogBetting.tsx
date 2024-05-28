import React, { useState } from 'react';
import bgCardSelect from '../assets/bg_card_selected_light.svg';
import dragon from '../assets/dragon.svg';
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

const DialogBetting: React.FC<DialogBettingProps> = ({ onClose, zodiacGameId, zodiacCardSelect } : DialogBettingProps) => {
  const [stake, setStake] = useState(0);


  const fetchData = async () => {
    if (!stake || !zodiacGameId || !zodiacCardSelect) {
      console.log('lest data');
      return;
    }
    onClose();
    try {
      const data = await bettingCard(zodiacGameId, stake, zodiacCardSelect.id);
      if (data != null && data === "OK") {
        console.log('betting success')
      }
    } catch (error) {
      console.log('error', error);
    }
  };

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

        <SVG src={BgContent} className='betting--BgContent'/>
        <SVG src={bgCardSelect} className='betting--zodiac-background'/>
        <SVG src={zodiacCardSelect.imageUrl ?? ''} className='betting--zodiac-card'/>

        <SVG src={BgLighter} className='betting--BgLighter'/>
        <SVG src={BgHeader} className='betting--BgHeader'/>

        <p className="betting--text">Chúc bạn nhận thưởng lớn</p>

        <div className ="betting__totalIcoin mb-15px mt-28px">
          <img className='betting__totalIcoin--img' src={Icoin} alt="" />
          <p className='betting__totalIcoin--icoin'>{stake}</p>
        </div>

        <div onClick={()=>setStake((stake) => stake + 10)} className ="betting--button">+10</div>
        <div onClick={()=>setStake((stake) => stake + 100)} className ="betting--button-2">+100</div>
        <div onClick={()=>setStake((stake) => stake + 1000)} className ="betting--button-3">+1000</div>

        <motion.div
          whileTap={{ y: 1}}
          onClick={fetchData}
          className ="betting__confirm mb-33px mt-14-5px">
          <p className='betting__confirm--text'>Xác nhận</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DialogBetting;
