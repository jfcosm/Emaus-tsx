import { db } from './firebase';
import { 
  collection, 
  query, 
  where, 
  addDoc, 
  updateDoc, 
  serverTimestamp, 
  doc, 
  onSnapshot, 
  getDocs,
  setDoc,
  Timestamp,
  orderBy
} from 'firebase/firestore';
import { ChatThread, ChatMessage } from '../types';

const CHATS_COLLECTION = 'chats';

// Escuchar cambios en la lista de chats de un usuario
export const subscribeToChats = (userEmail: string, callback: (chats: ChatThread[]) => void) => {
  // NOTA: Se eliminó orderBy('lastMessageTime', 'desc') para evitar el error de "Missing Index"
  // en Firestore. Se ordenará en el cliente.
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

// Escuchar mensajes de un chat específico
export const subscribeToMessages = (chatId: string, callback: (messages: ChatMessage[]) => void) => {
  const q = query(
    collection(db, CHATS_COLLECTION, chatId, 'messages'),
    orderBy('timestamp', 'asc')
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ChatMessage));
    callback(messages);
  });
};

// Enviar un mensaje
export const sendMessage = async (chatId: string, senderEmail: string, text: string) => {
  if (!text.trim()) return;

  const timestamp = serverTimestamp();

  // 1. Agregar mensaje a la sub-colección
  await addDoc(collection(db, CHATS_COLLECTION, chatId, 'messages'), {
    senderId: senderEmail,
    text,
    timestamp,
    read: false
  });

  // 2. Actualizar el documento padre (ChatThread) para la vista previa
  const chatRef = doc(db, CHATS_COLLECTION, chatId);
  await updateDoc(chatRef, {
    lastMessage: text,
    lastMessageTime: timestamp
    // Aquí podríamos incrementar contadores de no leídos
  });
};

// Crear o recuperar un chat existente
export const createOrGetChat = async (currentUserEmail: string, otherUserEmail: string): Promise<string> => {
  // Buscar si ya existe un chat entre estos dos
  // Nota: Firebase no soporta consultas array-contains múltiples nativas fácilmente para "exact match", 
  // así que consultamos por uno y filtramos en cliente si la base es pequeña, 
  // o usamos un ID compuesto si queremos ser estrictos. Para demo, consultamos por currentUser.
  
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

  // Si no existe, creamos uno nuevo
  const newChatData = {
    participants: [currentUserEmail, otherUserEmail],
    lastMessage: 'Chat iniciado',
    lastMessageTime: serverTimestamp(),
    unreadCount: 0
  };

  const newChatRef = await addDoc(collection(db, CHATS_COLLECTION), newChatData);
  return newChatRef.id;
};

// Inicializar chat de soporte (Solo para demo)
export const initSupportChat = async (currentUserEmail: string) => {
  const supportEmail = 'soporte@emaus.app';
  if (currentUserEmail === supportEmail) return;
  await createOrGetChat(currentUserEmail, supportEmail);
};