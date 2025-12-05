
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';
import { useLanguage } from '../contexts/LanguageContext';
import { subscribeToPosts, createPost, toggleLike, uploadPostImage, subscribeToAuthorPosts, subscribeToComments, addComment, updatePost, deletePost, updateComment, deleteComment } from '../services/socialService';
import { markNotificationsReadByType } from '../services/notificationService';
import { getParishDirectory } from '../services/settingsService';
import { SocialPost, ParishDirectoryEntry, SocialComment, NotificationType } from '../types';
import { Heart, MessageSquare, Image as ImageIcon, Send, Loader2, User, Church, Cross, Book, Sun, Star, Music, Users, ArrowLeft, MapPin, MoreVertical, Edit2, Trash2, X, Check } from 'lucide-react';

// Icon Map
const iconMap: Record<string, any> = {
    church: Church, cross: Cross, book: Book, heart: Heart, sun: Sun, star: Star, music: Music, users: Users
};

// Helper to render avatars
const renderAvatar = (iconName?: string, colorClass?: string, size: 'sm' | 'md' = 'md') => {
    const Icon = iconMap[iconName || 'church'] || Church;
    const bg = colorClass || 'bg-emaus-600';
    const containerSize = size === 'md' ? 'w-10 h-10' : 'w-8 h-8';
    const iconSize = size === 'md' ? 'w-5 h-5' : 'w-4 h-4';
    
    return (
        <div className={`${containerSize} ${bg} rounded-full flex items-center justify-center text-white shadow-sm shrink-0`}>
            <Icon className={iconSize} />
        </div>
    );
};

interface PostCardProps {
    post: SocialPost;
    onAuthorClick: (authorId: string) => void;
}

// --- POST CARD COMPONENT ---
const PostCard: React.FC<PostCardProps> = ({ post, onAuthorClick }) => {
    const { t } = useLanguage();
    const { currentUser } = useAuth();
    const { settings } = useSettings();

    // Comments State
    const [comments, setComments] = useState<SocialComment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [commenting, setCommenting] = useState(false);

    // Edit State (Post)
    const [isEditingPost, setIsEditingPost] = useState(false);
    const [editedContent, setEditedContent] = useState(post.content);
    const [showPostMenu, setShowPostMenu] = useState(false);

    // Edit State (Comments)
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [editedCommentContent, setEditedCommentContent] = useState('');

    const isAuthor = currentUser?.email === post.authorId;

    useEffect(() => {
        const unsub = subscribeToComments(post.id, setComments);
        return () => unsub();
    }, [post.id]);

    // --- POST ACTIONS ---
    const handleSavePost = async () => {
        if (!editedContent.trim()) return;
        try {
            await updatePost(post.id, { content: editedContent, isEdited: true });
            setIsEditingPost(false);
            setShowPostMenu(false);
        } catch (error) {
            alert("Error al editar publicación");
        }
    };

    const handleDeletePost = async () => {
        if (confirm("¿Estás seguro de eliminar esta publicación?")) {
            try {
                await deletePost(post.id);
            } catch (error) {
                alert("Error al eliminar");
            }
        }
    };

    // --- COMMENT ACTIONS ---
    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        setCommenting(true);
        try {
            await addComment(post.id, {
                authorId: currentUser?.email || 'unknown',
                authorName: settings.parishName,
                authorPersonName: settings.secretaryName || 'Usuario',
                authorParishName: settings.parishName,
                authorRole: settings.userRole || '',
                authorAvatarIcon: settings.avatarIcon,
                authorAvatarColor: settings.avatarColor,
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

    const handleSaveComment = async (commentId: string) => {
        if (!editedCommentContent.trim()) return;
        try {
            await updateComment(post.id, commentId, { content: editedCommentContent, isEdited: true });
            setEditingCommentId(null);
        } catch (error) {
            alert("Error al editar comentario");
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        if (confirm("¿Eliminar comentario?")) {
            await deleteComment(post.id, commentId);
        }
    };

    const handleLike = () => {
        if (!currentUser?.email) return;
        const isLiked = post.likes.includes(currentUser.email);
        toggleLike(post.id, currentUser.email, isLiked);
    };

    // Determine Display Names (Prioritize Person Name)
    // Fallback logic: If Person Name is missing (legacy post), use Role or Default, but NEVER Parish Name as primary title.
    const displayName = post.authorPersonName || post.authorRole || 'Usuario Emaús'; 
    const secondaryName = post.authorParishName || post.authorName || 'Parroquia';

    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden animate-fade-in mb-6 relative">
          
          {/* Post Menu (Dropdown) */}
          {isAuthor && (
              <div className="absolute top-4 right-4 z-10">
                  <button 
                    onClick={() => setShowPostMenu(!showPostMenu)}
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                  >
                      <MoreVertical className="w-5 h-5" />
                  </button>
                  
                  {showPostMenu && (
                      <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 py-1 overflow-hidden animate-fade-in z-20">
                          <button 
                            onClick={() => { setIsEditingPost(true); setShowPostMenu(false); }}
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"
                          >
                              <Edit2 className="w-3 h-3" /> Editar
                          </button>
                          <button 
                            onClick={handleDeletePost}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                          >
                              <Trash2 className="w-3 h-3" /> Eliminar
                          </button>
                      </div>
                  )}
              </div>
          )}

          {/* Header */}
          <div className="p-4 flex items-center gap-3">
              <div onClick={() => onAuthorClick(post.authorId)} className="cursor-pointer hover:opacity-80 transition-opacity">
                  {renderAvatar(post.authorAvatarIcon, post.authorAvatarColor, 'md')}
              </div>
              <div className="flex-1">
                  <h3 onClick={() => onAuthorClick(post.authorId)} className="font-bold text-slate-900 dark:text-white text-sm cursor-pointer hover:underline">
                      {displayName}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      <span className="font-medium text-slate-400 dark:text-slate-500">{secondaryName}</span>
                      <span className="text-slate-300">•</span>
                      <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                      {post.isEdited && <span className="italic text-slate-400 ml-1">(editado)</span>}
                  </div>
              </div>
          </div>

          {/* Content */}
          <div className="px-4 pb-3">
              {isEditingPost ? (
                  <div className="space-y-3">
                      <textarea 
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                          className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emaus-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm min-h-[100px]"
                      />
                      <div className="flex justify-end gap-2">
                          <button onClick={() => setIsEditingPost(false)} className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-lg">Cancelar</button>
                          <button onClick={handleSavePost} className="px-3 py-1.5 text-xs font-bold bg-emaus-600 text-white rounded-lg hover:bg-emaus-700">Guardar</button>
                      </div>
                  </div>
              ) : (
                  <p className="text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed text-sm">{post.content}</p>
              )}
          </div>

          {/* Image */}
          {post.imageUrl && (
              <div className="w-full bg-slate-100 dark:bg-slate-950 border-t border-b border-slate-100 dark:border-slate-800">
                  <img src={post.imageUrl} alt="Post content" className="w-full h-auto max-h-[500px] object-contain" />
              </div>
          )}

          {/* Actions */}
          <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-6">
              <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${post.likes.includes(currentUser?.email || '') ? 'text-red-500' : 'text-slate-500 hover:text-red-500'}`}
              >
                  <Heart className={`w-5 h-5 ${post.likes.includes(currentUser?.email || '') ? 'fill-current' : ''}`} />
                  {post.likes.length || ''}
              </button>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <MessageSquare className="w-5 h-5" />
                  {comments.length}
              </div>
          </div>

          {/* Comments Section */}
          <div className="bg-slate-50 dark:bg-slate-950/30 px-4 py-3 border-t border-slate-100 dark:border-slate-800">
              {comments.length > 0 && (
                  <div className="text-xs font-bold text-slate-400 uppercase mb-3">
                      {t('community.comments')} ({comments.length})
                  </div>
              )}

              <div className="space-y-3 mb-4">
                  {comments.map(comment => { 
                      const commentName = comment.authorPersonName || comment.authorRole || 'Usuario';
                      const commentParish = comment.authorParishName || '';
                      const isCommentAuthor = currentUser?.email === comment.authorId;

                      return (
                          <div key={comment.id} className="flex gap-3 items-start text-sm group">
                              <div className="mt-1">
                                  {renderAvatar(comment.authorAvatarIcon, comment.authorAvatarColor, 'sm')}
                              </div>
                              <div className="flex-1">
                                  {editingCommentId === comment.id ? (
                                      <div className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm border border-emaus-300">
                                          <input 
                                              autoFocus
                                              type="text"
                                              value={editedCommentContent}
                                              onChange={(e) => setEditedCommentContent(e.target.value)}
                                              className="w-full bg-transparent border-none focus:ring-0 text-sm mb-2 text-slate-800 dark:text-white"
                                          />
                                          <div className="flex justify-end gap-2">
                                              <button onClick={() => setEditingCommentId(null)} className="p-1 text-slate-400 hover:bg-slate-100 rounded"><X className="w-3 h-3"/></button>
                                              <button onClick={() => handleSaveComment(comment.id)} className="p-1 text-green-600 hover:bg-green-50 rounded"><Check className="w-3 h-3"/></button>
                                          </div>
                                      </div>
                                  ) : (
                                      <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-700 relative group">
                                          {/* Comment Actions (Hover) */}
                                          {isCommentAuthor && (
                                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-white dark:bg-slate-800 p-1 rounded-md shadow-sm border border-slate-100 dark:border-slate-700">
                                                  <button 
                                                    onClick={() => { setEditingCommentId(comment.id); setEditedCommentContent(comment.content); }}
                                                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-blue-500 rounded"
                                                    title="Editar"
                                                  >
                                                      <Edit2 className="w-3 h-3" />
                                                  </button>
                                                  <button 
                                                    onClick={() => handleDeleteComment(comment.id)}
                                                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-red-500 rounded"
                                                    title="Eliminar"
                                                  >
                                                      <Trash2 className="w-3 h-3" />
                                                  </button>
                                              </div>
                                          )}
                                          
                                          <div className="flex flex-wrap items-baseline gap-x-2 mb-1 pr-6">
                                              <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">{commentName}</span>
                                              {commentParish && (
                                                  <span className="text-[10px] text-slate-400">{commentParish}</span>
                                              )}
                                          </div>
                                          <p className="text-slate-600 dark:text-slate-300 leading-snug">
                                              {comment.content}
                                              {comment.isEdited && <span className="text-[10px] text-slate-400 italic ml-1">(editado)</span>}
                                          </p>
                                      </div>
                                  )}
                              </div>
                          </div>
                      );
                  })}
              </div>
              
              <form onSubmit={handleAddComment} className="flex gap-2 items-center">
                  <div className="shrink-0 hidden md:block">
                      {renderAvatar(settings.avatarIcon, settings.avatarColor, 'sm')}
                  </div>
                  <input 
                      type="text" 
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder={t('community.write_comment')}
                      className="flex-1 px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emaus-500 focus:border-transparent transition-all placeholder-slate-400 text-slate-800 dark:text-white"
                  />
                  <button type="submit" disabled={commenting || !newComment.trim()} className="p-2 text-emaus-600 hover:bg-emaus-100 dark:text-emaus-400 dark:hover:bg-emaus-900/30 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      {commenting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  </button>
              </form>
          </div>
      </div>
    );
};

// --- MAIN COMPONENT ---
const SocialFeed: React.FC = () => {
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  const { settings } = useSettings();
  
  const [view, setView] = useState<'feed' | 'profile'>('feed');
  const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>(null);
  
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [profilePosts, setProfilePosts] = useState<SocialPost[]>([]);
  
  const [directory, setDirectory] = useState<ParishDirectoryEntry[]>([]);

  const [newContent, setNewContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clear relevant notifications when entering views
  useEffect(() => {
    if (currentUser?.email) {
        if (view === 'feed') {
            // Mark both likes and comments as read when viewing the main feed
            markNotificationsReadByType(currentUser.email, NotificationType.SOCIAL_LIKE);
            markNotificationsReadByType(currentUser.email, NotificationType.SOCIAL_COMMENT);
        }
    }
  }, [view, currentUser]);

  useEffect(() => {
    if (view === 'feed') {
        const unsubscribe = subscribeToPosts(setPosts);
        return () => unsubscribe();
    }
  }, [view]);

  useEffect(() => {
    if (view === 'profile' && selectedAuthorId) {
        const unsubscribe = subscribeToAuthorPosts(selectedAuthorId, setProfilePosts);
        return () => unsubscribe();
    }
  }, [view, selectedAuthorId]);

  useEffect(() => {
      const loadDir = async () => {
          const data = await getParishDirectory();
          // Sort by planType to show advanced first, then slice
          const sorted = data.sort((a, b) => (a.planType === 'advanced' ? -1 : 1));
          setDirectory(sorted.slice(0, 5));
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
              authorName: settings.parishName || 'Usuario', // Legacy Fallback
              authorPersonName: settings.secretaryName || 'Usuario', // New Identity
              authorParishName: settings.parishName, // New Identity
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
          console.error(error);
      } finally {
          setIsPosting(false);
      }
  };

  const goToProfile = (authorId: string) => {
      setSelectedAuthorId(authorId);
      setView('profile');
      window.scrollTo(0, 0);
  };

  // --- PROFILE VIEW ---
  if (view === 'profile' && selectedAuthorId) {
      const parishEntry = directory.find(p => p.email === selectedAuthorId);
      // Fallback if not in top 5 directory
      const parishName = parishEntry ? parishEntry.parishName : (profilePosts[0]?.authorParishName || 'Parroquia'); 
      const parishCity = parishEntry ? parishEntry.city : 'Ubicación no definida';

      return (
          <div className="max-w-4xl mx-auto animate-fade-in pb-20">
              <button 
                onClick={() => setView('feed')}
                className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                  <ArrowLeft className="w-4 h-4" /> {t('community.back_to_feed')}
              </button>

              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mb-8 relative group">
                  {/* Cover Image Placeholder */}
                  <div className="h-48 bg-gradient-to-r from-emaus-800 to-emaus-600 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-white/20">
                          <ImageIcon className="w-16 h-16" />
                      </div>
                  </div>
                  
                  <div className="px-8 pb-8 relative">
                      <div className="absolute -top-12 left-8 p-1.5 bg-white dark:bg-slate-900 rounded-full shadow-sm">
                          <div className="w-24 h-24 bg-gold-500 rounded-full flex items-center justify-center text-white shadow-inner">
                              <Church className="w-12 h-12" />
                          </div>
                      </div>
                      <div className="pt-16 pl-0 md:pl-36">
                          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">{parishName}</h1>
                          <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2 text-sm">
                              <MapPin className="w-4 h-4" /> {parishCity}
                          </p>
                      </div>
                  </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                      <h3 className="font-bold text-lg mb-6 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-2">Publicaciones Recientes</h3>
                      {profilePosts.map(post => <PostCard key={post.id} post={post} onAuthorClick={() => {}} />)}
                      {profilePosts.length === 0 && (
                          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 border-dashed">
                              <p className="text-slate-400 italic">Esta parroquia aún no tiene publicaciones.</p>
                          </div>
                      )}
                  </div>
                  <div className="hidden lg:block">
                      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 sticky top-6 shadow-sm">
                          <h4 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                              <Book className="w-4 h-4 text-emaus-600" /> Información
                          </h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                              Bienvenido a la página oficial de nuestra comunidad en Emaús. Aquí compartimos nuestras noticias, eventos y reflexiones pastorales.
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      );
  }

  // --- FEED VIEW ---
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10 max-w-7xl mx-auto">
        <div className="lg:col-span-2 space-y-8">
            <div>
                <h2 className="text-3xl font-serif font-bold text-emaus-900 dark:text-white">{t('community.title')}</h2>
                <p className="text-slate-500 dark:text-slate-400">{t('community.subtitle')}</p>
            </div>

            {/* Create Post Widget */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                <div className="flex gap-4">
                    <div className="shrink-0 hidden md:block">
                        {renderAvatar(settings.avatarIcon, settings.avatarColor, 'md')}
                    </div>
                    <div className="flex-1">
                        <form onSubmit={handlePost}>
                            <textarea 
                                value={newContent}
                                onChange={(e) => setNewContent(e.target.value)}
                                placeholder={t('community.new_post_placeholder')}
                                className="w-full bg-transparent border-none focus:ring-0 resize-none text-slate-800 dark:text-white placeholder-slate-400 text-lg min-h-[80px]"
                            />
                            {selectedImage && (
                                <div className="mb-4 mt-2 relative inline-block group">
                                    <img src={URL.createObjectURL(selectedImage)} alt="Preview" className="h-32 w-auto rounded-xl object-cover border border-slate-200 shadow-sm" />
                                    <button 
                                        type="button"
                                        onClick={() => setSelectedImage(null)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                            <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800 mt-2">
                                <div>
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
                                        className="flex items-center gap-2 text-slate-500 hover:text-emaus-600 dark:hover:text-emaus-400 transition-colors text-sm font-medium px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                                    >
                                        <ImageIcon className="w-5 h-5" /> {t('community.upload_photo')}
                                    </button>
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={isPosting || (!newContent && !selectedImage)}
                                    className="px-6 py-2 bg-emaus-700 text-white rounded-full font-bold text-sm hover:bg-emaus-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    {isPosting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                    {isPosting ? t('community.posting') : t('community.publish')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
                {posts.length === 0 ? (
                    <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 border-dashed">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                            <Users className="w-8 h-8" />
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">{t('community.no_posts')}</p>
                    </div>
                ) : (
                    posts.map(post => <PostCard key={post.id} post={post} onAuthorClick={goToProfile} />)
                )}
            </div>
        </div>

        {/* Right Sidebar: Suggestions */}
        <div className="hidden lg:block space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sticky top-6">
                <h3 className="font-bold text-slate-800 dark:text-white mb-6 text-lg">{t('community.suggested_parishes')}</h3>
                <div className="space-y-6">
                    {directory.map(parish => (
                        <div key={parish.id} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 font-bold shrink-0 border border-slate-200 dark:border-slate-700">
                                    {parish.parishName.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-800 dark:text-white truncate" title={parish.parishName}>{parish.parishName}</p>
                                    <p className="text-xs text-slate-500 truncate">{parish.city}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => goToProfile(parish.email)}
                                className="text-xs font-bold text-emaus-600 dark:text-emaus-400 hover:underline whitespace-nowrap ml-2"
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

export default SocialFeed;
