// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpu73eEMiG-T-raPjSukxOqMMPlZFQqS8",
  authDomain: "keypoint-app.firebaseapp.com",
  projectId: "keypoint-app",
  storageBucket: "keypoint-app.appspot.com",
  messagingSenderId: "650765358622",
  appId: "1:650765358622:web:39de3055adf666f153000f",
  measurementId: "G-EHS1XP4385"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);