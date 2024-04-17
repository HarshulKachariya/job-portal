// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD_OCDETWiIsbFACCp6U1FDkCYR0TAdvjI",
  authDomain: "react-job-135d8.firebaseapp.com",
  projectId: "react-job-135d8",
  storageBucket: "react-job-135d8.appspot.com",
  messagingSenderId: "88356907241",
  appId: "1:88356907241:web:d67f1b57cade03c7d36878",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
