import toast from "react-hot-toast";
import { getToken } from "../api/getToken";
import { joinGameZodiac } from "../api/joinGameZodiac";
// import { callSetLastRunLogCat } from "../api/setLastRunLogCat";
// import { log } from "./log";

export const fetchTokenAndJoinGame = async (parameters: string | null | undefined) => {
  let fbId = '';
  let uid = 0;
  const maxRetries = 3; // Số lần thử lại tối đa
  let attempt = 0; // Đếm số lần thử lại

  if (!parameters) {
    toast.dismiss();
    toast('Lỗi không đăng nhập', { duration: 2000, position: 'bottom-center' });
    return fbId;
  }

  try {
    const decodedParams = atob(parameters);
    const data = JSON.parse(decodedParams);
    await getToken(data);
  } catch (error) {
    window.sessionStorage.setItem('token', parameters);
  }

  while (attempt < maxRetries) {
    try {
      const response : JoinGameResponse = await joinGameZodiac();
      if (response && response.message !== "FAILED") {
        fbId = response.data?.user.facebookUserId || "";
        uid = response.data?.user.uid || 0;
        window.sessionStorage.setItem('fbId', fbId);
        window.sessionStorage.setItem('uid', uid.toString());
        // await callSetLastRunLogCat(uid);
        break;
      } else {
        // log('join game failed');
      }
    } catch (error: any) {
      // log(`error join game, attempt ${attempt + 1}: ${error.toString() || 'unknown'}`);
    }
    attempt++;
  }

  if (attempt === maxRetries) {
    // console.log('Max retries reached. Failed to join game.');
    toast.dismiss();
    toast('Lỗi kết nối, vui lòng thử lại sau', { duration: 2000, position: 'bottom-center' });
  }

  return fbId;
};
