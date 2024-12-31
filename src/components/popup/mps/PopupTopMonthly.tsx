import { useEffect, useState, useContext } from 'react';
import PopupCenter from '../PopupCenter';
import { GameInfoContext } from '../../../store/game-info_context';
import * as mps from '../../../api/mps.ts';
import { useTranslation } from 'react-i18next';
import '../../../utils/i18n'; // Import file cấu hình i18n
import Loading from '../../Loading';
import Top1 from '../../../assets/top_1.svg';
import Top2 from '../../../assets/top_3.svg';
import Top3 from '../../../assets/top_1.svg';

import iCoin from '../../../assets/icoin_small.svg';
const PopupTopMonthly = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { setModal, stateGame } = useContext(GameInfoContext);
    const { t } = useTranslation();
  
    useEffect(() => {
      const fetchData = async () => {
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
      fetchData();
    }, []);

    const getIndex = (index: number) => {
        if(index === 0) {
            return <img style={{borderRadius: "50%", objectFit: 'cover', width: 20, textAlign: 'center'}} src={Top1} />
        } else if(index === 1) {
            return <img style={{borderRadius: "50%", objectFit: 'cover', width: 20, textAlign: 'center'}} src={Top2} />
        } else if(index === 2) {
            return <img style={{borderRadius: "50%", objectFit: 'cover', width: 20, textAlign: 'center'}} src={Top3} />
        } else {
            return <span style={{width: 20, textAlign: 'center'}}>{index}</span>;
        }
    }

    return (
        <PopupCenter
            className='popup-overlay-history'
            onClick={() => setModal({ state: "CLOSE", type: "TOPMONTHLY" })}
            classNameChild='mps-top'
        >
            <div className='mps-chill' style={{minHeight: 250, width: 290, maxHeight: 365, overflowY: 'auto'}}>
                <h2 className='mps-color' style={{textAlign:'center'}}>Urutonde rw'uku kwezi</h2>
                {loading ? <Loading /> : 
                (<div style={{overflowY: 'auto'}}>
                    {users.map((u, index) => (
                        <div style={{alignItems: 'center', display: 'flex', gap: 10}}>
                            {getIndex(index)}
                            <div><img style={{borderRadius: "50%", objectFit: 'cover'}} src={u.profileImageLink} width={30} /></div>
                            
                            <span>{u.phone}</span>
                            <div style={{marginLeft: 'auto', alignItems: 'center', display: 'flex'}}><span>{u.totalStar}</span><img style={{marginLeft: 7}} src={iCoin} width={16} /></div>
                            
                        </div>
                    ))}
                </div>)}
            </div>
        </PopupCenter>
    );
};

export default PopupTopMonthly;
