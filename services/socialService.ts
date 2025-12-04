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

// Obtener posts de un autor específico (para perfil de parroquia)
export const subscribeToAuthorPosts = (authorId: string, callback: (posts: SocialPost[]) => void) => {
    const q = query(collection(db, COLLECTION_NAME), where('authorId', '==', authorId));
    
    return onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      } as SocialPost));
      // Client-side sort to be safe without index
      posts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      callback(posts);
    });
};

// Crear Post (Actualizado con Identidad Dual)
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

// Actualizar Post (NUEVO)
export const updatePost = async (postId: string, updates: Partial<SocialPost>) => {
    try {
        const postRef = doc(db, COLLECTION_NAME, postId);
        await updateDoc(postRef, updates);
    } catch (error) {
        console.error("Error updating post:", error);
        throw error;
    }
};

// Eliminar Post (NUEVO)
export const deletePost = async (postId: string) => {
    try {
        const postRef = doc(db, COLLECTION_NAME, postId);
        await deleteDoc(postRef);
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
};

// Toggle Like
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
                        '/community' 
                    );
                }
            }
        }
    } catch (error) {
        console.error("Error toggling like:", error);
    }
};

// Upload Image for Post
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

// --- COMMENTS SYSTEM ---

// Subscribe to comments of a post
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

// Add Comment
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
            // Notify author
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

// Update Comment (NUEVO)
export const updateComment = async (postId: string, commentId: string, updates: Partial<SocialComment>) => {
    try {
        const commentRef = doc(db, COLLECTION_NAME, postId, 'comments', commentId);
        await updateDoc(commentRef, updates);
    } catch (error) {
        console.error("Error updating comment:", error);
        throw error;
    }
};

// Delete Comment (NUEVO)
export const deleteComment = async (postId: string, commentId: string) => {
    try {
        const commentRef = doc(db, COLLECTION_NAME, postId, 'comments', commentId);
        await deleteDoc(commentRef);
    } catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
    }
};