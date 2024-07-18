import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import SVG from 'react-inlinesvg';
import Icoin from '../../assets/icoin.svg';
import { formatNumber } from "../../utils/utils";
import { off, onValue, ref } from "firebase/database";
import { log } from "../../utils/log";
import { useContext } from "react";
import { GameInfoContext } from "../../store/game-info_context";

interface MyTotalIcoinProps {
    fbId: string,
    betCards: BetZodiacCard[]
}

//TODO: fix have no pass fbId
const MyTotalIcoin = function MyTotalIcoin({ fbId, betCards }: MyTotalIcoinProps) {
    log('<MyTotalIcoin />');

    const [totalIcoin, setTotalIcoin] = useState<number>(0);
    const  { stateGame } = useContext(GameInfoContext);

    useEffect(()=> {
        const stateRef = ref(db, `/ikara/users/${fbId}/totalIcoin`);
        const handleData = (snapshot: any) => {
            const data = snapshot.val();
            if ((data && data != totalIcoin)) {
                if ( (stateGame !== "RESULTWAITING" && stateGame !== "RESULT" && stateGame !== "END") || betCards.length === 0) {
                    setTotalIcoin(data);  
                    window.sessionStorage.setItem('totalIcoin', data);   
                }  
            }
        };
        onValue(stateRef, handleData);
        return () => off(stateRef, 'value', handleData);
    },[totalIcoin, fbId, stateGame])


    return  (
        <div className="end-left">
                <p className='end-left--text'>Tổng của tôi:</p>
                <SVG src={Icoin} className="end-left--img"/>
                <p className='end-left--icoin'>{formatNumber(totalIcoin)}</p>
        </div>
    );
};

export default MyTotalIcoin;