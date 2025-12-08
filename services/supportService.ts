
// Version 1.11.0 - Support Attachments
import { db, auth, storage } from './firebase';
import { collection, addDoc, onSnapshot, query, where, orderBy, updateDoc, doc, serverTimestamp, getDoc, getDocs } from 'firebase/firestore';
import { SupportTicket, TicketMessage, TicketStatus, TicketPriority } from '../types';

const TICKETS_COLLECTION = 'support_tickets';

// Generate a random ticket code (e.g., TKT-A1B2)
const generateTicketCode = (): string => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No I, O, 1, 0 to avoid confusion
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `TKT-${result}`;
};

// --- ATTACHMENT UPLOAD ---
export const uploadTicketAttachment = async (file: File): Promise<string> => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("No user");
        
        const timestamp = Date.now();
        const path = `support_attachments/${user.uid}/${timestamp}_${file.name}`;
        
        const ref = storage.ref(path);
        const snapshot = await ref.put(file);
        return await snapshot.ref.getDownloadURL();
    } catch (error) {
        console.error("Error uploading attachment:", error);
        throw error;
    }
};

// --- CREATE ---
export const createTicket = async (
    subject: string, 
    description: string, 
    priority: TicketPriority, 
    parishName?: string,
    attachment?: { url: string, name: string, type: 'image' | 'file' }
) => {
    const user = auth.currentUser;
    if (!user) throw new Error("No user authenticated");

    const ticketCode = generateTicketCode();

    const newTicket: Omit<SupportTicket, 'id'> = {
        ticketCode, // Added code
        userId: user.uid,
        userEmail: user.email || 'unknown',
        parishName: parishName || 'Parroquia',
        subject,
        description,
        priority,
        status: 'open',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        unreadAdmin: true,
        unreadUser: false,
        ...(attachment && {
            attachmentUrl: attachment.url,
            attachmentName: attachment.name,
            attachmentType: attachment.type
        })
    };

    const docRef = await addDoc(collection(db, TICKETS_COLLECTION), newTicket);
    
    // Add initial description as first message
    await addDoc(collection(db, TICKETS_COLLECTION, docRef.id, 'messages'), {
        senderId: user.uid,
        text: description,
        timestamp: serverTimestamp(),
        isAdmin: false
    });

    return docRef.id;
};

// --- READ (REALTIME) ---

// For regular users
export const subscribeToUserTickets = (userId: string, callback: (tickets: SupportTicket[]) => void) => {
    const q = query(
        collection(db, TICKETS_COLLECTION),
        where('userId', '==', userId),
        orderBy('updatedAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
        const tickets = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as SupportTicket));
        callback(tickets);
    });
};

// For Admins (All tickets)
export const subscribeToAllTickets = (callback: (tickets: SupportTicket[]) => void) => {
    const q = query(collection(db, TICKETS_COLLECTION), orderBy('updatedAt', 'desc'));

    return onSnapshot(q, (snapshot) => {
        const tickets = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as SupportTicket));
        callback(tickets);
    });
};

// Messages for a specific ticket
export const subscribeToTicketMessages = (ticketId: string, callback: (messages: TicketMessage[]) => void) => {
    const q = query(
        collection(db, TICKETS_COLLECTION, ticketId, 'messages'),
        orderBy('timestamp', 'asc')
    );

    return onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as TicketMessage));
        callback(messages);
    });
};

// --- UPDATE ---

// Send Message
export const sendTicketMessage = async (ticketId: string, text: string, isAdmin: boolean) => {
    const user = auth.currentUser;
    if (!user) return;

    // Add message
    await addDoc(collection(db, TICKETS_COLLECTION, ticketId, 'messages'), {
        senderId: user.uid,
        text,
        timestamp: serverTimestamp(),
        isAdmin
    });

    // Update ticket metadata
    const ticketRef = doc(db, TICKETS_COLLECTION, ticketId);
    await updateDoc(ticketRef, {
        updatedAt: serverTimestamp(),
        unreadAdmin: !isAdmin, // If user sends, admin unread is true
        unreadUser: isAdmin,   // If admin sends, user unread is true
        status: isAdmin ? 'in_progress' : undefined // Optionally move to in_progress if admin replies
    });
};

// Update Status
export const updateTicketStatus = async (ticketId: string, status: TicketStatus) => {
    const ticketRef = doc(db, TICKETS_COLLECTION, ticketId);
    await updateDoc(ticketRef, {
        status,
        updatedAt: serverTimestamp()
    });
};
