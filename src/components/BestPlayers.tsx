
import { useEffect, useState } from 'react';
import SecondaryText from '../assets/best-players-logo.svg';
import Icoin from '../assets/icoin.svg';
import SVG from 'react-inlinesvg';
import bgBestPlayers from '../assets/bg_best_players.svg';
import { listenTopUsers } from '../firebase/bestPlayers';

interface BestPlayersPro {
    statusGame: StatusGame
}

interface User {
    facebookUserId: string;
    name: string;
    profileImageLink: string;
    totalIcoin: number;
    uid: string;
}


function BestPlayers({statusGame} : BestPlayersPro) {

    const [topUsers, setTopUser] = useState<User[]>([])

    useEffect(() => {
        let unsubscribe = () => {}; 
        if (statusGame === "COUNTDOWN") {
            unsubscribe = listenTopUsers(setTopUser);
        } else {
            unsubscribe && unsubscribe();
        }
        return () => unsubscribe && unsubscribe();
    }, [statusGame]);

    return (    
        <div className="best-players mb-4-5px mt-30px">
            <SVG src={bgBestPlayers} className="best-players__bg"/>
            <SVG src={SecondaryText} className='best-players--img mt-6px'/>
            <div className="contents mt-8px mb-23-5px">
                {
                    topUsers.sort((a, b) => (b.totalIcoin ?? 0) - (a.totalIcoin ?? 0)).map((user, index) => (
                        <div className="content" key={index}>
                            <img src={user.profileImageLink} alt="avatar" className='content--img'></img>
                            <p className="content--name">{user.name}</p>
                            <p className="content--text">Thưởng ván trước:</p>
                            <div className="content__icoin">
                                <p className="content__icoin--data">{user.totalIcoin}</p>
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