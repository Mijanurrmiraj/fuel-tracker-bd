// components/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDeJVH1Zpj2-P-zenFPI0Z00DLrGqZJ8co",
  authDomain: "fuel-tracker-bd-fcd3e.firebaseapp.com",
  projectId: "fuel-tracker-bd-fcd3e",
  storageBucket: "fuel-tracker-bd-fcd3e.firebasestorage.app",
  messagingSenderId: "773182498776",
  appId: "1:773182498776:web:885520c00d1b36d0fef4ad",
  measurementId: "G-XK2EB939MV"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
