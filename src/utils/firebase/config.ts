

import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,FacebookAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArcCfs0vY1GeYqhhQXOz0-ak0stN8zU-Y",
  authDomain: "ripple-d64d1.firebaseapp.com",
  projectId: "ripple-d64d1",
  storageBucket: "ripple-d64d1.appspot.com",
  messagingSenderId: "900523808859",
  appId: "1:900523808859:web:a11cd1b7f0c0a01453877e",
  measurementId: "G-9P7EBDS0XG"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
const fbProvider= new FacebookAuthProvider()
export {auth,provider,fbProvider};