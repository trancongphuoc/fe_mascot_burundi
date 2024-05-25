import api from './axios';
import { GameHistory } from '../model/GameHistory';

export const fetchGameHistory = async (token: string | null, setGameHistory: React.Dispatch<React.SetStateAction<GameHistory[]>>) => {
  try {
    const response = await api.get(`/rest/zodiac-game/history`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log('history', response.data);
    if (response.data.status === "OK" && response.data.data.zodiacGameList.length > 0) {
      const gameData: GameHistory[] = response.data.data.zodiacGameList.map((item: any) => ({
        status: item.status,
        zodiacCardId: item.zodiacCardId,
        noGame: item.noGame,
      }));
      setGameHistory(gameData);
    }
  } catch (error) {
    console.log(error);
  }
}