import { log } from '../../utils/log';
import PopupCenter from './PopupCenter';
import { GameInfoContext } from '../../store/game-info_context';
import { useContext } from 'react';
import { callbackFlutter } from '../../utils/functions';

const PopupDeposit = () => {
  log('<PopRule />');
  const { setModal } = useContext(GameInfoContext);

  return (
    <PopupCenter
      className='popup-overlay-center'
      onClick={() => setModal({state: "CLOSE", type: "DEPOSIT"})}
      classNameChild='noti'
    >
      <p className="content">Bạn không đủ iCoin để chơi vui lòng nạp thêm!</p>
      <button
        className="button_left"
        onClick={() => setModal({state: "CLOSE", type: "DEPOSIT"})}
      >Huỷ</button>
      <button
        className="button_right"
        onClick={() => {
          setModal({state: "CLOSE", type: "DEPOSIT"})
          callbackFlutter('callbackMyWallet')}}
      >Nạp thêm</button>
    </PopupCenter>
  );
};

export default PopupDeposit;
