interface ToltalIcoinBettingProps {
    bettingIcoin: number,
}

const ToltalIcoinBetting = ({bettingIcoin}: ToltalIcoinBettingProps) => {
    return (
        <p className='card__main--icoin'>{bettingIcoin} iCoin</p>
    )
}

export default ToltalIcoinBetting;