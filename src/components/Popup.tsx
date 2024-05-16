import backgroundSelected from '../assets/b.svg';
import dragon from '../assets/dragon.svg';
import Icoin from '../assets/icoin.svg';

import BgContent from '../assets/bg-betting-content.png';


const Popup = ({ show , onClose}) => {
  if (!show) {
    return null;
  }

  return (
    <div className="popup-overlay">
        <div className="popup">
        <img src={BgContent} alt="card_background" className='betting--BgContent'></img>
          <img src={backgroundSelected} alt="card_background" className='betting--zodiac-background'></img>
          <img src={dragon} alt="card_zodiac" className='betting--zodiac-card'></img>
          <p className="betting--text mt-8px">Chúc bạn nhận thưởng lớn</p>
          <div className ="betting__totalIcoin mb-30px mt-29px">
            <img className='betting__totalIcoin--img' src={Icoin} alt="" />
            <p className='betting__totalIcoin--icoin'>100</p>
          </div>
          <div className ="betting--button">+10</div>
          <div className ="betting--button-2">+100</div>
          <div className ="betting--button-3">+1000</div>
          <div onClick={onClose} className ="betting__confirm mb-33px mt-29px">
            <p className='betting__confirm--text'>Xác nhận</p>
          </div>
        </div>
    </div>
  );
};

export default Popup;