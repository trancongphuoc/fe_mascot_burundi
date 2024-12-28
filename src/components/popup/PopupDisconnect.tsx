// import { log } from '../../utils/log';
import PopupCenter from './PopupCenter';
import { GameInfoContext } from '../../store/game-info_context';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import '../../utils/i18n'; // Import file cấu hình i18n

const PopupDisconnect = () => {
  // log('<PopRule />');
  const { setModal } = useContext(GameInfoContext);
  const { t } = useTranslation();

  return (
    <PopupCenter
      className='popup-overlay-center'
      onClick={() => setModal({ state: "CLOSE", type: "DISCONNECT"})}
      classNameChild='noti'
    >
      <p className="content">{t("The connection is unstable, please check your network connection.")}</p>
      <button className="button_left" onClick={() => setModal({ state: "CLOSE", type: "DISCONNECT"})}>{t("Close")}</button>
      <button className="button_right" onClick={ () => window.location.reload()}>{t("Reconnect")}</button>
    </PopupCenter>
  );
};

export default PopupDisconnect;
