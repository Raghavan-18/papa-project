import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    // Select the specific Login button by ID (used on index.html and contact.html)
    const navAuthBtn = document.getElementById('navAuthBtn');
    
    if (navAuthBtn) {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                navAuthBtn.textContent = 'Profile';
                navAuthBtn.href = 'profile.html';
                navAuthBtn.className = 'btn btn-primary'; 
            } else {
                // User is not signed in
                navAuthBtn.textContent = 'Login';
                navAuthBtn.href = 'login.html';
                navAuthBtn.className = 'btn btn-primary';
            }
        });
    }
});
