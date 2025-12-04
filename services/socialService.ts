
import { db, storage } from './firebase';
import { collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { SocialPost } from '../types';

const COLLECTION_NAME = 'social_posts';

// Escuchar posts en tiempo real
export const subscribeToPosts = (callback: (posts: SocialPost[]) => void) => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('timestamp', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const posts = snapshot.docs.map(doc => {
        const data = doc.data();
        // Convert Timestamp to readable string if needed, or keep raw
        // Here assuming we handle raw timestamp in UI or it's stored as string in mock
        return {
            id: doc.id,
            ...data
        } as SocialPost;
    });
    callback(posts);
  });
};

// Crear Post
export const createPost = async (postData: Omit<SocialPost, 'id' | 'likes'>) => {
    try {
        await addDoc(collection(db, COLLECTION_NAME), {
            ...postData,
            likes: [],
            timestamp: new Date().toISOString() // Using ISO string for simplicity in demo
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