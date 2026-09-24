/**
 * TrustChain Verify - Firebase Configuration & Environment Settings
 * 
 * Instructions:
 * 1. Create a Firebase project at https://console.firebase.google.com/
 * 2. Enable Authentication -> Sign-in method -> Google.
 * 3. Create a Cloud Firestore database in test or production mode.
 * 4. Paste your Web App credentials below.
 * 5. Set OWNER_EMAIL to your primary Google account email.
 * 
 * NOTE: If apiKey is left as "YOUR_API_KEY", the application automatically runs
 * in offline Demo Mode with simulated Google authentication and browser storage.
 */

const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "trustchain-verify.firebaseapp.com",
  projectId: "trustchain-verify",
  storageBucket: "trustchain-verify.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};

// The Super Admin / Owner Google email address.
// This user has permanent Super Admin access and cannot be removed or demoted.
const OWNER_EMAIL = "owner@demo.in";

// Helper checking if real Firebase credentials are provided
function isFirebaseConfigured() {
  return FIREBASE_CONFIG && 
         FIREBASE_CONFIG.apiKey && 
         FIREBASE_CONFIG.apiKey !== "YOUR_API_KEY" && 
         FIREBASE_CONFIG.apiKey.length > 10;
}

window.FIREBASE_CONFIG = FIREBASE_CONFIG;
window.OWNER_EMAIL = OWNER_EMAIL;
window.isFirebaseConfigured = isFirebaseConfigured;
