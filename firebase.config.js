import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGIND_SENDER,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: "G-K6RYTN7XBC"
};

export const app = initializeApp(firebaseConfig)