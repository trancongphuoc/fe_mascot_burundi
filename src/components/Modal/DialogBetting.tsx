import { useCallback, useState } from 'react';
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
import audioBet from '../../../public/sounds/stake_audio.wav';
import AudioPlayer from './Audiobutton';

interface DialogBettingProps {
  onClose: () => void;
  zodiacGameId: number;
  zodiacCardSelect: ZodiacCardModel;
  betIcoin: (zodiacCard: BetZodiacCard) => void;
  openDepositPupup: () => void;
}

const DialogBetting = ({
  onClose,
  zodiacGameId,
  zodiacCardSelect,
  betIcoin,
  openDepositPupup
} : DialogBettingProps) => {
  log('<DialogBetting />')

  const [stakes, setStakes] = useState(0);

  const clickAudioRef =  useAudio(audioBet);
  const confirmRef = useAudio(audioConfirm);

  useAudio

  // function playAudio () {
  //   const audio = useAudio(audioBet);
  //   // audio.currentTime = 0;
  //   audio.p
  // }


  const sendDataOut = () => {
    confirmRef();
    if (!zodiacGameId) {
      toast.dismiss();
      toast("Thiếu thông tin game", { duration: 2000, position: 'bottom-center'});
      return;
    }
    if (!zodiacCardSelect) {
      toast.dismiss();
      toast("Thiếu card select", { duration: 2000, position: 'bottom-center'});
      return;
    }
    if (!stakes) {
      toast.remove();
      toast("Thiếu tiền cược", { duration: 2000, position: 'bottom-center'});
      return;
    }

    const betCard: BetZodiacCard = {
      ...zodiacCardSelect,
      totalIcoinBetting: stakes ?? 0,
    }
    onClose();
    betIcoin(betCard);
  };

  const handleStake = useCallback((stake: number) => {
    if (stake) {
      const totalIcoinString = window.sessionStorage.getItem('totalIcoin');
      const totalIcoin = totalIcoinString !== null ? parseInt(totalIcoinString, 10) : 0;
      const initStake = stakes + stake;
      if (initStake <= totalIcoin) {
        // clickAudioRef();
        setStakes(prevStake => prevStake + stake)
      } else {
        openDepositPupup();
      }
    }
  },[])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="betting-popup-overlay"
      onClick={onClose}
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

        <LazyImage
          lowResSrc={BgContent075x}
          highResSrc={BgContent2x}
          alt='betting'
          className='betting--BgContent'
        />
        
        <SVG src={bgCardSelect} className="betting--zodiac-background" onClick={(e) => e.stopPropagation()}/>
        {zodiacCardSelect.imageUrl && <SVG
                                        src={zodiacCardSelect.imageUrl}
                                        onClick={(e) => e.stopPropagation()}
                                        className="betting--zodiac-card" />}
        <SVG src={BgLighter} className="betting--BgLighter" onClick={(e) => e.stopPropagation()}/>
        <SVG src={BgHeader} className="betting--BgHeader" onClick={(e) => e.stopPropagation()}/>

        <p className="betting--text" onClick={(e) => e.stopPropagation()}>Chúc bạn nhận thưởng lớn</p>

        <div className="betting__totalIcoin mb-15px mt-28px" onClick={(e) => e.stopPropagation()}>
          <img className="betting__totalIcoin--img" src={Icoin} alt="Icoin" />
          <p className="betting__totalIcoin--icoin">{stakes}</p>
        </div>

        <ButtonStake handleClick={() => handleStake(10)}  className="betting--button-1">
          <p>+10</p>
        </ButtonStake>

        <ButtonStake handleClick={() => handleStake(100)}  className="betting--button-2">
          <p>+100</p>
        </ButtonStake>

        <ButtonStake handleClick={() => handleStake(1000)}  className="betting--button-3">
          <p>+1000</p>
        </ButtonStake>

        <ButtonStake handleClick={sendDataOut}  className="betting__confirm mb-34px mt-14-5px">
         <p className="betting__confirm--text">Xác nhận</p>
        </ButtonStake>

        <AudioPlayer></AudioPlayer>
      </motion.div>
    </motion.div>
  );
};

export default DialogBetting;
