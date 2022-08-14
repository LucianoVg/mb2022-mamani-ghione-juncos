import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD1e4oeTZQN6I_zkvU8gOw0__ATjRKkIaI",
    authDomain: "mb2020-mamani-ghione-juncos.firebaseapp.com",
    projectId: "mb2020-mamani-ghione-juncos",
    storageBucket: "mb2020-mamani-ghione-juncos.appspot.com",
    messagingSenderId: "443959529787",
    appId: "1:443959529787:web:4db5d190d596c100aee71e",
    measurementId: "G-K6RYTN7XBC"
};


// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: "mb2020-mamani-ghione-juncos.firebaseapp.com",
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: "443959529787",
//     appId: process.env.FIREBASE_APP_ID,
//     measurementId: "G-K6RYTN7XBC"
// };


export const app = initializeApp(firebaseConfig)