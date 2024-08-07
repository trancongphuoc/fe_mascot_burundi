// import { log } from '../../utils/log';
import PopupCenter from './PopupCenter';
import { GameInfoContext } from '../../store/game-info_context';
import { useContext } from 'react';

const PopupDisconnect = () => {
  // log('<PopRule />');
  const { setModal } = useContext(GameInfoContext);

  return (
    <PopupCenter
      className='popup-overlay-center'
      onClick={() => setModal({ state: "CLOSE", type: "DISCONNECT"})}
      classNameChild='noti'
    >
      <p className="content">Đường truyền không ổn định, vui lòng kiểm tra kết nối mạng</p>
      <button className="button_left" onClick={() => setModal({ state: "CLOSE", type: "DISCONNECT"})}>Thoát</button>
      <button className="button_right" onClick={ () => window.location.reload()}>Kết nối lại</button>
    </PopupCenter>
  );
};

export default PopupDisconnect;
