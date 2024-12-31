import { useEffect, useState, useContext } from 'react';
import PopupCenter from '../PopupCenter';
import { GameInfoContext } from '../../../store/game-info_context';
import * as mps from '../../../api/mps.ts';
import { useTranslation } from 'react-i18next';
import '../../../utils/i18n'; // Import file cấu hình i18n
import Loading from '../../Loading';
import Top1 from '../../../assets/top_1.svg';
import Top2 from '../../../assets/top_2.svg';
import Top3 from '../../../assets/top_3.svg';

import SVG from "react-inlinesvg";

import Daily from "../../../assets/daily.svg";
import Monthly from "../../../assets/monthly.svg";

import iCoin from '../../../assets/icoin_small.svg';
const PopupTopdaily = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [title, setTitle] = useState<string>("Urutonde rw'uyu munsi");
    const [type, setType] = useState<string>("DAILY");

    const { setModal, stateGame, totalStar, totalStarMonth, phone } = useContext(GameInfoContext);

    const { t } = useTranslation();

    const fetchDataTopDaily = async () => {
        setLoading(true)
        setTitle("Urutonde rw'uyu munsi");
        setType("DAILY")
        try {
            const res = await mps.topDaily();
            console.log(res)
            if (res.data.status == "OK") {

                if (stateGame !== "RESULTWAITING" && stateGame !== "RESULT" && stateGame !== "END") {
                    setUsers(res.data.data?.users)
                }
            }
        } catch (error) {
            console.error('Error fetching history:', error);
        }
        setLoading(false);
    };

    const fetchDataTopMonthly = async () => {
        setLoading(true)
        setTitle("Urutonde rw'uku kwezi")
        setType("MONTHLY")

        try {
            const res = await mps.topMonthly();
            console.log(res)
            if (res.data.status == "OK") {

                if (stateGame !== "RESULTWAITING" && stateGame !== "RESULT" && stateGame !== "END") {
                    setUsers(res.data.data?.users)
                }
            }
        } catch (error) {
            console.error('Error fetching history:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchDataTopDaily();
    }, []);

    const getIndex = (index: number) => {
        if (index === 0) {
            return <img style={{ borderRadius: "50%", objectFit: 'cover', width: 20, textAlign: 'center' }} src={Top1} />
        } else if (index === 1) {
            return <img style={{ borderRadius: "50%", objectFit: 'cover', width: 20, textAlign: 'center' }} src={Top2} />
        } else if (index === 2) {
            return <img style={{ borderRadius: "50%", objectFit: 'cover', width: 20, textAlign: 'center' }} src={Top3} />
        } else {
            return <span style={{ width: 20, textAlign: 'center' }}>{index}</span>;
        }
    }

    return (
        <PopupCenter
            className='popup-overlay-history'
            onClick={() => setModal({ state: "CLOSE", type: "TOPDAILY" })}
            classNameChild='mps-top'
        >
            <div style={{display: "flex", justifyContent: "center"}}>
                <button
                className="mps-top-button"
                onClick={type == "DAILY" ? fetchDataTopMonthly : fetchDataTopDaily}
                >{type == "DAILY" ? "Urutonde rw'uku kwezi" : "Urutonde rw'uyu munsi"}
                </button>
            </div>
            {/* <div className='mps-no-pd' style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <SVG
                    src={Daily}
                    className="section-header__logout mps-no-pd"
                    onClick={fetchDataTopDaily}
                />
                <SVG
                    src={Monthly}
                    className="section-header__rule"
                    onClick={fetchDataTopMonthly}
                />
            </div> */}

            <div className='mps-chill' style={{ minHeight: 400, minWidth: 290, maxHeight: "80%", overflowY: 'auto' }}>

                <h2 className='mps-color' style={{ textAlign: 'center' }}>{title}</h2>
                <p>Hello: <strong>{phone != null && phone.startsWith("257") ? phone.substring(3) : phone}</strong> </p>
                <p>Amanota mwaronse: <strong>{type == "DAILY" ?  totalStar :  totalStarMonth}</strong> </p>
                {loading ? <Loading /> :
                    (<div>
                        {users.map((u, index) => (
                            <div style={{ alignItems: 'center', display: 'flex', gap: 10 }}>
                                {getIndex(index)}
                                <div><img style={{ borderRadius: "50%", objectFit: 'cover' }} src={u.profileImageLink} width={30} /></div>

                                <span>{u.phone}</span>
                                <div style={{ marginLeft: 'auto', alignItems: 'center', display: 'flex' }}><span>{type == "DAILY" ? u.totalStar : u.totalStarMonth}</span><img style={{ marginLeft: 7 }} src={iCoin} width={16} /></div>

                            </div>
                        ))}
                    </div>)}
            </div>
        </PopupCenter>
    );
};

export default PopupTopdaily;
