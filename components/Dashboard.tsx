
import React from 'react';
import { dashboardStats, sacramentChartData } from '../services/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Book, ScrollText, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const icons = [Users, Book, ScrollText, Calendar];

const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  // Translate Stats Logic
  const translatedStats = dashboardStats.map((stat, i) => {
    let label = '';
    switch(i) {
      case 0: label = t('dashboard.stats.baptisms'); break;
      case 1: label = t('dashboard.stats.marriages'); break;
      case 2: label = t('dashboard.stats.certificates'); break;
      case 3: label = t('dashboard.stats.parishioners'); break;
      default: label = stat.name;
    }
    return { ...stat, name: label };
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {translatedStats.map((stat, index) => {
          const Icon = icons[index % icons.length];
          // Determine color based on index for the new theme
          const iconColorClass = index === 0 ? 'text-blue-500' : index === 1 ? 'text-pink-500' : index === 2 ? 'text-emerald-500' : 'text-purple-500';
          const bgIconClass = index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-pink-500' : index === 2 ? 'bg-emerald-500' : 'bg-purple-500';
          
          return (
            <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{stat.name}</p>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${bgIconClass} bg-opacity-10 dark:bg-opacity-20`}>
                  <Icon className={`w-6 h-6 ${iconColorClass}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
                  {stat.trend}
                </span>
                <span className="text-slate-400 dark:text-slate-500 ml-2">{t('dashboard.stats.vs_prev')}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">{t('dashboard.sacramental_activity')}</h2>
            <select className="text-sm border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg focus:ring-emaus-500">
              <option>{t('dashboard.time_ranges.last_6_months')}</option>
              <option>{t('dashboard.time_ranges.this_year')}</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sacramentChartData}>
                <defs>
                  <linearGradient id="colorBautizos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#be2558" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#be2558" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" strokeOpacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#1e293b' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="bautizos" 
                  stroke="#be2558" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorBautizos)" 
                />
                <Area type="monotone" dataKey="matrimonios" stroke="#c5a059" strokeWidth={3} fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">{t('dashboard.upcoming_events')}</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex gap-4 items-start p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer group">
                <div className="flex-shrink-0 w-12 h-12 bg-emaus-50 dark:bg-emaus-900/30 text-emaus-700 dark:text-emaus-400 rounded-xl flex flex-col items-center justify-center border border-emaus-100 dark:border-emaus-900/50 group-hover:border-emaus-200">
                  <span className="text-xs font-bold uppercase">Jun</span>
                  <span className="text-lg font-bold">{15 + i}</span>
                </div>
                <div>
                  <h4 className="text-slate-800 dark:text-slate-200 font-semibold group-hover:text-emaus-700 dark:group-hover:text-emaus-400 transition-colors">
                    {i === 0 ? 'Misa de Confirmación' : i === 1 ? 'Reunión Pastoral' : 'Bautizos Comunitarios'}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-500">10:00 AM • Templo Mayor</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 text-sm font-medium text-emaus-700 dark:text-emaus-300 bg-emaus-50 dark:bg-emaus-900/20 hover:bg-emaus-100 dark:hover:bg-emaus-900/40 rounded-xl transition-colors">
            {t('dashboard.view_full_agenda')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
