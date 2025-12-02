
import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ParishSettings } from '../types';

const COLLECTION_NAME = 'settings';
const DOC_ID = 'general';

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
      // Return defaults if not set yet (and maybe save them lazily or just return)
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
    // setDoc with merge: true allows updating fields without overwriting the whole doc if we add more fields later
    await setDoc(docRef, settings, { merge: true });
  } catch (error) {
    console.error("Error saving settings:", error);
    throw error;
  }
};
