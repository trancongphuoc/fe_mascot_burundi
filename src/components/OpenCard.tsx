
// import SVG from 'react-inlinesvg';
import { motion } from 'framer-motion';
// import CirleTornado from '../assets/circle_tornado.svg';
// import CirleLight from '../assets/circle_light.svg';
// import BgCard from '../assets/bg_card_nomarl.svg';
import FlipCard from './FlipCard';
import { useEffect } from 'react';

interface OpenCardProps {
  onClose: () => void;
  zodiac: string;
  history: string[];
}

const OpenCard: React.FC<OpenCardProps> = ({ onClose, zodiac}) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Closing...');
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   exit={{ opacity: 0 }}
      onClick={onClose}
      className="open-card-popup-overlay">

      <motion.div
        // initial={{ opacity: 0, scale: 1, rotate: 0}}
        // animate={{ opacity: [1, 0], scale: [.5 ,1, .5], rotate: 360}}
      

        transition={{ type: 'just', duration: 2}}
        className="open-card"
        onClick={e => e.stopPropagation()}>

        {/* <SVG src={CirleTornado} className="open-card--tornado"/>
        <SVG src={CirleLight} className="open-card--light"/> */}
        <FlipCard  zodiac={zodiac}/>


      </motion.div>
    </motion.div>
  );
};

export default OpenCard;
