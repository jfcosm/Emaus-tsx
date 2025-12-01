
import React, { useState } from 'react';
import { mockEvents } from '../services/mockData';
import { CalendarEvent } from '../types';
import { Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Agenda: React.FC = () => {
  const { t } = useLanguage();
  // Local state to manage events (initialized with mock data)
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const initialFormState: Omit<CalendarEvent, 'id'> = {
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    type: 'Misa',
    location: 'Templo Mayor'
  };
  const [newEvent, setNewEvent] = useState(initialFormState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eventToAdd: CalendarEvent = {
      id: Date.now().toString(),
      ...newEvent
    } as CalendarEvent;

    setEvents(prev => [...prev, eventToAdd].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setIsModalOpen(false);
    setNewEvent(initialFormState);
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t('agenda.title')}</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emaus-700 text-white rounded-lg hover:bg-emaus-800 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> {t('agenda.new_event')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View Placeholder */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Junio 2024</h3>
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
               // Logic to simulate event dots on calendar days
               const dayNumber = i + 1;
               // Mock check if day has event (just for visual representation in this grid)
               const hasEvent = events.some(e => parseInt(e.date.split('-')[2]) === dayNumber);
               
               return (
                <div key={i} className={`bg-white dark:bg-slate-900 h-24 p-2 relative hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${i === 15 ? 'bg-gold-50 dark:bg-gold-900/10' : ''}`}>
                  <span className={`text-sm font-medium ${i === 15 ? 'text-gold-700 dark:text-gold-400' : 'text-slate-700 dark:text-slate-300'}`}>{i + 1}</span>
                  {hasEvent && (
                    <div className="mt-1">
                       <div className="w-1.5 h-1.5 bg-emaus-500 rounded-full mx-auto"></div>
                    </div>
                  )}
                  {i === 15 && (
                     <div className="mt-1 text-xs bg-gold-100 dark:bg-gold-900/30 text-gold-800 dark:text-gold-300 p-1 rounded truncate hidden md:block">Misa 10:00</div>
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
            {events.length > 0 ? (
              events.map((event) => (
                <div key={event.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-emaus-200 dark:hover:border-emaus-800 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase
                      ${event.type === 'Misa' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 
                        event.type === 'Sacramento' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 
                        event.type === 'Reunión' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}
                    `}>
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
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-800">{t('agenda.modal.title')}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('agenda.modal.event_title')}</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={newEvent.title}
                  onChange={handleInputChange}
                  placeholder="Ej: Misa de Domingo"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emaus-500 focus:outline-none bg-white text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('agenda.modal.date')}</label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={newEvent.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emaus-500 focus:outline-none bg-white text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('agenda.modal.time')}</label>
                  <input
                    type="time"
                    name="time"
                    required
                    value={newEvent.time}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emaus-500 focus:outline-none bg-white text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('agenda.modal.type')}</label>
                  <select
                    name="type"
                    value={newEvent.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emaus-500 focus:outline-none bg-white text-slate-900"
                  >
                    <option value="Misa">{t('agenda.modal.types.Misa')}</option>
                    <option value="Sacramento">{t('agenda.modal.types.Sacramento')}</option>
                    <option value="Reunión">{t('agenda.modal.types.Reunión')}</option>
                    <option value="Otro">{t('agenda.modal.types.Otro')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('agenda.modal.location')}</label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={newEvent.location}
                    onChange={handleInputChange}
                    placeholder="Ej: Templo"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emaus-500 focus:outline-none bg-white text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
                >
                  {t('agenda.modal.cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-emaus-700 text-white rounded-lg hover:bg-emaus-800 font-medium shadow-sm transition-colors"
                >
                  {t('agenda.modal.save')}
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
