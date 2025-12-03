import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Menu, 
  X,
  Cross,
  User,
  Lock,
  ChevronRight,
  Check,
  Search,
  Database,
  Download,
  ThumbsUp,
  Cloud,
  Printer,
  Heart,
  Smartphone,
  Globe,
  Sun,
  Moon,
  MessageCircle,
  Users,
  FileCheck,
  Banknote
} from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showFeaturesPage, setShowFeaturesPage] = useState(false);
  
  // Login Form State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Contexts
  const { t, language, setLanguage } = useLanguage();
  const { darkMode, toggleDarkMode } = useTheme();

  // Check URL hash on mount to scroll to section if redirected
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, username, password);
    } catch (err: any) {
      console.error("Login error:", err);
      let msg = 'Error al iniciar sesión.';
      if (err.code === 'auth/invalid-email') msg = 'El correo electrónico no es válido.';
      if (err.code === 'auth/user-not-found') msg = 'Usuario no encontrado.';
      if (err.code === 'auth/wrong-password') msg = 'Contraseña incorrecta.';
      if (err.code === 'auth/invalid-credential') msg = 'Credenciales inválidas.';
      
      setError(msg);
      setIsLoading(false);
    }
  };

  // --- STANDALONE FEATURES PAGE VIEW ---
  if (showFeaturesPage) {
    const allFeatures = [
      {
        icon: BookOpen,
        title: "Libros Sacramentales Digitales",
        desc: "Bautizos, Confirmaciones, Matrimonios y Defunciones. Todo el archivo parroquial histórico y actual en un solo lugar seguro y buscable."
      },
      {
        icon: FileText,
        title: "Certificados Automáticos",
        desc: "Genere partidas oficiales con un solo clic. Plantillas pre-cargadas con el formato estándar del obispado, listas para imprimir y firmar."
      },
      {
        icon: Calendar,
        title: "Agenda Pastoral Inteligente",
        desc: "Gestión de intenciones de misa, reservas de salones, reuniones de catequesis y visitas a enfermos. Evite topes de horario."
      },
      {
        icon: MessageCircle,
        title: "Red Interparroquial",
        desc: "Conecte directamente con otras secretarías para solicitar traslados y resolver dudas mediante un chat seguro y exclusivo."
      },
      {
        icon: Banknote,
        title: "Finanzas y Contabilidad",
        desc: "Lleve el control de caja, ingresos por estipendios, colectas y gastos operativos. Obtenga balances mensuales automáticos."
      },
      {
        icon: Shield,
        title: "Seguridad y Privacidad",
        desc: "Datos encriptados y respaldos automáticos diarios. Acceso diferenciado para párroco, secretaria y consejos pastorales."
      },
      {
        icon: Cloud,
        title: "Acceso en la Nube",
        desc: "Acceda a la información desde la oficina parroquial, la sacristía o incluso desde su hogar. Compatible con computadoras y tablets."
      },
      {
        icon: Printer,
        title: "Editor de Documentos",
        desc: "Redacte cartas pastorales, comunicados y actas sin necesidad de pagar licencias de Office. Todo queda guardado en la ficha de la parroquia."
      },
      {
        icon: Smartphone,
        title: "Diseño Móvil",
        desc: "Interfaz optimizada para teléfonos, permitiendo al sacerdote consultar datos urgentes mientras está en terreno."
      }
    ];

    return (
      <div className="min-h-screen bg-stone-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans animate-fade-in transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header simple for sub-page */}
          <div className="flex justify-between items-center mb-16">
             <div className="flex items-center gap-3">
                <div className="bg-gold-500 p-2 rounded-lg shadow-lg">
                  <Cross className="w-6 h-6 text-emaus-950" />
                </div>
                <span className="text-2xl font-bold tracking-tight font-serif text-emaus-900 dark:text-gold-50">EMAÚS</span>
             </div>
             <button 
               onClick={() => {
                 setShowFeaturesPage(false);
                 window.scrollTo(0, 0);
               }}
               className="flex items-center gap-2 px-6 py-2 border-2 border-slate-300 dark:border-slate-700 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-bold"
             >
               <ArrowLeft className="w-5 h-5" /> Volver al Inicio
             </button>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-emaus-600 dark:text-gold-400 font-bold uppercase tracking-widest text-sm mb-4 block">Funcionalidades</span>
            <h1 className="text-4xl lg:text-5xl font-bold font-serif text-slate-900 dark:text-white mb-6">Herramientas diseñadas para la vida parroquial</h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Cada funcionalidad de Emaús ha sido co-diseñada con secretarias y sacerdotes para resolver problemas reales del día a día.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {allFeatures.map((feat, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:border-gold-300 dark:hover:border-gold-700 transition-all group">
                <div className="w-14 h-14 bg-emaus-50 dark:bg-emaus-900/30 text-emaus-700 dark:text-emaus-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feat.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feat.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 bg-emaus-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <div className="relative z-10">
               <h2 className="text-3xl font-serif font-bold mb-6">¿Listo para modernizar su parroquia?</h2>
               <button 
                  onClick={() => {
                    setShowFeaturesPage(false);
                    setTimeout(() => {
                      const plansSection = document.getElementById('plans');
                      if (plansSection) plansSection.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="px-8 py-4 bg-gold-500 text-white rounded-xl font-bold text-lg hover:bg-gold-600 transition-all shadow-xl shadow-black/20"
                >
                  Ver Planes Disponibles
                </button>
             </div>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN LANDING PAGE VIEW ---
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* --- NAVBAR --- */}
      <nav className="fixed w-full z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gold-500 p-2 rounded-lg shadow-lg">
                <Cross className="w-6 h-6 text-emaus-950" />
              </div>
              <span className="text-2xl font-bold tracking-tight font-serif text-emaus-900 dark:text-gold-50">EMAÚS</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-6">
              <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-emaus-700 font-medium transition-colors">{t('landing.nav.features')}</a>
              <a href="#benefits" className="text-slate-600 dark:text-slate-300 hover:text-emaus-700 font-medium transition-colors">{t('landing.nav.benefits')}</a>
              <a href="#plans" className="text-slate-600 dark:text-slate-300 hover:text-emaus-700 font-medium transition-colors">{t('landing.nav.plans')}</a>
              
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>

              {/* Language Selector */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 rounded-lg p-1">
                 <Globe className="w-4 h-4 ml-1 text-slate-500" />
                 <select 
                   value={language} 
                   onChange={(e) => setLanguage(e.target.value as any)}
                   className="bg-transparent border-none text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-0 cursor-pointer py-1 pr-8"
                 >
                    <option value="es">ES</option>
                    <option value="en">EN</option>
                 </select>
              </div>

              {/* Dark Mode Toggle */}
              <button 
                onClick={toggleDarkMode}
                className="p-2 text-slate-500 dark:text-gold-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                 {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Demo Button */}
              <button 
                onClick={() => {
                   setUsername('demo@emaus.app');
                   setPassword('demo123');
                   setIsLoginModalOpen(true);
                }}
                className="text-gold-600 dark:text-gold-400 font-bold border-2 border-gold-500/50 hover:border-gold-500 rounded-full px-5 py-2 transition-all hover:bg-gold-50 dark:hover:bg-gold-900/10 ml-2"
              >
                {t('landing.nav.demo')}
              </button>

              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="px-6 py-2.5 bg-emaus-700 text-white rounded-full font-medium hover:bg-emaus-800 transition-all shadow-lg shadow-emaus-900/20"
              >
                {t('landing.nav.login')}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 dark:text-slate-300">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-4">
             <a href="#features" onClick={() => setIsMenuOpen(false)} className="block text-slate-600 dark:text-slate-300 font-medium">{t('landing.nav.features')}</a>
             <a href="#benefits" onClick={() => setIsMenuOpen(false)} className="block text-slate-600 dark:text-slate-300 font-medium">{t('landing.nav.benefits')}</a>
             <a href="#plans" onClick={() => setIsMenuOpen(false)} className="block text-slate-600 dark:text-slate-300 font-medium">{t('landing.nav.plans')}</a>
             
             {/* Mobile Settings */}
             <div className="flex items-center gap-4 py-2 border-t border-slate-100 dark:border-slate-800">
                <button onClick={toggleDarkMode} className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  <span>{darkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
                </button>
             </div>
             <div className="flex gap-2">
                {['es', 'en'].map((lang) => (
                  <button 
                    key={lang}
                    onClick={() => { setLanguage(lang as any); setIsMenuOpen(false); }}
                    className={`px-3 py-1 rounded border ${language === lang ? 'bg-emaus-100 border-emaus-500 text-emaus-700' : 'border-slate-200 dark:border-slate-700'}`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
             </div>

             <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsLoginModalOpen(true);
                  setUsername('demo@emaus.app');
                  setPassword('demo123');
                }}
                className="block w-full text-left font-bold text-gold-600 dark:text-gold-400 py-2 border-t border-slate-100 dark:border-slate-800 mt-2"
             >
               {t('landing.nav.demo_quick')}
             </button>

             <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="w-full text-left font-bold text-emaus-700 dark:text-emaus-400"
             >
               {t('landing.nav.client_access')}
             </button>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-100 dark:bg-gold-900/20 text-gold-800 dark:text-gold-300 rounded-full text-sm font-bold uppercase tracking-wide">
              <span className="w-2 h-2 bg-gold-500 rounded-full animate-pulse"></span>
              {t('landing.hero.badge')}
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold font-serif leading-tight text-slate-900 dark:text-white">
              {t('landing.hero.title_start')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emaus-600 to-emaus-400">{t('landing.hero.title_highlight')}</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
              {t('landing.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="px-8 py-4 bg-emaus-700 text-white rounded-xl font-bold text-lg hover:bg-emaus-800 transition-all shadow-xl shadow-emaus-900/20 flex items-center justify-center gap-2"
              >
                {t('landing.hero.cta_access')} <ArrowRight className="w-5 h-5" />
              </button>
              <a href="#plans" className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center">
                {t('landing.hero.cta_plans')}
              </a>
            </div>
          </div>
          
          {/* VISUAL REPRESENTATION (MOCKUP) */}
          <div className="relative z-10 lg:h-[600px] flex items-center justify-center perspective-1000">
             {/* Background Glow */}
             <div className="absolute inset-0 bg-gradient-to-tr from-emaus-600/30 to-gold-400/30 rounded-full opacity-40 blur-3xl animate-pulse"></div>
             
             {/* Main App Interface Mockup */}
             <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 rotate-y-12 rotate-x-6 transform transition-transform hover:rotate-0 duration-700">
                
                {/* Mockup Header */}
                <div className="flex items-center justify-between mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emaus-50 dark:bg-emaus-900/30 rounded-full flex items-center justify-center text-emaus-700 dark:text-emaus-400">
                         <User className="w-5 h-5" />
                      </div>
                      <div>
                         <div className="text-xs text-emaus-600 dark:text-emaus-400 font-bold uppercase tracking-wider">{t('landing.mockup.sacrament')}</div>
                         <div className="text-lg font-bold text-slate-800 dark:text-white">{t('landing.mockup.baptism_card')}</div>
                      </div>
                   </div>
                   <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-2 py-1 rounded">
                      {t('landing.mockup.verified')}
                   </div>
                </div>

                {/* Mockup Fields */}
                <div className="space-y-4">
                   {/* Name Field */}
                   <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">{t('landing.mockup.name_label')}</label>
                      <div className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-slate-800 dark:text-slate-200 font-medium flex items-center justify-between">
                         Juan Pérez Gómez
                         <CheckCircle className="w-4 h-4 text-emerald-500" />
                      </div>
                   </div>

                   {/* Date Field */}
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <label className="block text-xs font-bold text-slate-400 uppercase mb-1">{t('landing.mockup.date_label')}</label>
                         <div className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-slate-600 dark:text-slate-400 text-sm">
                            15 / 05 / 2024
                         </div>
                      </div>
                      <div>
                         <label className="block text-xs font-bold text-slate-400 uppercase mb-1">{t('landing.mockup.book_label')}</label>
                         <div className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-slate-600 dark:text-slate-400 text-sm">
                            L: 104 / P: 23
                         </div>
                      </div>
                   </div>

                   {/* Parents Field */}
                   <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">{t('landing.mockup.parents_label')}</label>
                      <div className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-slate-600 dark:text-slate-400 text-sm">
                         Pedro Pérez y María Gómez
                      </div>
                   </div>

                   {/* Mock Button */}
                   <div className="pt-4">
                      <div className="w-full bg-emaus-700 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md opacity-90">
                         {t('landing.mockup.generate_btn')}
                      </div>
                   </div>
                </div>
             </div>
             
             {/* SEQUENTIAL POPUPS */}
             <div className="absolute top-10 -right-4 lg:-right-12 w-64 space-y-3">
                
                {/* Popup 1: Registro */}
                <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 animate-[fade-in-up_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.5s' }}>
                   <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-blue-600 dark:text-blue-400">
                      <Database className="w-4 h-4" />
                   </div>
                   <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">{t('landing.mockup.popup_db')}</p>
                      <p className="text-sm font-bold text-slate-800 dark:text-white">{t('landing.mockup.popup_db_sub')}</p>
                   </div>
                </div>

                {/* Popup 2: Búsqueda */}
                <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 animate-[fade-in-up_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '2.0s' }}>
                   <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full text-purple-600 dark:text-purple-400">
                      <Search className="w-4 h-4" />
                   </div>
                   <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">{t('landing.mockup.popup_search')}</p>
                      <p className="text-sm font-bold text-slate-800 dark:text-white">{t('landing.mockup.popup_search_sub')}</p>
                   </div>
                </div>

                {/* Popup 3: Certificado */}
                <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 animate-[fade-in-up_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '3.5s' }}>
                   <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full text-green-600 dark:text-green-400">
                      <Download className="w-4 h-4" />
                   </div>
                   <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">{t('landing.mockup.popup_docs')}</p>
                      <p className="text-sm font-bold text-slate-800 dark:text-white">{t('landing.mockup.popup_docs_sub')}</p>
                   </div>
                </div>

                {/* Popup 4: Chat (NEW) */}
                <div className="absolute -bottom-64 -left-48 lg:-left-64 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-4 animate-[fade-in-up_0.5s_ease-out_forwards] opacity-0 w-64 md:w-72" style={{ animationDelay: '5.0s' }}>
                   <div className="bg-emaus-100 dark:bg-emaus-900/30 p-3 rounded-full text-emaus-600 dark:text-emaus-400 shrink-0">
                      <MessageCircle className="w-6 h-6" />
                   </div>
                   <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-white leading-tight">{t('landing.mockup.popup_chat')}</p>
                      <p className="text-xs text-slate-500 mt-1">{t('landing.mockup.popup_chat_sub')}</p>
                   </div>
                </div>

             </div>
          </div>
        </div>
        
        {/* Custom Animation Style for this component */}
        <style>{`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-24 bg-white dark:bg-slate-900 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold font-serif text-slate-900 dark:text-white mb-4">{t('landing.features.title')}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">{t('landing.features.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Feature 1 */}
            <div className="group p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 hover:bg-gold-50 dark:hover:bg-slate-800 transition-colors border border-slate-100 dark:border-slate-800">
               <div className="w-14 h-14 bg-emaus-100 dark:bg-emaus-900/30 text-emaus-700 dark:text-emaus-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <BookOpen className="w-7 h-7" />
               </div>
               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('landing.features.digital_sacraments')}</h3>
               <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                 {t('landing.features.digital_sacraments_desc')}
               </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors border border-slate-100 dark:border-slate-800">
               <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <FileText className="w-7 h-7" />
               </div>
               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('landing.features.certs')}</h3>
               <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                 {t('landing.features.certs_desc')}
               </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors border border-slate-100 dark:border-slate-800">
               <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <Calendar className="w-7 h-7" />
               </div>
               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('landing.features.agenda')}</h3>
               <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                 {t('landing.features.agenda_desc')}
               </p>
            </div>

            {/* Feature 4 (Network) */}
            <div className="group p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 hover:bg-teal-50 dark:hover:bg-slate-800 transition-colors border border-slate-100 dark:border-slate-800">
               <div className="w-14 h-14 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <MessageCircle className="w-7 h-7" />
               </div>
               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('landing.features.network')}</h3>
               <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                 {t('landing.features.network_desc')}
               </p>
            </div>
          </div>

          <div className="text-center">
             <button 
               onClick={() => {
                 setShowFeaturesPage(true);
                 window.scrollTo(0, 0);
               }}
               className="px-10 py-3 bg-white dark:bg-slate-800 border-2 border-emaus-100 dark:border-slate-700 text-emaus-700 dark:text-slate-200 rounded-full font-bold hover:bg-emaus-50 dark:hover:bg-slate-700 hover:border-emaus-200 transition-all text-lg shadow-sm"
             >
               {t('landing.features.btn_more')}
             </button>
          </div>
        </div>
      </section>

      {/* --- PLANS SECTION --- */}
      <section id="plans" className="py-24 bg-stone-50 dark:bg-slate-950 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-serif text-slate-900 dark:text-white mb-4">{t('landing.plans.title')}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">{t('landing.plans.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             {/* Plan Básico */}
             <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{t('landing.plans.basic.name')}</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-2">{t('landing.plans.basic.desc')}</p>
                </div>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-emaus-700 dark:text-emaus-400">$9.000</span>
                  <span className="text-slate-500"> / mes</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <Check className="w-5 h-5 text-gold-500" /> Agenda Parroquial
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <Check className="w-5 h-5 text-gold-500" /> Registro de Sacramentos
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <Check className="w-5 h-5 text-gold-500" /> Certificados Automáticos
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <Check className="w-5 h-5 text-gold-500" /> Chat Interparroquial
                  </li>
                  <li className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
                    <X className="w-5 h-5" /> Editor Tipo Word
                  </li>
                  <li className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
                    <X className="w-5 h-5" /> Módulo de Finanzas
                  </li>
                </ul>
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="w-full py-3 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  {t('landing.plans.basic.btn')}
                </button>
             </div>

             {/* Plan Avanzado */}
             <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border-2 border-gold-400 relative hover:shadow-2xl transition-all transform md:-translate-y-4">
                <div className="absolute top-0 right-0 bg-gold-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl uppercase tracking-wide">
                  {t('landing.plans.advanced.tag')}
                </div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{t('landing.plans.advanced.name')}</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-2">{t('landing.plans.advanced.desc')}</p>
                </div>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-emaus-700 dark:text-emaus-400">$19.000</span>
                  <span className="text-slate-500"> / mes</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <Check className="w-5 h-5 text-emaus-600" /> <strong>{t('landing.plans.advanced.items.basic_features')}</strong>
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <Check className="w-5 h-5 text-emaus-600" /> {t('landing.plans.advanced.items.word_editor')}
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <Check className="w-5 h-5 text-emaus-600" /> {t('landing.plans.advanced.items.finance')}
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <Check className="w-5 h-5 text-emaus-600" /> {t('landing.plans.advanced.items.chat')}
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <Check className="w-5 h-5 text-emaus-600" /> {t('landing.plans.advanced.items.reports')}
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <Check className="w-5 h-5 text-emaus-600" /> {t('landing.plans.advanced.items.support')}
                  </li>
                </ul>
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="w-full py-3 bg-gold-500 text-white rounded-xl font-bold hover:bg-gold-600 transition-colors shadow-lg shadow-gold-500/20"
                >
                  {t('landing.plans.advanced.btn')}
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* --- COMMUNITY SECTION (NEW) --- */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white mb-4">{t('landing.community.title')}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-12 max-w-2xl mx-auto">{t('landing.community.subtitle')}</p>
            
            <div className="relative">
               {/* Decorative connecting lines (abstract) */}
               <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 dark:bg-slate-800 -z-10 hidden md:block"></div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:border-gold-200 transition-colors group">
                     <div className="w-12 h-12 bg-emaus-100 dark:bg-emaus-900/30 text-emaus-600 dark:text-emaus-400 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Users className="w-6 h-6" />
                     </div>
                     <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-1">{t('landing.community.card_community.title')}</h3>
                     <p className="text-sm text-slate-500 dark:text-slate-400">{t('landing.community.card_community.desc')}</p>
                  </div>
                  
                  <div className="bg-gold-500 text-white p-6 rounded-2xl shadow-lg transform md:-translate-y-4">
                     <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="w-6 h-6" />
                     </div>
                     <h3 className="font-bold text-lg mb-1">{t('landing.community.card_chat.title')}</h3>
                     <p className="text-sm text-white/80">{t('landing.community.card_chat.desc')}</p>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:border-gold-200 transition-colors group">
                     <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <FileCheck className="w-6 h-6" />
                     </div>
                     <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-1">{t('landing.community.card_docs.title')}</h3>
                     <p className="text-sm text-slate-500 dark:text-slate-400">{t('landing.community.card_docs.desc')}</p>
                  </div>
               </div>
            </div>
        </div>
      </section>

      {/* --- BENEFITS / SOCIAL PROOF (CAROUSEL) --- */}
      <section id="benefits" className="py-24 bg-emaus-900 relative overflow-hidden text-white scroll-mt-24">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
           <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">{t('landing.testimonials.quote')}</h2>
              <p className="text-emaus-200 text-lg max-w-2xl mx-auto">
                {t('landing.testimonials.text')}
              </p>
           </div>

           {/* Infinite Carousel */}
           <div className="relative w-full overflow-hidden mask-linear-gradient">
              <div className="flex gap-6 animate-scroll w-max hover:[animation-play-state:paused]">
                 {/* Duplicate items for infinite effect */}
                 {[1, 2].map((iter) => (
                    <React.Fragment key={iter}>
                       {['t1', 't2', 't3', 't4'].map((key) => (
                          <div key={`${iter}-${key}`} className="w-80 md:w-96 bg-white/10 backdrop-blur p-6 rounded-2xl border border-white/10 shrink-0">
                             <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center font-bold text-emaus-900 text-sm">
                                   {t(`landing.testimonials.carousel.${key}.author`).charAt(0)}
                                </div>
                                <div>
                                   <p className="font-bold text-sm">{t(`landing.testimonials.carousel.${key}.author`)}</p>
                                   <p className="text-emaus-300 text-xs">{t(`landing.testimonials.carousel.${key}.role`)}</p>
                                </div>
                             </div>
                             <p className="text-emaus-100 text-sm italic leading-relaxed">
                               "{t(`landing.testimonials.carousel.${key}.quote`)}"
                             </p>
                          </div>
                       ))}
                    </React.Fragment>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-50 dark:bg-slate-950 py-12 border-t border-slate-200 dark:border-slate-800">
         <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
               <Cross className="w-5 h-5 text-emaus-700 dark:text-gold-500" />
               <span className="font-serif font-bold text-lg text-slate-900 dark:text-white">EMAÚS</span>
            </div>
            <div className="text-center md:text-right">
               <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">
                 {t('landing.footer.designed')}
               </p>
               <p className="text-slate-500 dark:text-slate-400 text-sm">
                 {t('landing.footer.developed')} <a href="https://www.melodialab.net" target="_blank" rel="noopener noreferrer" className="text-emaus-700 dark:text-gold-500 hover:underline font-medium">MelodIA La♭</a>.
               </p>
            </div>
         </div>
      </footer>

      {/* --- LOGIN MODAL --- */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
           <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative border border-slate-200 dark:border-slate-800">
              <button 
                 onClick={() => setIsLoginModalOpen(false)}
                 className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                 <X className="w-6 h-6" />
              </button>

              <div className="p-8">
                 <div className="text-center mb-8">
                    <div className="inline-block p-3 bg-emaus-50 dark:bg-emaus-900/30 rounded-xl mb-4">
                       <Lock className="w-8 h-8 text-emaus-700 dark:text-emaus-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t('landing.login.welcome')}</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">{t('landing.login.subtitle')}</p>
                 </div>

                 <form onSubmit={handleLoginSubmit} className="space-y-6">
                    {error && (
                       <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 text-sm rounded-lg border border-red-100 dark:border-red-900/50">
                          {error}
                       </div>
                    )}
                    
                    <div>
                       <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t('landing.login.user')}</label>
                       <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input 
                            type="email"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emaus-500 transition-all dark:text-white"
                            placeholder="Ej: parroquia.santamaria@email.com"
                          />
                       </div>
                    </div>

                    <div>
                       <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t('landing.login.pass')}</label>
                       <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input 
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emaus-500 transition-all dark:text-white"
                            placeholder="••••••••"
                          />
                       </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-3 bg-emaus-700 text-white rounded-xl font-bold text-lg hover:bg-emaus-800 transition-all shadow-lg shadow-emaus-900/20 flex items-center justify-center gap-2 group ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? t('landing.login.verifying') : t('landing.login.btn')} 
                      {!isLoading && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                    </button>
                 </form>

                 <div className="mt-6 text-center">
                    <p className="text-sm text-slate-400">
                       {t('landing.login.forgot')} <a href="#" className="text-emaus-600 hover:underline">{t('landing.login.contact')}</a>
                    </p>
                 </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-950 p-4 text-center border-t border-slate-100 dark:border-slate-800">
                 <p className="text-xs text-slate-400">{t('landing.login.secure')}</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;