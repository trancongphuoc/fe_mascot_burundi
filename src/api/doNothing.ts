import { log } from '../utils/log';
import api from './axios';

export const doNothing = async (): Promise<void> => {
  try {
    const token = window.sessionStorage.getItem('token');

    if (!token) {
      log('No token found in session storage.');
      return;
    }

    const response = await api.post(`/rest/zodiac-game/do-nothing`, {}, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    log('do nothing', response.data);

    if (response.data.status === "OK") {
      // Handle success case if needed
    } else {
      console.error('Unexpected response structure:', response.data);
    }
  } catch (error) {
    console.error('Error doing nothing:', error);
  }
};
