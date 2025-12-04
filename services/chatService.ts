import { db, storage } from './firebase';
import { collection, query, where, addDoc, updateDoc, serverTimestamp, doc, onSnapshot, getDocs, getDoc, orderBy } from 'firebase/firestore';
import { ChatThread, ChatMessage, NotificationType } from '../types';
import { createNotification } from './notificationService';

const CHATS_COLLECTION = 'chats';

// Escuchar lista de chats
export const subscribeToChats = (userEmail: string, callback: (chats: ChatThread[]) => void) => {
  const q = query(
    collection(db, CHATS_COLLECTION), 
    where('participants', 'array-contains', userEmail)
  );

  return onSnapshot(q, (snapshot) => {
    const threads = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ChatThread));
    // Ordenar localmente
    threads.sort((a, b) => {
       const timeA = a.lastMessageTime?.toMillis ? a.lastMessageTime.toMillis() : 0;
       const timeB = b.lastMessageTime?.toMillis ? b.lastMessageTime.toMillis() : 0;
       return timeB - timeA;
    });
    callback(threads);
  });
};

// Escuchar mensajes de un chat
export const subscribeToMessages = (chatId: string, callback: (messages: ChatMessage[]) => void) => {
  const q = query(
    collection(db, CHATS_COLLECTION, chatId, 'messages'), 
    orderBy('timestamp', 'asc')
  );

  return onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ChatMessage));
    callback(msgs);
  });
};

// Enviar mensaje
export const sendMessage = async (
  chatId: string, 
  senderEmail: string, 
  text: string, 
  attachment?: { url: string, name: string, type: 'image' | 'file' }
) => {
  if (!text.trim() && !attachment) return;

  const timestamp = serverTimestamp();

  // 1. Agregar mensaje
  await addDoc(collection(db, CHATS_COLLECTION, chatId, 'messages'), {
    senderId: senderEmail,
    text,
    timestamp,
    read: false,
    ...(attachment && {
        attachmentUrl: attachment.url,
        attachmentName: attachment.name,
        attachmentType: attachment.type
    })
  });

  // 2. Actualizar Thread
  const chatRef = doc(db, CHATS_COLLECTION, chatId);
  await updateDoc(chatRef, {
    lastMessage: attachment ? (attachment.type === 'image' ? '📷 Imagen' : '📎 Archivo adjunto') : text,
    lastMessageTime: timestamp
  });

  // --- TRIGGER NOTIFICATION ---
  try {
     const chatSnap = await getDoc(chatRef);
     if (chatSnap.exists()) {
         const participants = chatSnap.data()?.participants as string[];
         const recipient = participants.find(p => p !== senderEmail);
         if (recipient) {
             await createNotification(
                 recipient,
                 NotificationType.MESSAGE,
                 'Nuevo Mensaje',
                 'Has recibido un nuevo mensaje en Emaús.',
                 '/messages'
             );
         }
     }
  } catch (e) {
      console.error("Error sending notification for chat", e);
  }
};

// Crear o recuperar chat existente
export const createOrGetChat = async (userEmail: string, otherEmail: string): Promise<string> => {
  try {
    // 1. Buscar si ya existe
    const q = query(
      collection(db, CHATS_COLLECTION), 
      where('participants', 'array-contains', userEmail)
    );
    const snapshot = await getDocs(q);
    
    const existing = snapshot.docs.find(doc => {
      const data = doc.data();
      return data.participants.includes(otherEmail);
    });

    if (existing) return existing.id;

    // 2. Crear nuevo
    const newChatRef = await addDoc(collection(db, CHATS_COLLECTION), {
      participants: [userEmail, otherEmail],
      lastMessage: '',
      lastMessageTime: serverTimestamp(),
      unreadCount: 0
    });
    
    return newChatRef.id;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
};

// Inicializar chat de soporte (Automático)
export const initSupportChat = async (userEmail: string) => {
    try {
        await createOrGetChat(userEmail, 'soporte@emaus.app');
    } catch (e) {
        // Silent fail if support chat exists
    }
};

// Subir Adjunto (Compat API)
export const uploadChatAttachment = async (chatId: string, file: File): Promise<string> => {
    try {
        const timestamp = Date.now();
        const path = `chat_attachments/${chatId}/${timestamp}_${file.name}`;
        
        const ref = storage.ref(path);
        const snapshot = await ref.put(file);
        return await snapshot.ref.getDownloadURL();
    } catch (error) {
        console.error("Error uploading attachment:", error);
        throw error;
    }
};

// Validar límite diario (Local)
export const checkDailyUploadLimit = (messages: ChatMessage[], userEmail: string): boolean => {
    const oneDayAgo = new Date();
    oneDayAgo.setHours(oneDayAgo.getHours() - 24);
    
    const uploads = messages.filter(m => 
        m.senderId === userEmail && 
        m.attachmentUrl && 
        m.timestamp && 
        (m.timestamp.toDate ? m.timestamp.toDate() : new Date(m.timestamp)) > oneDayAgo
    );
    
    return uploads.length >= 20;
};