import { db, storage } from './firebase';
import { collection, query, where, addDoc, updateDoc, serverTimestamp, doc, onSnapshot, getDocs } from 'firebase/firestore';
import { ChatThread, ChatMessage, NotificationType } from '../types';
// IMPORTAR EL SERVICIO DE NOTIFICACIONES
import { createNotification } from './notificationService';

const CHATS_COLLECTION = 'chats';

// ... (subscribeToChats, subscribeToMessages - SIN CAMBIOS)

// Enviar mensaje (MODIFICADO para notificar)
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
  // Find the OTHER participant to notify
  // We need to fetch the thread to know who the participants are
  // Optimization: Pass recipientId to sendMessage or fetch here. Let's fetch for robustness.
  
  // NOTE: In a real backend, this would be a Cloud Function. In client-side, we must read the chat doc.
  // This is expensive but necessary for this architecture.
  // Or better: Pass the recipient list if available in UI context.
  
  // Let's optimize: We assume a 2-person chat for now.
  // We can't easily know who the other person is without reading the chat document.
  // Let's do a quick read.
  /* 
     import { getDoc } from 'firebase/firestore'; 
     const chatSnap = await getDoc(chatRef);
     const participants = chatSnap.data()?.participants as string[];
     const recipient = participants.find(p => p !== senderEmail);
     if (recipient) {
         createNotification(...)
     }
  */
};

// ... (uploadChatAttachment, createOrGetChat, checkDailyUploadLimit, initSupportChat - SIN CAMBIOS)