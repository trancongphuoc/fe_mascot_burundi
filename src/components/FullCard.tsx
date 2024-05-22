
import '../css/index.css';
import bgCardNormal from '../assets/bg_card_nomarl.svg';
import bgCardSelected from '../assets/bg_card_selected.svg';
import SVG from 'react-inlinesvg';

interface FullCardPro {
    card: string;
    isSelected: boolean;
    number: number;
    bonus: number;
    players: number;
    onOpen: () => void;
}

function FullCard({ card, isSelected,bonus, players, number, onOpen}: FullCardPro) {

    return (
        <div onClick={onOpen} className="betting-card">
            <p className='betting-card--no'>{number}</p>
            <SVG src={isSelected ? bgCardSelected : bgCardNormal} className='betting-card--background'/>
            <SVG src={card}  className='betting-card--zodiac'/>
            <p className='betting-card--bonus'>x{bonus}</p> 
            <p className='betting-card--players'>{players} người</p>
        </div>
    );
}

export default FullCard;