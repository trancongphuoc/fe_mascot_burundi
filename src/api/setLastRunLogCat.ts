import { functions } from '../firebase/config';
import { httpsCallable } from 'firebase/functions'; 

export const callSetLastRunLogCat = async (uid: number) => {
  
  try {
    const setLastRunLogCat = httpsCallable(functions, "v5-SetLastRunLogCat");

    const data = {
      parameters: btoa(JSON.stringify({ lastUID: uid })),
    };
    const result = await setLastRunLogCat(data);
    return result.data;
  } catch (error) {
    // console.error("Error calling SetLastRunLogCat:", error);
    throw error;
  }
};