import { formatNumber } from "../../utils/utils"
import Icoin from '../../assets/icoin.svg';
import AvatarCircle from "../AvatarCircle";
// import { log } from "../../utils/log";
import { useTranslation } from 'react-i18next';
import '../../utils/i18n'; // Import file cấu hình i18n


interface BestUserProps {
    index: number,
    profileImageLink: string,
    name: string,
    totalIcoin: number
}

export default function BestUser({index, profileImageLink, name, totalIcoin} : BestUserProps) {
    const { t } = useTranslation();

    // log('<BestUser />')
    return (
        <li className={`content${index}`}>
            <AvatarCircle avatarUrl={profileImageLink} className={`content${index}--img`}/>
            <p className={`content${index}--name`}>{name}</p>
            <p className={`content${index}--text`}>{t("Previous Bonus")}</p>
            <div className={`content${index}__icoin`}>
                <p className={`content${index}__icoin--data`}>{formatNumber(totalIcoin || 0)}</p>
                <img src={Icoin} alt="icoin" className="content1__icoin--img"></img>
            </div>
        </li>
    )
}