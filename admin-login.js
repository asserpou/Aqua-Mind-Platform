// Import Firebase Authentication
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzILt4x3T9zwlLdXAMUn1jzjEPSIWybg0",
    authDomain: "nilevo-production.firebaseapp.com",
    projectId: "nilevo-production",
    storageBucket: "nilevo-production.firebasestorage.app",
    messagingSenderId: "185264790897",
    appId: "1:185264790897:web:851bf66f2cf11d9609ead0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ─── Single Sign-On: already logged in? skip login page ───────────────────────
if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    window.location.href = 'admin-dashboard.html';
}

// ─── Login Form ───────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username     = document.getElementById('username').value.trim();
        const password     = document.getElementById('password').value;
        const errorMessage = document.getElementById('errorMessage');
        const btn          = loginForm.querySelector('button[type="submit"]');

        btn.disabled = true;
        btn.textContent = 'Signing in...';
        errorMessage.textContent = '';

        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                // ✅ Save session — no need to login again until logout
                sessionStorage.setItem('adminLoggedIn', 'true');
                window.location.href = 'admin-dashboard.html';
            })
            .catch((error) => {
                console.error("Login failed:", error.code);
                errorMessage.textContent = 'Invalid username or password';
                btn.disabled = false;
                btn.textContent = 'Sign in';

                setTimeout(() => {
                    errorMessage.textContent = '';
                }, 3000);
            });
    });
});