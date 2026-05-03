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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log("Firebase initialized");

// Check if already logged in
if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    window.location.href = 'admin-dashboard.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');

            // Firebase Authentication
            console.log("Attempting login for:", username);
            signInWithEmailAndPassword(auth, username, password)
                .then((userCredential) => {
                    console.log("Login successful:", userCredential.user.email);
                    // Set session
                    sessionStorage.setItem('adminLoggedIn', 'true');

                    // Redirect to dashboard
                    window.location.href = 'admin-dashboard.html';
                })
                .catch((error) => {
                    console.error("Login failed:", error.code, error.message);
                    errorMessage.textContent = 'Invalid username or password';

                    // Clear error after 3 seconds
                    setTimeout(() => {
                        errorMessage.textContent = '';
                    }, 3000);
                });
        });
    }
});
