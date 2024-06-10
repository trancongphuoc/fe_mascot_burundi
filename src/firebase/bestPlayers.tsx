
import { ref, onValue } from 'firebase/database';
import { db } from './config';


interface User {
    facebookUserId: string;
    name: string;
    profileImageLink: string;
    totalIcoin: number;
    uid: string;
}

export const getTopUsers = (): Promise<User[]> => {
    return new Promise((resolve, reject) => {
        const stateRef = ref(db, '/zodiacGame/state/topUsers');
        const handleData = (snapshot: any) => {
            const data = snapshot.val();
            const topUsers: User[] = [];
            if (data) {
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
                resolve(topUsers);
            } else {
                resolve([]);
            }
        };

        onValue(stateRef, handleData, (error) => {
            reject(error);
        });
    });
};
