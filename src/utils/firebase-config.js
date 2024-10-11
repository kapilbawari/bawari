// firebase-config.js

// Firebase SDK से आवश्यक फ़ंक्शंस को इंपोर्ट करें
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// आपके वेब ऐप का Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsmjN6zQhIzq2A-5X4rNTnU-z4Kt-54Tk",
  authDomain: "blog-f3d7a.firebaseapp.com",
  projectId: "blog-f3d7a",
  storageBucket: "blog-f3d7a.appspot.com",
  messagingSenderId: "168490835223",
  appId: "1:168490835223:web:9c407beafa00ddf0f66b52",
  measurementId: "G-ZX681ELMVJ"
};

// Firebase को Initialize करें
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
