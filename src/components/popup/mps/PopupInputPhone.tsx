import { useEffect, useState, useContext } from 'react';
import PopupCenter from '../PopupCenter';
import { GameInfoContext } from '../../../store/game-info_context';
import { useTranslation } from 'react-i18next';
import '../../../utils/i18n'; // Import file cấu hình i18n

interface PopupInputPhoneProps {
    mpsSendOTP: any;
    errorMessage?: string;
    loading?: boolean
}

const PopupInputPhone: React.FC<PopupInputPhoneProps> = ({mpsSendOTP, errorMessage, loading}) => {
    const { t } = useTranslation();
    
    const { setModal } = useContext(GameInfoContext);

    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState(errorMessage);


    return (
        <PopupCenter
            className='popup-overlay-history'
            onClick={() => setModal({ state: "CLOSE", type: "SENDOTP" })}
            classNameChild='mps'
        >
            <div className='mps-chill'>
                <div style={{marginBottom: 20, textAlign: 'center'}}>
                    <h3>{t('Welcome to Mascot')}</h3>
                    {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
                </div>
                <div style={{marginBottom: 20}}>
                    <input
                        maxLength={14}
                        type="text"
                        className="mps-input"
                        placeholder={t("Enter your phone number")}
                        value={phoneNumber}
                        onChange={(event) => {
                            const value = event.target.value;
                            if (/^\d*$/.test(value)) {
                              setPhoneNumber(value); // Chỉ cập nhật nếu giá trị là số
                            }
                        }}
                    />
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px",
                    
                }}>
                    {loading ? 
                    <button  className={'mps-button loading'}><span className="spinner"></span>{t('Send OTP')}</button> :
                    <button  className={'mps-button'} onClick={() => mpsSendOTP(phoneNumber)}>{t('Send OTP')}</button>}
                </div>
            
            </div>
        </PopupCenter>
    );
};

export default PopupInputPhone;
