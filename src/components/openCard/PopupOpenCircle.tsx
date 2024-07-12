import { useEffect, useState, useContext } from 'react';
import PopupCenter from '../popup/PopupCenter';
import LottieAnimation from './AnimationOpenCard';
import animationData from '../../assets/json/game_xoay.json';
import SVG from 'react-inlinesvg';
import { GameInfoContext } from '../../store/game-info_context';


const PopupOpenCircle = () => {
  // const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const { setModal, cardResult } = useContext(GameInfoContext);

  // useEffect(() => {
  //   const showSvgTimer = setTimeout(() => {
  //     setIsAnimationComplete(true);
  //   }, 1600); // 5.5 seconds delay

  //   const hideSvgTimer = setTimeout(() => {
  //     setIsAnimationComplete(false);
  //   }, 2700); // 7 seconds delay

  //   return () => {
  //     clearTimeout(showSvgTimer);
  //     clearTimeout(hideSvgTimer);
  //   }; // Cleanup timers on component unmount
  // }, []);

  return (
    <PopupCenter
      className='popup-overlay-history'
      classNameChild='open-card'
    >
        <LottieAnimation
        animationData={animationData}
        style={{ width: 300, height: 300 }}
        speed={1}
        direction={1}
        onComplete={ () => setModal({state: "CLOSE", type: "GAMECIRCLE"})}
        className='open-card--lottie-animation'
      />
       {/* {isAnimationComplete && <SVG src={cardResult?.imgUrl ?? ""} className='open-card--img'/>} */}
    </PopupCenter>
  );
};

export default PopupOpenCircle;
