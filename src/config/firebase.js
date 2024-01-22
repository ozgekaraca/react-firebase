import {initializeApp} from 'firebase/app';
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBEgOFsNjcOeuFpVzqhwENWxo3GDeGbvE8",
  authDomain: "react-firebase-ad422.firebaseapp.com",
  projectId: "react-firebase-ad422",
  storageBucket: "react-firebase-ad422.appspot.com",
  messagingSenderId: "344109625785",
  appId: "1:344109625785:web:309a64d12183ce736c4668",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);