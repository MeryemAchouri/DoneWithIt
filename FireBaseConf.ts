// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";  
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgRDy0eHFNTJb0hTNREEijQJ_nbKJmyvA",
  authDomain: "donewithitapp-e1557.firebaseapp.com",
  projectId: "donewithitapp-e1557",
  storageBucket: "donewithitapp-e1557.appspot.com",
  messagingSenderId: "949807956780",
  appId: "1:949807956780:web:471acfa7dcdc323fd92289"
};

// Initialize Firebase
 const FIREBASE_APP = initializeApp(firebaseConfig);
 const FIREBASE_AUTH = getAuth(FIREBASE_APP);
 const FIRESTORE_DB= getFirestore(FIREBASE_APP);
 const FIREBASE_STORAGE = getStorage(FIREBASE_APP);

export {FIREBASE_APP,FIREBASE_AUTH,FIRESTORE_DB,FIREBASE_STORAGE}