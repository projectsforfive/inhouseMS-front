// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAI-SDkska3iI70ghinmghkJJWUYetqdIM",
  authDomain: "inhousems-aee24.firebaseapp.com",
  projectId: "inhousems-aee24",
  storageBucket: "inhousems-aee24.firebasestorage.app",
  messagingSenderId: "27840116975",
  appId: "1:27840116975:web:d8ee3b0233843a103a031a",
  measurementId: "G-YQLFVTLFH0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

