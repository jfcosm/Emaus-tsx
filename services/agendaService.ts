
import { db, auth } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, where, serverTimestamp } from 'firebase/firestore';
import { CalendarEvent } from '../types';
import { mockEvents } from './mockData'; // Keeping for fallback if empty

const COLLECTION_NAME = 'agenda_events';

// Fetch Events (Real Data)
export const getEvents = async (): Promise<CalendarEvent[]> => {
  try {
    const user = auth.currentUser;
    // In a real multi-tenant app, filter by user.uid or organizationId
    // For now, we fetch all to show activity in this demo environment
    const q = query(collection(db, COLLECTION_NAME), orderBy('date', 'asc'));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
        // Return nothing if empty, so dashboard shows "No events" or user creates new ones.
        // We stop using mockData to force "Real Data" usage as requested.
        return []; 
    }

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as CalendarEvent));
  } catch (error) {
    console.error("Error getting events:", error);
    return [];
  }
};

// Add Event
export const addEvent = async (event: Omit<CalendarEvent, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...event,
        createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding event:", error);
    throw error;
  }
};

// Delete Event
export const deleteEvent = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};
