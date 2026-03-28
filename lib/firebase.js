// lib/firebase.js

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDeJVH1Zpj2-P-zenFPI0Z00DLrGqZJ8co",
  authDomain: "fuel-tracker-bd-fcd3e.firebaseapp.com",
  databaseURL: "https://fuel-tracker-bd-fcd3e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fuel-tracker-bd-fcd3e",
  storageBucket: "fuel-tracker-bd-fcd3e.appspot.com",
  messagingSenderId: "773182498776",
  appId: "1:773182498776:web:885520c00d1b36d0fef4ad"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
