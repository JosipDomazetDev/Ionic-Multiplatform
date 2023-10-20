import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Don't even bother scraping this, I already disabled this firebase project
const firebaseConfig = {
    apiKey: "AIzaSyAdRgmf66XtlEx1Z97u04Itp9N0O-SzBQ8",
    authDomain: "cross-ionic.firebaseapp.com",
    projectId: "cross-ionic",
    storageBucket: "cross-ionic.appspot.com",
    messagingSenderId: "191319058698",
    appId: "1:191319058698:web:428f3ff8e5bb25862032f3",
    measurementId: "G-7H9W11FL08"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;



