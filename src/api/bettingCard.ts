import axios from "axios"; // Ensure you have axios imported correctly
import api from "./axios";
import toast from "react-hot-toast";
// import { setLogCat } from "./sendLogcat";

interface ApiResponse {
  status: string;
  [key: string]: any; // Allow additional properties if necessary
}

// const label = "BETTING CARD";

export const bettingCard = async (
  zodiacGameId: number,
  totalIcoin: number,
  zodiacCardId: string
): Promise<string> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.dismiss();
      toast("Thiếu thông tin", { duration: 2000, position: "bottom-center" });
      return "FAILED";
    }

    // setLogCat(
    //   JSON.stringify({
    //     label,
    //     zodiacGameId,
    //     totalIcoin,
    //     zodiacCardId,
    //   })
    // );

    const response = await api.post<ApiResponse>(
      "/api/mascot/betting",
      {
        zodiacGameId,
        totalIcoin,
        zodiacCardId,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // await setLogCat(
    //   JSON.stringify({
    //     label,
    //     responseData: response ?? "unknown",
    //   })
    // );

    if (response.data.status === "OK") {
      return "OK";
    } else {
      toast.dismiss();
      toast(response.data.message, {
        duration: 2000,
        position: "bottom-center",
      });
      return "FAILED";
    }
  } catch (error) {
    toast.dismiss();
    toast("Lỗi đặt cược", { duration: 2000, position: "bottom-center" });
    if (axios.isAxiosError(error)) {
      // console.error(
      //   "Axios error fetching game history:",
      //   error.response?.data || error.message
      // );
    } else {
      // console.error("Unexpected error fetching game history:", error);
    }
    return "FAILED";
  }
};
