import { ref, onValue, off } from 'firebase/database';
import { db } from './config';

interface User {
    facebookUserId: string;
    name: string;
    profileImageLink: string;
    totalIcoin: number;
    uid: string;
}

export const listenTopUsers = (callback: (users: User[]) => void) => {
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
        }
        callback(topUsers); // Execute the callback with the retrieved data
    };

    onValue(stateRef, handleData);
    
    return () => off(stateRef, 'value', handleData); // Return the unsubscribe function
};