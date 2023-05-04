// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCo8dvvxVgC_m65gphcJwvY5l-5RBP8oUo",
  authDomain: "officialsportpals.firebaseapp.com",
  projectId: "officialsportpals",
  storageBucket: "officialsportpals.appspot.com",
  messagingSenderId: "542929135176",
  appId: "1:542929135176:web:af401d17ccb758fb235a7d",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);