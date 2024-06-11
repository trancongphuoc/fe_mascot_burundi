import React, { useEffect, useState } from 'react';
import SVG from 'react-inlinesvg';
import { motion } from 'framer-motion';
import { GameHistory } from '../model/GameHistory';
import { fetchGameHistory } from '../api/getGameHistory';
import { ScaleLoader } from 'react-spinners';
import bgHistoryGame from '../assets/bg_history_game.svg';
import BgCard from '../assets/bg_card_normal_light.svg';
import StickIcon from  '../assets/icon_stick.svg';
import TextResult from '../assets/text-result.svg';
import Loading from './Loading';

interface PopupHistoryProps {
  onClose: () => void;
  zodiacs: string[];
}

const PopupHistoryGame: React.FC<PopupHistoryProps> = ({ onClose, zodiacs }) => {
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const preloadImages = [bgHistoryGame];
    preloadImages.forEach(image => {
      new Image().src = image;
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGameHistory();
        if (data != null) {
          setGameHistory(data);
        }
      } catch (error) {
        console.error('Error fetching game history:', error);
        // Handle error here, e.g., show a message to the user
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="history-game-overlay"
    >
      <motion.div
        initial={{ opacity: 0, scale: .5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: .5 }}
        className="history-game-popup mt-47px"
        onClick={e => e.stopPropagation()}
      >
        <SVG src={bgHistoryGame} className="history-game-popup__bg" />
        <SVG src={TextResult} className="history-game-popup--header" />

        <div className="history-game-popup__title mt-7px">
          <p className="history-game-popup__title--no">Ván</p>
          {zodiacs.map((zodiac, index) => (
            <div key={index} className="history-game-popup__card">
              <SVG src={BgCard} className="history-game-popup__card--Bg" />
              <SVG src={zodiac} className="history-game-popup__card--zodiac" />
            </div>
          ))}
        </div>

        {loading ? (
          <Loading className="history-game-popup__loading"/>
        ) : (
          <div className="history-game-popup__content">
            {gameHistory.map((game, index) => (
              <div key={index} className="history-game-popup__item">
                <p className='history-game-popup__item--index'>{game.noGame}</p>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="history-game-popup__item--buffalo">
                    <SVG
                      className={game.zodiacCardId.slice(-1) === (i + 1).toString() ?
                        "history-game-popup__item--stickShow" :
                        "history-game-popup__item--stickHide"}
                      src={StickIcon}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PopupHistoryGame;
