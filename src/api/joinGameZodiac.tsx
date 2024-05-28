import axios from 'axios'; // Ensure you have axios imported correctly
import api from './axios';

interface ApiResponse {
  status: string;
  [key: string]: any; // Allow additional properties if necessary
}

export const joinGameZodiac = async (token: string | null): Promise<string> => {
  try {
    const response = await api.post<ApiResponse>('/rest/zodiac-game/join-game', {}, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    console.log('Response data:', response.data);

    if (response.data.status === "OK") {
      return "OK";
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
