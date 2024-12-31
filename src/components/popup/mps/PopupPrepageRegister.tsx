import { useEffect, useState, useContext } from 'react';
import PopupCenter from '../PopupCenter';
import { GameInfoContext } from '../../../store/game-info_context';
import { useTranslation } from 'react-i18next';
import '../../../utils/i18n'; // Import file cấu hình i18n
import LazyImage from '../../LazyImage';
import bgSmall from '../../../assets/bg_small.svg';
interface PopupPrepareRegisterProps {
    phoneNumber: string;
    callback: any;
    type: string;
    loading?: boolean;
}

const PopupPrepareRegister: React.FC<PopupPrepareRegisterProps> = ({ phoneNumber, callback, type, loading }) => {
    const { t } = useTranslation();

    const { setModal } = useContext(GameInfoContext);
    console.log(phoneNumber)
    return (
        <PopupCenter
            className='popup-overlay-history'
            onClick={() => setModal({ state: "CLOSE", type: "REGISTERANDCANCEL" })}
            classNameChild='mps'
        >
            {/* <LazyImage
            lowResSrc={bgSmall}
            highResSrc={bgSmall}
            alt='my history'
            className="mine-popup__bg"
            /> */}
            <div className='mps-chill' >
                <div style={{ marginBottom: 30, textAlign: 'center' }}>
                    <h2>{'Hello ' + (phoneNumber != null && phoneNumber.startsWith("257") ? phoneNumber.substring(3) : phoneNumber) }</h2>
                </div>
                <div style={{ marginBottom: 30, textAlign: 'center' }}>
                    <p style={{ wordWrap: 'break-word' }}>
                        <strong>
                            {type === "REGISTER" ?
                            (<div><div>{t("Fee 120Fbu/1000 coins/day")}</div> <div> {t("Join to MASCOT now for a chance to win 500.000 Fbu every month")}</div></div>) :
                            t("Are you sure?")}
                            
                        </strong>
                    </p>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px",

                }}>
                    {loading ? 
                    <button className={'mps-button loading'}><span className="spinner"></span>{type === "REGISTER" ? t("Register") : t("Cancel")}</button> :
                    <button className={'mps-button'} onClick={callback}>{type === "REGISTER" ? t("Register") : t("Cancel")}</button>}
                </div>

            </div>
        </PopupCenter>
    );
};

export default PopupPrepareRegister;
