import api from './axios';

export const exitGameZodiac = async (): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error("No token")
      return;
    } 

    const response = await api.post('/api/mascot/exit-game', {}, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    console.log(response);
  } catch (error) {
    console.log("BUGS", error);
  }
};

