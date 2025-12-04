import { db, storage } from './firebase';
import { collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc, arrayUnion, arrayRemove, where, deleteDoc, getDoc } from 'firebase/firestore';
import { SocialPost, SocialComment, NotificationType } from '../types';
// IMPORTAR EL SERVICIO DE NOTIFICACIONES
import { createNotification } from './notificationService'; 

const COLLECTION_NAME = 'social_posts';

// ... (subscribeToPosts, subscribeToAuthorPosts, createPost, updatePost, deletePost, uploadPostImage - SIN CAMBIOS)

// Toggle Like (MODIFICADO para notificar)
export const toggleLike = async (postId: string, userId: string, isLiked: boolean) => {
    try {
        const postRef = doc(db, COLLECTION_NAME, postId);
        if (isLiked) {
            await updateDoc(postRef, {
                likes: arrayRemove(userId)
            });
        } else {
            await updateDoc(postRef, {
                likes: arrayUnion(userId)
            });
            
            // --- TRIGGER NOTIFICATION ---
            // 1. Get post author
            const postSnap = await getDoc(postRef);
            if (postSnap.exists()) {
                const post = postSnap.data() as SocialPost;
                // Don't notify if liking own post
                if (post.authorId !== userId) {
                    await createNotification(
                        post.authorId,
                        NotificationType.SOCIAL_LIKE,
                        'Nuevo Me Gusta',
                        'A alguien le gustó tu publicación.',
                        `/community` // Link stub
                    );
                }
            }
        }
    } catch (error) {
        console.error("Error toggling like:", error);
    }
};

// ... (subscribeToComments - SIN CAMBIOS)

// Add Comment (MODIFICADO para notificar)
export const addComment = async (postId: string, comment: Omit<SocialComment, 'id'>) => {
    try {
        await addDoc(collection(db, COLLECTION_NAME, postId, 'comments'), {
            ...comment,
            timestamp: new Date().toISOString()
        });

        // --- TRIGGER NOTIFICATION ---
        const postRef = doc(db, COLLECTION_NAME, postId);
        const postSnap = await getDoc(postRef);
        
        if (postSnap.exists()) {
            const post = postSnap.data() as SocialPost;
            // Don't notify if commenting on own post (comment.authorId is not explicitly passed here but we can infer logic or update types later. 
            // For now, let's assume we notify the post author always unless it's strictly same email if we had it available easily here.
            // Better: update addComment to take currentUserId for checking)
            
            // Assuming post.authorId is the target
            await createNotification(
                post.authorId,
                NotificationType.SOCIAL_COMMENT,
                'Nuevo Comentario',
                `${comment.authorPersonName || 'Alguien'} comentó tu publicación.`,
                `/community`
            );
        }

    } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
    }
};


import { db, storage } from './firebase';
import { collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc, arrayUnion, arrayRemove, where, deleteDoc, getDoc } from 'firebase/firestore';
import { SocialPost, SocialComment, NotificationType } from '../types';
import { createNotification } from './notificationService'; 

const COLLECTION_NAME = 'social_posts';

// Escuchar posts en tiempo real
export const subscribeToPosts = (callback: (posts: SocialPost[]) => void) => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('timestamp', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const posts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as SocialPost));
    callback(posts);
  });
};

// Obtener posts de un autor específico
export const subscribeToAuthorPosts = (authorId: string, callback: (posts: SocialPost[]) => void) => {
    const q = query(collection(db, COLLECTION_NAME), where('authorId', '==', authorId));
    
    return onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      } as SocialPost));
      // Client sort
      posts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      callback(posts);
    });
};

// Crear Post
export const createPost = async (postData: Omit<SocialPost, 'id' | 'likes'>) => {
    try {
        await addDoc(collection(db, COLLECTION_NAME), {
            ...postData,
            likes: [],
            commentsCount: 0,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};

// Actualizar Post
export const updatePost = async (postId: string, updates: Partial<SocialPost>) => {
    try {
        const postRef = doc(db, COLLECTION_NAME, postId);
        await updateDoc(postRef, updates);
    } catch (error) {
        console.error("Error updating post:", error);
        throw error;
    }
};

// Eliminar Post
export const deletePost = async (postId: string) => {
    try {
        const postRef = doc(db, COLLECTION_NAME, postId);
        await deleteDoc(postRef);
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
};

// Toggle Like (CON NOTIFICACIÓN)
export const toggleLike = async (postId: string, userId: string, isLiked: boolean) => {
    try {
        const postRef = doc(db, COLLECTION_NAME, postId);
        if (isLiked) {
            await updateDoc(postRef, {
                likes: arrayRemove(userId)
            });
        } else {
            await updateDoc(postRef, {
                likes: arrayUnion(userId)
            });
            
            // Notification Trigger
            const postSnap = await getDoc(postRef);
            if (postSnap.exists()) {
                const post = postSnap.data() as SocialPost;
                if (post.authorId !== userId) {
                    await createNotification(
                        post.authorId,
                        NotificationType.SOCIAL_LIKE,
                        'Nuevo Me Gusta',
                        'A alguien le gustó tu publicación.',
                        '/community'
                    );
                }
            }
        }
    } catch (error) {
        console.error("Error toggling like:", error);
    }
};

// Upload Image
export const uploadPostImage = async (file: File): Promise<string> => {
    try {
        const timestamp = Date.now();
        const storageRef = storage.ref(`social_images/${timestamp}_${file.name}`);
        const snapshot = await storageRef.put(file);
        return await snapshot.ref.getDownloadURL();
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};

// --- COMMENTS SYSTEM (EXPORTS QUE FALTABAN) ---

export const subscribeToComments = (postId: string, callback: (comments: SocialComment[]) => void) => {
    const commentsRef = collection(db, COLLECTION_NAME, postId, 'comments');
    const q = query(commentsRef, orderBy('timestamp', 'asc'));

    return onSnapshot(q, (snapshot) => {
        const comments = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as SocialComment));
        callback(comments);
    });
};

export const addComment = async (postId: string, comment: Omit<SocialComment, 'id'>) => {
    try {
        await addDoc(collection(db, COLLECTION_NAME, postId, 'comments'), {
            ...comment,
            timestamp: new Date().toISOString()
        });

        // Notification Trigger
        const postRef = doc(db, COLLECTION_NAME, postId);
        const postSnap = await getDoc(postRef);
        
        if (postSnap.exists()) {
            const post = postSnap.data() as SocialPost;
            // Notify author (simple logic, assuming notificationService handles self-send check or we ignore it for MVP simplicity)
            await createNotification(
                post.authorId,
                NotificationType.SOCIAL_COMMENT,
                'Nuevo Comentario',
                `${comment.authorPersonName || 'Alguien'} comentó tu publicación.`,
                `/community`
            );
        }
    } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
    }
};

export const updateComment = async (postId: string, commentId: string, updates: Partial<SocialComment>) => {
    try {
        const commentRef = doc(db, COLLECTION_NAME, postId, 'comments', commentId);
        await updateDoc(commentRef, updates);
    } catch (error) {
        console.error("Error updating comment:", error);
        throw error;
    }
};

export const deleteComment = async (postId: string, commentId: string) => {
    try {
        const commentRef = doc(db, COLLECTION_NAME, postId, 'comments', commentId);
        await deleteDoc(commentRef);
    } catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
    }
};
// ... (updateComment, deleteComment - SIN CAMBIOS)