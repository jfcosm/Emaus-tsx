// Version 1.11.0 - Support Attachments UI
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../contexts/SettingsContext';
import { SupportTicket, TicketMessage, TicketPriority, TicketStatus } from '../types';
import { 
  subscribeToUserTickets, 
  subscribeToAllTickets, 
  createTicket, 
  subscribeToTicketMessages,
  sendTicketMessage,
  updateTicketStatus,
  uploadTicketAttachment
} from '../services/supportService';
import { 
  LifeBuoy, 
  Plus, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Send, 
  X, 
  MessageSquare,
  AlertTriangle,
  ChevronRight,
  MoreHorizontal,
  Paperclip,
  Image as ImageIcon,
  FileText,
  Download,
  Loader2
} from 'lucide-react';

const PRIORITY_COLORS = {
  low: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  medium: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  high: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  critical: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
};

const STATUS_ICONS = {
  open: <AlertCircle className="w-4 h-4 text-emerald-500" />,
  in_progress: <Clock className="w-4 h-4 text-blue-500" />,
  resolved: <CheckCircle2 className="w-4 h-4 text-slate-400" />,
  closed: <CheckCircle2 className="w-4 h-4 text-slate-400" />
};

const Support: React.FC = () => {
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  const { settings } = useSettings();
  const isAdmin = currentUser?.email === 'admin@emaus.app';

  // State
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Create Form State
  const [newSubject, setNewSubject] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState<TicketPriority>('medium');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load Tickets
  useEffect(() => {
    if (!currentUser) return;
    
    const unsubscribe = isAdmin 
      ? subscribeToAllTickets(setTickets)
      : subscribeToUserTickets(currentUser.uid, setTickets);

    return () => unsubscribe();
  }, [currentUser, isAdmin]);

  // Load Messages for Selected Ticket
  useEffect(() => {
    if (!selectedTicket) return;
    const unsubscribe = subscribeToTicketMessages(selectedTicket.id, setMessages);
    return () => unsubscribe();
  }, [selectedTicket]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, selectedTicket]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate size (5MB)
      if (file.size > 5 * 1024 * 1024) {
          alert("El archivo excede el límite de 5MB.");
          if (fileInputRef.current) fileInputRef.current.value = '';
          return;
      }

      // Validate type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
          alert("Tipo de archivo no permitido. Solo JPG, PNG o PDF.");
          if (fileInputRef.current) fileInputRef.current.value = '';
          return;
      }

      setSelectedFile(file);
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let attachment = undefined;

      if (selectedFile) {
          const url = await uploadTicketAttachment(selectedFile);
          const type = selectedFile.type.startsWith('image/') ? 'image' : 'file';
          attachment = {
              url,
              name: selectedFile.name,
              type: type as 'image' | 'file'
          };
      }

      await createTicket(newSubject, newDesc, newPriority, settings.parishName, attachment);
      
      setShowCreateModal(false);
      setNewSubject('');
      setNewDesc('');
      setNewPriority('medium');
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
      alert("Error creando ticket");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !newMessage.trim()) return;
    
    try {
      await sendTicketMessage(selectedTicket.id, newMessage, isAdmin);
      setNewMessage('');
    } catch (error) {
      console.error("Failed to send", error);
    }
  };

  const handleChangeStatus = async (status: TicketStatus) => {
    if (!selectedTicket) return;
    await updateTicketStatus(selectedTicket.id, status);
    // Update local selected ticket to reflect change immediately in UI if needed
    setSelectedTicket(prev => prev ? { ...prev, status } : null);
  };

  // --- RENDERERS ---

  const renderStatusBadge = (status: TicketStatus) => {
    const labels = {
        open: t('support.status.open'),
        in_progress: t('support.status.in_progress'),
        resolved: t('support.status.resolved'),
        closed: t('support.status.closed')
    };
    const colors = {
        open: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
        in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
        resolved: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
        closed: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
    };
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1 w-fit ${colors[status]}`}>
            {STATUS_ICONS[status]}
            {labels[status]}
        </span>
    );
  };

  const renderAdminKanban = () => {
    const columns: { id: string, title: string, status: TicketStatus[] }[] = [
        { id: 'pending', title: t('support.columns.pending'), status: ['open'] },
        { id: 'active', title: t('support.columns.in_progress'), status: ['in_progress'] },
        { id: 'done', title: t('support.columns.resolved'), status: ['resolved', 'closed'] }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)] overflow-hidden">
            {columns.map(col => (
                <div key={col.id} className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 flex flex-col h-full border border-slate-200 dark:border-slate-800">
                    <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                        {col.title}
                        <span className="bg-slate-200 dark:bg-slate-800 text-xs px-2 py-0.5 rounded-full">
                            {tickets.filter(t => col.status.includes(t.status)).length}
                        </span>
                    </h3>
                    <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                        {tickets.filter(t => col.status.includes(t.status)).map(ticket => (
                            <div 
                                key={ticket.id}
                                onClick={() => setSelectedTicket(ticket)}
                                className={`bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 cursor-pointer hover:border-emaus-300 dark:hover:border-emaus-700 transition-all group ${selectedTicket?.id === ticket.id ? 'ring-2 ring-emaus-500' : ''}`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${PRIORITY_COLORS[ticket.priority]}`}>
                                        {t(`support.priority.${ticket.priority}`)}
                                    </span>
                                    <div className="flex gap-2">
                                        {ticket.attachmentUrl && <Paperclip className="w-3 h-3 text-slate-400" />}
                                        {ticket.unreadAdmin && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
                                    </div>
                                </div>
                                <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-1 leading-tight">{ticket.subject}</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">{ticket.description}</p>
                                <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-50 dark:border-slate-700/50">
                                    <span className="font-medium text-slate-600 dark:text-slate-300">{ticket.parishName}</span>
                                    <span>•</span>
                                    <span>{new Date(ticket.updatedAt?.toDate()).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))}
                        {tickets.filter(t => col.status.includes(t.status)).length === 0 && (
                            <div className="text-center py-8 text-slate-400 text-xs italic">
                                {t('support.empty')}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
  };

  const renderUserList = () => (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm h-[calc(100vh-12rem)] flex flex-col">
          <div className="overflow-y-auto flex-1">
              {tickets.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8">
                      <LifeBuoy className="w-12 h-12 mb-4 opacity-20" />
                      <p>No tienes tickets creados aún.</p>
                  </div>
              ) : (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                      {tickets.map(ticket => (
                          <div 
                            key={ticket.id}
                            onClick={() => setSelectedTicket(ticket)}
                            className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors flex items-center justify-between ${selectedTicket?.id === ticket.id ? 'bg-slate-50 dark:bg-slate-800' : ''}`}
                          >
                              <div className="flex items-center gap-4">
                                  <div className={`w-2 h-2 rounded-full ${ticket.unreadUser ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                                  <div>
                                      <h4 className={`text-sm ${ticket.unreadUser ? 'font-bold text-slate-900 dark:text-white' : 'font-medium text-slate-700 dark:text-slate-300'}`}>
                                          {ticket.subject}
                                      </h4>
                                      <div className="flex items-center gap-2 mt-1">
                                          {renderStatusBadge(ticket.status)}
                                          <span className="text-xs text-slate-400">{new Date(ticket.createdAt?.toDate()).toLocaleDateString()}</span>
                                          {ticket.attachmentUrl && <Paperclip className="w-3 h-3 text-slate-400" />}
                                      </div>
                                  </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-300" />
                          </div>
                      ))}
                  </div>
              )}
          </div>
      </div>
  );

  return (
    <div className="space-y-6 animate-fade-in h-[calc(100vh-6rem)] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
             <LifeBuoy className="w-6 h-6 text-emaus-600" /> {isAdmin ? t('support.admin_dashboard') : t('support.title')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{t('support.subtitle')}</p>
        </div>
        {!isAdmin && (
            <button 
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-emaus-700 text-white rounded-lg hover:bg-emaus-800 shadow-sm font-bold text-sm transition-colors"
            >
                <Plus className="w-4 h-4" /> {t('support.create_ticket')}
            </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-6 overflow-hidden">
          
          {/* List / Board View */}
          <div className={`${selectedTicket ? 'hidden lg:block lg:w-1/3 xl:w-1/4' : 'w-full'} transition-all`}>
              {isAdmin ? renderAdminKanban() : renderUserList()}
          </div>

          {/* Chat / Detail View */}
          {selectedTicket ? (
              <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-fade-in">
                  
                  {/* Ticket Header */}
                  <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30 flex justify-between items-start shrink-0">
                      <div>
                          <div className="flex items-center gap-3 mb-2">
                              <button onClick={() => setSelectedTicket(null)} className="lg:hidden p-1 -ml-2 text-slate-400"><X className="w-5 h-5"/></button>
                              <h3 className="text-xl font-bold text-slate-800 dark:text-white">{selectedTicket.subject}</h3>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${PRIORITY_COLORS[selectedTicket.priority]}`}>
                                  {t(`support.priority.${selectedTicket.priority}`)}
                              </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                              <span>{selectedTicket.userEmail}</span>
                              <span className="text-slate-300">•</span>
                              {renderStatusBadge(selectedTicket.status)}
                          </div>
                      </div>
                      
                      {isAdmin && (
                          <div className="flex items-center gap-2">
                              <select 
                                value={selectedTicket.status}
                                onChange={(e) => handleChangeStatus(e.target.value as TicketStatus)}
                                className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 focus:ring-emaus-500"
                              >
                                  <option value="open">Abierto</option>
                                  <option value="in_progress">En Progreso</option>
                                  <option value="resolved">Resuelto</option>
                                  <option value="closed">Cerrado</option>
                              </select>
                          </div>
                      )}
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-stone-50/50 dark:bg-black/20">
                      {/* Original Description as first message bubble */}
                      <div className={`flex ${false ? 'justify-end' : 'justify-start'}`}>
                          <div className="max-w-[85%] bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-700">
                              <p className="text-xs font-bold text-slate-400 mb-1">
                                  {selectedTicket.userEmail} • {new Date(selectedTicket.createdAt?.toDate()).toLocaleString()}
                              </p>
                              <p className="text-slate-800 dark:text-slate-200 whitespace-pre-wrap mb-3">{selectedTicket.description}</p>
                              
                              {/* ATTACHMENT DISPLAY */}
                              {selectedTicket.attachmentUrl && (
                                  <div className="mt-2 border-t border-slate-100 dark:border-slate-700 pt-3">
                                      <p className="text-xs font-bold text-slate-400 mb-2 uppercase flex items-center gap-1">
                                          <Paperclip className="w-3 h-3" /> Adjunto
                                      </p>
                                      {selectedTicket.attachmentType === 'image' ? (
                                          <a href={selectedTicket.attachmentUrl} target="_blank" rel="noopener noreferrer" className="block w-fit group">
                                              <img 
                                                src={selectedTicket.attachmentUrl} 
                                                alt="Adjunto" 
                                                className="max-h-48 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm transition-opacity group-hover:opacity-90"
                                              />
                                          </a>
                                      ) : (
                                          <a 
                                            href={selectedTicket.attachmentUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors w-fit"
                                          >
                                              <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded text-red-600 dark:text-red-400">
                                                  <FileText className="w-5 h-5" />
                                              </div>
                                              <div>
                                                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate max-w-[200px]">{selectedTicket.attachmentName || 'Documento'}</p>
                                                  <p className="text-[10px] text-slate-400 flex items-center gap-1">
                                                      <Download className="w-3 h-3" /> Clic para descargar
                                                  </p>
                                              </div>
                                          </a>
                                      )}
                                  </div>
                              )}
                          </div>
                      </div>

                      {messages.map(msg => {
                          const isMe = (isAdmin && msg.isAdmin) || (!isAdmin && !msg.isAdmin);
                          return (
                              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                  <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-sm ${isMe ? 'bg-emaus-600 text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700'}`}>
                                      <p className={`text-[10px] font-bold mb-1 ${isMe ? 'text-emaus-200' : 'text-slate-400'}`}>
                                          {msg.isAdmin ? 'Soporte Emaús' : selectedTicket.parishName} • {msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                                      </p>
                                      <p className="whitespace-pre-wrap">{msg.text}</p>
                                  </div>
                              </div>
                          );
                      })}
                      <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
                      <form onSubmit={handleSendMessage} className="flex gap-2">
                          <input 
                            type="text" 
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder={t('support.chat.placeholder')}
                            className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-emaus-500 dark:text-white"
                          />
                          <button 
                            type="submit" 
                            disabled={!newMessage.trim()}
                            className="p-3 bg-emaus-700 text-white rounded-xl hover:bg-emaus-800 disabled:opacity-50 transition-colors"
                          >
                              <Send className="w-5 h-5" />
                          </button>
                      </form>
                  </div>
              </div>
          ) : (
              // Empty State for Right Panel
              <div className="hidden lg:flex flex-1 items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 flex-col gap-4">
                  <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                  </div>
                  <p>Selecciona un ticket para ver el detalle</p>
              </div>
          )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-fade-in">
                  <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                      <h3 className="font-bold text-xl text-slate-800 dark:text-white">{t('support.create_ticket')}</h3>
                      <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                  </div>
                  <form onSubmit={handleCreateTicket} className="p-6 space-y-4">
                      <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('support.form.subject')}</label>
                          <input 
                            type="text" 
                            required
                            value={newSubject}
                            onChange={(e) => setNewSubject(e.target.value)}
                            placeholder={t('support.form.subject_ph')}
                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-emaus-500"
                          />
                      </div>
                      
                      <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('support.form.priority')}</label>
                          <div className="flex gap-2">
                              {(['low', 'medium', 'high', 'critical'] as TicketPriority[]).map(p => (
                                  <button
                                    key={p}
                                    type="button"
                                    onClick={() => setNewPriority(p)}
                                    className={`flex-1 py-2 rounded-lg text-sm font-bold border-2 transition-all ${newPriority === p ? 'border-emaus-500 bg-emaus-50 dark:bg-emaus-900/20 text-emaus-700' : 'border-transparent bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
                                  >
                                      {t(`support.priority.${p}`)}
                                  </button>
                              ))}
                          </div>
                      </div>

                      <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('support.form.desc')}</label>
                          <textarea 
                            required
                            value={newDesc}
                            onChange={(e) => setNewDesc(e.target.value)}
                            placeholder={t('support.form.desc_ph')}
                            className="w-full h-32 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-emaus-500 resize-none"
                          />
                      </div>

                      {/* File Upload */}
                      <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('support.form.attach')}</label>
                           <input 
                                type="file" 
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/png, image/jpeg, image/jpg, application/pdf"
                                onChange={handleFileSelect}
                           />
                           <div className="flex items-center gap-3">
                               <button 
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex items-center gap-2 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium"
                               >
                                   <Paperclip className="w-4 h-4" /> Seleccionar Archivo
                               </button>
                               {selectedFile && (
                                   <div className="flex items-center gap-2 text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-full">
                                       <span className="font-bold truncate max-w-[150px]">{selectedFile.name}</span>
                                       <button type="button" onClick={() => {setSelectedFile(null); if(fileInputRef.current) fileInputRef.current.value=''}}><X className="w-3 h-3" /></button>
                                   </div>
                               )}
                           </div>
                           <p className="text-[10px] text-slate-400 mt-1">{t('support.form.max_size')}</p>
                      </div>

                      <div className="pt-4 flex gap-3">
                          <button 
                            type="button" 
                            onClick={() => setShowCreateModal(false)}
                            className="flex-1 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800"
                          >
                              {t('support.form.cancel')}
                          </button>
                          <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="flex-1 py-2 bg-emaus-700 text-white rounded-lg font-bold hover:bg-emaus-800 shadow-lg shadow-emaus-900/20 disabled:opacity-70 flex justify-center items-center gap-2"
                          >
                              {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin"/> Enviando...</> : t('support.form.submit')}
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};

export default Support;