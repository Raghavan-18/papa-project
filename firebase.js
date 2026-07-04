import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAOnT0ep46Z04ulWSGgKdu06HTq6-143ME",
    authDomain: "government-scheme-ai.firebaseapp.com",
    projectId: "government-scheme-ai",
    storageBucket: "government-scheme-ai.firebasestorage.app",
    messagingSenderId: "351392448642",
    appId: "1:351392448642:web:aea7422c38d9ee5bbbf49b",
    measurementId: "G-FQ4M1ZQNHG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, auth, db, provider };
