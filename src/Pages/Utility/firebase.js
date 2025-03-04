import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQeRXRM5jtRMDfCU9e6pSjXyKFZygR1SE",
  authDomain: "clone-ab3ed.firebaseapp.com",
  projectId: "clone-ab3ed",
  storageBucket: "clone-ab3ed.firebasestorage.app",
  messagingSenderId: "33231434805",
  appId: "1:33231434805:web:761a8240d1fbed7a2f2d7c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);