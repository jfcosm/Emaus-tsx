
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../contexts/SettingsContext';
import { getSacraments } from '../services/sacramentsService';
import { getEvents } from '../services/agendaService';
import { subscribeToPosts } from '../services/socialService';
import { SacramentRecord, CalendarEvent, SocialPost, SacramentType } from '../types';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  ArrowRight, 
  MapPin, 
  Clock, 
  Heart, 
  MessageSquare, 
  Sparkles,
  Baby,
  Cross,
  ExternalLink,
  Sun
} from 'lucide-react';
import AppTour from './AppTour';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const { settings } = useSettings();
  
  // Data State
  const [sacramentCounts, setSacramentCounts] = useState({ baptisms: 0, marriages: 0, confirmations: 0 });
  const [latestPost, setLatestPost] = useState<SocialPost | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Tour State
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    loadData();
    const unsub = subscribeToPosts((posts) => {
        if (posts.length > 0) {
            setLatestPost(posts[0]);
        }
    });
    return () => unsub();
  }, []);

  const loadData = async () => {
    setLoading(true);
    
    // 1. Fetch Sacraments for Stats
    const sacraments = await getSacraments();
    const counts = {
        baptisms: sacraments.filter(s => s.type === SacramentType.BAUTIZO).length,
        marriages: sacraments.filter(s => s.type === SacramentType.MATRIMONIO).length,
        confirmations: sacraments.filter(s => s.type === SacramentType.CONFIRMACION).length
    };
    setSacramentCounts(counts);

    // 2. Fetch Agenda for Upcoming
    const events = await getEvents();
    // Sort by date and take next 3
    const sorted = events
        .filter(e => new Date(e.date) >= new Date(new Date().setHours(0,0,0,0)))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 3);
    setUpcomingEvents(sorted);

    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* 1. WELCOME HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
         <div>
            <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-2">
               {t('dashboard.welcome')} <span className="text-emaus-700 dark:text-gold-400">{settings.secretaryName || 'Secretaria'}</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">{t('dashboard.welcome_subtitle')}</p>
         </div>
         <div className="hidden md:block text-right">
            <p className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-1">Parroquia</p>
            <p className="font-bold text-slate-800 dark:text-white">{settings.parishName}</p>
         </div>
      </div>

      {/* 2. TOUR CARD & STATS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Tour Card (Hero) */}
         <div className="lg:col-span-2 bg-gradient-to-r from-emaus-800 to-emaus-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl group cursor-pointer transition-transform hover:scale-[1.01]" onClick={() => setShowTour(true)}>
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
               <Sparkles className="w-32 h-32 text-white" />
            </div>
            <div className="relative z-10 max-w-lg">
               <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  <Sparkles className="w-3 h-3" /> Tour 2024
               </div>
               <h2 className="text-2xl font-bold mb-3">{t('dashboard.tour_card.title')}</h2>
               <p className="text-emaus-100 mb-6 leading-relaxed">
                  {t('dashboard.tour_card.subtitle')}
               </p>
               <button 
                 onClick={(e) => { e.stopPropagation(); setShowTour(true); }}
                 className="bg-white text-emaus-900 px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-gold-50 transition-colors flex items-center gap-2"
               >
                  {t('dashboard.tour_card.btn')} <ArrowRight className="w-4 h-4" />
               </button>
            </div>
         </div>

         {/* Right Column: Stats & Promo */}
         <div className="space-y-4 flex flex-col">
            {/* Quick Stats (Simple Cards) */}
            <div className="grid grid-cols-2 gap-4 flex-1">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-center items-center text-center">
                   <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 rounded-full flex items-center justify-center mb-2">
                      <Baby className="w-5 h-5" />
                   </div>
                   <span className="text-3xl font-bold text-slate-800 dark:text-white">{sacramentCounts.baptisms}</span>
                   <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">{t('dashboard.stats.baptisms')}</span>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-center items-center text-center">
                   <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-full flex items-center justify-center mb-2">
                      <Heart className="w-5 h-5" />
                   </div>
                   <span className="text-3xl font-bold text-slate-800 dark:text-white">{sacramentCounts.marriages}</span>
                   <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">{t('dashboard.stats.marriages')}</span>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-center items-center text-center col-span-2">
                   <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-xs font-bold uppercase text-slate-400">Total Archivo</span>
                   </div>
                   <span className="text-4xl font-bold text-slate-800 dark:text-white">
                      {sacramentCounts.baptisms + sacramentCounts.marriages + sacramentCounts.confirmations}
                   </span>
                   <span className="text-sm text-slate-500">Registros Digitalizados</span>
                </div>
            </div>

            {/* La Palabra Diaria Card */}
            <a 
              href="https://www.lapalabradiaria.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-indigo-900 to-indigo-700 p-6 rounded-2xl shadow-lg relative overflow-hidden group border border-indigo-500/30 block transition-transform hover:-translate-y-1"
            >
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <BookOpen className="w-24 h-24 text-white" />
               </div>
               <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                     <Sun className="w-5 h-5 text-yellow-400" />
                     <span className="text-xs font-bold uppercase text-indigo-200 tracking-wider">Lecturas de Hoy</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 font-serif">La Palabra Diaria</h3>
                  <p className="text-indigo-200 text-sm mb-4 leading-snug">Accede al Evangelio y Santoral del día.</p>
                  
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-white bg-white/20 px-3 py-1.5 rounded-lg group-hover:bg-white/30 transition-colors">
                     Leer Evangelio <ExternalLink className="w-3 h-3" />
                  </div>
               </div>
            </a>
         </div>
      </div>

      {/* 3. SOCIAL & AGENDA SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         
         {/* LATEST COMMUNITY POST */}
         <div className="space-y-4">
            <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
               <Users className="w-5 h-5 text-emaus-600" /> {t('dashboard.community_highlight')}
            </h3>
            
            {latestPost ? (
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-emaus-300 transition-colors group">
                   {latestPost.imageUrl && (
                      <div className="h-40 bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                         <img src={latestPost.imageUrl} alt="Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                         <div className="absolute bottom-3 left-4 text-white text-xs font-bold drop-shadow-md">
                            {new Date(latestPost.timestamp).toLocaleDateString()}
                         </div>
                      </div>
                   )}
                   <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                         {/* Simple Avatar */}
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${latestPost.authorAvatarColor || 'bg-emaus-600'}`}>
                            {latestPost.authorName.charAt(0)}
                         </div>
                         <div className="flex-1">
                            <p className="text-sm font-bold text-slate-800 dark:text-white">{latestPost.authorPersonName || latestPost.authorName}</p>
                            <p className="text-xs text-slate-500">{latestPost.authorParishName || 'Parroquia'}</p>
                         </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-3 mb-4">
                         {latestPost.content}
                      </p>
                      <div className="flex items-center gap-4 text-xs font-medium text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
                         <div className="flex items-center gap-1"><Heart className="w-4 h-4" /> {latestPost.likes.length}</div>
                         <div className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /> Comentar</div>
                      </div>
                   </div>
                </div>
            ) : (
                <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-8 text-center text-slate-400">
                   <p>{t('dashboard.no_posts')}</p>
                </div>
            )}
         </div>

         {/* UPCOMING AGENDA */}
         <div className="space-y-4">
            <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
               <Calendar className="w-5 h-5 text-purple-600" /> {t('dashboard.upcoming_events')}
            </h3>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
               {upcomingEvents.length > 0 ? (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                     {upcomingEvents.map(event => (
                        <div key={event.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-4">
                           <div className="flex-shrink-0 w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                              <span className="text-xs font-bold uppercase">{new Date(event.date).toLocaleString('es-ES', { month: 'short' })}</span>
                              <span className="text-xl font-bold">{new Date(event.date).getDate()}</span>
                           </div>
                           <div className="flex-1">
                              <h4 className="font-bold text-slate-800 dark:text-white text-sm">{event.title}</h4>
                              <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                                 <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {event.time}</span>
                                 <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</span>
                              </div>
                           </div>
                           <div className={`w-2 h-2 rounded-full ${event.type === 'Misa' ? 'bg-purple-500' : 'bg-gold-500'}`}></div>
                        </div>
                     ))}
                  </div>
               ) : (
                  <div className="p-8 text-center text-slate-400 text-sm">
                     {t('dashboard.no_events')}
                  </div>
               )}
               <div className="p-3 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 text-center">
                  <button className="text-xs font-bold text-emaus-700 dark:text-emaus-400 hover:underline">
                     {t('dashboard.view_full_agenda')}
                  </button>
               </div>
            </div>
         </div>

      </div>

      {/* TOUR COMPONENT */}
      {showTour && <AppTour onClose={() => setShowTour(false)} />}
    </div>
  );
};

export default Dashboard;
