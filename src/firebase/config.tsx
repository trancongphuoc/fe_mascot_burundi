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

const app = initializeApp(firebaseConfigDEV);
export const analytics = getAnalytics(app);    
export const db = getDatabase();  