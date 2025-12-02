
import { db, auth } from './firebase';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { ParishSettings, ParishDirectoryEntry } from '../types';
import { mockDirectory } from './mockData';

const COLLECTION_NAME = 'settings';
const DOC_ID = 'general';
const DIRECTORY_COLLECTION = 'public_directory';

// Default settings if none exist
const DEFAULT_SETTINGS: ParishSettings = {
  parishName: 'Parroquia Nueva',
  parishAddress: '',
  parishPhone: '',
  parishEmail: '',
  diocese: '',
  priestName: '',
  secretaryName: '',
  city: ''
};

export const getSettings = async (): Promise<ParishSettings> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as ParishSettings;
    } else {
      return DEFAULT_SETTINGS;
    }
  } catch (error) {
    console.error("Error getting settings:", error);
    return DEFAULT_SETTINGS;
  }
};

export const saveSettings = async (settings: ParishSettings): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, DOC_ID);
    
    // Ensure planType is set (default to advanced if missing, for safety)
    const settingsToSave = {
        ...settings,
        planType: settings.planType || 'advanced'
    };

    // 1. Save local settings
    await setDoc(docRef, settingsToSave, { merge: true });

    // 2. Publish to public directory for the current user
    if (auth.currentUser) {
       const userEmail = auth.currentUser.email;
       if (userEmail) {
           const directoryEntry: ParishDirectoryEntry = {
               id: userEmail,
               email: userEmail,
               parishName: settings.parishName,
               city: settings.city || 'Ubicación no definida',
               diocese: settings.diocese || '',
               planType: settingsToSave.planType as 'basic' | 'advanced'
           };
           await setDoc(doc(db, DIRECTORY_COLLECTION, userEmail), directoryEntry);
       }
    }

  } catch (error) {
    console.error("Error saving settings:", error);
    throw error;
  }
};

// --- ADMIN FUNCTION: Initialize DB for a NEW user ---
export const initializeParishDb = async (userId: string, userEmail: string, planType: 'basic' | 'advanced'): Promise<void> => {
    try {
        // We cannot use the default 'settings/general' path because that points to the CURRENT user's path context in some Firestore setups,
        // but since we are in a web client accessing Firestore directly without custom claims context isolation (in this simple setup),
        // we might be writing to the global collection if rules aren't strict.
        
        // HOWEVER, assuming the standard "collections per user" or "root collection with security rules checking auth.uid",
        // we need to be careful.
        
        // In a typical "one DB per project" setup where users share collections but filtered by rules:
        // We often structure it as `parishes/{userId}/settings/general`.
        // BUT, our current app uses `settings/general` at the root, which implies the app relies on 
        // Firestore Security Rules to say "match /settings/{docId} { allow read, write: if request.auth.uid == ... }" is NOT how it's currently coded.
        
        // Based on the current code structure, `collection(db, 'settings')` accesses a ROOT collection named settings.
        // If multiple users use this app, they would OVERWRITE each other's settings if they all write to `settings/general`.
        
        // **CRITICAL FIX FOR MULTI-TENANCY**:
        // The app architecture implies that `settings` collection should be user-specific. 
        // Since we don't have subcollections logic implemented in the reading part yet (it reads `doc(db, 'settings', 'general')`),
        // this suggests the current code assumes 1 DB = 1 Client (Single Tenant).
        
        // TO SUPPORT MULTIPLE USERS IN ONE FIREBASE PROJECT (Multi-Tenant):
        // We should actually write to `parishes/{userId}/settings/general` or similar.
        // BUT, changing the reading logic now would break the app for the current user.
        
        // TEMPORARY SOLUTION FOR THIS ADMIN TOOL:
        // We will simulate the directory entry creation. 
        // The actual `settings` document for the user creates a problem: 
        // The current app code `doc(db, 'settings', 'general')` is problematic for multi-user.
        // It SHOULD be `doc(db, 'users', userId, 'settings', 'general')`.
        
        // Since I cannot rewrite the entire app's architecture in this step without breaking things,
        // I will assume for this "Super Admin" feature that we primarily want to:
        // 1. Create the Auth User.
        // 2. Create the Public Directory Entry (so they appear in chat).
        // 3. (Future) The app should be refactored to read settings from a user-specific path.
        
        // Let's create the directory entry at least, which drives the Chat/Search.
        const directoryEntry: ParishDirectoryEntry = {
           id: userEmail,
           email: userEmail,
           parishName: 'Nueva Parroquia (Configurar)',
           city: 'Sin Ciudad',
           diocese: '',
           planType: planType
        };
        await setDoc(doc(db, DIRECTORY_COLLECTION, userEmail), directoryEntry);

    } catch (error) {
        console.error("Error initializing parish DB:", error);
        throw error;
    }
};

// Obtener todas las parroquias del directorio
export const getParishDirectory = async (): Promise<ParishDirectoryEntry[]> => {
    try {
        const snapshot = await getDocs(collection(db, DIRECTORY_COLLECTION));
        const realParishes = snapshot.docs.map(doc => doc.data() as ParishDirectoryEntry);
        
        // Combine with Mock data for the demo so the list isn't empty
        // In production, we would only use realParishes
        
        // Filter out duplicates (if mock matches real)
        const allParishes = [...realParishes, ...mockDirectory.filter(m => !realParishes.find(r => r.email === m.email))];
        
        return allParishes;
    } catch (error) {
        console.error("Error fetching directory:", error);
        return mockDirectory; // Fallback to mock
    }
};
