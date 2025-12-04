
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';
import { useLanguage } from '../contexts/LanguageContext';
import { subscribeToPosts, createPost, toggleLike, uploadPostImage, subscribeToAuthorPosts, subscribeToComments, addComment } from '../services/socialService';
import { getParishDirectory } from '../services/settingsService';
import { SocialPost, ParishDirectoryEntry, SocialComment } from '../types';
import { Heart, MessageSquare, Image as ImageIcon, Send, Loader2, User, Church, Cross, Book, Sun, Star, Music, Users, ArrowLeft, MapPin } from 'lucide-react';

// Icon Map
const iconMap: Record<string, any> = {
    church: Church, cross: Cross, book: Book, heart: Heart, sun: Sun, star: Star, music: Music, users: Users
};

const renderAvatar = (iconName?: string, colorClass?: string) => {
    const Icon = iconMap[iconName || 'church'] || Church;
    const bg = colorClass || 'bg-emaus-600';
    return (
        <div className={`w-10 h-10 ${bg} rounded-full flex items-center justify-center text-white shadow-sm`}>
            <Icon className="w-5 h-5" />
        </div>
    );
};

interface PostCardProps {
    post: SocialPost;
    onAuthorClick: (authorId: string) => void;
}

// --- SUB-COMPONENT: POST CARD (With Comments) ---
const PostCard: React.FC<PostCardProps> = ({ post, onAuthorClick }) => {
    const { t } = useLanguage();
    const { currentUser } = useAuth();
    const { settings } = useSettings();

    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState<SocialComment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [commenting, setCommenting] = useState(false);

    useEffect(() => {
        if (showComments) {
            const unsub = subscribeToComments(post.id, setComments);
            return () => unsub();
        }
    }, [showComments, post.id]);

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        setCommenting(true);
        try {
            await addComment(post.id, {
                authorName: settings.parishName,
                authorRole: settings.userRole || '',
                content: newComment,
                timestamp: new Date().toISOString()
            });
            setNewComment('');
        } catch (e) {
            console.error(e);
        } finally {
            setCommenting(false);
        }
    };

    const handleLike = () => {
        if (!currentUser?.email) return;
        const isLiked = post.likes.includes(currentUser.email);
        toggleLike(post.id, currentUser.email, isLiked);
    };

    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden animate-fade-in mb-6">
          {/* Header */}
          <div className="p-4 flex items-center gap-3">
              <div onClick={() => onAuthorClick(post.authorId)} className="cursor-pointer">
                  {renderAvatar(post.authorAvatarIcon, post.authorAvatarColor)}
              </div>
              <div>
                  <h3 onClick={() => onAuthorClick(post.authorId)} className="font-bold text-slate-800 dark:text-white text-sm cursor-pointer hover:underline">
                      {post.authorName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                      {post.authorRole} • {new Date(post.timestamp).toLocaleDateString()}
                  </p>
              </div>
          </div>

          {/* Content */}
          <div className="px-4 pb-2">
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{post.content}</p>
          </div>

          {/* Image */}
          {post.imageUrl && (
              <div className="mt-2 w-full bg-slate-100 dark:bg-slate-950">
                  <img src={post.imageUrl} alt="Post content" className="w-full h-auto max-h-96 object-cover" />
              </div>
          )}

          {/* Actions */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${post.likes.includes(currentUser?.email || '') ? 'text-red-500' : 'text-slate-500 hover:text-red-500'}`}
              >
                  <Heart className={`w-5 h-5 ${post.likes.includes(currentUser?.email || '') ? 'fill-current' : ''}`} />
                  {post.likes.length} {t('community.likes')}
              </button>
              <button 
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-500 transition-colors"
              >
                  <MessageSquare className="w-5 h-5" />
                  {t('community.comment')}
              </button>
          </div>

          {/* Comments Section */}
          {showComments && (
              <div className="bg-slate-50 dark:bg-slate-950/50 p-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                      {comments.length === 0 ? (
                          <p className="text-xs text-slate-400 text-center py-2">Sé el primero en comentar.</p>
                      ) : (
                          comments.map(comment => (
                              <div key={comment.id} className="text-sm">
                                  <span className="font-bold text-slate-800 dark:text-slate-200 mr-2">{comment.authorName}</span>
                                  <span className="text-slate-600 dark:text-slate-400">{comment.content}</span>
                              </div>
                          ))
                      )}
                  </div>
                  <form onSubmit={handleAddComment} className="flex gap-2">
                      <input 
                          type="text" 
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder={t('community.write_comment')}
                          className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-emaus-500"
                      />
                      <button type="submit" disabled={commenting || !newComment.trim()} className="p-2 bg-emaus-600 text-white rounded-lg hover:bg-emaus-700 disabled:opacity-50">
                          {commenting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      </button>
                  </form>
              </div>
          )}
      </div>
    );
};

const Community: React.FC = () => {
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  const { settings } = useSettings();
  
  // Views: 'feed' | 'profile'
  const [view, setView] = useState<'feed' | 'profile'>('feed');
  const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>(null);
  
  // Feed Data
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [profilePosts, setProfilePosts] = useState<SocialPost[]>([]);
  
  // Directory (Suggested Parishes)
  const [directory, setDirectory] = useState<ParishDirectoryEntry[]>([]);

  // Post Creation
  const [newContent, setNewContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load Feed
  useEffect(() => {
    if (view === 'feed') {
        const unsubscribe = subscribeToPosts((updatedPosts) => {
            setPosts(updatedPosts);
        });
        return () => unsubscribe();
    }
  }, [view]);

  // Load Profile Posts
  useEffect(() => {
    if (view === 'profile' && selectedAuthorId) {
        const unsubscribe = subscribeToAuthorPosts(selectedAuthorId, (updatedPosts) => {
            setProfilePosts(updatedPosts);
        });
        return () => unsubscribe();
    }
  }, [view, selectedAuthorId]);

  // Load Directory
  useEffect(() => {
      const loadDir = async () => {
          const data = await getParishDirectory();
          // Show only first 5 distinct parishes as suggestions
          setDirectory(data.slice(0, 5));
      };
      loadDir();
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
              authorAvatarIcon: settings.avatarIcon,
              authorAvatarColor: settings.avatarColor,
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

  const goToProfile = (authorId: string) => {
      setSelectedAuthorId(authorId);
      setView('profile');
      window.scrollTo(0, 0);
  };

  // --- RENDER: PARISH PROFILE ---
  if (view === 'profile' && selectedAuthorId) {
      // Mock profile data fetch based on ID/Email (In real app, fetch from settings collection)
      const parishEntry = directory.find(p => p.email === selectedAuthorId);
      const parishName = parishEntry ? parishEntry.parishName : 'Parroquia';
      const parishCity = parishEntry ? parishEntry.city : '';

      return (
          <div className="max-w-4xl mx-auto animate-fade-in pb-10">
              <button 
                onClick={() => setView('feed')}
                className="mb-4 flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                  <ArrowLeft className="w-4 h-4" /> {t('community.back_to_feed')}
              </button>

              {/* Profile Header */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mb-8">
                  <div className="h-48 bg-gradient-to-r from-emaus-800 to-emaus-600 relative">
                      {/* Cover Image Placeholder - In real app, fetch from settings */}
                      <div className="absolute inset-0 flex items-center justify-center text-white/20">
                          <ImageIcon className="w-16 h-16" />
                      </div>
                  </div>
                  <div className="px-8 pb-6 relative">
                      <div className="absolute -top-12 left-8 p-1 bg-white dark:bg-slate-900 rounded-full">
                          <div className="w-24 h-24 bg-gold-500 rounded-full flex items-center justify-center text-white shadow-lg">
                              <Church className="w-12 h-12" />
                          </div>
                      </div>
                      <div className="pt-16 pl-0 md:pl-32">
                          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{parishName}</h1>
                          <p className="text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                              <MapPin className="w-4 h-4" /> {parishCity || 'Ubicación no especificada'}
                          </p>
                      </div>
                  </div>
              </div>

              {/* Profile Posts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                      <h3 className="font-bold text-lg mb-4 text-slate-700 dark:text-slate-300">Publicaciones</h3>
                      {profilePosts.map(post => <PostCard key={post.id} post={post} onAuthorClick={goToProfile} />)}
                      {profilePosts.length === 0 && <p className="text-slate-400">Esta parroquia aún no tiene publicaciones.</p>}
                  </div>
                  <div>
                      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                          <h4 className="font-bold text-slate-800 dark:text-white mb-4">Información</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                              Bienvenido a la página oficial de nuestra comunidad en Emaús.
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      );
  }

  // --- RENDER: FEED ---
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t('community.title')}</h2>
            </div>

            {/* Create Post */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-4">
                <div className="flex gap-4">
                    <div className="shrink-0">
                        {renderAvatar(settings.avatarIcon, settings.avatarColor)}
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
                                    onChange={(e) => { if (e.target.files?.[0]) setSelectedImage(e.target.files[0]); }}
                                />
                                <button 
                                    type="button" 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex items-center gap-2 text-slate-500 hover:text-emaus-600 transition-colors text-sm font-medium"
                                >
                                    <ImageIcon className="w-5 h-5" /> {t('community.upload_photo')}
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={isPosting || (!newContent && !selectedImage)}
                                    className="px-4 py-2 bg-emaus-700 text-white rounded-full font-bold text-sm hover:bg-emaus-800 disabled:opacity-50 flex items-center gap-2"
                                >
                                    {isPosting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                    {isPosting ? t('community.posting') : t('community.publish')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Posts List */}
            {posts.length === 0 ? (
                <div className="text-center py-12 text-slate-400"><p>{t('community.no_posts')}</p></div>
            ) : (
                posts.map(post => <PostCard key={post.id} post={post} onAuthorClick={goToProfile} />)
            )}
        </div>

        {/* Right Sidebar: Directory */}
        <div className="hidden lg:block space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sticky top-6">
                <h3 className="font-bold text-slate-800 dark:text-white mb-4">{t('community.suggested_parishes')}</h3>
                <div className="space-y-4">
                    {directory.map(parish => (
                        <div key={parish.id} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500">
                                    {parish.parishName.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-800 dark:text-white truncate w-32">{parish.parishName}</p>
                                    <p className="text-xs text-slate-500 truncate w-32">{parish.city}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => goToProfile(parish.email)}
                                className="text-xs font-bold text-emaus-600 hover:underline"
                            >
                                {t('community.visit_profile')}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Community;
