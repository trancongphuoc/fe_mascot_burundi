import maintainImg from "../../assets/maintain2x.png";
import PopupCenter from "../popup/PopupCenter";

export default function MaintainModal () {
    return (
        <PopupCenter
        className='popup-overlay-center'
        classNameChild='noti'
        >
            <img className="maintain--img" src={maintainImg} alt="maintain image for stop game"/>
            <p className="maintain--text1">Hiện tại game đang được bảo trì</p>
            <p className="maintain--text2">Bạn vui lòng chờ một thời gian</p>
        </PopupCenter>
    )
}