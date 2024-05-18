import React, { useState } from 'react';
import backgroundSelected from '../assets/b.svg';
import dragon from '../assets/dragon.svg';
import Icoin from '../assets/icoin.svg';
import BgContent from '../assets/Bg-lost-content.png';
import BgHeader from '../assets/Bg-lost-header.png';
import BgLighter from '../assets/background-betting-lighter.svg';
import CrownGold from '../assets/crown-gold.png';
import CrownSliver from '../assets/crown-sliver.svg';
import CrownBronze from '../assets/crown-bronze.png';


interface DialogBettingProps {
  show: boolean;
  onClose: () => void;
}

interface topUserModel {
  url: string;
  name: string;
  icoin: number;
}

const DialogBetting: React.FC<DialogBettingProps> = ({ show, onClose }) => {

  const [stake, setStake] = useState(0);

  let crown = [CrownGold, CrownBronze, CrownSliver];

  let topUsers: topUserModel[] = [
    {url: 'https://www.ikara.co/avatar/103929910820839711115?type=LARGE&version=8', name: 'Lê Hải Yến', icoin: 3000},
    {url: 'https://www.ikara.co/avatar/103929910820839711115?type=LARGE&version=8', name: 'Trần Tuấn Hùng', icoin: 1000},
    {url: 'https://www.ikara.co/avatar/103929910820839711115?type=LARGE&version=8', name: 'Ngọc Hoàng', icoin: 9000},
  ]

  if (!show) {
    return null;
  }

  return (
    <div onClick={onClose} className="lost-popup-overlay">
      <div className="lost-popup">
        <div className='lost--BgContent'>&nbsp;</div>
        
        <img src={backgroundSelected} alt="card_background" className='lost--zodiac-background'></img>
        <img src={dragon} alt="card_zodiac" className='lost--zodiac-card'></img>

        <img src={BgLighter} alt="betting lighter" className='lost--BgLighter'></img>
        <img src={BgHeader} alt="betting header" className='lost--BgHeader'></img>

        <p className="lost--primary-text">Rất Tiếc</p>

        <p className="lost__secondary">
          <span>Bạn bỏ lỡ phần thưởng lần đoán này</span>
          <br/>
          <span>Đừng nản lòng, hãy cố gắng lên, tin tưởng bản thân!</span>
        </p>

        <p className ="lost--light1">&nbsp;</p>
        <p className ="lost--tertiary">TOP chiến thắng</p>
        <p className ="lost--light2">&nbsp;</p>
        {
          topUsers.map((user, index) => (
            <div className={`lost__no${index+1}`} key={index}>
              <img className={`lost__no${index+1}--img`} src={crown[index]} alt="crown" />
              <div className={`lost__no${index+1}--url`}>
                <img src={user.url} alt="avatar use" />
              </div>
              <p className={`lost__no${index+1}--name`}>{user.name}</p>
              <div className="lost__totalIcoin">
                <img className='lost__totalIcoin--img' src={Icoin} alt="" />
                <p className='lost__totalIcoin--icoin'>{user.icoin}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default DialogBetting;
