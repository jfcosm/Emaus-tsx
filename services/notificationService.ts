import { db } from './firebase';
import { collection, addDoc, onSnapshot, query, where, orderBy, updateDoc, doc, serverTimestamp, writeBatch, getDocs } from 'firebase/firestore';
import { AppNotification, NotificationType } from '../types';

// Force git sync v1.9.7
const COLLECTION = 'notifications';

export const subscribeToNotifications = (userEmail: string, callback: (notes: AppNotification[]) => void) => {
  // Listen for notifications where recipient is the user OR 'all'
  const q = query(
    collection(db, COLLECTION), 
    where('recipientId', 'in', [userEmail, 'all']),
    orderBy('timestamp', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const notes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as AppNotification));
    callback(notes);
  });
};

export const markAsRead = async (notificationId: string) => {
  const ref = doc(db, COLLECTION, notificationId);
  await updateDoc(ref, { read: true });
};

// Mark all notifications of a specific type as read for a user
export const markNotificationsReadByType = async (userId: string, type: NotificationType) => {
    try {
        const q = query(
            collection(db, COLLECTION),
            where('recipientId', '==', userId),
            where('type', '==', type),
            where('read', '==', false)
        );
        const snapshot = await getDocs(q);
        
        if (snapshot.empty) return;

        const batch = writeBatch(db);
        snapshot.docs.forEach(doc => {
            batch.update(doc.ref, { read: true });
        });
        await batch.commit();
    } catch (e) {
        console.error("Error marking notifications as read", e);
    }
};

export const markAllAsRead = async (userId: string) => {
    // In a real app, this would be a batch update or cloud function
    // For now, we handle individual clicks or just UI state
    console.log("Mark all read not fully implemented in client-side only mode");
};

// Helper to create a notification (e.g. when a post is liked)
export const createNotification = async (
    recipientId: string, 
    type: NotificationType, 
    title: string, 
    message: string, 
    link?: string
) => {
    try {
        await addDoc(collection(db, COLLECTION), {
            recipientId,
            type,
            title,
            message,
            link,
            read: false,
            timestamp: serverTimestamp()
        });
    } catch (e) {
        console.error("Error sending notification", e);
    }
};