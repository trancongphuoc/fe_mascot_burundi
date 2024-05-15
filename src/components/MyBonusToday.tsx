
import Icoin from '../assets/icoin.svg';
import ArrowWhite from '../assets/arrow-white.svg';
import Background from '../assets/background_card_small.svg';


function MyBonusToday({bonusToday, goodBets, totalIcoin, myInfoBetReults} : MyInfoBetResultModel) {
    return (
        <>  
            <div className="section-myInfo mt-24px">
                <div className="section-myInfo__header--background">&nbsp;</div>
                <div className="header-left">
                    <p className='header-left--text'>Thưởng hôm nay:</p>
                    <img className='header-left--img' src={Icoin} alt="icoin" />
                    <p className='header-left--icoin'>{bonusToday}</p>
                </div>
                <div className="header-right">
                    <p className='header-right--text'>Số lần đã đoán hôm nay: {goodBets}</p>
                    <img className='header-right--arrow' src={ArrowWhite} alt="white_arrow" />
                </div>
               
                <div className="section-myInfo__cards">
                    {
                        myInfoBetReults.map((myInfoBetReult, index) => (
                            <div key={index} className="card__main">
                                <p className="card__main--background-color">&nbsp;</p>
                                <p className="card__main--header">{myInfoBetReult.number}</p>
                                <img src={Background} alt="background_small" className="card__main--background"/>
                                <img src={myInfoBetReult.card} alt="" className="card__main--zodiac" />
                                <p className='card__main--bonus'>x{myInfoBetReult.bonus}</p>
                                <h4 className='card__main--icoin'>{myInfoBetReult.players} iCoin</h4>

                            </div>
                        ))
                    }
                </div>

                <div className="end-left">
                    <p className='end-left--text'>Tổng của tôi:</p>
                    <img src={Icoin} alt="icoin" className="end-left--img"></img>
                    <p className='end-left--icoin'>{totalIcoin}</p>
                </div>
                <h4 className='end-right'>
                    <p className='end-right--text'>Nạp ngay</p>
                    <img src={ArrowWhite} alt="arrow" className="end-right--img"></img>
                </h4>
            </div>
        </>

        //old version
        // <>  
        //     <div className="section-myInfo 'u-margin-top-huge">
        //         <div className="section-myInfo__header">
        //             <h4 className='section-myInfo__header--left'>Thưởng hôm nay: <i className="icoin-logo"></i> {bonusToday}</h4>
        //             <h4 className='section-myInfo__header--right'>Số lần đã đoán hôm nay: {goodBets}</h4>
        //         </div>
        //         <div className="section-myInfo__cards">
        //             {
        //                 myInfoBetReults.map((myInfoBetReult, index) => (
        //                     <div key={index} className="section-myInfo__cards--main">
        //                         <div className="section-myInfo__cards--first">
        //                             <h4>{myInfoBetReult.number}</h4>
        //                             <Card card={myInfoBetReult.card} className='card--zodiac__medium'/>
        //                         </div>
        //                         <p className='section-myInfo__cards--bonus'>x{myInfoBetReult.bonus}</p>
        //                         <h4 className='section-myInfo__cards--icoin'>{myInfoBetReult.players} iCoin</h4>
        //                     </div>
        //                 ))
        //             }
        //         </div>
        //         <div className="section-myInfo__end">
        //             <div className="section-myInfo__end--left">
        //                 <p className=''>Tổng của tôi:</p>
        //                 <img src={Icoin} alt="icoin" className="icoin-logo"></img>
        //                 <p className=''>{totalIcoin}</p>
        //             </div>
        //             <h4 className='section-myInfo__end--right'>
        //                 <p className='section-myInfo__end--right-text'>Nạp ngay</p>
        //                 <img src={ArrowWhite} alt="arrow" className="arrow-white"></img>
        //             </h4>
        //         </div>
        //     </div>
        // </>
    );
}

export default MyBonusToday;