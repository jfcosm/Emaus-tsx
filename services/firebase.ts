import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/analytics';

// ⚠️ IMPORTANTE: REEMPLAZA ESTOS VALORES CON LOS DE TU CONSOLA DE FIREBASE
// Ve a Project Settings -> General -> Your Apps -> SDK Setup and Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpwisDEqUlelbfrHztfqs8IEznlf7wwiA",
  authDomain: "emaus-app-344e6.firebaseapp.com",
  projectId: "emaus-app-344e6",
  storageBucket: "emaus-app-344e6.firebasestorage.app",
  messagingSenderId: "634526679142",
  appId: "1:634526679142:web:c77cf582f9e7ad11362da7",
  measurementId: "G-BX8W6QKPFZ"
};

// Initialize Firebase
const app = firebase.apps.length === 0 ? firebase.initializeApp(firebaseConfig) : firebase.app();

// Export Services
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const analytics = firebase.analytics();

export default app;