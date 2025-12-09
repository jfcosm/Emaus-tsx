
import { db } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { Lead, LeadStatus } from '../types';

const COLLECTION_NAME = 'leads';

export const createLead = async (lead: Omit<Lead, 'id' | 'status' | 'createdAt'>): Promise<string> => {
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...lead,
            status: 'new',
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error("Error creating lead:", error);
        throw error;
    }
};

export const getLeads = async (): Promise<Lead[]> => {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Lead));
    } catch (error) {
        console.error("Error fetching leads:", error);
        return [];
    }
};

export const updateLeadStatus = async (id: string, status: LeadStatus): Promise<void> => {
    try {
        const ref = doc(db, COLLECTION_NAME, id);
        await updateDoc(ref, { status });
    } catch (error) {
        console.error("Error updating lead status:", error);
        throw error;
    }
};

export const deleteLead = async (id: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
        console.error("Error deleting lead:", error);
        throw error;
    }
};
