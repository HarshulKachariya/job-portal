// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtmA3JGAbUwLtX0FBfjwaKhJfWGFmm4nc",
  authDomain: "test-web-job-portal.firebaseapp.com",
  projectId: "test-web-job-portal",
  storageBucket: "test-web-job-portal.firebasestorage.app",
  messagingSenderId: "932131863590",
  appId: "1:932131863590:web:65b699f93883c483c63ae7",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
