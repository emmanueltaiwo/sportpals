// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbyscJ67VlBIfD8MRM9kL0QQvk6Zb0ojo",
  authDomain: "realsportpals.firebaseapp.com",
  projectId: "realsportpals",
  storageBucket: "realsportpals.appspot.com",
  messagingSenderId: "583327626952",
  appId: "1:583327626952:web:c9f038cd48973b213897fd",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);