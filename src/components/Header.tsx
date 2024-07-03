import PrimaryText from '../assets/primary-text.svg';
import SVG from 'react-inlinesvg';
import Rule from '../assets/rule.svg';
import { log } from '../utils/log';
import { memo } from 'react';

interface HeaderProps {
    gameNo?: number,
    onClickRule: () => void
}
const Header = memo(function Header({gameNo, onClickRule} :HeaderProps) {
    log(`123 ${gameNo}`);
    log('<Header />');
    return (
        <header className='section-header u-margin-top-huge1'>
            <SVG src={PrimaryText} className='u-margin-minus-bottom-big' />
            <p className='heading-secondary'>Hôm nay {gameNo ?? 0} Ván</p>
            <SVG
            src={Rule}
            onClick= {onClickRule}
            className='section-header__rule'/>
        </header>
    );
});

export default Header;