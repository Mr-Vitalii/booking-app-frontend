// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "booking-app-firebase-c3d16.firebaseapp.com",
  projectId: "booking-app-firebase-c3d16",
  storageBucket: "booking-app-firebase-c3d16.appspot.com",
  messagingSenderId: "749678573477",
  appId: "1:749678573477:web:d4acb99e33161d0602da4c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
