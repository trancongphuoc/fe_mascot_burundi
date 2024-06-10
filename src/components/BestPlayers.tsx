
import { useEffect, useState } from 'react';
import SecondaryText from '../assets/best-players-logo.svg';
import Icoin from '../assets/icoin.svg';
import SVG from 'react-inlinesvg';
import { off, onValue, ref } from 'firebase/database';
import { db } from '../firebase/config';
import bgBestPlayers from '../assets/bg_best_players.svg';

interface BestPlayersPro {
    statusGame: StatusGame
}


function BestPlayers({statusGame} : BestPlayersPro) {

    const [topUsers, setTopUser] = useState<User[]>([])

    useEffect(() => {
        const stateRef = ref(db, '/zodiacGame/state/topUsers');
        const handleData = (snapshot: any) => {
            const data = snapshot.val();
            console.log('zodiacCards', data);
            if (data) {
                const topUsers: User[] = [];
                for (const userId in data) {
                    if (Object.hasOwnProperty.call(data, userId)) {
                        const userData = data[userId];
                        const user: User = {
                            facebookUserId: userData.facebookUserId ?? '',
                            name: userData.name ?? '',
                            profileImageLink: userData.profileImageLink ?? '',
                            totalIcoin: userData.totalIcoin,
                            uid: userData.uid,
                        };
                        topUsers.push(user);
                    }
                }
                setTopUser(topUsers);
            } else {
                setTopUser([]);
            }
        };
        if (statusGame === "COUNTDOWN") {
            onValue(stateRef, handleData);
        } else {
            off(stateRef, 'value', handleData);
        }
        return () => off(stateRef, 'value', handleData);
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