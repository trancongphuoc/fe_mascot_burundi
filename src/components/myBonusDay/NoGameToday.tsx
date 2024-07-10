import { memo, useContext } from "react";
import SVG from 'react-inlinesvg';
import { GameInfoContext } from "../../store/game-info_context";
import { log } from "../../utils/log";


interface NoGameTodayProps {
    arrowImg: string,
    noGameToday: number,
}

const NoGameToday = memo(function NoGameToday ({ arrowImg, noGameToday}: NoGameTodayProps) {
    log('<NoGameToday />')
    
    const { setModal } =  useContext(GameInfoContext);

    return (
        <div onClick={ () => setModal({state: "OPEN", type: "MYHISTORY"}) } className="header-right">
            <p className='header-right--text'>Số lần đoán hôm nay: {noGameToday}</p>
            <SVG className='header-right--arrow' src={arrowImg}/>
        </div>)
})

export default NoGameToday;