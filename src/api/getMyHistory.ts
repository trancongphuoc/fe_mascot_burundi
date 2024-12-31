// import { log } from "../utils/log";
import { isSameDay } from "../utils/utils";
import api from "./axios";
// import { setLogCat } from "./sendLogcat";


export const fetchMyHistory = async () => {
  // const label = "MY HISTORY";
  const token = localStorage.getItem("token");
  if (!token) {
    // setLogCat("My History: Token is not available");
    // log("Token is not available");
    return "FAILED";
  }

  try {
    const response = await api.get(`/api/mascot/user-history`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (
      response.data.status === "OK" &&
      Array.isArray(response.data?.data?.zodiacGameUserList)
    ) {
      const result = getZodiacGameUser(response.data?.data?.zodiacGameUserList);
      // await setLogCat(JSON.stringify(result));
      return result;
    } else {
      // await setLogCat(JSON.stringify({ label, response: response.data }));
      console.error("Unexpected response structure:", response.data);
      return null;
    }
  } catch (error) {
    // await setLogCat(JSON.stringify({ label, error: error }));
    console.error("Error fetching game history:", error);
    return null;
  }
};

const getZodiacGameUser = (zodiacGameUser: any): MyHistory[] => {
  const now = Date.now();
  const filteredDay = zodiacGameUser.filter((item: any) => {
    const addTime = item.addTime;
    const timestamp = typeof addTime === 'string' 
    ? new Date(addTime).getTime() 
    : addTime;

    if (typeof timestamp !== "number") {
      return false;
    }
    return isSameDay(timestamp, now);
  });

  console.log(filteredDay)

  const myHistories: MyHistory[] = filteredDay.map((item: any) => ({
    time: new Date(item?.addTime ?? 0),
    noGame: item?.noGame ?? 0,
    totalIcoinWin: item?.totalIcoinWin ?? 0,
    totalIcoinBetting: item?.totalIcoinBetting ?? 0,
    zodiacCardId: item?.zodiacCardId ?? "",
    zodiacCards:
      [
        ...item?.zodiacCards.map((card: BetZodiacCard) => ({
          id: card.id ?? "",
          name: card.name ?? "",
          multiply: card.multiply ?? -1,
          imageUrl: card.imageUrl ?? "",
          totalIcoinBetting: card.totalIcoinBetting ?? 0,
        })),
      ],
  }));

  return myHistories;
};
