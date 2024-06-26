import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';

// const STRIPE_PUBLISHABLE_KEY = NEXT_PUBLIC_REACT_APP_STRIPE_API_KEY;

const app = firebase.initializeApp({
  apiKey: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_REACT_APP_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_REACT_APP_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_REACT_APP_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_REACT_APP_MEASUREMENT_ID
});

export const auth = app.auth();
export const db = app.firestore();
export default app;
