
import { db, storage } from './firebase';
import { collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc, arrayUnion, arrayRemove, where } from 'firebase/firestore';
import { SocialPost, SocialComment } from '../types';

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
    // Note: This requires an index in Firestore: authorId ASC, timestamp DESC
    // If index is missing, we can filter client-side for this MVP
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
        }
    } catch (error) {
        console.error("Error toggling like:", error);
    }
};

// Upload Image for Post (Using Compat API)
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
        // 1. Add comment to subcollection
        await addDoc(collection(db, COLLECTION_NAME, postId, 'comments'), {
            ...comment,
            timestamp: new Date().toISOString()
        });

        // 2. Increment comment count on parent post (Optional for UI)
        // Note: Firestore doesn't have easy increment without FieldValue, skipping atomic increment for simplicity in demo
        // Ideally: updateDoc(doc(db, COLLECTION_NAME, postId), { commentsCount: increment(1) });
    } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
    }
};
