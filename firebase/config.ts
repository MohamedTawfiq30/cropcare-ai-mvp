import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getDatabase, Database } from "firebase/database";

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Database | null = null;

// Initialize Firebase only on client side
function initFirebase() {
  if (typeof window === "undefined") {
    return; // Skip on server
  }

  if (app) {
    return; // Already initialized
  }

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  };

  // Check for missing env vars (only warn, don't throw)
  const missing = Object.entries(firebaseConfig)
    .filter(([_, v]) => !v)
    .map(([k]) => k);

  if (missing.length > 0) {
    console.warn("⚠️ Missing Firebase env vars:", missing.join(", "));
    return;
  }

  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    authInstance = getAuth(app);
    dbInstance = getDatabase(app);
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
}

// Initialize on client side only
if (typeof window !== "undefined") {
  initFirebase();
}

// Export auth and db - will be null on server, initialized on client
export const auth = authInstance;
export const db = dbInstance;
