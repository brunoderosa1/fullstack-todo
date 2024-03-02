// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: import.meta.env.VITE_GOOGLE_API_KEY || process.env.GOOGLE_API_KEY,

  authDomain: "sample-project-demo-414423.firebaseapp.com",

  projectId: "sample-project-demo-414423",

  storageBucket: "sample-project-demo-414423.appspot.com",

  messagingSenderId: "722318238410",

  appId: "1:722318238410:web:a8682ce0a5fd6443054a33"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

setPersistence(auth, browserLocalPersistence);

export { app, auth };