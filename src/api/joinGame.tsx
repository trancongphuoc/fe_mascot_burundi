import api from './axios';

export const joinGame = async (token: string | null): Promise<string> => {
  try {
    const response = await api.get(`/rest/zodiac-game/join-game`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    console.log('history', response.data);

    if (response.data.status === "OK") {
      return "OK";
    } else {
      console.error('Unexpected response structure:', response.data);
      return "FALED";
    }
  } catch (error) {
    console.error('Error fetching game history:', error);
    return "FALED";
  }
};
