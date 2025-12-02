
import { db, auth } from './firebase';
import { collection, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';
import { ParishDirectoryEntry, ParishSettings } from '../types';
import { initializeParishDb } from './settingsService';

// Import Firebase Compat to create a secondary app instance for user creation
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const DIRECTORY_COLLECTION = 'public_directory';
const SETTINGS_COLLECTION = 'settings';

// Get all users (from public directory which acts as our master list)
export const getAllUsers = async (): Promise<ParishDirectoryEntry[]> => {
    try {
        const snapshot = await getDocs(collection(db, DIRECTORY_COLLECTION));
        return snapshot.docs.map(doc => ({
            ...doc.data()
        } as ParishDirectoryEntry));
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

// Update User Plan
export const updateUserPlan = async (user: ParishDirectoryEntry, newPlan: 'basic' | 'advanced'): Promise<void> => {
    try {
        // 1. Update Public Directory (for chat access check)
        const dirRef = doc(db, DIRECTORY_COLLECTION, user.email);
        await updateDoc(dirRef, { planType: newPlan });

        // 2. Update Private Settings (for user dashboard check)
        // We need the UID. If it's missing in directory (legacy data), we can't update private settings easily without Auth Admin SDK.
        // But our initializeParishDb now saves UID.
        if (user.uid) {
            const settingsRef = doc(db, SETTINGS_COLLECTION, user.uid);
            // We use setDoc with merge to ensure it creates the doc if missing
            await setDoc(settingsRef, { planType: newPlan }, { merge: true });
        } else {
            console.warn("UID missing for user, cannot update private settings:", user.email);
        }
    } catch (error) {
        console.error("Error updating plan:", error);
        throw error;
    }
};

// Create User (Secondary App Method)
export const createUserAsAdmin = async (email: string, password: string, plan: 'basic' | 'advanced'): Promise<void> => {
    // 1. Create secondary app
    const secondaryApp = firebase.initializeApp(firebase.app().options, "SecondaryAdminApp");
    
    try {
        // 2. Create user in Auth
        const userCred = await secondaryApp.auth().createUserWithEmailAndPassword(email, password);
        
        // 3. Initialize DB (using Main App logic)
        if (userCred.user) {
            await initializeParishDb(userCred.user.uid, email, plan);
        }
    } catch (error) {
        throw error;
    } finally {
        // 4. Cleanup
        await secondaryApp.auth().signOut();
        await secondaryApp.delete();
    }
};

// Send Password Reset
export const sendUserPasswordReset = async (email: string): Promise<void> => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        console.error("Error sending reset email:", error);
        throw error;
    }
};
