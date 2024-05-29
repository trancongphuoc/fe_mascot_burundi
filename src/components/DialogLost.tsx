import React, { useEffect, useState } from 'react';
import bgCardSelected from '../assets/bg_card_selected_light.svg';
import TextCongratution from '../assets/text_congregation.svg';
import TextApologize from '../assets/text_apologize.svg';
import BgContentWin from '../assets/bg_content_win.svg';
import BgContentLost from '../assets/bg_content_lost.svg';
import BgHeaderLost from '../assets/bg_header_lost.svg';
import BgHeaderWin from '../assets/bg_header_short_win.svg';
import Icoin from '../assets/icoin.svg';
import BgLighter from '../assets/bg_lighter.svg';
import CrownGold from '../assets/crown_gold.svg';
import CrownSliver from '../assets/crown_sliver.svg';
import CrownBronze from '../assets/crown_bronze.svg';

import LineLeftWin from '../assets/line_left_win.svg';
import LineRightWin from '../assets/line_right_win.svg';
import LineLeftLost from '../assets/line_left_lost.svg';
import LineRightLost from '../assets/line_right_lost.svg';


import dragon from '../assets/dragon.svg';

import SVG from 'react-inlinesvg';
import { motion } from 'framer-motion';

interface DialogBettingProps {
  onClose: () => void;
  dialogType: DialogType;
  totalIcoin: number;
  topUsers: TopUserModel[];
}

const DialogBetting: React.FC<DialogBettingProps> = ({ onClose, dialogType, totalIcoin, topUsers }) => {
  const [bgHeader, setBgHeader] = useState(BgHeaderLost);
  const [bgContent, setBgContent] = useState(BgContentLost);
  const [lineLeft, setLineLeft] = useState(LineLeftLost);
  const [lineRight, setLineRight] = useState(LineLeftLost);

  const crown = [CrownGold, CrownSliver, CrownBronze];

  useEffect(() => {
    if (dialogType === 'WIN') {
      setBgHeader(BgHeaderWin);
      setBgContent(BgContentWin);
      setLineLeft(LineLeftWin);
      setLineRight(LineRightWin);
    } else if (dialogType === 'LOST') {
      setBgHeader(BgHeaderLost);
      setBgContent(BgContentLost);
      setLineLeft(LineLeftLost);
      setLineRight(LineRightLost);
    }
  }, [dialogType]);

  const renderDialogContent = () => {
    switch (dialogType) {
      case 'LOST':
        return (
          <>
            <SVG src={TextApologize} className="lost--primary-text"/>
            <div className="lost__secondary">
              <p className="lost__secondary--text1">Bạn bỏ lỡ phần thưởng lần đoán này</p>
              <p className="lost__secondary--text2">Đừng nản lòng, hãy cố gắng lên, tin tưởng bản thân!</p>
            </div>
          </>
        );
      case 'WIN':
        return (
          <>
            <SVG src={TextCongratution} className="win--primary-text"/>
            <div className="win__secondary">
             <p className="win__secondary--text">Thật xuất sắc, bạn đã đoán trúng ván này</p>
             <div className="win__totalIcoin">
              <SVG className="win__totalIcoin--img" src={Icoin}/>
              <p className="win__totalIcoin--icoin">{totalIcoin}</p>
             </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="lost-popup-overlay">
      <motion.div
        initial={{ opacity: 0, y: 50}}
        animate={{ opacity: 1, y: 0}}
        exit={{ opacity: 0, y: 50}}
        transition={{ type: 'just'}}
        className="lost-popup"
        onClick={e => {e.stopPropagation()}}>
        {/* <div className="lost--BgContent" style={{ backgroundImage: `url(${bgContent})` }}></div> */}
        <SVG src={bgContent} className="lost--BgContent mb--1px"/>
        <SVG src={bgCardSelected} className="lost--zodiac-background" />
        <SVG src={dragon} className="lost--zodiac-card" />
        <SVG src={BgLighter} className="lost--BgLighter" />
        <SVG src={bgHeader} className="lost--BgHeader" />
        
        {renderDialogContent()}
        
        <SVG src={lineLeft} className ="lost--light1"/>
        <p className="lost--tertiary">TOP chiến thắng</p>
        <SVG src={lineRight} className ="lost--light2"/>

        {topUsers.map((user, index) => (
          <div className={`lost__no${index + 1}`} key={index}>
            <SVG className={`lost__no${index + 1}--img`} src={crown[index]}/>
            <div className={`lost__no${index + 1}--url`}>
              <img src={user.url} alt="avatar user" />
            </div>
            <p className={`lost__no${index + 1}--name`}>{user.name}</p>
            <div className="lost__totalIcoin">
              <SVG className="lost__totalIcoin--img" src={Icoin}/>
              <p className="lost__totalIcoin--icoin">{user.icoin}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default DialogBetting;
