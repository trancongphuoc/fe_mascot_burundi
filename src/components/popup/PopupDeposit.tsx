// import { log } from '../../utils/log';
import PopupCenter from './PopupCenter';
import { GameInfoContext } from '../../store/game-info_context';
import { useContext } from 'react';
import { callbackFlutter } from '../../utils/functions';
import { useTranslation } from 'react-i18next';
import '../../utils/i18n'; // Import file cấu hình i18n

const PopupDeposit = () => {
  // log('<PopRule />');
  const { setModal } = useContext(GameInfoContext);
  const { t } = useTranslation();
  return (
    <PopupCenter
      className='popup-overlay-center'
      onClick={() => setModal({state: "CLOSE", type: "DEPOSIT"})}
      classNameChild='noti'
    >
      <p className="content">{t("You do not have enough iCoin to play, please top up!")}</p>
      <button
        className="button_left"
        onClick={() => setModal({state: "CLOSE", type: "DEPOSIT"})}
      >{t("Cancel")}</button>
      <button
        className="button_right"
        onClick={() => {
          setModal({state: "CLOSE", type: "DEPOSIT"})
          callbackFlutter('callbackMyWallet')}}
      >{t("Buy more")}</button>
    </PopupCenter>
  );
};

export default PopupDeposit;
