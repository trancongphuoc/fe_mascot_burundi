
import '../css/index.css';
import background from '../assets/background_card_large.svg';
import backgroundSelected from '../assets/b.svg';

function FullCard({ card, isSelected,bonus, players, number }: CardModel) {

    return (
        <div className="betting-card">
            <p className='betting-card--no'>{number}</p>
            <img src={isSelected ? backgroundSelected : background} alt="card_background" className='betting-card--background'></img>
            <img src={card} alt="card_zodiac" className='betting-card--zodiac'></img>
            <p className='betting-card--bonus'>x{bonus}</p> 
            <p className='betting-card--players'>{players} người</p>
        </div>
    );
}

export default FullCard;