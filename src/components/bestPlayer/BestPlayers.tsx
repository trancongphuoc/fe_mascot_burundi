
import { memo, useEffect, useState } from 'react';
import SecondaryText from '../../assets/best-players-logo.svg';
import SVG from 'react-inlinesvg';
import bgBestPlayers from '../../assets/bg_best_players.png';
import { getTopUsers } from '../../firebase/bestPlayers';
import { log } from '../../utils/log';
import BestUser from './BestUser';

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


const BestPlayers = memo(function BestPlayers({statusGame} : BestPlayersPro) {
    log('<BestPlayers />');

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

        if (statusGame === "PREPARESTART" || topUsers.length === 0) {
            getTopUsers()
                .then(users => {
                    const updateUsers = [...users];
                    if (isMounted) setTopUser(updateUsers.sort((a, b) => (b.totalIcoin ?? 0) - (a.totalIcoin ?? 0)));
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
                        <BestUser
                            key={user.facebookUserId}
                            index={index}
                            profileImageLink={user.profileImageLink ?? ''}
                            name={user.name ?? 'unknow'}
                            totalIcoin={user.totalIcoin ?? 0}/>
                    ))
                }
            </ol>
        </div>
    );
})

export default BestPlayers;