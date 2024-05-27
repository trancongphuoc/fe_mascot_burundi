import BgCard from '../assets/bg_card_normal_light.svg'
import StickIcon from  '../assets/icon_stick.svg';
import TextResult from '../assets/text-result.svg';
import SVG from 'react-inlinesvg';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { GameHistory } from '../model/GameHistory';
import { fetchGameHistory } from '../api/getGameHistory';
import { ScaleLoader } from 'react-spinners';

interface PopupHistoryProps {
  onClose: () => void;
  zodiacs: string[];
  token: string | null;
}

const PopupHistoryGame: React.FC<PopupHistoryProps> = ({ onClose, zodiacs, token }) => {

  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGameHistory(token);
        if (data != null) {
          setGameHistory(data);
        }
      } catch (error) {
        console.log('error', error);
      }
      setLoading(false);
    };
  
    if (token) {
      fetchData();
    }
  
    
  }, [token]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="history-game-overlay">

      <motion.div
        initial={{ opacity: 0, scale: .5}}
        animate={{ opacity: 1, scale: 1}}
        exit={{ opacity: 0, scale: .5}}
        className="history-game-popup mt-55px"
        onClick={e => e.stopPropagation()}>

        <SVG src={TextResult} className="history-game-popup--header"/>

        <div className="history-game-popup__title mt-7px mb-8px">
            <p className="history-game-popup__title--no">Ván</p>
            {
              zodiacs.map((zodiac, index) => (
                <div key={index} className="history-game-popup__card">
                  <SVG src={BgCard} className="history-game-popup__card--Bg"/>
                  <SVG src={zodiac} className="history-game-popup__card--zodiac" />
                </div>
              ))
            }
        </div>

        {
          loading ? 
          <ScaleLoader color='#F15350' style={{display: 'flex', justifyContent: 'center', marginTop: '100px'}}/> :
          <div className="history-game-popup__content">
            {
              gameHistory.map((game, index) => (
                <div key={index} className="history-game-popup__item">
                  <p className='history-game-popup__item--index'>{game.noGame}</p>
                  {[...Array(8)].map((_, i) => (
                      <div key={i} className="history-game-popup__item--buffalo">
                        <SVG className={(game.zodiacCardId.slice(-1) == ( i + 1).toString()) ? 
                            "history-game-popup__item--stickShow" :
                            "history-game-popup__item--stickHide" } src={StickIcon} />
                      </div>
                  ))}
                </div>
              ))
            }
          </div>
        }
      </motion.div>
    </motion.div>
  );
};

export default PopupHistoryGame;
