import '../css/index.css';

import tiger from '../assets/tiger.svg';
import buffalo from '../assets/buffalo.svg';
import chicken from '../assets/chicken.svg';
import dragon from '../assets/dragon.svg';
import goat from '../assets/goat.svg';
import horse from '../assets/horse.svg';
import pig from '../assets/pig.svg';
import snake from '../assets/snake.svg';

import Card from '../components/Card';
import FullCard from '../components/FullCard';
import AvatarCircle from '../components/AvatarCircle';
import PrimaryText from '../assets/primary-text.svg';
import Rule from '../assets/rule.svg';
import Arrow from '../assets/arrow.svg';
import avatar from '../assets/avatar.png';

import MyBonusToday from '../components/MyBonusToday';
import BestPlayers from '../components/BestPlayers';
import { useState } from 'react';
import DialogBetting from '../components/DialogBetting';
import DialogLost from '../components/DialogLost';



interface BettingCard {
  card: string;
  bonus: Bonus;
  isSelected: boolean;
  players: number;
}

type Bonus = 5 | 8 | 10 | 15 | 20; 


function App() {
  // const [count, setCount] = useState(0)

  let bets: number = 124;
  let myInfoBetReults: CardModel[] = [{card: tiger, isSelected: true, number: 7, bonus: 15, players: 7},
                                      {card: tiger, isSelected: true, number: 7, bonus: 15, players: 7},
                                      {card: tiger, isSelected: true, number: 7, bonus: 15, players: 7}];
  let leftResutls: string[] = [horse, 
                              goat,
                              // chicken,
                              pig];
  let rightResults: string[] = [avatar,
                              avatar,
                              // avatar,
                              avatar,
                              avatar]
  let numberResult: number = 29;
  let bettingTable: BettingCard[] = [
                                  {card: buffalo, isSelected: false, bonus: 5, players: 0},
                                  {card: tiger, isSelected: false, bonus: 5, players: 0},
                                  {card: dragon, isSelected: true, bonus: 5, players: 0},
                                  {card: snake, isSelected: false, bonus: 8, players: 10},
                                  {card: horse, isSelected: false, bonus: 8, players: 0},
                                  {card: goat, isSelected: false, bonus: 10, players: 20},
                                  {card: chicken, isSelected: false, bonus: 15, players: 0},
                                  {card: pig, isSelected: false, bonus: 20, players: 0}
                                  ];
  let bestPlayers: BestPlayersModel[] = [
                                      {name: "Dong Hoang Linh", avatarUrl: "https://www.ikara.co/avatar/103929910820839711115?type=LARGE&version=8", winningIcoin: 9999},
                                      {name: "Doan Dai Hiep", avatarUrl: "https://www.ikara.co/avatar/103929910820839711115?type=LARGE&version=8", winningIcoin: 9999},
                                      {name: "Nguyễn Hoàng Chi", avatarUrl: "https://www.ikara.co/avatar/103929910820839711115?type=LARGE&version=8", winningIcoin: 9999}
                                    ];
  let counter: number = 30;  
  
  
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };
                                    
                                    

                                

  return (
    <div className='main'>

      <section className='section-header u-margin-top-huge1'>
          <img src={PrimaryText} alt="primary_text" className='u-margin-minus-bottom-big'></img>
          <p className='heading-secondary'>Hôm nay {bets} Ván</p>
          <img src={Rule} alt="card_background" className='section-header__rule'></img>
      </section>

      <div className="result mt-7-5px">
        <div className="result__left">
          <p className='result__left--text'>Kết quả</p>
          {
            leftResutls.map((result, index) => (
              <Card key={index} card={result} className={"card--zodiac__small"} classNameBackground={'card--zodiac__background--small mr-4px'}/>
            ))
          }
          <img src={Arrow} alt="card_background" className=""></img>
        </div>
        <div className="result__right">
          {
            rightResults.map((result, index) => (
              <AvatarCircle key={index} avatarUrl={result} className={'avatar mr-5px'}/>
            ))
          }
          <h2 className='result__right--number'>{numberResult}</h2>
        </div>
      </div>


      <section className="section-betting mt-5px">
        <p className="section-betting--counter">Đếm ngược {counter}</p>
        <div className="section-betting__content">
          {
            bettingTable.map((bettingCard, index) => (
              <FullCard key={index} number={index + 1} card={bettingCard.card} isSelected={bettingCard.isSelected} bonus={bettingCard.bonus} players={bettingCard.players}/>
            ))
          }
        </div>
      </section>

      <MyBonusToday bonusToday={1000} goodBets={4} totalIcoin={15.000} myInfoBetReults={myInfoBetReults}/>
      
      <BestPlayers bestPlayers={bestPlayers}/>

      <button onClick={handleOpenPopup} className="open-popup-button">Open Popup</button>

      <DialogLost show={isPopupVisible} onClose={handleClosePopup} dialogType='WIN' totalIcoin={100}/>
  
    </div>
  )
}

export default App
