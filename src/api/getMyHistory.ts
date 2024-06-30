import { isSameDay } from '../utils/utils';
import api from './axios';

export const fetchMyHistory = async () => {
  const token = window.sessionStorage.getItem('token');
  if (!token) {
    console.error('Token is not available');
    return "FAILED";
  } 
  
  try {
    const response = await api.get(`/rest/zodiac-game/user-history`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (response.data.status === "OK" && Array.isArray(response.data.data.zodiacGameUserList)) {
      const now = Date.now();
      const filteredList = response.data.data.zodiacGameUserList.filter((item: any) => isSameDay(item.addTime ?? 0, now));
      return filteredList;
    } else {
      console.error('Unexpected response structure:', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching game history:', error);
    return null;
  }
};
