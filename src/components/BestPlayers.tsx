
import { useEffect, useState } from 'react';
import SecondaryText from '../assets/best-players-logo.svg';
import Icoin from '../assets/icoin.svg';
import SVG from 'react-inlinesvg';
import bgBestPlayers from '../assets/bg_best_players.png';
import { getTopUsers } from '../firebase/bestPlayers';

interface BestPlayersPro {
    statusGame: StatusGame
}

interface User {
    facebookUserId?: string;
    name?: string;
    profileImageLink?: string;
    totalIcoin?: number;
    uid?: string;
}


function BestPlayers({statusGame} : BestPlayersPro) {

    const [topUsers, setTopUser] = useState<User[]>([])

    // const top123: User[] = [{
    //     name: "Dong Hoang Linh",
    //     profileImageLink: "123",
    //     totalIcoin: 123
    //   },
    //   {
    //     name: "Dong Hoang Linh",
    //     profileImageLink: "123",
    //     totalIcoin: 12312
    //   },
    //   {
    //     name: "Dong Hoang Linh",
    //     profileImageLink: "123",
    //     totalIcoin: 12
    //   },
    // ]

    useEffect(() => {
        let isMounted = true;

        if (statusGame === "END") {
            getTopUsers()
                .then(users => {
                    const updateUsers = [...users];
                    if (isMounted) {
                        setTopUser(updateUsers.sort((a, b) => (b.totalIcoin ?? 0) - (a.totalIcoin ?? 0)));
                    }
                })
                .catch(error => {
                    setTopUser([])
                    console.error('Error fetching top users:', error)
                });
        }

        return () => {
            isMounted = false;
        };
    }, [statusGame]);

    return (    
        <div className="best-players mb-4-5px mt-30px">
            {/* <SVG src={bgBestPlayers} className="best-players__bg"/> */}
            <img src={bgBestPlayers}  alt={''} className="best-players__bg"/>
            <SVG src={SecondaryText} className='best-players--img mt-6px'/>
            <ol className="contents">
                {
                    topUsers.map((user, index) => (
                        <li className={`content${index}`} key={index}>
                            <img src={user.profileImageLink} alt="avatar" className={`content${index}--img`}></img>
                            <p className={`content${index}--name`}>{user.name}</p>
                            <p className={`content${index}--text`}>Thưởng ván trước:</p>
                            <div className={`content${index}__icoin`}>
                                <p className={`content${index}__icoin--data`}>{user.totalIcoin}</p>
                                <img src={Icoin} alt="icoin" className="content1__icoin--img"></img>
                            </div>
                        </li>
                    ))
                }
            </ol>
        </div>
    );
}

export default BestPlayers;