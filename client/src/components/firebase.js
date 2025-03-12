import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBY9wFxpFpnRMyUGGsIMO7YblhaVRcZnZc",
    authDomain: "calmoraai.firebaseapp.com",
    projectId: "calmoraai",
    storageBucket: "calmoraai.firebasestorage.app",
    messagingSenderId: "659612123490",
    appId: "1:659612123490:web:93bcb0c62602abc18f2c3b",
    measurementId: "G-FGWZKGWD12"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);