import maintainImg from "../../assets/maintain2x.png";
import PopupCenter from "../popup/PopupCenter";
import { useTranslation } from 'react-i18next';
import '../../utils/i18n'; // Import file cấu hình i18n

export default function MaintainModal () {
    const { t } = useTranslation();

    return (
        <PopupCenter
        className='popup-overlay-center'
        classNameChild='maintain'
        >
            <img className="maintain--img" src={maintainImg} alt="maintain image for stop game"/>
            <p className="maintain--text">{t("The game is currently under maintenance. Please wait a while.")}</p>
            {/* <p className="maintain--text">Bạn vui lòng chờ một thời gian</p> */}
        </PopupCenter>
    )
}