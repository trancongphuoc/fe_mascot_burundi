
import SecondaryText from '../assets/best-players-logo.svg';
import Icoin from '../assets/icoin.svg';

interface BestPlayersProps {
    bestPlayers: BestPlayersModel[];
}

function BestPlayers( {bestPlayers}: BestPlayersProps ) {
    return (    
        <div className="best-players mb-4-5px mt-30px">

            <img src={SecondaryText} alt="sencondary_text" className='best-players--img mt-5px'></img>

            <div className="contents mt-12px mb-7px">
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
                            {index !== bestPlayers.length - 1 && <p className='content__icoin--line'>&nbsp;</p>}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default BestPlayers;