import api from './axios';

export const joinGameZodiac = async (): Promise<JoinGameResponse> => {
  let joinGameResponse: JoinGameResponse = {
    status : "FAILED",
    message : "Error No Token", 
  } 

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      joinGameResponse.status = "NOTOKEN";
      return joinGameResponse;
    } 

    const response = await api.post<JoinGameResponse>('/api/mascot/join-game', {}, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return joinGameResponse;
  }
};

