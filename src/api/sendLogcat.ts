import { functions } from "../firebase/config";
import { httpsCallable } from "firebase/functions";

interface CloudFunctionResponse {
  status: string;
  message: string;
}

const pid =
  window.location.hostname.includes("ikara-development") ||
  window.location.hostname.includes("localhost")
    ? "com.dev.yokara"
    : "com.yokara"

export const setLogCat = async (
    msg: String
): Promise<CloudFunctionResponse> => {
  try {
    const setLogCatFunction = httpsCallable(functions, "v5-SetLogCat");
    const uid = window.sessionStorage.getItem("uid") || "0";

    const data = {
      parameters: btoa(
        JSON.stringify({ lastUID: uid, logcatLine: {pid: pid, tid: "", level: "I", tag: "", msg: msg } })
      ),
    };

    const result = await setLogCatFunction(data);

    return result.data as CloudFunctionResponse;
  } catch (error) {
    console.error("Error calling SetLogCat function: ", error);
    throw error;
  }
};
