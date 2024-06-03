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
    const token = window.sessionStorage.getItem('token');
    if (!token) {
      console.error('Token is not available');
      return "FAILED";
    } 

    const response = await api.post<JoinGameResponse>('/rest/zodiac-game/join-game', {}, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    const { status, data } = response.data;

    console.log('User from join game:', data?.user?.facebookUserId);

    if (status === "OK" && data && data.user && data.user.facebookUserId) {
      return data.user.facebookUserId;
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
    console.error('Axios error joining game:', error.response?.data || error.message);
  } else {
    console.error('Unexpected error joining game:', error);
  }
};
