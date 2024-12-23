import { useEffect, useState, useContext } from 'react';
import PopupCenter from '../PopupCenter';
import { GameInfoContext } from '../../../store/game-info_context';
import { useTranslation } from 'react-i18next';
import '../../../utils/i18n'; // Import file cấu hình i18n

interface PopupInputOTPProps {
    errorMessage?: string;
    mpsVerifyOTP: any;
    _title?: string;
    resendOTP: any;
    loading?: boolean
}

const PopupInputOTP: React.FC<PopupInputOTPProps> = ({errorMessage, mpsVerifyOTP, _title, resendOTP, loading}) => {
    const { t } = useTranslation();

    const { setModal } = useContext(GameInfoContext);

    const [OTP, setOTP] = useState("");
    const [error, setError] = useState(errorMessage);
    const [title, setTitle] = useState(_title || "Welcome To Mascot");
    
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        setError(errorMessage);
    }, [errorMessage]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft]);

    // const handleResendOTP = () => {
    //     alert("OTP resent!");
    //     setTimeLeft(60); // Đặt lại thời gian đếm ngược
    // };

    const styles = {
        container_2: {
            display: "flex",
            justifyContent: "space-between", // Đẩy hai phần tử ra hai bên
            alignItems: "center", // Căn giữa theo chiều dọc
            width: "100%", // Chiều rộng của container
            maxWidth: "300px", // Giới hạn chiều rộng
            margin: "10px auto", // Canh giữa container
            fontSize: "16px",
        },
        timer: {
            fontWeight: "bold",
            fontSize: "13px"
        },
        resend: {
            color: "#007BFF",
            cursor: "pointer",
            textDecoration: "underline",
            fontSize: "13px"
        },
        disabledResend: {
            color: "#CCC",
            cursor: "not-allowed",
            textDecoration: "none",
        },
    };


    return (
        <PopupCenter
            className='popup-overlay-history'
            onClick={() => setModal({ state: "CLOSE", type: "VERIFYOTP" })}
            classNameChild='mps'
        >
            <div className='mps-chill'>
                <div style={{ marginBottom: 20, textAlign: 'center' }}>
                    <h3>{title}</h3>
                    {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
                </div>
                <div style={{ marginBottom: 20 }}>
                    <input
                        maxLength={6}
                        type="text"
                        className="mps-input"
                        placeholder={t("Enter OTP")}
                        value={OTP}
                        onChange={(event) => {
                            const value = event.target.value;
                            if (/^\d*$/.test(value)) {
                                setOTP(value); // Chỉ cập nhật nếu giá trị là số
                            }
                        }}
                    />
                    <div style={styles.container_2}>
                        <span style={styles.timer}>{t('Remain')} {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}</span>
                        {timeLeft === 0 ? (
                            <span style={styles.resend} onClick={() => {
                                resendOTP()
                                setTimeLeft(60);
                            }}>
                                {t('Resend OTP?')}
                            </span>
                        ) : (
                            <span style={styles.disabledResend}>{t('Resend OTP?')}</span>
                        )}
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px",

                }}>
                    {loading ? 
                    <button className={'mps-button loading'}><span className="spinner"></span>GO</button> : 
                    <button className={'mps-button'} onClick={() => {
                        if (/^\d*$/.test(OTP) && OTP.length == 6) {
                            setTimeLeft(60); 
                            mpsVerifyOTP(OTP);
                        } else {
                            setError(t("Please input OTP"))
                        }

                    }}>GO</button>}
                </div>

            </div>
        </PopupCenter>
    );
};

export default PopupInputOTP;
