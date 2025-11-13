// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "swad-express-3a022.firebaseapp.com",
  projectId: "swad-express-3a022",
  storageBucket: "swad-express-3a022.firebasestorage.app",
  messagingSenderId: "520291358886",
  appId: "1:520291358886:web:655093ffb531b400fa3c67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth}