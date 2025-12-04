
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';
import { useLanguage } from '../contexts/LanguageContext';
import { subscribeToPosts, createPost, toggleLike, uploadPostImage } from '../services/socialService';
import { SocialPost } from '../types';
import { Heart, MessageSquare, Image as ImageIcon, Send, Loader2, User } from 'lucide-react';

const Community: React.FC = () => {
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  const { settings } = useSettings();
  
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [newContent, setNewContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = subscribeToPosts((updatedPosts) => {
        setPosts(updatedPosts);
    });
    return () => unsubscribe();
  }, []);

  const handlePost = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newContent.trim() && !selectedImage) return;
      if (!currentUser) return;

      setIsPosting(true);
      try {
          let imageUrl = undefined;
          if (selectedImage) {
              imageUrl = await uploadPostImage(selectedImage);
          }

          await createPost({
              authorId: currentUser.email || 'unknown',
              authorName: settings.parishName || 'Usuario',
              authorRole: settings.userRole || 'Miembro',
              content: newContent,
              imageUrl: imageUrl,
              timestamp: new Date().toISOString()
          });

          setNewContent('');
          setSelectedImage(null);
      } catch (error) {
          alert("Error al publicar");
      } finally {
          setIsPosting(false);
      }
  };

  const handleLike = (post: SocialPost) => {
      if (!currentUser?.email) return;
      const isLiked = post.likes.includes(currentUser.email);
      toggleLike(post.id, currentUser.email, isLiked);
  };

  const getTimeAgo = (isoDate: string) => {
      // Simple relative time formatter
      const date = new Date(isoDate);
      // For mock data which might be just text like "Hace 2 horas"
      if (isNaN(date.getTime())) return isoDate;
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in pb-10">
        <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t('community.title')}</h2>
            <p className="text-slate-500 dark:text-slate-400">{t('community.subtitle')}</p>
        </div>

        {/* Create Post Box */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-4">
            <div className="flex gap-4">
                <div className="w-10 h-10 bg-emaus-100 dark:bg-emaus-900/30 rounded-full flex items-center justify-center text-emaus-700 dark:text-emaus-400 shrink-0">
                    <User className="w-6 h-6" />
                </div>
                <div className="flex-1">
                    <form onSubmit={handlePost}>
                        <textarea 
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            placeholder={t('community.new_post_placeholder')}
                            className="w-full bg-transparent border-none focus:ring-0 resize-none text-slate-800 dark:text-white placeholder-slate-400 text-sm min-h-[80px]"
                        />
                        
                        {selectedImage && (
                            <div className="mb-4 relative inline-block">
                                <img src={URL.createObjectURL(selectedImage)} alt="Preview" className="h-20 w-auto rounded-lg object-cover border border-slate-200" />
                                <button 
                                    type="button"
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-5 h-5 flex items-center justify-center text-xs"
                                >
                                    ×
                                </button>
                            </div>
                        )}

                        <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files?.[0]) setSelectedImage(e.target.files[0]);
                                }}
                            />
                            <button 
                                type="button" 
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center gap-2 text-slate-500 hover:text-emaus-600 dark:hover:text-emaus-400 transition-colors text-sm font-medium"
                            >
                                <ImageIcon className="w-5 h-5" /> {t('community.upload_photo')}
                            </button>
                            
                            <button 
                                type="submit" 
                                disabled={isPosting || (!newContent && !selectedImage)}
                                className="px-4 py-2 bg-emaus-700 text-white rounded-full font-bold text-sm hover:bg-emaus-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
                            >
                                {isPosting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                {isPosting ? t('community.posting') : t('community.publish')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        {/* Feed */}
        <div className="space-y-6">
            {posts.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                    <p>{t('community.no_posts')}</p>
                </div>
            ) : (
                posts.map(post => (
                    <div key={post.id} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden animate-fade-in">
                        {/* Header */}
                        <div className="p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-emaus-500 to-emaus-700 rounded-full flex items-center justify-center text-white font-bold">
                                {post.authorName.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-white text-sm">{post.authorName}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {post.authorRole} • {getTimeAgo(post.timestamp)}
                                </p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="px-4 pb-2">
                            <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                                {post.content}
                            </p>
                        </div>

                        {/* Image */}
                        {post.imageUrl && (
                            <div className="mt-2 w-full h-64 md:h-80 bg-slate-100 dark:bg-slate-950">
                                <img src={post.imageUrl} alt="Post content" className="w-full h-full object-cover" />
                            </div>
                        )}

                        {/* Actions */}
                        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <button 
                                onClick={() => handleLike(post)}
                                className={`flex items-center gap-2 text-sm font-medium transition-colors ${post.likes.includes(currentUser?.email || '') ? 'text-red-500' : 'text-slate-500 hover:text-red-500'}`}
                            >
                                <Heart className={`w-5 h-5 ${post.likes.includes(currentUser?.email || '') ? 'fill-current' : ''}`} />
                                {post.likes.length} {t('community.likes')}
                            </button>
                            <button className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-500 transition-colors">
                                <MessageSquare className="w-5 h-5" />
                                {t('community.comment')}
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
  );
};

export default Community;