
import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, doc, query, orderBy } from 'firebase/firestore';
import { SacramentRecord } from '../types';
import { mockSacraments } from './mockData';

const COLLECTION_NAME = 'sacraments';

// Obtener todos los sacramentos
export const getSacraments = async (): Promise<SacramentRecord[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('date', 'desc'));
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

// Agregar un nuevo sacramento
export const addSacrament = async (sacrament: Omit<SacramentRecord, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), sacrament);
    return docRef.id;
  } catch (error) {
    console.error("Error adding sacrament:", error);
    throw error;
  }
};

// Actualizar un sacramento existente
export const updateSacrament = async (id: string, updates: Partial<SacramentRecord>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error("Error updating sacrament:", error);
    throw error;
  }
};

// Función utilitaria para poblar la BD con datos de prueba iniciales
export const seedDatabase = async (): Promise<void> => {
  try {
    const promises = mockSacraments.map(item => {
      // Eliminamos el ID del mock para que Firebase genere uno real
      const { id, ...data } = item;
      return addDoc(collection(db, COLLECTION_NAME), data);
    });
    await Promise.all(promises);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};
