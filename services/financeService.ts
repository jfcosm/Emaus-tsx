import { db, auth } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, where } from 'firebase/firestore';
import { FinanceTransaction } from '../types';
import { mockTransactions } from './mockData';

const COLLECTION_NAME = 'finances';

export const getTransactions = async (): Promise<FinanceTransaction[]> => {
  try {
    const user = auth.currentUser;
    if (!user) return [];

    // Ensure we query transactions for this user (Multi-tenancy)
    // For this simple implementation, we assume the collection is sub-collection or filtered by UID if we were stricter.
    // BUT since we are using a root collection for simplicity in this demo, let's just query everything 
    // In a real app: collection(db, 'settings', user.uid, 'finances')
    
    // Using root collection for now, filtering logic would be needed in real backend
    const q = query(collection(db, COLLECTION_NAME), orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
        return mockTransactions; // Fallback for demo
    }

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as FinanceTransaction));
  } catch (error) {
    console.error("Error getting transactions:", error);
    return mockTransactions;
  }
};

export const addTransaction = async (transaction: Omit<FinanceTransaction, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), transaction);
    return docRef.id;
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }
};

export const deleteTransaction = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};