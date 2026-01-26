// Version 1.16.0 - Production Ready UI Audit
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Calendar, FileText, CheckCircle, ArrowRight, Menu, X, Cross, User, Users, Lock, ChevronRight, Globe, Sun, Moon, MessageSquare, Database, Search, Download, Check, Sparkles, AlertCircle, Loader2, RefreshCw
} from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { createLead } from '../services/leadsService';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', role: '', parish: '', diocese: '', phone: '', email: '' });
  const [captcha, setCaptcha] = useState({ a: 0, b: 0 });
  const [captchaInput, setCaptchaInput] = useState('');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const { darkMode, toggleDarkMode } = useTheme();

  const generateCaptcha = () => {
      setCaptcha({ a: Math.floor(Math.random() * 10) + 1, b: Math.floor(Math.random() * 10) + 1 });
      setCaptchaInput('');
  };

  useEffect(() => {
      if (isDemoModalOpen) {
          generateCaptcha();
          setLeadSuccess(false);
          setLeadForm({ name: '', role: '', parish: '', diocese: '', phone: '', email: '' });
      }
  }, [isDemoModalOpen]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, username, password);
    } catch (err: any) {
      setError(t('landing.login.error'));
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (parseInt(captchaInput) !== (captcha.a + captcha.b)) {
          alert(t('landing.demo.captcha_error'));
          generateCaptcha();
          return;
      }
      setIsSubmittingLead(true);
      try {
          await createLead(leadForm);
          setLeadSuccess(true);
      } catch (error) {
          alert(t('landing.demo.submit_error'));
      } finally {
          setIsSubmittingLead(false);
      }
  };

  const handleLeadInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setLeadForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full z-40 bg-white/90 dark:bg-slate-950/80 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gold-500 p-1.5 rounded shadow-sm"><Cross className="w-5 h-5 text-white" /></div>
              <span className="text-xl font-bold tracking-tight font-serif text-emaus-900 dark:text-gold-50 uppercase">Emaús</span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-6">
              <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-emaus-700 text-sm font-medium transition-colors">{t('landing.nav.features')}</a>
              <a href="#benefits" className="text-slate-600 dark:text-slate-300 hover:text-emaus-700 text-sm font-medium transition-colors">{t('landing.nav.benefits')}</a>
              <a href="#plans" className="text-slate-600 dark:text-slate-300 hover:text-emaus-700 text-sm font-medium transition-colors">{t('landing.nav.plans')}</a>
              
              <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 px-2 py-1">
                 <Globe className="w-3 h-3 text-slate-400" />
                 <select 
                   value={language} 
                   onChange={(e) => setLanguage(e.target.value as any)}
                   className="bg-transparent border-none text-[10px] font-bold text-slate-700 dark:text-slate-300 focus:ring-0 cursor-pointer pr-5 py-0"
                 >
                    {['es', 'en', 'pt', 'fr', 'it', 'de', 'pl', 'el', 'ru', 'ja', 'ko', 'zh', 'hi'].map(lang => (
                        <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                    ))}
                 </select>
              </div>

              <button onClick={toggleDarkMode} className="p-2 text-slate-400 hover:text-gold-500 transition-colors">
                 {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button onClick={() => setIsLoginModalOpen(true)} className="px-6 py-2 bg-emaus-700 text-white rounded-lg font-bold text-sm hover:bg-emaus-800 transition-all shadow-md active:scale-95">
                {t('landing.nav.login')}
              </button>
            </div>

            <div className="lg:hidden flex items-center gap-2">
               <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 dark:text-slate-300 p-2">
                  {isMenuOpen ? <X /> : <Menu />}
               </button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 dark:bg-gold-900/20 text-gold-700 dark:text-gold-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <span className="w-2 h-2 bg-gold-500 rounded-full"></span>
              {t('landing.hero.badge')}
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold font-serif leading-none text-slate-900 dark:text-white uppercase">
                {t('landing.hero.title_start')} <br />
                <span className="text-emaus-700 dark:text-emaus-400">
                  {t('landing.hero.title_highlight')}
                </span>
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg">
                {t('landing.hero.subtitle')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="px-8 py-3 bg-emaus-700 text-white rounded-lg font-bold text-base hover:bg-emaus-800 transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
              >
                {t('landing.hero.cta_access')} 
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => {
                  document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3 bg-white dark:bg-slate-900 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-800 rounded-lg font-bold text-base hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
              >
                {t('landing.hero.cta_plans')}
              </button>
            </div>
          </div>

          {/* MOCKUP FLOTANTE (DYNAMIC TRANSLATION) */}
          <div className="relative animate-fade-in-up delay-200 lg:pl-12">
             <div className="relative bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-slate-800 max-w-md ml-auto">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-50 dark:border-slate-800">
                    <div className="w-10 h-10 bg-emaus-50 dark:bg-emaus-900/30 rounded-full flex items-center justify-center text-emaus-600">
                        <User className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-emaus-600 uppercase tracking-widest">{t('landing.mockup.sacrament')}</p>
                        <p className="text-sm font-bold text-slate-800 dark:text-white">{t('landing.mockup.record_type')}</p>
                    </div>
                </div>

                <div className="space-y-4">
                   <div>
                       <label className="text-[9px] font-bold text-slate-400 uppercase">{t('landing.mockup.label_name')}</label>
                       <div className="w-full bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded text-sm text-slate-700 dark:text-slate-200 font-medium">Juan Pérez Gómez</div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                       <div>
                           <label className="text-[9px] font-bold text-slate-400 uppercase">{t('landing.mockup.label_date')}</label>
                           <div className="w-full bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded text-sm text-slate-700 dark:text-slate-200 font-medium">15 / 05 / 2024</div>
                       </div>
                       <div>
                           <label className="text-[9px] font-bold text-slate-400 uppercase">{t('landing.mockup.label_book')}</label>
                           <div className="w-full bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded text-sm text-slate-700 dark:text-slate-200 font-medium">L: 104 / P: 23</div>
                       </div>
                   </div>
                   <div>
                       <label className="text-[9px] font-bold text-slate-400 uppercase">{t('landing.mockup.label_parents')}</label>
                       <div className="w-full bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded text-sm text-slate-700 dark:text-slate-200 font-medium">Pedro Pérez y María Gómez</div>
                   </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-800">
                    <div className="h-6 w-full bg-emaus-700 rounded opacity-90"></div>
                </div>

                {/* Floating Status Badges (DYNAMIC) */}
                <div className="absolute -right-8 top-0 space-y-3 hidden md:block">
                   <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-xl border border-slate-50 dark:border-slate-700 flex items-center gap-3 animate-bounce-slow">
                       <div className="bg-blue-100 p-1.5 rounded text-blue-600"><Database className="w-4 h-4" /></div>
                       <div>
                           <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter leading-none">{t('landing.mockup.badge_db')}</p>
                           <p className="text-[11px] font-bold text-slate-700 dark:text-white">{t('landing.mockup.status_db')}</p>
                       </div>
                   </div>
                   <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-xl border border-slate-50 dark:border-slate-700 flex items-center gap-3 animate-bounce-slow delay-75">
                       <div className="bg-purple-100 p-1.5 rounded text-purple-600"><Search className="w-4 h-4" /></div>
                       <div>
                           <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter leading-none">{t('landing.mockup.badge_search')}</p>
                           <p className="text-[11px] font-bold text-slate-700 dark:text-white">{t('landing.mockup.status_search')}</p>
                       </div>
                   </div>
                   <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-xl border border-slate-50 dark:border-slate-700 flex items-center gap-3 animate-bounce-slow delay-150">
                       <div className="bg-emerald-100 p-1.5 rounded text-emerald-600"><Download className="w-4 h-4" /></div>
                       <div>
                           <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter leading-none">{t('landing.mockup.badge_docs')}</p>
                           <p className="text-[11px] font-bold text-slate-700 dark:text-white">{t('landing.mockup.status_docs')}</p>
                       </div>
                   </div>
                </div>

                {/* Chat Bubble Popup (DYNAMIC) */}
                <div className="absolute -left-12 -bottom-4 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 animate-fade-in">
                   <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 shrink-0">
                      <MessageSquare className="w-4 h-4" />
                   </div>
                   <div>
                       <p className="text-[10px] font-bold text-slate-700 dark:text-white">{t('landing.mockup.chat_name')}</p>
                       <p className="text-[9px] text-slate-400">{t('landing.mockup.chat_msg')} <span className="text-emerald-500">✅</span></p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION: TODO LO QUE SU SECRETARÍA NECESITA */}
      <section id="features" className="py-24 px-4 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 dark:text-white uppercase tracking-tight">{t('landing.features.title')}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm">{t('landing.features.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: BookOpen, title: t('landing.features.sacraments_title'), desc: t('landing.features.sacraments_desc'), color: 'text-pink-600', bg: 'bg-pink-50' },
              { icon: FileText, title: t('landing.features.docs_title'), desc: t('landing.features.docs_desc'), color: 'text-blue-600', bg: 'bg-blue-50' },
              { icon: Calendar, title: t('landing.features.agenda_title'), desc: t('landing.features.agenda_desc'), color: 'text-purple-600', bg: 'bg-purple-50' },
              { icon: MessageSquare, title: t('landing.features.chat_title'), desc: t('landing.features.chat_desc'), color: 'text-emerald-600', bg: 'bg-emerald-50' },
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-xl bg-slate-50 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center">
                <div className={`w-12 h-12 ${f.bg} dark:bg-slate-800 ${f.color} rounded-lg flex items-center justify-center mb-6`}>
                   <f.icon className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-800 dark:text-white mb-3">{f.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-[13px] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
             <button className="px-6 py-2.5 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-bold text-emaus-700 dark:text-emaus-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all uppercase tracking-widest">
                {t('landing.features.btn_more')}
             </button>
          </div>
        </div>
      </section>

      {/* SECTION: PLANES DISEÑADOS PARA CADA COMUNIDAD */}
      <section id="plans" className="py-24 px-4 bg-slate-50 dark:bg-slate-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 dark:text-white uppercase tracking-tight">{t('landing.plans.title')}</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">{t('landing.plans.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plan Básico */}
            <div className="bg-white dark:bg-slate-900 p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <div className="mb-8">
                 <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{t('landing.plans.basic_title')}</h4>
                 <p className="text-xs text-slate-500 mb-6">{t('landing.plans.basic_desc')}</p>
                 <div className="flex items-baseline gap-1">
                    <span className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white">USD 10</span>
                    <span className="text-xl font-bold text-slate-400 ml-1">(€9)</span>
                    <span className="text-slate-400 text-sm">/ {t('landing.plans.forever')}</span>
                 </div>
              </div>
              <ul className="space-y-3 mb-10 flex-1">
                 {[
                   t('landing.plans.feature_agenda'), 
                   t('landing.plans.feature_sacraments'), 
                   t('landing.plans.feature_certs'), 
                   t('landing.plans.feature_chat')
                 ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[13px] text-slate-600 dark:text-slate-300">
                       <Check className="w-4 h-4 text-gold-500" />
                       {item}
                    </li>
                 ))}
                 {[
                   t('landing.plans.feature_editor'), 
                   t('landing.plans.feature_finances')
                 ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[13px] text-slate-400 line-through opacity-50">
                       <X className="w-4 h-4" />
                       {item}
                    </li>
                 ))}
              </ul>
              <button 
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full py-3 border-2 border-slate-100 dark:border-slate-800 rounded-lg font-bold text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
              >
                {t('landing.plans.cta')}
              </button>
            </div>

            {/* Plan Avanzado */}
            <div className="bg-white dark:bg-slate-900 p-10 rounded-2xl border-2 border-gold-500 shadow-xl flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0">
                 <div className="bg-gold-500 text-white text-[9px] font-black px-3 py-1 uppercase tracking-widest">{t('landing.plans.popular')}</div>
              </div>
              <div className="mb-8">
                 <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{t('landing.plans.adv_title')}</h4>
                 <p className="text-xs text-slate-500 mb-6">{t('landing.plans.adv_desc')}</p>
                 <div className="flex items-baseline gap-1">
                    <span className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white">USD 22</span>
                    <span className="text-xl font-bold text-slate-400 ml-1">(€19)</span>
                    <span className="text-slate-400 text-sm">/ {t('landing.plans.forever')}</span>
                 </div>
              </div>
              <ul className="space-y-3 mb-10 flex-1">
                 <li className="flex items-center gap-3 text-[13px] font-bold text-slate-800 dark:text-white">
                    <Check className="w-4 h-4 text-gold-500" /> {t('landing.plans.feature_basic_all')}
                 </li>
                 {[
                   t('landing.plans.feature_editor'), 
                   t('landing.plans.feature_finances'), 
                   t('landing.plans.feature_unlimited'), 
                   t('landing.plans.feature_reports'), 
                   t('landing.plans.feature_support')
                 ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[13px] text-slate-600 dark:text-slate-300">
                       <Check className="w-4 h-4 text-gold-500" />
                       {item}
                    </li>
                 ))}
              </ul>
              <button 
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full py-3 bg-gold-500 text-white rounded-lg font-bold text-sm hover:bg-gold-600 transition-all shadow-md active:scale-95"
              >
                {t('landing.plans.cta')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: NUNCA MÁS TRABAJE EN SOLITARIO */}
      <section className="py-24 px-4 bg-white dark:bg-slate-900/30">
         <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 dark:text-white uppercase mb-4 tracking-tight">{t('landing.community.title')}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm mb-16">{t('landing.community.subtitle')}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-slate-50 dark:bg-slate-950 p-10 rounded-2xl border border-slate-100 dark:border-slate-800 text-center group hover:bg-white dark:hover:bg-slate-900 transition-colors">
                  <div className="w-12 h-12 bg-pink-50 dark:bg-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-600 group-hover:scale-110 transition-transform">
                     <Users className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-white mb-2">{t('landing.community.card1_title')}</h4>
                  <p className="text-xs text-slate-500">{t('landing.community.card1_desc')}</p>
               </div>
               <div className="bg-gold-500 p-10 rounded-2xl shadow-xl text-white text-center transform scale-105">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                     <MessageSquare className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold mb-2">{t('landing.community.card2_title')}</h4>
                  <p className="text-xs opacity-90">{t('landing.community.card2_desc')}</p>
               </div>
               <div className="bg-slate-50 dark:bg-slate-950 p-10 rounded-2xl border border-slate-100 dark:border-slate-800 text-center group hover:bg-white dark:hover:bg-slate-900 transition-colors">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                     <FileText className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-white mb-2">{t('landing.community.card3_title')}</h4>
                  <p className="text-xs text-slate-500">{t('landing.community.card3_desc')}</p>
               </div>
            </div>
         </div>
      </section>

      {/* SECTION: TESTIMONIALS (DYNAMIC) */}
      <section className="py-24 px-4 bg-emaus-900 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 p-20 opacity-5">
            <Cross className="w-96 h-96" />
         </div>
         <div className="max-w-4xl mx-auto text-center relative z-10 space-y-12">
            <div className="space-y-4">
                <h2 className="text-3xl lg:text-5xl font-serif font-bold italic">{t('landing.testimonials.title')}</h2>
                <p className="text-emaus-200 max-w-2xl mx-auto text-lg">{t('landing.testimonials.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                  { name: t('landing.testimonials.t1_name'), role: t('landing.testimonials.t1_role'), initial: 'H', text: t('landing.testimonials.t1_text') },
                  { name: t('landing.testimonials.t2_name'), role: t('landing.testimonials.t2_role'), initial: 'P', text: t('landing.testimonials.t2_text') },
                  { name: t('landing.testimonials.t3_name'), role: t('landing.testimonials.t3_role'), initial: 'D', text: t('landing.testimonials.t3_text') }
               ].map((testi, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 text-left space-y-4 hover:bg-white/15 transition-colors">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gold-500/20 rounded-full flex items-center justify-center text-gold-400 font-bold">{testi.initial}</div>
                        <div>
                           <p className="font-bold text-sm leading-none">{testi.name}</p>
                           <p className="text-[10px] text-emaus-300 mt-1">{testi.role}</p>
                        </div>
                     </div>
                     <p className="text-xs italic leading-relaxed text-emaus-100">{testi.text}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* FOOTER (DYNAMIC) */}
      <footer className="py-12 px-8 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="bg-emaus-700 p-1.5 rounded"><Cross className="w-4 h-4 text-white" /></div>
               <span className="font-serif font-bold text-emaus-900 dark:text-white uppercase tracking-wider">Emaús</span>
            </div>
            <div className="text-center md:text-right">
               <p className="text-[11px] text-slate-400 font-medium uppercase tracking-widest mb-1">{t('landing.footer.tagline')}</p>
               <p className="text-[10px] text-slate-400">{t('landing.footer.dev')} <span className="text-emaus-600 font-bold">Melodia Lab</span>.</p>
            </div>
         </div>
      </footer>

      {/* LOGIN MODAL */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 dark:border-slate-800">
            <div className="bg-emaus-900 p-10 text-center relative">
              <button onClick={() => setIsLoginModalOpen(false)} className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
              <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"><Lock className="w-8 h-8 text-white" /></div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-widest font-serif">{t('landing.login.title')}</h3>
              <p className="text-emaus-200 text-sm mt-2">{t('landing.login.subtitle')}</p>
            </div>
            <form onSubmit={handleLoginSubmit} className="p-8 space-y-6">
              {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {error}</div>}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">{t('landing.login.email')}</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                    <input type="email" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-emaus-500 dark:text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">{t('landing.login.password')}</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-emaus-500 dark:text-white" />
                  </div>
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="w-full py-4 bg-emaus-700 text-white rounded-lg font-bold hover:bg-emaus-800 disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95">
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : t('landing.login.btn')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DEMO REQUEST MODAL */}
      {isDemoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row max-h-[90vh]">
                  <div className="hidden md:flex md:w-48 bg-emaus-800 p-8 flex-col justify-between text-white">
                      <div className="bg-gold-500 p-2 rounded w-fit shadow-lg"><Cross className="w-5 h-5 text-white" /></div>
                      <div className="space-y-4">
                          <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Emaús Pro</p>
                          <h4 className="text-xl font-serif font-bold leading-tight">Transforme su gestión hoy</h4>
                      </div>
                  </div>
                  <div className="flex-1 p-8 md:p-12 overflow-y-auto">
                      <button onClick={() => setIsDemoModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"><X /></button>
                      {leadSuccess ? (
                          <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-10 animate-fade-in">
                              <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-500"><CheckCircle className="w-10 h-10" /></div>
                              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('landing.demo.success_title')}</h3>
                              <p className="text-slate-500 text-sm">{t('landing.demo.success_msg')}</p>
                              <button onClick={() => setIsDemoModalOpen(false)} className="px-8 py-2 bg-slate-800 text-white rounded-lg font-bold">{t('landing.demo.close')}</button>
                          </div>
                      ) : (
                          <>
                              <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-2 uppercase">{t('landing.demo.title')}</h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mb-8">{t('landing.demo.subtitle')}</p>
                              <form onSubmit={handleLeadSubmit} className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                      <div><label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">{t('landing.demo.name')}</label><input type="text" name="name" required value={leadForm.name} onChange={handleLeadInput} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded focus:ring-1 focus:ring-emaus-500 dark:text-white text-sm" /></div>
                                      <div><label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">{t('landing.demo.role')}</label><input type="text" name="role" required value={leadForm.role} onChange={handleLeadInput} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded focus:ring-1 focus:ring-emaus-500 dark:text-white text-sm" /></div>
                                  </div>
                                  <div><label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">{t('landing.demo.parish')}</label><input type="text" name="parish" required value={leadForm.parish} onChange={handleLeadInput} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded focus:ring-1 focus:ring-emaus-500 dark:text-white text-sm" /></div>
                                  <div className="grid grid-cols-2 gap-4">
                                      <div><label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">EMAIL</label><input type="email" name="email" required value={leadForm.email} onChange={handleLeadInput} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded focus:ring-1 focus:ring-emaus-500 dark:text-white text-sm" /></div>
                                      <div><label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">TELÉFONO</label><input type="tel" name="phone" required value={leadForm.phone} onChange={handleLeadInput} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded focus:ring-1 focus:ring-emaus-500 dark:text-white text-sm" /></div>
                                  </div>
                                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                          <div className="text-sm font-bold text-slate-500">{captcha.a} + {captcha.b} =</div>
                                          <input type="number" required value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} className="w-16 px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-center font-bold text-sm" />
                                      </div>
                                      <button type="button" onClick={generateCaptcha} className="text-slate-400 hover:text-emaus-600 transition-colors"><RefreshCw className="w-4 h-4" /></button>
                                  </div>
                                  <button type="submit" disabled={isSubmittingLead} className="w-full py-3 bg-emaus-700 text-white rounded font-bold text-sm hover:bg-emaus-800 shadow-md transition-all flex justify-center items-center gap-2">
                                      {isSubmittingLead ? <Loader2 className="w-4 h-4 animate-spin" /> : t('landing.demo.submit')}
                                  </button>
                              </form>
                          </>
                      )}
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default LandingPage;