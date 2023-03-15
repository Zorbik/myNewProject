import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQUsjtm8L7U581hQUYma39pf58Q9pzrGs",
  authDomain: "mynewproject-9eaed.firebaseapp.com",
  projectId: "mynewproject-9eaed",
  storageBucket: "mynewproject-9eaed.appspot.com",
  messagingSenderId: "519597895106",
  appId: "1:519597895106:web:c0a3de5265acced0cd3a5b",
  measurementId: "G-DYZG03TQSW",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
