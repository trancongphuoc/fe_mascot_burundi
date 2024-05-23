
import SecondaryText from '../assets/best-players-logo.svg';
import Icoin from '../assets/icoin.svg';
import SVG from 'react-inlinesvg';

interface BestPlayersProps {
    bestPlayers: BestPlayersModel[];
}

function BestPlayers( {bestPlayers}: BestPlayersProps ) {
    return (    
        <div className="best-players mb-4-5px mt-30px">

            <SVG src={SecondaryText} className='best-players--img mt-6px'/>

            <div className="contents mt-8px mb-23-5px">
                {
                    bestPlayers.map((player, index) => (
                        <div className="content" key={index}>
                            <img src={player.avatarUrl} alt="avatar" className='content--img'></img>
                            <p className="content--name">{player.name}</p>
                            <p className="content--text">Thưởng ván trước:</p>
                            <div className="content__icoin">
                                <p className="content__icoin--data">{player.winningIcoin}</p>
                                <img src={Icoin} alt="icoin" className="content__icoin--img"></img>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default BestPlayers;