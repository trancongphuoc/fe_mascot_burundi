import SVG from 'react-inlinesvg';
import Background from '../../assets/background_card_small.svg';
import ToltalIcoinBetting from './TotalIcoinBetting';

interface BettingCardProps {
    betCard: BetZodiacCard,
}

const BettingCard =  ({ betCard }: BettingCardProps) => {
    return (
        <div className="card__main">
            <p className="card__main--background-color">&nbsp;</p>
            <p className="card__main--header">{betCard.id.split('_').slice(-1)}</p>
            <SVG src={Background} className="card__main--background"/>
            <SVG src={betCard.imageUrl} className="card__main--zodiac"/>
            <p className='card__main--bonus'>x{betCard.multiply}</p>
            <ToltalIcoinBetting bettingIcoin={betCard.totalIcoinBetting || 0} />
        </div>
    )
}

export default BettingCard;