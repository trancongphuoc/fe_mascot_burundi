import ArrowWhite from '../../assets/arrow-white.svg';
import SVG from 'react-inlinesvg';
import { callbackFlutter } from '../../utils/functions';
import { log } from '../../utils/log';

export default function DepositIcoin() {
    log('<DepositIcoin />')
    return (
        <button className='end-right' onClick={() => callbackFlutter('callbackMyWallet')}>
            <p className='end-right--text'>Nạp ngay</p>
            <SVG src={ArrowWhite} className="end-right--img"/>
        </button>
    );
}