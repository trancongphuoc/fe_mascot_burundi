import api, { token } from './axios';

export const fetchMyHistory = async () => {
  try {
    const response = await api.get(`/rest/zodiac-game/user-history`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    console.log('my history', response.data);

    if (response.data.status === "OK" && Array.isArray(response.data.data.zodiacGameUserList)) {
      return response.data.data.zodiacGameUserList;
    } else {
      console.error('Unexpected response structure:', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching game history:', error);
    return null;
  }
};
