import toast from "react-hot-toast";
import { getUserInfo } from "../api/getToken";
import { joinGameZodiac } from "../api/joinGameZodiac";

export const fetchTokenAndJoinGame = async () => {
  let fbId = '';
  let uid = 0;
  const maxRetries = 3; // Số lần thử lại tối đa
  let attempt = 0; // Đếm số lần thử lại

  try {
    await getUserInfo();
  } catch (error) {
    console.log(error)
  }

  while (attempt < maxRetries) {
    try {
      const response : JoinGameResponse = await joinGameZodiac();
      if (response && response.message !== "FAILED") {
        fbId = response.data?.user.facebookUserId || "";
        uid = response.data?.user.uid || 0;
        localStorage.setItem('fbId', fbId);
        localStorage.setItem('uid', uid.toString());
        break;
      }
    } catch (error: any) {
      console.log(error)
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
