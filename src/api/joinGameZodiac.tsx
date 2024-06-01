import axios from 'axios';
import api, { token } from './axios';

interface JoinGameResponse {
  status: string;
  message: string;
  data: {
    user: User;
  };
}

export const joinGameZodiac = async (): Promise<string> => {
  try {
    const response = await api.post<JoinGameResponse>('/rest/zodiac-game/join-game', {}, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    const { status, data } = response.data;

    if (status === "OK" && data && data.user && data.user.facebookUserId) {
      const { facebookUserId } = data.user;
      return facebookUserId;
    } else {
      console.error('Unexpected response structure:', response.data);
      return "FAILED";
    }
  } catch (error) {
    handleAxiosError(error);
    return "FAILED";
  }
};

const handleAxiosError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error('Axios error fetching game history:', error.response?.data || error.message);
  } else {
    console.error('Unexpected error fetching game history:', error);
  }
};