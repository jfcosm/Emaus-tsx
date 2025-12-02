
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../contexts/SettingsContext';
import { ChatThread, ChatMessage, ParishDirectoryEntry } from '../types';
import { 
  subscribeToChats, 
  subscribeToMessages, 
  sendMessage, 
  createOrGetChat,
  initSupportChat 
} from '../services/chatService';
import { getParishDirectory } from '../services/settingsService';
import { 
  Search, 
  Send, 
  Plus, 
  MoreVertical, 
  Paperclip, 
  Smile, 
  CheckCheck, 
  User,
  X,
  MapPin,
  CheckCircle,
  Lock,
  ArrowRight
} from 'lucide-react';

const Messages: React.FC = () => {
  const { t } = useLanguage();
  const { currentUser, logout } = useAuth();
  const { settings } = useSettings();
  
  // State
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Directory & New Chat State
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [directory, setDirectory] = useState<ParishDirectoryEntry[]>([]);
  const [directorySearch, setDirectorySearch] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- UPSELL LOCK FOR BASIC PLANS ---
  if (settings.planType === 'basic') {
    return (
      <div className="h-[calc(100vh-6rem)] bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden relative animate-fade-in">
        {/* Blurred Content Background (Simulating the App) */}
        <div className="absolute inset-0 filter blur-md opacity-30 pointer-events-none flex">
            {/* Fake Sidebar */}
            <div className="w-80 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 hidden md:block">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 h-16 flex items-center justify-between">
                    <div className="h-6 w-24 bg-slate-300 dark:bg-slate-700 rounded"></div>
                    <div className="h-8 w-8 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                </div>
                <div className="p-4 space-y-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex gap-3">
                            <div className="w-12 h-12 bg-slate-300 dark:bg-slate-700 rounded-full shrink-0"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-3/4 bg-slate-300 dark:bg-slate-700 rounded"></div>
                                <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Fake Chat Window */}
            <div className="flex-1 bg-white dark:bg-slate-900 flex flex-col">
                <div className="h-16 border-b border-slate-200 dark:border-slate-800"></div>
                <div className="flex-1 p-6 space-y-6">
                    <div className="flex justify-start"><div className="h-12 w-64 bg-slate-100 dark:bg-slate-800 rounded-2xl"></div></div>
                    <div className="flex justify-end"><div className="h-16 w-56 bg-slate-200 dark:bg-slate-700 rounded-2xl"></div></div>
                    <div className="flex justify-start"><div className="h-10 w-48 bg-slate-100 dark:bg-slate-800 rounded-2xl"></div></div>
                </div>
            </div>
        </div>

        {/* Upsell Card */}
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 max-w-md w-full p-8 rounded-3xl shadow-2xl border border-gold-200 dark:border-gold-800 text-center relative overflow-hidden transform hover:scale-105 transition-transform duration-500">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold-300 to-gold-500"></div>
                
                <div className="w-20 h-20 bg-gold-50 dark:bg-gold-900/20 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-gold-50/50 dark:ring-gold-900/10">
                    <Lock className="w-10 h-10 text-gold-600 dark:text-gold-400" />
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{t('messages.upsell.title')}</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed text-sm">{t('messages.upsell.desc')}</p>
                
                <ul className="text-left space-y-4 mb-8 max-w-xs mx-auto bg-slate-50 dark:bg-slate-950/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                    <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                        <div className="bg-emaus-100 dark:bg-emaus-900/30 p-1 rounded-full"><CheckCircle className="w-4 h-4 text-emaus-600 dark:text-emaus-400" /></div>
                        {t('messages.upsell.benefit1')}
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                        <div className="bg-emaus-100 dark:bg-emaus-900/30 p-1 rounded-full"><CheckCircle className="w-4 h-4 text-emaus-600 dark:text-emaus-400" /></div>
                        {t('messages.upsell.benefit2')}
                    </li>
                </ul>

                <button 
                    onClick={async () => {
                        await logout();
                        window.location.hash = 'plans';
                    }} 
                    className="w-full py-3.5 bg-emaus-700 text-white rounded-xl font-bold hover:bg-emaus-800 transition-all shadow-lg shadow-emaus-900/20 flex items-center justify-center gap-2 group"
                >
                    {t('messages.upsell.cta')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
      </div>
    );
  }

  // Initial Data Load (Threads)
  useEffect(() => {
    if (!currentUser?.email || settings.planType === 'basic') return;

    // Initialize support chat just so user has someone to talk to
    initSupportChat(currentUser.email);

    const unsubscribe = subscribeToChats(currentUser.email, (updatedThreads) => {
      setThreads(updatedThreads);
    });

    return () => unsubscribe();
  }, [currentUser, settings.planType]);

  // Load Directory when modal opens
  useEffect(() => {
    if (showNewChatModal) {
      const loadDir = async () => {
         const data = await getParishDirectory();
         // Filter out myself
         const filtered = data.filter(p => p.email !== currentUser?.email);
         setDirectory(filtered);
      };
      loadDir();
    }
  }, [showNewChatModal, currentUser?.email]);

  // Load Messages when Active Thread Changes
  useEffect(() => {
    if (!activeThreadId) return;

    const unsubscribe = subscribeToMessages(activeThreadId, (updatedMessages) => {
      setMessages(updatedMessages);
      scrollToBottom();
    });

    return () => unsubscribe();
  }, [activeThreadId]);

  const scrollToBottom = () => {
    setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeThreadId || !currentUser?.email || !newMessage.trim()) return;

    try {
      await sendMessage(activeThreadId, currentUser.email, newMessage);
      setNewMessage('');
    } catch (error) {
      console.error("Failed to send", error);
    }
  };

  const handleStartChatFromDirectory = async (email: string) => {
    if (!currentUser?.email) return;
    try {
      const chatId = await createOrGetChat(currentUser.email, email);
      setActiveThreadId(chatId);
      setShowNewChatModal(false);
    } catch (error) {
      alert("Error al iniciar chat.");
    }
  };

  // Helper to get contact name from thread
  const getContactName = (thread: ChatThread) => {
    // In a real app, we would map email to User Profile
    const otherEmail = thread.participants.find(p => p !== currentUser?.email);
    if (otherEmail === 'soporte@emaus.app') return t('messages.support');
    
    // Try to find name in directory if available locally, else fallback
    // Note: Ideally we would sync contact profiles in the thread metadata
    const dirMatch = directory.find(d => d.email === otherEmail);
    if (dirMatch) return dirMatch.parishName;

    return otherEmail?.split('@')[0] || 'Usuario';
  };

  // Helper to format time
  const formatTime = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const activeThread = threads.find(t => t.id === activeThreadId);

  // Filter Directory
  const filteredDirectory = directory.filter(p => 
     p.parishName.toLowerCase().includes(directorySearch.toLowerCase()) || 
     p.city.toLowerCase().includes(directorySearch.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-6rem)] bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex animate-fade-in">
      
      {/* LEFT SIDEBAR: THREADS */}
      <div className={`${activeThreadId ? 'hidden md:flex' : 'flex'} w-full md:w-80 flex-col border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50`}>
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
           <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">{t('messages.title')}</h2>
              <button 
                onClick={() => setShowNewChatModal(true)}
                className="p-2 bg-emaus-700 text-white rounded-full hover:bg-emaus-800 transition-colors shadow-sm"
              >
                <Plus className="w-5 h-5" />
              </button>
           </div>
           {/* Search */}
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder={t('messages.search_placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emaus-500 dark:text-white"
              />
           </div>
        </div>

        {/* Threads List - FIX: Added flex-col and w-full explicitly */}
        <div className="flex-1 overflow-y-auto flex flex-col w-full">
           {threads.length === 0 ? (
             <div className="p-8 text-center text-slate-400 text-sm">
                {t('messages.empty_state')}
             </div>
           ) : (
             threads
              .filter(t => getContactName(t).toLowerCase().includes(searchTerm.toLowerCase()))
              .map(thread => (
               <div 
                 key={thread.id}
                 onClick={() => setActiveThreadId(thread.id)}
                 className={`p-4 flex gap-3 cursor-pointer transition-colors border-b border-slate-100 dark:border-slate-800/50 w-full shrink-0
                    ${activeThreadId === thread.id 
                      ? 'bg-white dark:bg-slate-800 border-l-4 border-l-emaus-600' 
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 border-l-4 border-l-transparent'}
                 `}
               >
                  <div className="relative shrink-0">
                     <div className="w-12 h-12 bg-gradient-to-br from-emaus-400 to-emaus-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {getContactName(thread).charAt(0).toUpperCase()}
                     </div>
                     {/* Online Indicator (Fake) */}
                     <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-50 dark:border-slate-900 rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                     <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-slate-800 dark:text-slate-200 truncate pr-2">{getContactName(thread)}</h3>
                        <span className="text-xs text-slate-400 shrink-0">{formatTime(thread.lastMessageTime)}</span>
                     </div>
                     <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                       {thread.lastMessage}
                     </p>
                  </div>
               </div>
             ))
           )}
        </div>
      </div>

      {/* RIGHT AREA: CHAT WINDOW */}
      <div 
        className={`${!activeThreadId ? 'hidden md:flex' : 'flex'} flex-1 flex-col`}
        style={{
          // Minimalist Ecclesial Cross Pattern (SVG Data URI)
          // 7% Opacity Burgundy Crosses on transparent background
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239f1843' fill-opacity='0.07'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat'
        }}
      >
         {activeThreadId ? (
           <>
              {/* Chat Header */}
              <div className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 flex-shrink-0 z-10 shadow-sm">
                 <div className="flex items-center gap-3">
                    <button onClick={() => setActiveThreadId(null)} className="md:hidden text-slate-500 mr-2">
                       <X className="w-6 h-6" />
                    </button>
                    <div className="w-10 h-10 bg-gradient-to-br from-emaus-400 to-emaus-600 rounded-full flex items-center justify-center text-white font-bold">
                       {activeThread ? getContactName(activeThread).charAt(0).toUpperCase() : '?'}
                    </div>
                    <div>
                       <h3 className="font-bold text-slate-800 dark:text-white">{activeThread && getContactName(activeThread)}</h3>
                       <p className="text-xs text-green-600 dark:text-green-400 font-medium">En línea</p>
                    </div>
                 </div>
                 <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    <MoreVertical className="w-5 h-5" />
                 </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-stone-50/80 dark:bg-slate-950/80 backdrop-blur-sm">
                 {messages.map((msg, idx) => {
                   const isMe = msg.senderId === currentUser?.email;
                   return (
                     <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div 
                          className={`
                            max-w-[75%] px-4 py-3 rounded-2xl shadow-sm text-sm relative
                            ${isMe 
                              ? 'bg-emaus-700 text-white rounded-br-none' 
                              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none'}
                          `}
                        >
                           <p className="leading-relaxed">{msg.text}</p>
                           <div className={`text-[10px] mt-1 flex items-center justify-end gap-1 ${isMe ? 'text-emaus-200' : 'text-slate-400'}`}>
                              {formatTime(msg.timestamp)}
                              {isMe && <CheckCheck className="w-3 h-3" />}
                           </div>
                        </div>
                     </div>
                   );
                 })}
                 <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                 <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                    <button type="button" className="p-3 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                       <Paperclip className="w-5 h-5" />
                    </button>
                    <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center px-4 py-2 border border-transparent focus-within:border-emaus-300 dark:focus-within:border-emaus-700 transition-colors">
                       <input 
                         type="text"
                         value={newMessage}
                         onChange={(e) => setNewMessage(e.target.value)}
                         placeholder={t('messages.type_message')}
                         className="flex-1 bg-transparent border-none focus:ring-0 text-slate-800 dark:text-white placeholder-slate-400"
                       />
                       <button type="button" className="ml-2 text-slate-400 hover:text-slate-600">
                          <Smile className="w-5 h-5" />
                       </button>
                    </div>
                    <button 
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="p-3 bg-emaus-700 text-white rounded-full hover:bg-emaus-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all hover:scale-105"
                    >
                       <Send className="w-5 h-5" />
                    </button>
                 </form>
              </div>
           </>
         ) : (
           <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 backdrop-blur-sm bg-stone-50/80 dark:bg-slate-950/80">
              <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                 <User className="w-12 h-12 text-slate-300 dark:text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">{t('messages.no_chat_selected')}</h3>
              <p className="max-w-xs text-center">{t('messages.subtitle')}</p>
              <button 
                 onClick={() => setShowNewChatModal(true)}
                 className="mt-6 px-6 py-2 bg-emaus-700 text-white rounded-full font-bold hover:bg-emaus-800 transition-colors"
              >
                 {t('messages.start_chat')}
              </button>
           </div>
         )}
      </div>

      {/* NEW CHAT MODAL (DIRECTORY) */}
      {showNewChatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
           <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in flex flex-col h-[600px]">
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0">
                 <div>
                    <h3 className="font-bold text-xl text-slate-800 dark:text-white">{t('messages.directory.title')}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{t('messages.directory.subtitle')}</p>
                 </div>
                 <button onClick={() => setShowNewChatModal(false)} className="text-slate-400 hover:text-slate-600 bg-slate-100 dark:bg-slate-800 p-2 rounded-full"><X className="w-5 h-5" /></button>
              </div>

              {/* Search */}
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30 shrink-0">
                 <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text"
                      placeholder={t('messages.directory.search')}
                      value={directorySearch}
                      onChange={(e) => setDirectorySearch(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emaus-500 dark:text-white shadow-sm"
                      autoFocus
                    />
                 </div>
              </div>

              {/* Directory List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                 {filteredDirectory.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                       <p>No se encontraron parroquias.</p>
                    </div>
                 ) : (
                    filteredDirectory.map((parish) => {
                       const isBasic = parish.planType === 'basic';
                       return (
                       <div key={parish.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-gradient-to-br from-emaus-500 to-emaus-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {parish.parishName.charAt(0)}
                             </div>
                             <div>
                                <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                   {parish.parishName}
                                   {parish.planType === 'advanced' && (
                                      <span className="bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1 border border-gold-200 dark:border-gold-800">
                                         <CheckCircle className="w-3 h-3" /> Plan Avanzado
                                      </span>
                                   )}
                                </h4>
                                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-1">
                                   <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {parish.city}</span>
                                   <span>•</span>
                                   <span>{parish.diocese}</span>
                                </div>
                             </div>
                          </div>
                          
                          <button 
                             disabled={isBasic}
                             onClick={() => !isBasic && handleStartChatFromDirectory(parish.email)}
                             className={`px-4 py-2 border rounded-lg font-bold text-sm transition-all shadow-sm flex items-center gap-2
                                ${isBasic 
                                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 cursor-not-allowed' 
                                    : 'bg-white dark:bg-slate-900 text-emaus-700 dark:text-emaus-400 border-slate-200 dark:border-slate-700 hover:bg-emaus-50 dark:hover:bg-emaus-900/20 group-hover:border-emaus-200'
                                }
                             `}
                          >
                             {isBasic ? (
                                 <>
                                    <Lock className="w-3 h-3" />
                                    {t('messages.directory.unavailable_basic')}
                                 </>
                             ) : (
                                 t('messages.directory.start_conversation')
                             )}
                          </button>
                       </div>
                    );})
                 )}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
