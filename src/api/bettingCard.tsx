import axios from 'axios'; // Ensure you have axios imported correctly
import api from './axios';
import toast from 'react-hot-toast';

interface ApiResponse {
  status: string;
  [key: string]: any; // Allow additional properties if necessary
}

export const bettingCard = async (
  zodiacGameId: number,
  totalIcoin: number,
  zodiacCardId: string
): Promise<string> => {
  try {
    const token = window.sessionStorage.getItem('token');
    if (!token) {
      toast('Thiếu thông tin', { duration: 2000, position: 'bottom-center',  className: 'custom-toast'});
      return "FAILED";
    } 
    
    const response = await api.post<ApiResponse>('/rest/zodiac-game/betting', {
      zodiacGameId,
      totalIcoin,
      zodiacCardId
    }, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    console.log('Response betting:', response.data);
    
    if (response.data.status === "OK") {
      return "OK";
    } else {
      toast('Đặt cược thất bại', { duration: 2000, position: 'bottom-center',  className: 'custom-toast'});
      return "FAILED";
    }
  } catch (error) {
    toast('Lỗi đặt cược', { duration: 2000, position: 'bottom-center',  className: 'custom-toast'});
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching game history:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error fetching game history:', error);
    }
    return "FAILED";
  }
};
