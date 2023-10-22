import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyATt7uBlgYwaPAJDy_hG2DJBBH5qvXp5T0",
    authDomain: "posts-c4d46.firebaseapp.com",
    projectId: "posts-c4d46",
    storageBucket: "posts-c4d46.appspot.com",
    messagingSenderId: "779318951959",
    appId: "1:779318951959:web:a252f1ba45e1fc0840dc52"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const firestore = getFirestore(app)