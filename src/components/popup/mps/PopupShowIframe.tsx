import { useEffect, useState, useContext, useRef } from 'react';
import PopupCenter from '../PopupCenter';
import { GameInfoContext } from '../../../store/game-info_context';
import { useTranslation } from 'react-i18next';
import '../../../utils/i18n'; // Import file cấu hình i18n

interface PopupShowIframeProps {
    src: string;
    onClose?: () => void; // Hàm đóng iframe
}

const PopupShowIframe: React.FC<PopupShowIframeProps> = ({src, onClose}) => {
    const { setModal } = useContext(GameInfoContext);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    console.log("Iframe URL:", src);
    useEffect(() => {
      const checkIframe = setInterval(() => {
        if (iframeRef.current && !document.body.contains(iframeRef.current)) {
          console.log("Iframe đã bị xóa khỏi DOM");
          onClose?.(); // Gọi hàm đóng nếu iframe bị xóa
        }
      }, 1000);
  
      return () => clearInterval(checkIframe);
    }, []);

    return (
        <PopupCenter
            className='popup-overlay-history'
            onClick={() => setModal({ state: "CLOSE", type: "SHOWIFRAME" })}
            classNameChild='mps-iframe'
        >
            <div className='mps-chill'>
                <iframe
                ref={iframeRef}
                src={src}
                width={"100%"}
                height={"600px"}
                style={{ border: "none", borderRadius: "8px" }}
                title="Verification OTP"
                onLoad={() => setIsLoaded(true)}
            />

            </div>
        </PopupCenter>
    );
};

export default PopupShowIframe;
