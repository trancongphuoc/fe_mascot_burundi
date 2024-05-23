import BgCard from '../assets/background_card_small.svg'
import StickIcon from  '../assets/icon_stick.svg';
import TextResult from '../assets/text-result.svg';
import SVG from 'react-inlinesvg';

interface PopupResultProps {
  show: boolean;
  onClose: () => void;
  zodiacs: string[];
  history: string[];
}

const PopupResult: React.FC<PopupResultProps> = ({ show, onClose, zodiacs, history }) => {

  if (!show) {
    return null;
  }

  return (
    <div onClick={onClose} className="popup-overlay">

      <div className="result-popup" onClick={e => e.stopPropagation()}>

        <SVG src={TextResult} className="result-popup--header"/>

        <div className="result-popup__title">
            <p className="result-popup__title--no">Ván</p>
  
            {
              zodiacs.map((zodiac, index) => (
                <div key={index} className="result-popup__card">
                  <img src={BgCard} alt="zodiac" className="result-popup__card--Bg"/>
                  <img src={zodiac} alt="zodiac" className="result-popup__card--zodiac" />
                </div>
              ))
            }
        </div>

        <div className="result-popup__content">
          {
            history.map((_, index) => (
              <div className="result-popup__item">
                
                <p className='result-popup__item--index'>{index + 1}</p>

                <div className='result-popup__item--buffalo'>
                <img className='result-popup__item--stickShow' src={StickIcon} alt=""/>
                </div>
                <div className='result-popup__item--tiger' >
                  <img className='result-popup__item--stickShow' src={StickIcon} alt=""/>
                </div>
                <div className='result-popup__item--dragon'>
                  <img className='result-popup__item--stickShow' src={StickIcon} alt=""/>
                </div>
                <div className='result-popup__item--snake'>
                  <img className='result-popup__item--stickShow' src={StickIcon} alt=""/>
                </div>
                <div className='result-popup__item--horse'>
                  <img className='result-popup__item--stickShow' src={StickIcon} alt=""/>
                </div>
                <div className='result-popup__item--goat'>
                  <img className='result-popup__item--stickShow' src={StickIcon} alt=""/>
                </div>
                <div className='result-popup__item--chicken'>
                  <img className='result-popup__item--stickShow' src={StickIcon} alt=""/>
                </div>
                <div className='result-popup__item--pig'>
                  <img className='result-popup__item--stickShow' src={StickIcon} alt=""/>
                </div>
              </div>
            ))
          }
          
        </div>
      
          
            

        
      </div>
    </div>
  );
};

export default PopupResult;
