
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  LayoutDashboard, 
  CalendarDays, 
  BookOpen, 
  FileText, 
  Users, 
  MessageCircle, 
  Banknote, 
  LifeBuoy,
  X,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface AppTourProps {
  onClose: () => void;
}

const AppTour: React.FC<AppTourProps> = ({ onClose }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: LayoutDashboard,
      title: t('tour.steps.dashboard.title'),
      desc: t('tour.steps.dashboard.desc'),
      color: 'bg-emaus-600',
      key: 'dashboard'
    },
    {
      icon: CalendarDays,
      title: t('tour.steps.agenda.title'),
      desc: t('tour.steps.agenda.desc'),
      color: 'bg-purple-600',
      key: 'agenda'
    },
    {
      icon: BookOpen,
      title: t('tour.steps.sacraments.title'),
      desc: t('tour.steps.sacraments.desc'),
      color: 'bg-blue-600',
      key: 'sacraments'
    },
    {
      icon: FileText,
      title: t('tour.steps.documents.title'),
      desc: t('tour.steps.documents.desc'),
      color: 'bg-green-600',
      key: 'documents'
    },
    {
      icon: Users,
      title: t('tour.steps.community.title'),
      desc: t('tour.steps.community.desc'),
      color: 'bg-amber-500',
      key: 'community'
    },
    {
      icon: MessageCircle,
      title: t('tour.steps.messages.title'),
      desc: t('tour.steps.messages.desc'),
      color: 'bg-pink-500',
      key: 'messages'
    },
    {
      icon: Banknote,
      title: t('tour.steps.finances.title'),
      desc: t('tour.steps.finances.desc'),
      color: 'bg-emerald-600',
      key: 'finances'
    },
    {
      icon: LifeBuoy,
      title: t('tour.steps.support.title'),
      desc: t('tour.steps.support.desc'),
      color: 'bg-slate-600',
      key: 'support'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const currentData = steps[currentStep];
  const Icon = currentData.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative flex flex-col min-h-[400px]">
        
        {/* Decorative Background */}
        <div className={`absolute top-0 left-0 w-full h-32 ${currentData.color} transition-colors duration-500`}>
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/20 text-white hover:bg-white/30 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="relative pt-16 px-8 flex-1 flex flex-col items-center text-center">
           {/* Icon Badge */}
           <div className={`w-20 h-20 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center mb-6 z-10 border-4 border-white dark:border-slate-800`}>
              <Icon className={`w-10 h-10 ${currentData.color.replace('bg-', 'text-')}`} />
           </div>

           <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 transition-all duration-300">
             {currentData.title}
           </h3>
           <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-8 transition-all duration-300">
             {currentData.desc}
           </p>

           {/* Progress Dots */}
           <div className="flex gap-2 mb-8 mt-auto">
              {steps.map((_, idx) => (
                <div 
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentStep ? `${currentData.color} w-6` : 'bg-slate-200 dark:bg-slate-700'}`}
                />
              ))}
           </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/50">
           <button 
             onClick={handlePrev}
             disabled={currentStep === 0}
             className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentStep === 0 ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
           >
             <ChevronLeft className="w-4 h-4" /> {t('tour.prev')}
           </button>

           <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
             {currentStep + 1} / {steps.length}
           </div>

           <button 
             onClick={handleNext}
             className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-md transition-all hover:scale-105 ${currentData.color}`}
           >
             {currentStep === steps.length - 1 ? t('tour.finish') : t('tour.next')}
             {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
           </button>
        </div>

      </div>
    </div>
  );
};

export default AppTour;
