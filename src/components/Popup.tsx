import React from 'react';
import backgroundSelected from '../assets/b.svg';
import dragon from '../assets/dragon.svg';
import Icoin from '../assets/icoin.svg';
import BgContent from '../assets/background-betting-content.svg';

interface PopupProps {
  show: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ show, onClose }) => {
  // Return null if show is false
  if (!show) {
    return null;
  }

  return (
    <>
      <div className="popup-overlay">
        <div className="popup">
          {/* Image components */}
          <img src={BgContent} alt="Background content" className='betting__bg-content' />
          <img src={backgroundSelected} alt="Selected background" className='betting__zodiac-background' />
          <img src={dragon} alt="Zodiac card" className='betting__zodiac-card' />
          
          {/* Text */}
          <p className="betting__text mt-8px">Chúc bạn nhận thưởng lớn</p>
          
          {/* Total iCoin */}
          <div className="betting__total-icoin mb-30px mt-29px">
            <img className='betting__total-icoin-img' src={Icoin} alt="Icoin" />
            <p className='betting__total-icoin-value'>100</p>
          </div>
          
          {/* Buttons */}
          <button className="betting__button">+10</button>
          <button className="betting__button betting__button--alt">+100</button>
          <button className="betting__button betting__button--alt-2">+1000</button>
          
          {/* Confirm Button */}
          <div onClick={onClose} className="betting__confirm mb-33px mt-29px">
            <p className='betting__confirm-text'>Xác nhận</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
