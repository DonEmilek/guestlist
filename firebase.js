// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY_FB,
  authDomain: process.env.AUTH_DOMAIN_FB,
  projectId: process.env.PROJECT_ID_FB,
  storageBucket: process.env.STORAGE_BUCKET_FB,
  messagingSenderId: process.env.MESSASING_SENDER_ID_FB,
  appId: process.env.APP_ID_FB,
};

// Initialize Firebase
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider };
