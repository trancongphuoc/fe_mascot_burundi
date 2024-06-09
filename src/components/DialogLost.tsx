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

import SVG from 'react-inlinesvg';
import { motion } from 'framer-motion';
import useAudio from './UseAudio';
import winAudio from '../../public/sounds/crowd_victory.wav';
import lostAudio from '../../public/sounds/crowd_disappointed.wav';

interface DialogLostWinProps {
  onClose: () => void;
  dialogType: DialogType;
  totalIcoin: number;
  topUsers: User[];
  zodiac: string;
}

const DialogLostWin: React.FC<DialogLostWinProps> = ({ onClose, dialogType, totalIcoin, topUsers, zodiac }) => {
  const [bgHeader, setBgHeader] = useState(BgHeaderLost);
  const [bgContent, setBgContent] = useState(BgContentLost);
  const [lineLeft, setLineLeft] = useState(LineLeftLost);
  const [lineRight, setLineRight] = useState(LineLeftLost);

  const crown = [CrownGold, CrownSliver, CrownBronze];

  const playLostAudio = useAudio(lostAudio);
  const playWinAudio = useAudio(winAudio);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     console.log('Closing...');
  //     onClose();
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, [onClose]);

  useEffect(() => {
    if (dialogType === 'WIN') {
      setBgHeader(BgHeaderWin);
      setBgContent(BgContentWin);
      setLineLeft(LineLeftWin);
      setLineRight(LineRightWin);

      playWinAudio()
    } else if (dialogType === 'LOST') {
      setBgHeader(BgHeaderLost);
      setBgContent(BgContentLost);
      setLineLeft(LineLeftLost);
      setLineRight(LineRightLost);
      playLostAudio()
    }
  }, [dialogType]);

//   const top123: User[] = [{
//     name: "Dong Hoang Linh",
//     profileImageLink: "123",
//     totalIcoin: 123
//   },
//   {
//     name: "Dong Hoang Linh",
//     profileImageLink: "123",
//     totalIcoin: 12312
//   },
//   {
//     name: "Dong Hoang Linh",
//     profileImageLink: "123",
//     totalIcoin: 12
//   },
// ]

  const renderDialogContent = () => {
    switch (dialogType) {
      case 'LOST':
        return (
          <>
            <SVG src={TextApologize} className="lost--primary-text" onClick={e => {e.stopPropagation()}}/>
            <div className="lost__secondary" onClick={e => {e.stopPropagation()}}>
              <p className="lost__secondary--text1">Bạn bỏ lỡ phần thưởng lần đoán này</p>
              <p className="lost__secondary--text2">Đừng nản lòng, hãy cố gắng lên, tin tưởng bản thân!</p>
            </div>
          </>
        );
      case 'WIN':
        return (
          <>
            <SVG src={TextCongratution} className="win--primary-text" onClick={e => {e.stopPropagation()}}/>
            <div className="win__secondary" onClick={e => {e.stopPropagation()}}>
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
        >
        <SVG src={bgContent} className="lost--BgContent mb--1px" onClick={e => {e.stopPropagation()}}/>
        <SVG src={bgCardSelected} className="lost--zodiac-background" onClick={e => {e.stopPropagation()}}/>
        <SVG src={zodiac} className="lost--zodiac-card" onClick={e => {e.stopPropagation()}}/>
        <SVG src={BgLighter} className="lost--BgLighter" onClick={e => {e.stopPropagation()}}/>
        <SVG src={bgHeader} className="lost--BgHeader" onClick={e => {e.stopPropagation()}}/>
        
        {renderDialogContent()}
        
        <SVG src={lineLeft} className ="lost--light1"/>
        <p className="lost--tertiary" onClick={e => {e.stopPropagation()}}>TOP chiến thắng</p>
        <SVG src={lineRight} className ="lost--light2"/>

        {topUsers.sort((a, b) => (b.totalIcoin ?? 0) - (a.totalIcoin ?? 0)).map((user, index) => (
          <div className={`lost__no${index + 1}`} key={index} onClick={e => {e.stopPropagation()}}>
            <SVG className={`lost__no${index + 1}--img`} src={crown[index]}/>
            <div className={`lost__no${index + 1}--url`}>
              <img src={user.profileImageLink} alt="avatar user" />
            </div>
            <p className={`lost__no${index + 1}--name`}>{user.name}</p>
            <div className="lost__totalIcoin">
              <SVG className="lost__totalIcoin--img" src={Icoin}/>
              <p className="lost__totalIcoin--icoin">{user.totalIcoin}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default DialogLostWin;
