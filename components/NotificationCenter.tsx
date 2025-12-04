import React, { useState, useEffect, useRef } from 'react';
import { Bell, Check, Info, MessageCircle, Heart, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { subscribeToNotifications, markAsRead } from '../services/notificationService';
import { AppNotification, NotificationType } from '../types';

const NotificationCenter: React.FC = () => {
    const { currentUser } = useAuth();
    const { t } = useLanguage();
    const [notifications, setNotifications] = useState<AppNotification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!currentUser?.email) return;
        const unsub = subscribeToNotifications(currentUser.email, setNotifications);
        return () => unsub();
    }, [currentUser]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleMarkRead = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        await markAsRead(id);
    };

    const getIcon = (type: NotificationType) => {
        switch (type) {
            case NotificationType.MESSAGE: return <MessageCircle className="w-4 h-4 text-blue-500" />;
            case NotificationType.SOCIAL_LIKE: return <Heart className="w-4 h-4 text-red-500" />;
            case NotificationType.SOCIAL_COMMENT: return <MessageCircle className="w-4 h-4 text-green-500" />;
            case NotificationType.AGENDA: return <Calendar className="w-4 h-4 text-purple-500" />;
            default: return <Info className="w-4 h-4 text-slate-500" />;
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-slate-400 hover:text-emaus-700 dark:hover:text-emaus-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-1 ring-white dark:ring-slate-900">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 animate-fade-in origin-top-right">
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800 dark:text-white text-sm">Notificaciones</h3>
                        {unreadCount > 0 && (
                            <span className="text-xs text-emaus-600 font-medium">{unreadCount} nuevas</span>
                        )}
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-slate-400 text-xs">
                                <Bell className="w-8 h-8 mx-auto mb-2 opacity-20" />
                                No tienes notificaciones.
                            </div>
                        ) : (
                            notifications.map(note => (
                                <div 
                                    key={note.id} 
                                    className={`p-4 border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex gap-3 ${!note.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                                >
                                    <div className="mt-1 bg-white dark:bg-slate-800 p-1.5 rounded-full shadow-sm border border-slate-100 dark:border-slate-700 h-fit">
                                        {getIcon(note.type)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className={`text-sm ${!note.read ? 'font-bold text-slate-800 dark:text-white' : 'font-medium text-slate-600 dark:text-slate-300'}`}>
                                                {note.title}
                                            </h4>
                                            {!note.read && (
                                                <button 
                                                    onClick={(e) => handleMarkRead(note.id, e)}
                                                    className="text-blue-500 hover:text-blue-700" 
                                                    title="Marcar como leída"
                                                >
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug mb-1">
                                            {note.message}
                                        </p>
                                        <span className="text-[10px] text-slate-400">
                                            {note.timestamp?.toDate ? note.timestamp.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Justo ahora'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationCenter;