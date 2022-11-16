// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKhuKkl6utA8R1I24PuWyugmgaf63D3As",
  authDomain: "guestlister-949a7.firebaseapp.com",
  projectId: "guestlister-949a7",
  storageBucket: "guestlister-949a7.appspot.com",
  messagingSenderId: "11306470026",
  appId: "1:11306470026:web:0303d687b49bb758657b73",
};

// Initialize Firebase
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider };
