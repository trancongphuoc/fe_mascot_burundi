import { ref, onValue, DataSnapshot } from 'firebase/database';
import { db } from './config';


export const getStatusGame = (): Promise<StatusGame> => {
    return new Promise((resolve, reject) => {
        const stateRef = ref(db, 'zodiacGame/state/status');
        const handleData = (snapshot: DataSnapshot) => {
            const data = snapshot.val();
            if (data) {
                resolve(data);
            } else {
                resolve("NONE");
            }
        };

        const handleError = (error: any) => {
            reject(error);
        };

        onValue(stateRef, handleData, handleError);
    });
};
