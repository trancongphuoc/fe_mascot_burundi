import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfigDEV = {
  apiKey: "AIzaSyCXDqJJRkEb5L6e__n0Vmyk_Bn95u7hD9s",
  authDomain: "ikara-development.firebaseapp.com",
  databaseURL: "https://ikara-development-default-rtdb.firebaseio.com",
  projectId: "ikara-development",
  storageBucket: "ikara-development.appspot.com",
  messagingSenderId: "3268331263",
  appId: "1:3268331263:web:2e5ed0e495e4437266aeca",
  measurementId: "G-0ECG4DD0GD"
};

const firebaseConfigPRO = {
  apiKey: "AIzaSyBKBvFB4YEp65cs-EywaC-rcimh9lh4ga4",
  authDomain: "ikara4m.firebaseapp.com",
  databaseURL: "https://ikara4m.firebaseio.com",
  projectId: "ikara4m",
  storageBucket: "ikara4m.appspot.com",
  messagingSenderId: "366287804041",
  appId: "1:366287804041:web:86dd7e7c9c839c3a97d858",
  measurementId: "G-LDQYNCQJL4"
};


const finalFirebaseConfig =  window.location.hostname.includes("ikara4m") ?
                            firebaseConfigPRO : firebaseConfigDEV ;

const app = initializeApp(finalFirebaseConfig);
export const analytics = getAnalytics(app);    
export const db = getDatabase();  