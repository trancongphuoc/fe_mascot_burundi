
import { useContext } from 'react';
import SecondaryText from '../../assets/best-players-logo.svg';
import SVG from 'react-inlinesvg';
import bgBestPlayers from '../../assets/bg_best_players.png';
// import { getTopUsers } from '../../firebase/bestPlayers';
import { log } from '../../utils/log';
import BestUser from './BestUser';
import { GameInfoContext } from '../../store/game-info_context';
// import { off, onValue, ref } from 'firebase/database';
// import { db } from '../../firebase/config';

// interface BestPlayersPro {
//     statusGame: StatusGame
// }

// interface User {
//     facebookUserId?: string;
//     name?: string;
//     profileImageLink?: string;
//     totalIcoin?: number;
//     uid?: string;
// }


const BestPlayers = function BestPlayers() {
    log('<BestPlayers />');

    // const [topUsers, setTopUser] = useState<User[]>([])
    const { topUsers, stateGame } = useContext(GameInfoContext);

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

    // useEffect(() => {
    //     const stateRef = ref(db, '/zodiacGame/state/topUsers');
    //     const handleData = (snapshot: any) => {
    //         const data = snapshot.val();
    //         if (data) {
    //             const topUsers: User[] = Object.keys(data).map(userId => {
    //                 const userData = data[userId];
    //                 return {
    //                     facebookUserId: userData.facebookUserId ?? '',
    //                     name: userData.name ?? '',
    //                     profileImageLink: userData.profileImageLink ?? '',
    //                     totalIcoin: userData.totalIcoin,
    //                     uid: userData.uid,
    //                 };
    //             });
    //             setTopUser([...topUsers.sort((a, b) => (b.totalIcoin ?? 0) - (a.totalIcoin ?? 0))]);
    //         } else {
    //             setTopUser([]);
    //         }
    //     };

    //     if (stateGame !== "RESULT" && stateGame !== "RESULTWAITING" && stateGame !== "END") {
    //         onValue(stateRef, handleData)
    //       } else {
    //         off(stateRef, 'value', handleData)
    //       }
    //     return () => off(stateRef, 'value', handleData);


    // }, [stateGame, transactionId]);

    return (    
        <div className="best-players mb-4-5px mt-30px">
            {/* <SVG src={bgBestPlayers} className="best-players__bg"/> */}
            <img src={bgBestPlayers}  alt={''} className="best-players__bg"/>
            <SVG src={SecondaryText} className='best-players--img mt-6px'/>
            <ol className="contents">
                {    
                    stateGame && stateGame !== "RESULT" && stateGame !== "RESULTWAITING" &&
                    stateGame !== "END" &&
                    topUsers.map((user, index) => (
                        <BestUser
                            key={user.facebookUserId}
                            index={index}
                            profileImageLink={user.profileImageLink || ''}
                            name={user.name || 'unknow'}
                            totalIcoin={user.totalIcoin || 0}/>
                    ))
                }
            </ol>
        </div>
    );
}

export default BestPlayers;