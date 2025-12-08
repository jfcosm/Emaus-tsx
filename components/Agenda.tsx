
import React, { useState, useEffect } from 'react';
import { CalendarEvent } from '../types';
import { Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight, Plus, X, Filter, Trash2, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getEvents, addEvent, deleteEvent } from '../services/agendaService';

const Agenda: React.FC = () => {
  const { t } = useLanguage();
  
  // Data State
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter State
  const [filterType, setFilterType] = useState<string>('all');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const initialFormState: Omit<CalendarEvent, 'id'> = {
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    type: 'Misa',
    location: 'Templo Mayor'
  };
  const [newEvent, setNewEvent] = useState(initialFormState);

  // --- LOAD DATA ---
  useEffect(() => {
      loadData();
  }, []);

  const loadData = async () => {
      setLoading(true);
      const data = await getEvents();
      setEvents(data);
      setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
        await addEvent(newEvent);
        await loadData(); // Refresh list
        setIsModalOpen(false);
        setNewEvent(initialFormState);
    } catch (error) {
        alert("Error al guardar evento");
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      if (confirm("¿Eliminar este evento?")) {
          await deleteEvent(id);
          setEvents(prev => prev.filter(ev => ev.id !== id));
      }
  };

  // Filter Logic
  const filteredEvents = filterType === 'all' 
    ? events 
    : events.filter(e => e.type === filterType);

  // New specific types
  const eventTypes = ['Misa', 'Bautizo', 'Matrimonio', 'Confirmación', 'Primera Comunión', 'Reunión', 'Otro'];

  // Helper for Badge Colors
  const getTypeColorClass = (type: string) => {
    switch(type) {
      case 'Misa': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
      case 'Bautizo': return 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300';
      case 'Matrimonio': return 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300';
      case 'Confirmación': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300';
      case 'Primera Comunión': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case 'Reunión': return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300';
      default: return 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300';
    }
  };

  // Helper for Dot Colors
  const getTypeDotColor = (type: string) => {
    switch(type) {
      case 'Misa': return 'bg-purple-500';
      case 'Bautizo': return 'bg-cyan-500';
      case 'Matrimonio': return 'bg-pink-500';
      case 'Confirmación': return 'bg-orange-500';
      case 'Primera Comunión': return 'bg-yellow-500';
      case 'Reunión': return 'bg-emerald-500';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t('agenda.title')}</h2>
           <p className="text-slate-500 dark:text-slate-400 text-sm">Gestione las actividades y celebraciones litúrgicas.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emaus-700 text-white rounded-lg hover:bg-emaus-800 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> {t('agenda.new_event')}
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar border-b border-slate-200 dark:border-slate-800">
        <button
            onClick={() => setFilterType('all')}
            className={`
              px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2
              ${filterType === 'all' 
                ? 'bg-slate-800 dark:bg-white text-white dark:text-slate-900 shadow-md' 
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'}
            `}
          >
            <Filter className="w-3 h-3" /> Todos
        </button>
        {eventTypes.map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
              ${filterType === type 
                ? 'bg-emaus-600 text-white shadow-md' 
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'}
            `}
          >
            {t(`agenda.modal.types.${type}`)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View Placeholder */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Calendario</h3>
            <div className="flex gap-2">
              <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"><ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" /></button>
              <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"><ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" /></button>
            </div>
          </div>
          
          {/* Simple Month Grid Layout */}
          <div className="grid grid-cols-7 gap-px bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
              <div key={day} className="bg-slate-50 dark:bg-slate-800 py-2 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }).map((_, i) => {
               const dayNumber = i + 1;
               // Check if day has event based on FILTERED events (Simple check on day number string match for demo visuals)
               // In real app, proper date matching logic is needed
               const dayEvents = filteredEvents.filter(e => {
                   const d = new Date(e.date);
                   // Offset logic is complex for static grid, simple mapping for demo visual
                   return d.getDate() === (i % 30) + 1; 
               });
               const hasEvent = dayEvents.length > 0;
               
               return (
                <div key={i} className={`bg-white dark:bg-slate-900 h-24 p-2 relative hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors`}>
                  <span className={`text-sm font-medium text-slate-700 dark:text-slate-300`}>{(i % 30) + 1}</span>
                  {hasEvent && (
                    <div className="mt-1 flex gap-1 flex-wrap justify-center">
                       {dayEvents.slice(0, 4).map((e, idx) => (
                         <div key={idx} className={`w-1.5 h-1.5 rounded-full ${getTypeDotColor(e.type)}`}></div>
                       ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming List */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 h-fit">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-emaus-600" /> {t('agenda.upcoming')}
          </h3>
          
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {loading ? (
                <div className="text-center py-4 text-slate-400"><Loader2 className="w-6 h-6 animate-spin mx-auto"/></div>
            ) : filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div key={event.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-emaus-200 dark:hover:border-emaus-800 transition-colors group relative">
                  <button 
                    onClick={(e) => handleDelete(event.id, e)}
                    className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                      <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex justify-between items-start mb-2 pr-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getTypeColorClass(event.type)}`}>
                      {t(`agenda.modal.types.${event.type}`)}
                    </span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap ml-2">{event.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-white mb-1 leading-tight">{event.title}</h4>
                  <div className="flex flex-col gap-1 text-xs text-slate-500 dark:text-slate-400 mt-2">
                    <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {event.time}</div>
                    <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-400 dark:text-slate-500 text-center py-4 text-sm">{t('agenda.no_events')}</p>
            )}
          </div>
        </div>
      </div>

      {/* CREATE EVENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in border border-slate-200 dark:border-slate-800">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/50">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">{t('agenda.modal.title')}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-slate-300 uppercase mb-1">{t('agenda.modal.event_title')}</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={newEvent.title}
                  onChange={handleInputChange}
                  placeholder="Ej: Misa de Domingo"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emaus-500 focus:outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-900 dark:text-slate-300 uppercase mb-1">{t('agenda.modal.date')}</label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={newEvent.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emaus-500 focus:outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-900 dark:text-slate-300 uppercase mb-1">{t('agenda.modal.time')}</label>
                  <input
                    type="time"
                    name="time"
                    required
                    value={newEvent.time}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emaus-500 focus:outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-900 dark:text-slate-300 uppercase mb-1">{t('agenda.modal.type')}</label>
                  <select
                    name="type"
                    value={newEvent.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emaus-500 focus:outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    {eventTypes.map(type => (
                       <option key={type} value={type}>{t(`agenda.modal.types.${type}`)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-900 dark:text-slate-300 uppercase mb-1">{t('agenda.modal.location')}</label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={newEvent.location}
                    onChange={handleInputChange}
                    placeholder="Ej: Templo"
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emaus-500 focus:outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 font-medium transition-colors"
                >
                  {t('agenda.modal.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-emaus-700 text-white rounded-lg hover:bg-emaus-800 font-medium shadow-sm transition-colors flex justify-center"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : t('agenda.modal.save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agenda;
