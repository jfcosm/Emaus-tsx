
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Sacraments from './components/Sacraments';
import Agenda from './components/Agenda';
import DocumentEditor from './components/DocumentEditor';
import Messages from './components/Messages';
import Finances from './components/Finances';
import Community from './components/SocialFeed';
import LandingPage from './components/LandingPage';
import Settings from './components/Settings';
import UserManagement from './components/UserManagement';
import NotificationCenter from './components/NotificationCenter';
import { ViewName } from './types';
import { Menu, Bell, Moon, Sun, Globe, LogOut } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';
import { useAuth } from './contexts/AuthContext';
import { useTheme } from './contexts/ThemeContext';
import { useSettings } from './contexts/SettingsContext';
import { analytics } from './services/firebase';

// Version 1.9.17 - Analytics Enabled
const App: React.FC = () => {
  // Authentication State from Firebase
  const { currentUser, logout } = useAuth();

  // App State
  const [currentView, setCurrentView] = useState<ViewName>(ViewName.DASHBOARD);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Contexts
  const { language, setLanguage, t } = useLanguage();
  const { darkMode, toggleDarkMode } = useTheme();
  const { settings } = useSettings();

  // Analytics Tracking for View Changes
  useEffect(() => {
    if (currentUser) {
      (analytics as any).logEvent('screen_view', {
        firebase_screen: currentView,
        screen_name: currentView
      });
    }
  }, [currentView, currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      setCurrentView(ViewName.DASHBOARD);
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case ViewName.DASHBOARD:
        return <Dashboard />;
      case ViewName.SACRAMENTS:
        return <Sacraments />;
      case ViewName.AGENDA:
        return <Agenda />;
      case ViewName.DOCUMENTS:
        return <DocumentEditor />;
      case ViewName.MESSAGES:
        return <Messages />;
      case ViewName.FINANCES:
        return <Finances />;
      case ViewName.COMMUNITY:
        return <Community />;
      case ViewName.SETTINGS:
        return <Settings />;
      case ViewName.USERS:
        return <UserManagement />;
      default:
        return <Dashboard />;
    }
  };

  // --- RENDER LANDING PAGE IF NOT AUTHENTICATED ---
  if (!currentUser) {
    return <LandingPage />;
  }

  // --- RENDER MAIN APP IF AUTHENTICATED ---
  return (
    <div className="flex h-screen bg-stone-50 dark:bg-slate-950 overflow-hidden font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView} 
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile / Header Bar */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-8 z-10 shadow-sm flex-shrink-0 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden text-slate-600 dark:text-slate-300"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-emaus-900 dark:text-emaus-100 hidden lg:block tracking-tight font-serif">
              {currentView === ViewName.DASHBOARD && t('sidebar.dashboard')}
              {currentView === ViewName.SACRAMENTS && t('sidebar.sacraments')}
              {currentView === ViewName.AGENDA && t('sidebar.agenda')}
              {currentView === ViewName.DOCUMENTS && t('sidebar.documents')}
              {currentView === ViewName.MESSAGES && t('sidebar.messages')}
              {currentView === ViewName.FINANCES && t('sidebar.finances')}
              {currentView === ViewName.COMMUNITY && t('community.title')}
              {currentView === ViewName.SETTINGS && t('sidebar.settings')}
              {currentView === ViewName.USERS && t('sidebar.users')}
            </h1>
          </div>
          
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
               <Globe className="w-4 h-4 ml-1 text-slate-500" />
               <select 
                 value={language} 
                 onChange={(e) => setLanguage(e.target.value as any)}
                 className="bg-transparent border-none text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-0 cursor-pointer py-1"
               >
                  <option value="es">ES</option>
                  <option value="en">EN</option>
                  <option value="pt">PT</option>
               </select>
            </div>

            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 text-slate-500 dark:text-gold-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
               {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
              {/* Notifications */}
            <NotificationCenter />

            {/* Logout Button (Visible only in header on larger screens, duplicate of sidebar but useful) */}
            <button 
              onClick={handleLogout}
              className="hidden lg:flex p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
              title={t('sidebar.logout')}
            >
              <LogOut className="w-5 h-5" />
            </button>

            <div className="hidden lg:flex flex-col items-end">
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{settings.parishName || 'Parroquia Santa María'}</span>
              <span className="text-xs text-gold-600 dark:text-gold-400 font-medium">
                 {settings.planType === 'basic' ? 'Plan Básico' : 'Plan Avanzado'}
              </span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
