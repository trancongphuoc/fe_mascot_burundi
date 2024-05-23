
import Icoin from '../assets/icoin.svg';
import ArrowWhite from '../assets/arrow-white.svg';
import Background from '../assets/background_card_small.svg';
import SVG from 'react-inlinesvg';


function MyBonusToday({bonusToday, goodBets, totalIcoin, myInfoBetReults, onOpen} : MyInfoBetResultModel) {
    return (
        <>  
            <div className="section-myInfo mt-24px">
                <div className="section-myInfo__header--background">&nbsp;</div>
                <div className="header-left">
                    <p className='header-left--text'>Thưởng hôm nay:</p>
                    <SVG className='header-left--img' src={Icoin}/>
                    <p className='header-left--icoin'>{bonusToday}</p>
                </div>
                <div onClick={onOpen} className="header-right">
                    <p className='header-right--text'>Số lần đã đoán hôm nay: {goodBets}</p>
                    <SVG className='header-right--arrow' src={ArrowWhite}/>
                </div>
               
                <div className="section-myInfo__cards">
                    {
                        myInfoBetReults.map((myInfoBetReult, index) => (
                            <div key={index} className="card__main">
                                <p className="card__main--background-color">&nbsp;</p>
                                <p className="card__main--header">{myInfoBetReult.number}</p>
                                <SVG src={Background} className="card__main--background"/>
                                <SVG src={myInfoBetReult.card} className="card__main--zodiac"/>
                                <p className='card__main--bonus'>x{myInfoBetReult.bonus}</p>
                                <h4 className='card__main--icoin'>{myInfoBetReult.players} iCoin</h4>

                            </div>
                        ))
                    }
                </div>

                <div className="end-left">
                    <p className='end-left--text'>Tổng của tôi:</p>
                    <SVG src={Icoin} className="end-left--img"/>
                    <p className='end-left--icoin'>{totalIcoin}</p>
                </div>
                <h4 className='end-right'>
                    <p className='end-right--text'>Nạp ngay</p>
                    <SVG src={ArrowWhite} className="end-right--img"/>
                </h4>
            </div>
        </>
    );
}

export default MyBonusToday;