
import { db, auth, storage } from './firebase';
import { doc, getDoc, setDoc, collection, getDocs, updateDoc } from 'firebase/firestore';
import { ParishSettings, ParishDirectoryEntry } from '../types';
import { mockDirectory } from './mockData';

const COLLECTION_NAME = 'settings';
// DEPRECATED: const DOC_ID = 'general'; -> Now we use auth.currentUser.uid
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
  userRole: 'Secretaria', // Default role
  city: '',
  planType: 'advanced', // Default fallback
  avatarIcon: 'church',
  avatarColor: 'bg-emaus-600'
};

export const getSettings = async (): Promise<ParishSettings> => {
  try {
    const user = auth.currentUser;
    if (!user) return DEFAULT_SETTINGS;

    let settingsToReturn = { ...DEFAULT_SETTINGS };

    // 1. Try to get user specific settings
    const docRef = doc(db, COLLECTION_NAME, user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      settingsToReturn = { ...DEFAULT_SETTINGS, ...docSnap.data() } as ParishSettings;
    } else {
      // FALLBACK for legacy Admin: Try 'general' doc if specific doc doesn't exist
      if (user.email === 'admin@emaus.app') {
         const legacyRef = doc(db, COLLECTION_NAME, 'general');
         const legacySnap = await getDoc(legacyRef);
         if (legacySnap.exists()) {
             settingsToReturn = { ...DEFAULT_SETTINGS, ...legacySnap.data() } as ParishSettings;
         }
      }
    }

    // --- SELF-HEALING & SYNC LOGIC ---
    // This ensures consistency between Admin (Directory) and User (Private Settings)
    if (user.email) {
        try {
            const dirRef = doc(db, DIRECTORY_COLLECTION, user.email);
            const dirSnap = await getDoc(dirRef);

            if (dirSnap.exists()) {
                const dirData = dirSnap.data() as ParishDirectoryEntry;
                
                // A. HEAL UID: If directory lacks UID, inject it now so Admin can manage this user
                if (!dirData.uid) {
                    await updateDoc(dirRef, { uid: user.uid });
                    console.log("Self-healing: Injected missing UID into directory");
                }

                // B. SYNC PLAN: Directory is the authority. If Admin changed plan, update private settings.
                // We trust the directory plan over the private plan.
                if (dirData.planType && dirData.planType !== settingsToReturn.planType) {
                    console.log(`Syncing plan from Directory (${dirData.planType}) to Settings`);
                    settingsToReturn.planType = dirData.planType;
                    
                    // Persist the correction to private settings
                    await setDoc(docRef, { planType: dirData.planType }, { merge: true });
                }
            } else {
                // If user has no directory entry (legacy), create one now
                const newEntry: ParishDirectoryEntry = {
                    id: user.email,
                    uid: user.uid,
                    email: user.email,
                    parishName: settingsToReturn.parishName,
                    city: settingsToReturn.city,
                    diocese: settingsToReturn.diocese,
                    planType: (settingsToReturn.planType as 'basic' | 'advanced') || 'advanced'
                };
                await setDoc(dirRef, newEntry);
            }
        } catch (syncErr) {
            console.warn("Error during settings sync:", syncErr);
        }
    }

    return settingsToReturn;

  } catch (error) {
    console.error("Error getting settings:", error);
    return DEFAULT_SETTINGS;
  }
};

export const saveSettings = async (settings: ParishSettings): Promise<void> => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user");

    const docRef = doc(db, COLLECTION_NAME, user.uid);
    
    // Ensure planType is set (default to advanced if missing, for safety)
    const settingsToSave = {
        ...settings,
        planType: settings.planType || 'advanced'
    };

    // 1. Save local settings to user's specific document
    await setDoc(docRef, settingsToSave, { merge: true });

    // 2. Publish to public directory for the current user
    if (user.email) {
       const directoryEntry: ParishDirectoryEntry = {
           id: user.email, // Doc ID is email for directory lookups
           uid: user.uid, // Store UID for admin reference
           email: user.email,
           parishName: settings.parishName,
           city: settings.city || 'Ubicación no definida',
           diocese: settings.diocese || '',
           planType: settingsToSave.planType as 'basic' | 'advanced'
       };
       await setDoc(doc(db, DIRECTORY_COLLECTION, user.email), directoryEntry);
    }

  } catch (error) {
    console.error("Error saving settings:", error);
    throw error;
  }
};

// --- ADMIN FUNCTION: Initialize DB for a NEW user ---
export const initializeParishDb = async (userId: string, userEmail: string, planType: 'basic' | 'advanced'): Promise<void> => {
    try {
        // 1. Create the PRIVATE settings document for the user
        const initialSettings: ParishSettings = {
            ...DEFAULT_SETTINGS,
            parishEmail: userEmail,
            planType: planType
        };
        await setDoc(doc(db, COLLECTION_NAME, userId), initialSettings);

        // 2. Create the PUBLIC directory entry
        const directoryEntry: ParishDirectoryEntry = {
           id: userEmail,
           uid: userId, // Crucial for Admin updates later
           email: userEmail,
           parishName: 'Nueva Parroquia (Por Configurar)',
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
        const allParishes = [...realParishes, ...mockDirectory.filter(m => !realParishes.find(r => r.email === m.email))];
        return allParishes;
    } catch (error) {
        console.error("Error fetching directory:", error);
        return mockDirectory; // Fallback to mock
    }
};

// Subir Imagen de Parroquia (Cover/Avatar) - Compat API
export const uploadParishImage = async (file: File, type: 'cover' | 'avatar'): Promise<string> => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("No user");
        
        const timestamp = Date.now();
        const path = `parish_identity/${user.uid}/${type}_${timestamp}_${file.name}`;
        
        // Using compat syntax for stability based on previous issues
        const ref = storage.ref(path);
        const snapshot = await ref.put(file);
        return await snapshot.ref.getDownloadURL();
    } catch (error) {
        console.error("Error uploading parish image:", error);
        throw error;
    }
};
