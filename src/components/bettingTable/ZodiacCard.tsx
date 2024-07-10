// import bgCardNormal from '../../assets/bg_card_nomarl.svg';
// import bgCardSelect from '../../assets/bg_card_selected.svg';
import SVG from 'react-inlinesvg';

import bgCard from '../../assets/bg_card_normal.png';
import bgCardSelect from '../../assets/bg_card_normal_select.png';
import BettingPLayers from './BettingPlayer';
import { GameInfoContext } from '../../store/game-info_context';
import { useContext } from 'react';

interface ZodiacCardPro {
    index: number,
    betCard: ZodiacCardModel,

}
export default function ZodiacCard({betCard, index}: ZodiacCardPro) {
    const { selectedCard, setSelectedCard } = useContext(GameInfoContext);

    const isActive = selectedCard?.id === betCard.id;

    return <div 
        onClick={() => setSelectedCard(betCard)}
        className="betting-table__card">

        <p className='betting-table__card--no'>{index + 1}</p>

        {/* <SVG
            key='bgNormal'
            src={'bgCardSelect'}
            className='betting-table__card--bgNormal'
            style={{zIndex: isActive ? 2 : 1,
                opacity: isActive ? 1 : 0,
            }}/>  */}

        <img
            src={bgCardSelect}
            className='betting-table__card--bgNormal'
            style={{zIndex: isActive ? 2 : 1,
                opacity: isActive ? 1 : 0,
            }}
        />
        <img
            src={bgCard}
            className='betting-table__card--bgSelected'
            style={{zIndex: isActive ? 1 : 2,
                opacity: isActive ? 0 : 1
            }}
        />

        {/* <SVG
            key='bgSelected'
            src={bgCardNormal}
            className='betting-table__card--bgSelected'
            style={{zIndex: isActive ? 1 : 2,
                opacity: isActive ? 0 : 1
            }}/> */}

        
        <SVG src={betCard.imageUrl} className='betting-table__card--zodiac'/>
        <p className='betting-table__card--bonus'>x{betCard.multiply}</p> 
        <BettingPLayers numberOfPlayer={betCard.counter ?? 0}/>
    </div>
}