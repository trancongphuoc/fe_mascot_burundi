import toast from "react-hot-toast";
import { getUserInfo } from "../api/getToken";
import { joinGameZodiac } from "../api/joinGameZodiac";

export const fetchTokenAndJoinGame = async () => {
  let fbId = '';
  let uid = 0;
  const maxRetries = 3; // Số lần thử lại tối đa
  let attempt = 0; // Đếm số lần thử lại

  // try {
  //   await getUserInfo();
  // } catch (error) {
  //   console.log(error)
  // }

  while (attempt < maxRetries) {
    try {
      console.log("start fetch")
      const response : JoinGameResponse = await joinGameZodiac();
      if (response && response.status === "OK") {
        fbId = response.data?.user.facebookUserId || "";
        uid = response.data?.user.uid || 0;
        localStorage.setItem('fbId', fbId);
        localStorage.setItem('uid', uid.toString());
        return response;
      } else if(response.status !== "NOTOKEN") {
        console.log("remove token")
        localStorage.removeItem("token")
        window.location.reload();
      }
    } catch (error: any) {
      console.log("remove token")
      localStorage.removeItem("token")
      console.log(error)
    }
    attempt++;
  }

  if (attempt === maxRetries) {
    // console.log('Max retries reached. Failed to join game.');
    toast.dismiss();
    toast('Lỗi kết nối, vui lòng thử lại sau', { duration: 2000, position: 'bottom-center' });
  }

  return null;
};
