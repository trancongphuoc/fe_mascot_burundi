import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";


const firebaseConfigDEV = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY_DEV,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_DEV,
  databaseURL:'https://ikara-development-default-rtdb.firebaseio.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_DEV,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_DEV,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_DEV,
  appId: import.meta.env.VITE_FIREBASE_APP_ID_DEV,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID_DEV,
};

const firebaseConfigPRO = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY_PRO,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_PRO,
  databaseURL: "https://ikara4m.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_PRO,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_PRO,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_PRO,
  appId: import.meta.env.VITE_FIREBASE_APP_ID_PRO,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID_PRO,
};



const finalFirebaseConfig =  window.location.hostname.includes("ikara4m") ?
                            firebaseConfigPRO : firebaseConfigDEV;

                            console.log(finalFirebaseConfig)

const app = initializeApp(finalFirebaseConfig);
export const analytics = getAnalytics(app);    
export const db = getDatabase();  