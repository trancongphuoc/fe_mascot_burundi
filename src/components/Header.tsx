import PrimaryText from '../assets/primary-text.svg';
import SVG from 'react-inlinesvg';
import Rule from '../assets/rule.svg';
import { log } from '../utils/log';
import { memo } from 'react';
import Button from './Button';

interface HeaderProps {
    gameNo?: number,
    onClickRule: () => void
}
const Header = memo(function Header({gameNo, onClickRule} : HeaderProps) {
    log('<Header />');
    return (
        <header className='section-header u-margin-top-huge1'>
            <SVG src={PrimaryText} className='u-margin-minus-bottom-big' />
            <p className='heading-secondary'>Hôm nay {gameNo ?? 0} Ván</p>
            <Button onSet={onClickRule} cssClass='section-header__rule'>
                <SVG src={Rule}/>
            </Button>     
        </header>
    );
});

export default Header;