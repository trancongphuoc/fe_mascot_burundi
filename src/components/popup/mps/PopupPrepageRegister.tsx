import { useEffect, useState, useContext } from 'react';
import PopupCenter from '../PopupCenter';
import { GameInfoContext } from '../../../store/game-info_context';
import { useTranslation } from 'react-i18next';
import '../../../utils/i18n'; // Import file cấu hình i18n

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
            <div className='mps-chill'>
                <div style={{ marginBottom: 30, textAlign: 'center' }}>
                    <h2>{'Hello ' + (phoneNumber != null && phoneNumber.startsWith("257") ? phoneNumber.substring(3) : phoneNumber) }</h2>
                </div>
                <div style={{ marginBottom: 30, textAlign: 'center' }}>
                    <p style={{ wordWrap: 'break-word' }}>
                        <strong>
                            {type === "REGISTER" ?
                            "Fee 120Fbu/1000 ibiceri/umunsi Join to MASCOT now for a chance to win 500.000 Fbu every month" :
                            "Are you sure ?"}
                            
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
