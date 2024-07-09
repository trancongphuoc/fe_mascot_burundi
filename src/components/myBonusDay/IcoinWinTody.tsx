import { memo } from "react";
import { log } from "../../utils/log";
import { formatNumber } from "../../utils/utils";
import SVG from 'react-inlinesvg';

interface IcoinWinTodayProps {
    icoinImg: string,
    icoinWinToday: number,
}

const IcoinWinToday=  memo(function IcoinWinToday({ icoinImg, icoinWinToday } : IcoinWinTodayProps) {
    log('<IcoinWinToday />')
    return (
        <div className="totalIcoin">
            <SVG className='header-left--img' src={icoinImg}/>
            <p className='header-left--icoin'>{formatNumber(icoinWinToday)}</p>
        </div>
    )
})

export default IcoinWinToday;