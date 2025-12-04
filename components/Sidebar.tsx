
import React from 'react';
import { ViewName, NavItem } from '../types';
import { 
  LayoutDashboard, 
  BookOpen, 
  CalendarDays, 
  FileText, 
  Settings, 
  LogOut,
  Cross,
  MessageCircle,
  Lock,
  Users,
  Banknote,
  Globe
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../contexts/SettingsContext';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  currentView: ViewName;
  onChangeView: (view: ViewName) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navItems: NavItem[] = [
  { name: ViewName.DASHBOARD, icon: LayoutDashboard, description: 'Resumen general' },
  { name: ViewName.AGENDA, icon: CalendarDays, description: 'Calendario y eventos' },
  { name: ViewName.SACRAMENTS, icon: BookOpen, description: 'Libros y registros' },
  { name: ViewName.DOCUMENTS, icon: FileText, description: 'Editor y certificados' },
  { name: ViewName.COMMUNITY, icon: Users, description: 'Vida Eclesial' },
  { name: ViewName.MESSAGES, icon: MessageCircle, description: 'Comunidad' },
  { name: ViewName.FINANCES, icon: Banknote, description: 'Ingresos y Gastos' },
  { name: ViewName.SETTINGS, icon: Settings, description: 'Configuración general' },
];

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isOpen, setIsOpen }) => {
  const { t } = useLanguage();
  const { settings } = useSettings();
  const { currentUser } = useAuth();

  const getTranslatedName = (name: ViewName): string => {
     switch(name) {
       case ViewName.DASHBOARD: return t('sidebar.dashboard');
       case ViewName.AGENDA: return t('sidebar.agenda');
       case ViewName.SACRAMENTS: return t('sidebar.sacraments');
       case ViewName.DOCUMENTS: return t('sidebar.documents');
       case ViewName.MESSAGES: return t('sidebar.messages');
       case ViewName.FINANCES: return t('sidebar.finances');
       case ViewName.COMMUNITY: return t('community.title');
       case ViewName.SETTINGS: return t('sidebar.settings');
       case ViewName.USERS: return t('sidebar.users');
       default: return name;
     }
  };

  const isBasicPlan = settings.planType === 'basic';
  const isAdmin = currentUser?.email === 'admin@emaus.app';

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-emaus-900 dark:bg-slate-950 text-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col h-full shadow-2xl border-r border-emaus-800 dark:border-slate-800
      `}>
        {/* Brand */}
        <div className="p-6 flex items-center gap-3 border-b border-emaus-800 dark:border-slate-800 bg-emaus-950 dark:bg-black/20">
          <div className="bg-gold-500 p-2 rounded-lg shadow-lg shadow-black/20">
            <Cross className="w-6 h-6 text-emaus-950" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight font-serif text-gold-50">EMAÚS</h1>
            <p className="text-xs text-emaus-200 dark:text-slate-400">{t('sidebar.parish')}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isDocuments = item.name === ViewName.DOCUMENTS;
            const isFinances = item.name === ViewName.FINANCES;
            // Chat (Messages) and Community are open for all
            const isLocked = isBasicPlan && (isDocuments || isFinances);

            return (
              <button
                key={item.name}
                onClick={() => {
                  onChangeView(item.name);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative group
                  ${currentView === item.name 
                    ? 'bg-emaus-700 dark:bg-slate-800 text-white shadow-lg shadow-black/10 border border-emaus-600 dark:border-slate-700' 
                    : 'text-emaus-100 dark:text-slate-400 hover:bg-emaus-800 dark:hover:bg-slate-900 hover:text-white'}
                  ${isLocked ? 'opacity-70 grayscale-[0.5]' : ''}
                `}
              >
                <item.icon className={`w-5 h-5 ${currentView === item.name ? 'text-gold-400' : 'text-emaus-300 dark:text-slate-500'}`} />
                <div className="text-left flex-1">
                  <span className="block font-medium">{getTranslatedName(item.name)}</span>
                </div>
                {isLocked && <Lock className="w-3 h-3 text-gold-500" />}
              </button>
            );
          })}

          {/* Admin Only Item */}
          {isAdmin && (
             <div className="pt-4 mt-4 border-t border-emaus-800 dark:border-slate-800">
                <button
                  onClick={() => {
                    onChangeView(ViewName.USERS);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${currentView === ViewName.USERS 
                      ? 'bg-slate-800 text-white shadow-lg border border-slate-700' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                  `}
                >
                  <Users className="w-5 h-5" />
                  <span className="block font-medium">{t('sidebar.users')}</span>
                </button>
             </div>
          )}
        </nav>

        {/* User Profile / Logout */}
        <div className="p-4 border-t border-emaus-800 dark:border-slate-800 bg-emaus-950 dark:bg-black/20">
          <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-emaus-800 dark:hover:bg-slate-800 transition-colors">
            <img 
              src="https://picsum.photos/40/40" 
              alt="User" 
              className="w-10 h-10 rounded-full border-2 border-gold-500" 
            />
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-white truncate max-w-[140px]">{settings.secretaryName || 'Usuario'}</p>
              <p className="text-xs text-emaus-300 dark:text-slate-400">{settings.userRole || t('sidebar.role')}</p>
            </div>
            <LogOut className="w-5 h-5 text-emaus-400 hover:text-red-400" />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;