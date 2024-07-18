import maintainImg from "../../assets/maintain2x.png";

export default function MaintainModal () {
    return <dialog>
        <img src={maintainImg} alt="maintain image for stop game"/>
        <p>Hiện tại game đang được bảo trì</p>
        <p>Bạn vui lòng chờ một thời gian</p>
    </dialog>
}