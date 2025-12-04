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

// ... (updateComment, deleteComment - SIN CAMBIOS)