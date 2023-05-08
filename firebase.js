// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCitLqKvqMVehOKTiCJ-8h6CjXJiyukxy8",
  authDomain: "thesportpals-c7728.firebaseapp.com",
  projectId: "thesportpals-c7728",
  storageBucket: "thesportpals-c7728.appspot.com",
  messagingSenderId: "690592203472",
  appId: "1:690592203472:web:2b6516eb6cbbfefe8d94d5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
