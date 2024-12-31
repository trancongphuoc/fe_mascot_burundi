interface ToltalIcoinBettingProps {
    bettingIcoin: number,
}

const ToltalIcoinBetting = ({bettingIcoin}: ToltalIcoinBettingProps) => {
    return (
        <p className='card__main--icoin'>{bettingIcoin} manota</p>
    )
}

export default ToltalIcoinBetting;