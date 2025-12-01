import * as firebaseApp from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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
const app = firebaseApp.initializeApp(firebaseConfig);

// Export Services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;