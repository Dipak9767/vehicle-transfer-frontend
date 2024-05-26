import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBpGxegK6QT5a9uJgRrynWelDF6woF2yek",
    authDomain: "workplace-2be7e.firebaseapp.com",
    projectId: "workplace-2be7e",
    storageBucket: "workplace-2be7e.appspot.com",
    messagingSenderId: "975492102548",
    appId: "1:975492102548:web:b6b87eeedb7c95e31cf781"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);