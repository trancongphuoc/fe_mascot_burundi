import { useEffect, useState } from "react";
import { onValue, ref, off } from "firebase/database";
import { db } from "../firebase/config";
import { handleErrorAvartar } from "./DefaultUserAvartar";

export default function Players() {
    const [players, setPlayers] = useState<User[]>([]);
    const [number, setNumber] = useState(0);

    useEffect(() => {
        const stateRef = ref(db, 'zodiacGame/players');

        const handleData = (snapshot: any) => {
            const data = snapshot.val();
            if (data) {
                const playersList: User[] = [];
                for (const playerId in data) {
                    if (Object.hasOwnProperty.call(data, playerId)) {
                        const playerData = data[playerId];
                        const player: User = {
                            facebookUserId: playerData.facebookUserId,
                            profileImageLink: playerData.profileImageLink ?? '',
                            name: playerData.name,
                            uid: playerData.uid,
                            totalIcoin: playerData.totalIcoin,
                            noBettingToday: playerData.noBettingToday
                        };
                        playersList.push(player);
                    }
                }

                setPlayers(playersList);
                const extraPlayers = playersList.length > 5 ? playersList.length - 5 : 0;
                setNumber(extraPlayers);
            }
        };

        onValue(stateRef, handleData);

        return () => {
            off(stateRef, 'value', handleData);
        };

    }, []);

    return (
        <div className="result__right">
            {players.slice(0, 5).map((player) => (
                <img 
                    key={player.profileImageLink}
                    src={player.profileImageLink}
                    alt="avatar"
                    className="avatar mr-5px"
                    onError={handleErrorAvartar} />
            ))}
            {(players.length > 5) && <h2 className='result__right--number'>{number}</h2>}
        </div>
    );
}   
