
import '../css/index.css';
import bgCardNormal from '../assets/bg_card_nomarl.svg';
import bgCardSelected from '../assets/bg_card_selected.svg';
import SVG from 'react-inlinesvg';
import { useTranslation } from 'react-i18next';
import '../utils/i18n'; // Import file cấu hình i18n
interface FullCardPro {
    card: string;
    isSelected: boolean;
    number: number;
    bonus: number;
    players: number;
    onOpen: () => void;
}

function FullCard({ card, isSelected,bonus, players, number, onOpen}: FullCardPro) {
    const { t } = useTranslation();
    return (
        <div onClick={onOpen} className="betting-card">
            <p className='betting-card--no'>{number}</p>
            <SVG src={isSelected ? bgCardSelected : bgCardNormal} className='betting-card--background'/>
            <SVG src={card}  className='betting-card--zodiac'/>
            <p className='betting-card--bonus'>x{bonus}</p> 
            <p className='betting-card--players'>{players} {t("Person")}</p>
        </div>
    );
}

export default FullCard;