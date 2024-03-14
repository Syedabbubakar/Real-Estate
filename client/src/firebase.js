// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-287a8-7685b.firebaseapp.com",
  projectId: "real-estate-287a8",
  storageBucket: "real-estate-287a8.appspot.com",
  messagingSenderId: "803461666885",
  appId: "1:803461666885:web:06a420961b309eeb8aeb2c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);