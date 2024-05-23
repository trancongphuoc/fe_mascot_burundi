import React, { useEffect, useState } from 'react';
import backgroundSelected from '../assets/b.svg';
import dragon from '../assets/dragon.svg';
import Icoin from '../assets/icoin.svg';
import BgContentLost from '../assets/Bg-lost-content.png';
import BgContentWin from '../assets/bg-win-content.png';
import BgHeaderLost from '../assets/Bg-lost-header.png';
import BgHeaderWin from '../assets/bg-win-header.png';
import BgLighter from '../assets/background-betting-lighter.svg';
import CrownGold from '../assets/crown-gold.png';
import CrownSliver from '../assets/crown-sliver.svg';
import CrownBronze from '../assets/crown-bronze.png';
// import Confetti from "http://cdn.skypack.dev/canvas-confetti";

interface DialogBettingProps {
  show: boolean;
  onClose: () => void;
  dialogType: DialogType;
  totalIcoin: number;
  topUsers: TopUserModel[];
}

const DialogBetting: React.FC<DialogBettingProps> = ({ show, onClose, dialogType, totalIcoin, topUsers }) => {
  const [bgHeader, setBgHeader] = useState(BgHeaderLost);
  const [bgContent, setBgContent] = useState(BgContentLost);

  const crown = [CrownGold, CrownBronze, CrownSliver];

  useEffect(() => {
    setBgHeader(dialogType === 'WIN' ? BgHeaderWin : BgHeaderLost);
    setBgContent(dialogType === 'WIN' ? BgContentWin : BgContentLost);
    // Confetti();
  }, [dialogType]);

  if (!show) {
    return null;
  }

  const renderDialogContent = () => {
    switch (dialogType) {
      case 'LOST':
        return (
          <>
            <p className="lost--primary-text">Rất tiếc</p>
            <p className="lost__secondary">
              <span>Bạn bỏ lỡ phần thưởng lần đoán này</span>
              <br />
              <span>Đừng nản lòng, hãy cố gắng lên, tin tưởng bản thân!</span>
            </p>
          </>
        );
      case 'WIN':
        return (
          <>
            <p className="win--primary-text">Chúc mừng</p>
            <div className="lost__secondary">
             <p className="win__secondary">Thật xuất sắc, Bạn đã đoán trúng ván này</p>
             <div className="win__totalIcoin">
              <img className="win__totalIcoin--img" src={Icoin} alt="" />
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
    <div onClick={onClose} className="lost-popup-overlay">
      <div className="lost-popup" onClick={e => {e.stopPropagation()}}>
        <div 
          className="lost--BgContent" style={{ backgroundImage: `url(${bgContent})` }}></div>
        <img src={backgroundSelected} alt="card_background" className="lost--zodiac-background" />
        <img src={dragon} alt="card_zodiac" className="lost--zodiac-card" />
        <img src={BgLighter} alt="betting lighter" className="lost--BgLighter" />
        <img src={bgHeader} alt="betting header" className="lost--BgHeader" />
        
        {renderDialogContent()}
        
        <p className ="lost--light1">&nbsp;</p>
        <p className="lost--tertiary">TOP chiến thắng</p>
        <p className ="lost--light2">&nbsp;</p>

        {topUsers.map((user, index) => (
          <div className={`lost__no${index + 1}`} key={index}>
            <img className={`lost__no${index + 1}--img`} src={crown[index]} alt="crown" />
            <div className={`lost__no${index + 1}--url`}>
              <img src={user.url} alt="avatar user" />
            </div>
            <p className={`lost__no${index + 1}--name`}>{user.name}</p>
            <div className="lost__totalIcoin">
              <img className="lost__totalIcoin--img" src={Icoin} alt="icoin" />
              <p className="lost__totalIcoin--icoin">{user.icoin}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DialogBetting;
