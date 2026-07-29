import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { PlansConfig } from '../types';

const CONFIG_COLLECTION = 'config';
const PLANS_DOC_ID = 'plans';

export const DEFAULT_PLANS_CONFIG: PlansConfig = {
  basic: {
    financesEnabled: true,
    maxTransactionsPerMonth: 10,
    documentsEnabled: true,
    maxPdfsPerMonth: 3,
    chatAttachmentsEnabled: false,
    maxAttachmentSizeMb: 0
  },
  advanced: {
    financesEnabled: true,
    maxTransactionsPerMonth: -1, // unlimited
    documentsEnabled: true,
    maxPdfsPerMonth: -1, // unlimited
    chatAttachmentsEnabled: true,
    maxAttachmentSizeMb: 5
  }
};

export const getPlansConfig = async (): Promise<PlansConfig> => {
  try {
    const docRef = doc(db, CONFIG_COLLECTION, PLANS_DOC_ID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        basic: { ...DEFAULT_PLANS_CONFIG.basic, ...data.basic },
        advanced: { ...DEFAULT_PLANS_CONFIG.advanced, ...data.advanced }
      };
    }
    return DEFAULT_PLANS_CONFIG;
  } catch (error) {
    console.error("Error fetching plans config:", error);
    return DEFAULT_PLANS_CONFIG;
  }
};

export const savePlansConfig = async (config: PlansConfig): Promise<void> => {
  try {
    const docRef = doc(db, CONFIG_COLLECTION, PLANS_DOC_ID);
    await setDoc(docRef, config);
  } catch (error) {
    console.error("Error saving plans config:", error);
    throw error;
  }
};
