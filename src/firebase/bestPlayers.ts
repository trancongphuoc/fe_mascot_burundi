import { ref, onValue } from 'firebase/database';
import { db } from './config';

interface User {
    facebookUserId: string;
    name: string;
    profileImageLink: string;
    totalIcoin: number;
    uid: string;
}

const getTopUsers = (): Promise<User[]> => {
    return new Promise((resolve, reject) => {
        const stateRef = ref(db, '/zodiacGame/state/topUsers');
        const handleData = (snapshot: any) => {
            const data = snapshot.val();
            if (data) {
                const topUsers: User[] = Object.keys(data).map(userId => {
                    const userData = data[userId];
                    return {
                        facebookUserId: userData.facebookUserId ?? '',
                        name: userData.name ?? '',
                        profileImageLink: userData.profileImageLink ?? '',
                        totalIcoin: userData.totalIcoin,
                        uid: userData.uid,
                    };
                });
                resolve(topUsers);
            } else {
                resolve([]);
            }
        };

        const handleError = (error: any) => {
            reject(error);
        };

        onValue(stateRef, handleData, handleError);
    });
};

export default getTopUsers;