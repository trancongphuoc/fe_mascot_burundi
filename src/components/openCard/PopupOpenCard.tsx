import React, { useEffect, useState } from 'react';
import PopupCenter from '../popup/PopupCenter';
import LottieAnimation from './AnimationOpenCard';
import animationData from '../../assets/json/animation_open_card.json';
import SVG from 'react-inlinesvg';

interface PopupOpenCardProps {
  onClose: () => void;
  zodiacUrl: string;
}

const PopupOpenCard: React.FC<PopupOpenCardProps> = ({ onClose, zodiacUrl }) => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  const handleAnimationComplete = () => {
    onClose();
  };

  useEffect(() => {
    const showSvgTimer = setTimeout(() => {
      setIsAnimationComplete(true);
    }, 5500); // 5.5 seconds delay

    const hideSvgTimer = setTimeout(() => {
      setIsAnimationComplete(false);
    }, 7500); // 7 seconds delay

    return () => {
      clearTimeout(showSvgTimer);
      clearTimeout(hideSvgTimer);
    }; // Cleanup timers on component unmount
  }, []);

  return (
    <PopupCenter
      classname='popup-overlay-history'
      onClick={onClose}
      classNameChild='open-card'
    >
        <LottieAnimation
        animationData={animationData}
        style={{ width: 300, height: 300 }}
        speed={1}
        direction={1}
        onComplete={handleAnimationComplete}
        className='open-card--lottie-animation'
      />
       {isAnimationComplete && <SVG src={zodiacUrl} className='open-card--img'/>}
    </PopupCenter>
  );
};

export default PopupOpenCard;
