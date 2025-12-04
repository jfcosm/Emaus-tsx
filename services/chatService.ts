
import { db, storage } from './firebase';
import { 
  collection, 
  query, 
  where, 
  addDoc, 
  updateDoc, 
  serverTimestamp, 
  doc, 
  onSnapshot, 
  getDocs
} from 'firebase/firestore';
import { ChatThread, ChatMessage } from '../types';

const CHATS_COLLECTION = 'chats';

// Escuchar cambios en la lista de chats de un usuario
export const subscribeToChats = (userEmail: string, callback: (chats: ChatThread[]) => void) => {
  const q = query(
    collection(db, CHATS_COLLECTION),
    where('participants', 'array-contains', userEmail)
  );

  return onSnapshot(q, (snapshot) => {
    const chats = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ChatThread));
    
    // Ordenar localmente por fecha (más reciente primero)
    chats.sort((a, b) => {
       const timeA = a.lastMessageTime?.toMillis ? a.lastMessageTime.toMillis() : (a.lastMessageTime ? new Date(a.lastMessageTime).getTime() : 0);
       const timeB = b.lastMessageTime?.toMillis ? b.lastMessageTime.toMillis() : (b.lastMessageTime ? new Date(b.lastMessageTime).getTime() : 0);
       return timeB - timeA;
    });

    callback(chats);
  });
};

// Escuchar mensajes de un chat específico (Ordenados localmente si falla el índice)
export const subscribeToMessages = (chatId: string, callback: (messages: ChatMessage[]) => void) => {
  const messagesRef = collection(db, CHATS_COLLECTION, chatId, 'messages');
  // Eliminamos orderBy de la query para evitar problemas de índices en modo desarrollo rápido
  // const q = query(messagesRef, orderBy('timestamp', 'asc')); 

  return onSnapshot(messagesRef, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ChatMessage));
    
    // Ordenar en cliente
    messages.sort((a, b) => {
       const timeA = a.timestamp?.toMillis ? a.timestamp.toMillis() : (a.timestamp ? new Date(a.timestamp).getTime() : 0);
       const timeB = b.timestamp?.toMillis ? b.timestamp.toMillis() : (b.timestamp ? new Date(b.timestamp).getTime() : 0);
       return timeA - timeB;
    });
    
    callback(messages);
  });
};

// Enviar un mensaje (Texto o Archivo)
export const sendMessage = async (
  chatId: string, 
  senderEmail: string, 
  text: string, 
  attachment?: { url: string, name: string, type: 'image' | 'file' }
) => {
  // Permitir enviar si hay texto O si hay adjunto
  if (!text.trim() && !attachment) return;

  const timestamp = serverTimestamp();

  // 1. Agregar mensaje a la sub-colección
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

  // 2. Actualizar el documento padre (ChatThread) para la vista previa
  const chatRef = doc(db, CHATS_COLLECTION, chatId);
  await updateDoc(chatRef, {
    lastMessage: attachment ? (attachment.type === 'image' ? '📷 Imagen' : '📎 Archivo adjunto') : text,
    lastMessageTime: timestamp
  });
};

// Subir Archivo Adjunto (USANDO API COMPAT PARA ESTABILIDAD)
export const uploadChatAttachment = async (chatId: string, file: File): Promise<string> => {
    try {
        const timestamp = Date.now();
        // Usamos la referencia de storage importada de firebase.ts (Compat)
        const storageRef = storage.ref(`chat_attachments/${chatId}/${timestamp}_${file.name}`);
        
        // Subir archivo
        const snapshot = await storageRef.put(file);
        
        // Obtener URL
        const downloadURL = await snapshot.ref.getDownloadURL();
        return downloadURL;
    } catch (error) {
        console.error("Error uploading file to storage:", error);
        throw error;
    }
};

export const createOrGetChat = async (currentUserEmail: string, otherUserEmail: string): Promise<string> => {
  const q = query(
    collection(db, CHATS_COLLECTION),
    where('participants', 'array-contains', currentUserEmail)
  );
  
  const snapshot = await getDocs(q);
  const existingChat = snapshot.docs.find(doc => {
    const data = doc.data();
    return data.participants.includes(otherUserEmail);
  });

  if (existingChat) {
    return existingChat.id;
  }

  const newChatData = {
    participants: [currentUserEmail, otherUserEmail],
    lastMessage: 'Chat iniciado',
    lastMessageTime: serverTimestamp(),
    unreadCount: 0
  };

  const newChatRef = await addDoc(collection(db, CHATS_COLLECTION), newChatData);
  return newChatRef.id;
};

// Helper: Verificar límite diario de archivos (Simulado en cliente para demo)
export const checkDailyUploadLimit = (messages: ChatMessage[], currentUserEmail: string): boolean => {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0,0,0,0)).getTime();
    
    const myUploadsToday = messages.filter(m => 
        m.senderId === currentUserEmail && 
        m.attachmentUrl && 
        (m.timestamp?.toMillis ? m.timestamp.toMillis() : Date.now()) > startOfDay
    );
    
    return myUploadsToday.length >= 20;
};

export const initSupportChat = async (currentUserEmail: string) => {
  const supportEmail = 'soporte@emaus.app';
  if (currentUserEmail === supportEmail) return;
  await createOrGetChat(currentUserEmail, supportEmail);
};
