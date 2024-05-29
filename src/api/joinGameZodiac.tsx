import axios from 'axios';
import api, { token } from './axios';

interface ApiResponse {
  status: string;
  [key: string]: any;
}

export const joinGameZodiac = async (): Promise<string> => {
  try {
    const response = await api.post<ApiResponse>('/rest/zodiac-game/join-game', {}, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    console.log('join Game:', response.data);

    if (response.data.status === "OK" && response.data.user) {
      return response.data.user.facebookUserId;
    } else {
      console.error('Unexpected response structure:', response.data);
      return "FAILED";
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle known Axios error structure
      console.error('Axios error fetching game history:', error.response?.data || error.message);
    } else {
      // Handle unknown error structure
      console.error('Unexpected error fetching game history:', error);
    }
    return "FAILED";
  }
};
