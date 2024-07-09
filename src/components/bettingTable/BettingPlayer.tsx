interface BettingPLayersProps {
    numberOfPlayer: number
}

export default function BettingPLayers ({numberOfPlayer}: BettingPLayersProps) {
    return (
        <p className='betting-table__card--players'>{numberOfPlayer} người</p>
    )
}