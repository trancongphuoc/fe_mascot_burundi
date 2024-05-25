import BgCard from '../assets/bg_card_nomarl.svg'
import StickIcon from  '../assets/icon_stick.svg';
import TextResult from '../assets/text-result.svg';
import SVG from 'react-inlinesvg';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { GameHistory } from '../model/GameHistory';
import { fetchGameHistory } from '../api/getGameHistory';

interface PopupHistoryProps {
  onClose: () => void;
  zodiacs: string[];
  token: string | null;
}

const PopupHistoryGame: React.FC<PopupHistoryProps> = ({ onClose, zodiacs, token }) => {

  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchGameHistory(token, setGameHistory);
        setLoading(false);
      } catch (error) {
        setError('Error fetching game history');
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="popup-overlay">

      <motion.div
        initial={{ opacity: 0, scale: .5}}
        animate={{ opacity: 1, scale: 1}}
        exit={{ opacity: 0, scale: .5}}
        className="result-popup"
        onClick={e => e.stopPropagation()}>

        <SVG src={TextResult} className="result-popup--header"/>

        <div className="result-popup__title mt-7px mb-8px">
            <p className="result-popup__title--no">Ván</p>
            {
              zodiacs.map((zodiac, index) => (
                <div key={index} className="result-popup__card">
                  <SVG src={BgCard} className="result-popup__card--Bg"/>
                  <SVG src={zodiac} className="result-popup__card--zodiac" />
                </div>
              ))
            }
        </div>

        <div className="result-popup__content">
          {
            gameHistory.map((game, index) => (
              <div key={index} className="result-popup__item">
                
                <p className='result-popup__item--index'>{game.noGame}</p>
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="result-popup__item--buffalo">
                      <SVG className={(game.zodiacCardId.slice(-1) == ( i + 1).toString()) ? 
                          "result-popup__item--stickShow" :
                          "result-popup__item--stickHide" } src={StickIcon} />
                    </div>
                ))}
              </div>
            ))
          }
          
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PopupHistoryGame;
