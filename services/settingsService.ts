
import { db, auth } from './firebase';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { ParishSettings, ParishDirectoryEntry } from '../types';
import { mockDirectory } from './mockData';

const COLLECTION_NAME = 'settings';
const DOC_ID = 'general';
const DIRECTORY_COLLECTION = 'public_directory';

// Default settings if none exist
const DEFAULT_SETTINGS: ParishSettings = {
  parishName: 'Parroquia Santa María',
  parishAddress: '',
  parishPhone: '',
  parishEmail: '',
  diocese: 'Arquidiócesis de Santiago',
  priestName: '',
  secretaryName: '',
  city: 'Santiago'
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
    // 1. Save local settings
    await setDoc(docRef, settings, { merge: true });

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
               planType: 'advanced' // For demo, we assume all saved parishes are active/advanced
           };
           await setDoc(doc(db, DIRECTORY_COLLECTION, userEmail), directoryEntry);
       }
    }

  } catch (error) {
    console.error("Error saving settings:", error);
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
