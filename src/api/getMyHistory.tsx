import api, { token } from './axios';
import { GameHistory } from '../model/GameHistory';

export const fetchMyHistory = async () => {
  try {
    const response = await api.get(`/rest/zodiac-game/user-history`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    console.log('my history', response.data);

    // if (response.data.status === "OK" && Array.isArray(response.data.data.zodiacGameList)) {
    //   return response.data.data.zodiacGameList.map((item: any) => ({
    //     status: item.status,
    //     zodiacCardId: item.zodiacCardId,
    //     noGame: item.noGame,
    //   }));
    // } else {
    //   console.error('Unexpected response structure:', response.data);
    //   return null;
    // }
  } catch (error) {
    console.error('Error fetching game history:', error);
    return null;
  }
};
