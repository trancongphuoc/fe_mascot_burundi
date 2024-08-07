import api from './axios';
import { GameHistory } from '../model/GameHistory';
import { setLogCat } from './sendLogcat';
import { log } from '../utils/log';

export const fetchGameHistory = async (): Promise<GameHistory[] | null> => {
  const label = "GAME HISTORY"
  try {
    const startTime = new Date().getTime();

    setLogCat("Game History Api");

    const response = await api.get(`/rest/zodiac-game/history`)
    const endTime = new Date().getTime();
    const duration = endTime - startTime;
    log("xxxxxx", duration);
    if (response.data.status === "OK" && Array.isArray(response.data.data.zodiacGameList)) {

      await setLogCat("Game History Api Success");

      return response.data.data.zodiacGameList.map((item: any) => ({
        status: item.status,
        zodiacCardId: item.zodiacCardId,
        noGame: item.noGame,
      }));

    } else {
      await setLogCat(JSON.stringify({label, responseData: response.data}));

      console.error('Unexpected response structure:', response.data);
      return null;
    }
  } catch (error) {
    await setLogCat(JSON.stringify({label, error: error}));
    console.error('Error fetching game history:', error);
    return null;
  }
};
