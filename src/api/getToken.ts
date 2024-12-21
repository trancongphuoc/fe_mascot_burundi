// import { log } from "../utils/log";
import api from "./axios";


export const getUserInfo = async (): Promise<any> => {
  let token = localStorage.getItem("token")
  try {
    const response = await api.post<string>('api/user/info', {}, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (response.data) {
      return response.data;
    } else {
      localStorage.removeItem("token")
      return "FAILED";
    }
  } catch (error: any) {
    localStorage.removeItem("token")
    console.log(error)
    return "FAILED";
  }
};
