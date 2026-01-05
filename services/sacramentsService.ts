
import { db, auth } from './firebase';
import { collection, getDocs, addDoc, updateDoc, doc, query, orderBy, where } from 'firebase/firestore';
import { SacramentRecord } from '../types';

const COLLECTION_NAME = 'sacraments';

export const getSacraments = async (): Promise<SacramentRecord[]> => {
  try {
    const user = auth.currentUser;
    if (!user) return [];

    // Filtramos para que el usuario solo traiga SUS propios registros
    const q = query(
      collection(db, COLLECTION_NAME), 
      where('userId', '==', user.uid),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as SacramentRecord));
  } catch (error) {
    console.error("Error getting sacraments:", error);
    return [];
  }
};

export const addSacrament = async (sacrament: Omit<SacramentRecord, 'id'>): Promise<string> => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No auth");

    // Inyectamos el userId del creador obligatoriamente
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...sacrament,
      userId: user.uid
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding sacrament:", error);
    throw error;
  }
};

export const updateSacrament = async (id: string, updates: Partial<SacramentRecord>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error("Error updating sacrament:", error);
    throw error;
  }
};

// Fix: Added missing seedDatabase export for development/testing support
export const seedDatabase = async () => {
  console.log("seedDatabase is currently a placeholder for future synchronization logic.");
};

// Version 1.13.1
