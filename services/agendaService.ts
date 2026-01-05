
import { db, auth } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, where, serverTimestamp } from 'firebase/firestore';
import { CalendarEvent } from '../types';

const COLLECTION_NAME = 'agenda_events';

export const getEvents = async (): Promise<CalendarEvent[]> => {
  try {
    const user = auth.currentUser;
    if (!user) return [];

    // Solo obtenemos eventos del usuario actual
    const q = query(
      collection(db, COLLECTION_NAME), 
      where('userId', '==', user.uid),
      orderBy('date', 'asc')
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as CalendarEvent));
  } catch (error) {
    console.error("Error getting events:", error);
    return [];
  }
};

export const addEvent = async (event: Omit<CalendarEvent, 'id'>): Promise<string> => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No auth");

    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...event,
        userId: user.uid,
        createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding event:", error);
    throw error;
  }
};

export const deleteEvent = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};
// Version 1.10.2
