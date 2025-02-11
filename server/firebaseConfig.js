// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBY9wFxpFpnRMyUGGsIMO7YblhaVRcZnZc",
  authDomain: "calmoraai.firebaseapp.com",
  projectId: "calmoraai",
  storageBucket: "calmoraai.firebasestorage.app",
  messagingSenderId: "659612123490",
  appId: "1:659612123490:web:93bcb0c62602abc18f2c3b",
  measurementId: "G-FGWZKGWD12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;