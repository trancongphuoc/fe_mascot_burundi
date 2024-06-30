import toast from "react-hot-toast";
import { getToken } from "../api/getToken";
import { joinGameZodiac } from "../api/joinGameZodiac";

export const fetchTokenAndJoinGame = async (parameters: string | null | undefined) => {
    if (!parameters) {
      console.log('no para', parameters);
      toast('Lỗi không đăng nhập', { duration: 2000, position: 'bottom-center' });
      return;
    }
  
    try {
      const decodedParams = atob(parameters);
      const data = JSON.parse(decodedParams);
      await getToken(data);
    } catch (error) {
      console.log('valid token');
      window.sessionStorage.setItem('token', parameters);
    }
  
    try {
      const data = await joinGameZodiac();
      if (data && data !== "FAILED") {
        window.sessionStorage.setItem('fbId', data);
        console.log('join game success', data);
      } else {
        console.log('join game failed');
      }
    } catch (error) {
      console.log('error join game', error);
    }
  };