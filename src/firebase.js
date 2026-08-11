import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAW33gjX-WrWaaIcDKTFxVyyYwJgHFMfQ",
  authDomain: "doctormangement-cd519.firebaseapp.com",
  projectId: "doctormangement-cd519",
  storageBucket: "doctormangement-cd519.firebasestorage.app",
  messagingSenderId: "645745202163",
  appId: "1:645745202163:web:ef87b4490d7392ad643886",
  measurementId: "G-VSJHG19QZL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);