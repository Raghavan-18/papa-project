import { auth, provider } from "./firebase.js";
import { saveUserData } from "./firestore.js";
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signInWithPopup, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Make functions available globally for inline onclick handlers
window.togglePassword = function(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling;
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
};

window.showToast = function(message, isError = false) {
    const toast = document.getElementById('toast');
    if(!toast) return;
    
    toast.textContent = message;
    if (isError) {
        toast.style.background = '#ef4444';
    } else {
        toast.style.background = 'var(--primary-blue)';
    }
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
};

document.addEventListener('DOMContentLoaded', () => {
    // Auth State Listener
    onAuthStateChanged(auth, (user) => {
        if (user && window.location.pathname.includes('login.html')) {
            // Redirect to dashboard if already logged in
            window.location.href = 'profile.html';
        }
    });

    // Tab switching
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));

            tab.classList.add('active');
            const target = tab.getAttribute('data-target');
            document.getElementById(`${target}Form`).classList.add('active');
        });
    });

    // Login Form Submit
    const loginForm = document.getElementById('loginForm');
    if(loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const pass = document.getElementById('loginPassword').value;

            try {
                // Show loading toast
                window.showToast('Logging in...');
                await signInWithEmailAndPassword(auth, email, pass);
                window.showToast('Login successful! Redirecting...');
                setTimeout(() => {
                    window.location.href = 'profile.html';
                }, 1000);
            } catch (error) {
                if (error.code === 'auth/user-not-found') {
                    window.showToast('Email does not exist.', true);
                } else if (error.code === 'auth/wrong-password') {
                    window.showToast('Wrong password.', true);
                } else if (error.code === 'auth/invalid-credential') {
                    window.showToast('Invalid credentials. Email may not exist or wrong password.', true);
                } else {
                    window.showToast(error.message, true);
                }
            }
        });
    }

    // Google Sign In
    const googleSignInBtn = document.getElementById('googleSignInBtn');
    if (googleSignInBtn) {
        googleSignInBtn.addEventListener('click', async () => {
            try {
                window.showToast('Opening Google Sign-In...');
                const result = await signInWithPopup(auth, provider);
                const user = result.user;
                
                // Save user data (if it's a new user, this will create or overwrite with basic info)
                await saveUserData(user.uid, {
                    uid: user.uid,
                    fullName: user.displayName || '',
                    email: user.email,
                    phone: user.phoneNumber || '',
                    authProvider: 'google',
                    createdAt: new Date().toISOString()
                });
                
                window.showToast('Google Sign-In successful! Redirecting...');
                setTimeout(() => {
                    window.location.href = 'profile.html';
                }, 1000);
            } catch (error) {
                window.showToast(error.message, true);
            }
        });
    }

    // Signup Form Submit
    const signupForm = document.getElementById('signupForm');
    if(signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fullName = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const phone = document.getElementById('signupPhone').value;
            const state = document.getElementById('signupState').value;
            const occupation = document.getElementById('signupOccupation').value;
            const pass = document.getElementById('signupPassword').value;
            const confirm = document.getElementById('signupConfirm').value;

            if(pass !== confirm) {
                window.showToast('Passwords do not match!', true);
                return;
            }

            try {
                window.showToast('Creating account...');
                const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
                const user = userCredential.user;

                // Save additional user details to Firestore
                await saveUserData(user.uid, {
                    uid: user.uid,
                    fullName,
                    email,
                    phone,
                    state,
                    occupation,
                    authProvider: 'email',
                    createdAt: new Date().toISOString()
                });

                window.showToast('Account created successfully! Redirecting...');
                setTimeout(() => {
                    window.location.href = 'profile.html'; // redirecting to profile/dashboard
                }, 1000);
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    window.showToast('Email already exists.', true);
                } else {
                    window.showToast(error.message, true);
                }
            }
        });
    }
});
