import maintainImg from "../../assets/maintain2x.png";
import PopupCenter from "../popup/PopupCenter";

export default function MaintainModal () {
    return (
        <PopupCenter
        className='popup-overlay-center'
        classNameChild='maintain'
        >
            <img className="maintain--img" src={maintainImg} alt="maintain image for stop game"/>
            <p className="maintain--text">Hiện tại game đang được bảo trì</p>
            <p className="maintain--text">Bạn vui lòng chờ một thời gian</p>
        </PopupCenter>
    )
}