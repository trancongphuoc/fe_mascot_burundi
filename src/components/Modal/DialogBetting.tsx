import {  useState, useContext } from 'react';
import bgCardSelect from '../../assets/bg_card_selected.svg';
import Icoin from '../../assets/icoin.svg';
// import BgContent from '../../assets/bg_content_win.svg';
import BgContent075x from '../../assets/bg_content_betting_075x.png';
import BgContent2x from '../../assets/bg_content_betting_2x.png';


import BgHeader from '../../assets/bg_header_betting.svg';
import BgLighter from '../../assets/bg_lighter.svg';
import { motion } from 'framer-motion';
import SVG from 'react-inlinesvg';
import toast from 'react-hot-toast';
import LazyImage from '../LazyImage';
import { log } from '../../utils/log';
import ButtonStake from '../ButtonStake';

import useAudio from '../UseAudio';
import audioConfirm from '../../../public/sounds/confirm_button.wav';
// import audioBet from '../../../public/sounds/stake_audio.wav';
// import AudioPlayer from './Audiobutton';
import AnimatedCounter from '../animation/AnimatedCounter';
import ButtonMoving from '../ButtonMoving';
import { GameInfoContext } from '../../store/game-info_context';



const DialogBetting = () => {
  log('<DialogBetting />')

  const [bettingIcoin, setBettingIcoin] = useState({ from: 0, to:0 });
  const { setModal, selectedCard, transactionId, betting } = useContext(GameInfoContext);

  // const clickAudioRef =  useAudio(audioBet);
  const confirmRef = useAudio(audioConfirm);

  // function playAudio () {
  //   const audio = useAudio(audioBet);
  //   // audio.currentTime = 0;
  //   audio.p
  // }


  const sendDataOut = () => {
    confirmRef();
    if (!transactionId) {
      toast.dismiss();
      toast("Thiếu thông tin game", { duration: 2000, position: 'bottom-center'});
      return;
    }
    if (!selectedCard) {
      toast.dismiss();
      toast("Thiếu card select", { duration: 2000, position: 'bottom-center'});
      return;
    }
    if (bettingIcoin.to == 0) {
      toast.remove();
      toast("Thiếu tiền cược", { duration: 2000, position: 'bottom-center'});
      return;
    }

    const betCard: BetZodiacCard = {
      ...selectedCard,
      totalIcoinBetting: bettingIcoin.to ?? 0,
    }

    setModal({ state: "CLOSE", type: "BETTING" });
    betting(betCard);
  };

  const handleStake = (stake: number) => {
    if (stake) {
      const totalIcoinString = window.sessionStorage.getItem('totalIcoin');
      const totalIcoin = totalIcoinString !== null ? parseInt(totalIcoinString, 10) : 0;

      const newStake = bettingIcoin.to + stake;
      if (newStake <= totalIcoin) {
        const oldBetting = bettingIcoin.to;

        setBettingIcoin(prevState => ({
          ...prevState,
          from: oldBetting,
          to: newStake,
        }));
      } else {
        setModal({ state: "OPEN", type: "DEPOSIT" });
      }
    } else {
      console.log('no stake')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="betting-popup-overlay"
      onClick={ () => setModal({ state: "CLOSE", type: "BETTING" })}
      transition={{ type: 'just'}}
      aria-labelledby="betting-dialog-title"
      role="dialog">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="betting-popup"
        aria-modal="true">
        
        {/* <SVG src={BgContent} className="betting--BgContent" onClick={(e) => e.stopPropagation()}/> */}

        {/* <img
          src={BgContent}
          className="betting--BgContent"
          role='img'
          alt='image background betting'
          onClick={(e) => e.stopPropagation()}/> */}

        <LazyImage
          lowResSrc={BgContent075x}
          highResSrc={BgContent2x}
          alt='betting'
          className='betting--BgContent'
        />
        
        <SVG src={bgCardSelect} className="betting--zodiac-background" onClick={(e) => e.stopPropagation()}/>
        {selectedCard?.imageUrl && <SVG
                                        src={selectedCard?.imageUrl ?? ""}
                                        onClick={(e) => e.stopPropagation()}
                                        className="betting--zodiac-card" />}
        <SVG src={BgLighter} className="betting--BgLighter" onClick={(e) => e.stopPropagation()}/>
        <SVG src={BgHeader} className="betting--BgHeader" onClick={(e) => e.stopPropagation()}/>

        <p className="betting--text" onClick={(e) => e.stopPropagation()}>Chúc bạn nhận thưởng lớn</p>

        <div className="betting__totalIcoin mb-15px mt-28px" onClick={(e) => e.stopPropagation()}>
          <SVG className="betting__totalIcoin--img" src={Icoin}/>
          {/* <p className="betting__totalIcoin--icoin">{stakes}</p> */}
          <AnimatedCounter from={bettingIcoin.from} to={bettingIcoin.to}/>
        </div>
        <ButtonMoving
          content={'+10'}
          setClick={ () => handleStake(10)}
          cssClass="betting--button-1"
        />

        <ButtonMoving
          content={'+100'}
          setClick={ () => handleStake(100)}
          cssClass="betting--button-2"
        />

        <ButtonMoving
          content={'+1000'}
          setClick={ () => handleStake(1000)}
          cssClass="betting--button-3"
        />

        <ButtonStake handleClick={sendDataOut}  className="betting__confirm mb-34px mt-14-5px">
          xác nhận
        </ButtonStake>
  
      </motion.div>
    </motion.div>
  );
};

export default DialogBetting;
