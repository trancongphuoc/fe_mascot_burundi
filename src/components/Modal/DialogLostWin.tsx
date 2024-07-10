import bgCardSelected from '../../assets/bg_card_selected_light.svg';
import TextCongratution from '../../assets/text_congregation.svg';
import TextApologize from '../../assets/text_apologize.svg';

import BgContentWin075x from '../../assets/bg_content_betting_075x.png';
import BgContentWin2x from '../../assets/bg_content_betting_2x.png';

import BgContentLost075x from '../../assets/bg_content_lost_075x.png';
import BgContentLost2x from '../../assets/bg_content_lost_2x.png';

import BgHeaderLost from '../../assets/bg_header_lost.svg';
import BgHeaderWin from '../../assets/bg_header_short_win.svg';
import Icoin from '../../assets/icoin.svg';
import BgLighter from '../../assets/bg_lighter.svg';
import CrownGold from '../../assets/crown_gold.svg';
import CrownSliver from '../../assets/crown_sliver.svg';
import CrownBronze from '../../assets/crown_bronze.svg';

import LineLeftWin from '../../assets/line_left_win.svg';
import LineRightWin from '../../assets/line_right_win.svg';
import LineLeftLost from '../../assets/line_left_lost.svg';
import LineRightLost from '../../assets/line_right_lost.svg';

import SVG from 'react-inlinesvg';
import { motion } from 'framer-motion';

// import useAudio from '../UseAudio';
// import winAudio from '../../../public/sounds/audio_win.wav';
// import lostAudio from '../../../public/sounds/audio_lost.wav';

import { handleErrorAvartar } from '../DefaultUserAvartar';
import LazyImage from '../LazyImage';
import { formatNumber } from '../../utils/utils';
// import { useEffect } from 'react';
import { GameInfoContext } from '../../store/game-info_context';
import { useContext } from 'react';



interface DialogLostWinProps {
  dialogType: DialogType;
  totalIcoin: number;
  zodiac: string;
}

const lost = {
  bgHeader: BgHeaderLost,
  bgContent075x: BgContentLost075x,
  bgContent2x: BgContentLost2x,
  lineLeft: LineLeftLost,
  lineRight: LineRightLost
}

const win = {
  bgHeader: BgHeaderWin,
  bgContent075x: BgContentWin075x,
  bgContent2x: BgContentWin2x,
  lineLeft: LineLeftWin,
  lineRight: LineRightWin
}

const crown = [CrownGold, CrownSliver, CrownBronze];


// const top123: User[] = [{
//   name: "Trần Tuấn Hùng",
//   profileImageLink: "123",
//   totalIcoin: 1000
// },
// {
//   name: "Lê Hải Yến",
//   profileImageLink: "123",
//   totalIcoin: 3000
// },
// {
//   name: "Ngọc Hoàng",
//   profileImageLink: "123",
//   totalIcoin: 900
// },
// ]


const DialogLostWin = ({zodiac, totalIcoin, dialogType}: DialogLostWinProps) => {

  const { setModal, topUsers } = useContext(GameInfoContext);

  console.log('check dialogType', dialogType);

  const contentLost = <>
                      <SVG src={TextApologize} className="lost--primary-text" onClick={e => {e.stopPropagation()}}/>
                      <div className="lost__secondary" onClick={e => {e.stopPropagation()}}>
                        <p className="lost__secondary--text1">Bạn bỏ lỡ phần thưởng lần đoán này</p>
                        <p className="lost__secondary--text2">Đừng nản lòng, hãy cố gắng lên, tin tưởng bản thân!</p>
                      </div>
                    </>;
  const contentWin = <>
                      <SVG src={TextCongratution} className="win--primary-text" onClick={e => {e.stopPropagation()}}/>
                      <div className="win__secondary" onClick={e => {e.stopPropagation()}}>
                      <p className="win__secondary--text">Thật xuất sắc, bạn đã đoán trúng ván này</p>
                      <div className="win__totalIcoin">
                        <SVG className="win__totalIcoin--img" src={Icoin}/>
                        <p className="win__totalIcoin--icoin">{totalIcoin}</p>
                      </div>
                      </div>
                    </>;

  // const playLostAudio = useAudio(lostAudio);
  // const playWinAudio = useAudio(winAudio);

  // useEffect(() =>{
  //   if (dialogType === 'LOST') {
  //     playLostAudio();
  //   } else if (dialogType === 'WIN') {
  //     playWinAudio();
  //   }
  // },[])

  const renderDialogContent = () => {
    switch (dialogType) {
      case 'LOST':
  
        return contentLost;
      case 'WIN':
   
        return contentWin;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setModal({state: "CLOSE", type: "WINLOST"})}
      className="lost-popup-overlay">
      <motion.div
        initial={{ opacity: 0, y: 50}}
        animate={{ opacity: 1, y: 0}}
        exit={{ opacity: 0, y: 50}}
        transition={{ type: 'just'}}
        className="lost-popup"
        >
        {/* <SVG src={dialogType == "WIN" ? win.bgContent : lost.bgContent} className="lost--BgContent mb--1px" onClick={e => {e.stopPropagation()}}/> */}

        {dialogType == "WIN" ? 
          <LazyImage lowResSrc={win.bgContent075x} highResSrc={win.bgContent2x} alt={'win dialog'} className='lost--BgContent mb--1px'/> : 
          <LazyImage lowResSrc={lost.bgContent075x} highResSrc={lost.bgContent2x} alt={'lost dialog'} className='lost--BgContent mb--1px'/>}

        <SVG src={bgCardSelected} className="lost--zodiac-background" onClick={e => {e.stopPropagation()}}/>
        <SVG src={zodiac} className="lost--zodiac-card" onClick={e => {e.stopPropagation()}}/>
        <SVG src={BgLighter} className="lost--BgLighter" onClick={e => {e.stopPropagation()}}/>
        <SVG src={dialogType == "WIN" ? win.bgHeader : lost.bgHeader} className="lost--BgHeader" onClick={e => {e.stopPropagation()}}/>
        
        {renderDialogContent()}
        
        <SVG src={dialogType == "WIN" ? win.lineLeft : lost.lineLeft} className ="lost--light1"/>
        <p className="lost--tertiary" onClick={e => {e.stopPropagation()}}>TOP chiến thắng</p>
        <SVG src={dialogType == "WIN" ? win.lineRight : lost.lineRight} className ="lost--light2"/>

        {topUsers.sort((a, b) => (b.totalIcoin ?? 0) - (a.totalIcoin ?? 0)).map((user, index) => (
          <div className={`lost__no${index + 1}`} key={index} onClick={e => {e.stopPropagation()}}>
            <SVG className={`lost__no${index + 1}--img`} src={crown[index]}/>
            <div className={`lost__no${index + 1}--url`}>
              <img
                src={user.profileImageLink}
                alt="avatar user"    
                onError={handleErrorAvartar}      
              />
            </div>  
            <p className={`lost__no${index + 1}--name`}>{user.name}</p>
            <div className="lost__totalIcoin">
              <SVG className="lost__totalIcoin--img" src={Icoin}/>
              <p className="lost__totalIcoin--icoin">{formatNumber(user.totalIcoin ?? 0)}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default DialogLostWin;
