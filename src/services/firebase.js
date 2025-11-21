// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBG4UnOJ7tBU7-yVyK2djAQyWLpcCQjCDk",
    authDomain: "react-assignment-c40b1.firebaseapp.com",
    projectId: "react-assignment-c40b1",
    storageBucket: "react-assignment-c40b1.firebasestorage.app",
    messagingSenderId: "677364430462",
    appId: "1:677364430462:web:22bc66292e5b2537818a2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export default app;