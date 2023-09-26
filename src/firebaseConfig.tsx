import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAHGV9qTJohsc-F8v_s2-I9XTkk6iekUg4",
    authDomain: "cross2-b8a5f.firebaseapp.com",
    projectId: "cross2-b8a5f",
    storageBucket: "cross2-b8a5f.appspot.com",
    messagingSenderId: "596782335367",
    appId: "1:596782335367:web:b5dac77026cf69c87c3f22",
    measurementId: "G-716KL8N7LG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;



