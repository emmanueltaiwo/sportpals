// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnlH0IBu8NFhuKl8IITwkgC7208sQpegE",
  authDomain: "yoursportpals.firebaseapp.com",
  projectId: "yoursportpals",
  storageBucket: "yoursportpals.appspot.com",
  messagingSenderId: "127329642139",
  appId: "1:127329642139:web:0255d337343a3e7a5a883e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
