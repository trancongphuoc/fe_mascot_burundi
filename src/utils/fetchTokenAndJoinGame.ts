import toast from "react-hot-toast";
import { getToken } from "../api/getToken";
import { joinGameZodiac } from "../api/joinGameZodiac";
import { callSetLastRunLogCat } from "../api/setLastRunLogCat";

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
    console.log('valid token');
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
        console.log('join game success', response);
        await callSetLastRunLogCat(uid);
        break;
      } else {
        console.log('join game failed');
      }
    } catch (error) {
      console.log(`error join game, attempt ${attempt + 1}:`, error);
    }
    attempt++;
  }

  if (attempt === maxRetries) {
    console.log('Max retries reached. Failed to join game.');
    toast.dismiss();
    toast('Lỗi kết nối, vui lòng thử lại sau', { duration: 2000, position: 'bottom-center' });
  }

  return fbId;
};
