
// Version 1.12.1 - Fix User Icon Import
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
  Loader2,
  Search,
  Filter,
  User // Added missing import
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
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  // Helper function for full timestamp
  const formatDateTime = (timestamp: any) => {
      if (!timestamp) return '-';
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleString('es-ES', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric',
          hour: '2-digit', 
          minute: '2-digit' 
      });
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
        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1 w-fit border border-transparent ${colors[status]}`}>
            {STATUS_ICONS[status]}
            {labels[status]}
        </span>
    );
  };

  // Improved List View for BOTH Admin and User
  const renderTicketList = () => {
      const filteredTickets = tickets.filter(ticket => {
          const matchSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              (ticket.ticketCode || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (ticket.parishName || '').toLowerCase().includes(searchTerm.toLowerCase());
          
          if (filterStatus === 'all') return matchSearch;
          if (filterStatus === 'open') return matchSearch && (ticket.status === 'open' || ticket.status === 'in_progress');
          if (filterStatus === 'closed') return matchSearch && (ticket.status === 'resolved' || ticket.status === 'closed');
          return matchSearch;
      });

      return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm h-full flex flex-col">
            
            {/* Filter Bar */}
            <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex gap-2 overflow-x-auto no-scrollbar">
                <button 
                    onClick={() => setFilterStatus('all')} 
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${filterStatus === 'all' ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}
                >
                    Todos
                </button>
                <button 
                    onClick={() => setFilterStatus('open')} 
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${filterStatus === 'open' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}
                >
                    Abiertos / En Proceso
                </button>
                <button 
                    onClick={() => setFilterStatus('closed')} 
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${filterStatus === 'closed' ? 'bg-slate-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}
                >
                    Cerrados
                </button>
            </div>

            {/* Search Bar */}
            <div className="px-3 pb-3 border-b border-slate-100 dark:border-slate-800 relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Buscar ticket, código o parroquia..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm border-none focus:ring-1 focus:ring-emaus-500 dark:text-white"
                />
            </div>

            <div className="overflow-y-auto flex-1 custom-scrollbar">
                {filteredTickets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8">
                        <LifeBuoy className="w-12 h-12 mb-4 opacity-20" />
                        <p className="text-sm">No se encontraron tickets.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {filteredTickets.map(ticket => (
                            <div 
                                key={ticket.id}
                                onClick={() => setSelectedTicket(ticket)}
                                className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-all border-l-4 ${selectedTicket?.id === ticket.id ? 'bg-slate-50 dark:bg-slate-800 border-l-emaus-600' : 'border-l-transparent'}`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className="font-mono text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 rounded">
                                        {ticket.ticketCode || 'N/A'}
                                    </span>
                                    {ticket.updatedAt && (
                                        <span className="text-[10px] text-slate-400">{formatDateTime(ticket.updatedAt)}</span>
                                    )}
                                </div>
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h4 className={`text-sm mb-1 ${ticket.unreadUser || (isAdmin && ticket.unreadAdmin) ? 'font-bold text-slate-900 dark:text-white' : 'font-medium text-slate-700 dark:text-slate-300'}`}>
                                            {ticket.subject}
                                        </h4>
                                        <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                                            {isAdmin && <span className="font-bold text-emaus-600 dark:text-emaus-400 mr-1">{ticket.parishName}:</span>}
                                            {ticket.description}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        {(ticket.unreadAdmin && isAdmin) && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
                                        {(ticket.unreadUser && !isAdmin) && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    {renderStatusBadge(ticket.status)}
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${PRIORITY_COLORS[ticket.priority]}`}>
                                        {t(`support.priority.${ticket.priority}`)}
                                    </span>
                                    {ticket.attachmentUrl && <Paperclip className="w-3 h-3 text-slate-400 ml-auto" />}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
      );
  };

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
          
          {/* List View (Left Side) */}
          <div className={`${selectedTicket ? 'hidden lg:flex lg:w-1/3 xl:w-80' : 'w-full'} flex-col transition-all h-full`}>
              {renderTicketList()}
          </div>

          {/* Chat / Detail View (Right Side) */}
          {selectedTicket ? (
              <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-fade-in">
                  
                  {/* Ticket Header */}
                  <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30 shrink-0">
                      <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                              <button onClick={() => setSelectedTicket(null)} className="lg:hidden p-1 -ml-2 text-slate-400 hover:text-slate-600"><X className="w-5 h-5"/></button>
                              
                              <div className="flex flex-col">
                                  <div className="flex items-center gap-2">
                                      <span className="font-mono text-xs text-slate-500 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded font-bold">
                                          {selectedTicket.ticketCode || 'ID PENDIENTE'}
                                      </span>
                                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${PRIORITY_COLORS[selectedTicket.priority]}`}>
                                          {t(`support.priority.${selectedTicket.priority}`)}
                                      </span>
                                  </div>
                                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-1 line-clamp-1">
                                      {selectedTicket.subject}
                                  </h3>
                              </div>
                          </div>
                          
                          {/* Admin Controls */}
                          {isAdmin ? (
                              <select 
                                value={selectedTicket.status}
                                onChange={(e) => handleChangeStatus(e.target.value as TicketStatus)}
                                className="text-xs font-medium bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-emaus-500 cursor-pointer shadow-sm"
                              >
                                  <option value="open">Abierto</option>
                                  <option value="in_progress">En Progreso</option>
                                  <option value="resolved">Resuelto</option>
                                  <option value="closed">Cerrado</option>
                              </select>
                          ) : (
                              renderStatusBadge(selectedTicket.status)
                          )}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                          <div className="flex items-center gap-2">
                              <User className="w-3 h-3" />
                              <span className="font-medium">{selectedTicket.parishName || 'Usuario'}</span>
                              <span className="text-slate-300">•</span>
                              <span>{selectedTicket.userEmail}</span>
                          </div>
                          <div className="flex items-center gap-1" title="Fecha de Creación">
                              <Clock className="w-3 h-3" />
                              {formatDateTime(selectedTicket.createdAt)}
                          </div>
                      </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-stone-50/50 dark:bg-black/20 custom-scrollbar">
                      {/* Original Description as first message bubble */}
                      <div className={`flex justify-start`}>
                          <div className="max-w-[85%] bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-700 relative group">
                              <div className="flex justify-between items-baseline mb-2 border-b border-slate-50 dark:border-slate-700 pb-2">
                                  <span className="text-xs font-bold text-emaus-700 dark:text-emaus-400">Descripción Inicial</span>
                                  <span className="text-[10px] text-slate-400">{formatDateTime(selectedTicket.createdAt)}</span>
                              </div>
                              <p className="text-slate-800 dark:text-slate-200 whitespace-pre-wrap text-sm leading-relaxed">{selectedTicket.description}</p>
                              
                              {/* ATTACHMENT DISPLAY */}
                              {selectedTicket.attachmentUrl && (
                                  <div className="mt-3 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                                      <p className="text-[10px] font-bold text-slate-400 mb-2 uppercase flex items-center gap-1">
                                          <Paperclip className="w-3 h-3" /> Adjunto
                                      </p>
                                      {selectedTicket.attachmentType === 'image' ? (
                                          <a href={selectedTicket.attachmentUrl} target="_blank" rel="noopener noreferrer" className="block w-fit group">
                                              <img 
                                                src={selectedTicket.attachmentUrl} 
                                                alt="Adjunto" 
                                                className="max-h-40 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm transition-opacity group-hover:opacity-90"
                                              />
                                          </a>
                                      ) : (
                                          <a 
                                            href={selectedTicket.attachmentUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors w-fit"
                                          >
                                              <div className="bg-red-100 dark:bg-red-900/30 p-1.5 rounded text-red-600 dark:text-red-400">
                                                  <FileText className="w-4 h-4" />
                                              </div>
                                              <div>
                                                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate max-w-[200px]">{selectedTicket.attachmentName || 'Documento'}</p>
                                                  <p className="text-[10px] text-slate-400 flex items-center gap-1">
                                                      Clic para descargar
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
                                  <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-sm border ${isMe ? 'bg-emaus-600 text-white rounded-tr-none border-emaus-600' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border-slate-100 dark:border-slate-700'}`}>
                                      <div className={`flex justify-between items-center gap-4 mb-1 border-b ${isMe ? 'border-white/20' : 'border-slate-100 dark:border-slate-700'} pb-1`}>
                                          <span className={`text-[10px] font-bold uppercase tracking-wider ${isMe ? 'text-emaus-100' : 'text-emaus-600 dark:text-emaus-400'}`}>
                                              {msg.isAdmin ? 'Soporte Emaús' : (selectedTicket.parishName || 'Usuario')}
                                          </span>
                                          <span className={`text-[10px] ${isMe ? 'text-emaus-100' : 'text-slate-400'}`}>
                                              {formatDateTime(msg.timestamp)}
                                          </span>
                                      </div>
                                      <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                                  </div>
                              </div>
                          );
                      })}
                      <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
                      <form onSubmit={handleSendMessage} className="flex gap-3">
                          <input 
                            type="text" 
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder={t('support.chat.placeholder')}
                            className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emaus-500 focus:outline-none dark:text-white transition-all"
                          />
                          <button 
                            type="submit" 
                            disabled={!newMessage.trim()}
                            className="p-3 bg-emaus-700 text-white rounded-xl hover:bg-emaus-800 disabled:opacity-50 transition-colors shadow-sm"
                          >
                              <Send className="w-5 h-5" />
                          </button>
                      </form>
                  </div>
              </div>
          ) : (
              // Empty State for Right Panel
              <div className="hidden lg:flex flex-1 items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 flex-col gap-4 p-8 text-center">
                  <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm mb-2">
                      <MessageSquare className="w-10 h-10 text-emaus-200 dark:text-slate-600" />
                  </div>
                  <div>
                      <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-1">Detalle del Ticket</h3>
                      <p className="text-sm">Selecciona un ticket de la lista para ver el historial completo y responder.</p>
                  </div>
              </div>
          )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
                  <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0">
                      <h3 className="font-bold text-xl text-slate-800 dark:text-white flex items-center gap-2">
                          <LifeBuoy className="w-5 h-5 text-emaus-600" />
                          {t('support.create_ticket')}
                      </h3>
                      <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                  </div>
                  
                  <div className="overflow-y-auto p-6">
                      <form onSubmit={handleCreateTicket} className="space-y-5">
                          <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{t('support.form.subject')}</label>
                              <input 
                                type="text" 
                                required
                                value={newSubject}
                                onChange={(e) => setNewSubject(e.target.value)}
                                placeholder={t('support.form.subject_ph')}
                                className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-emaus-500 outline-none transition-all"
                              />
                          </div>
                          
                          <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{t('support.form.priority')}</label>
                              <div className="grid grid-cols-4 gap-2">
                                  {(['low', 'medium', 'high', 'critical'] as TicketPriority[]).map(p => (
                                      <button
                                        key={p}
                                        type="button"
                                        onClick={() => setNewPriority(p)}
                                        className={`py-2 rounded-lg text-xs font-bold border-2 transition-all uppercase ${newPriority === p ? 'border-emaus-500 bg-emaus-50 dark:bg-emaus-900/20 text-emaus-700' : 'border-transparent bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                                      >
                                          {t(`support.priority.${p}`)}
                                      </button>
                                  ))}
                              </div>
                          </div>

                          <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{t('support.form.desc')}</label>
                              <textarea 
                                required
                                value={newDesc}
                                onChange={(e) => setNewDesc(e.target.value)}
                                placeholder={t('support.form.desc_ph')}
                                className="w-full h-32 px-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-emaus-500 resize-none outline-none transition-all"
                              />
                          </div>

                          {/* File Upload */}
                          <div>
                               <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{t('support.form.attach')}</label>
                               <input 
                                    type="file" 
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/png, image/jpeg, image/jpg, application/pdf"
                                    onChange={handleFileSelect}
                               />
                               <div className="flex flex-wrap items-center gap-3">
                                   <button 
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium bg-white dark:bg-slate-800"
                                   >
                                       <Paperclip className="w-4 h-4" /> Seleccionar Archivo
                                   </button>
                                   {selectedFile && (
                                       <div className="flex items-center gap-2 text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-900/50 animate-fade-in">
                                           <span className="font-bold truncate max-w-[150px]">{selectedFile.name}</span>
                                           <button type="button" onClick={() => {setSelectedFile(null); if(fileInputRef.current) fileInputRef.current.value=''}} className="hover:bg-emerald-100 rounded-full p-0.5"><X className="w-3 h-3" /></button>
                                       </div>
                                   )}
                               </div>
                               <p className="text-[10px] text-slate-400 mt-1.5 ml-1">{t('support.form.max_size')}</p>
                          </div>
                      </form>
                  </div>

                  <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30 flex gap-3 shrink-0">
                      <button 
                        type="button" 
                        onClick={() => setShowCreateModal(false)}
                        className="flex-1 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                          {t('support.form.cancel')}
                      </button>
                      <button 
                        onClick={handleCreateTicket}
                        disabled={isSubmitting}
                        className="flex-1 py-2.5 bg-emaus-700 text-white rounded-xl font-bold hover:bg-emaus-800 shadow-lg shadow-emaus-900/20 disabled:opacity-70 flex justify-center items-center gap-2 transition-all"
                      >
                          {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin"/> Enviando...</> : t('support.form.submit')}
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default Support;