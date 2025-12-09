
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getLeads, updateLeadStatus, deleteLead } from '../services/leadsService';
import { Lead, LeadStatus } from '../types';
import { 
    Users, 
    Search, 
    Phone, 
    Mail, 
    MapPin, 
    Trash2, 
    Check, 
    Clock, 
    Calendar,
    Briefcase
} from 'lucide-react';

const STATUS_COLORS: Record<LeadStatus, string> = {
    new: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    contacted: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    demo_scheduled: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    closed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    lost: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
};

const LeadsManagement: React.FC = () => {
    const { t } = useLanguage();
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadLeads();
    }, []);

    const loadLeads = async () => {
        setLoading(true);
        const data = await getLeads();
        setLeads(data);
        setLoading(false);
    };

    const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
        await updateLeadStatus(id, newStatus);
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    };

    const handleDelete = async (id: string) => {
        if (confirm('¿Eliminar esta solicitud permanentemente?')) {
            await deleteLead(id);
            setLeads(prev => prev.filter(l => l.id !== id));
        }
    };

    const filteredLeads = leads.filter(l => 
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        l.parish.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (timestamp: any) => {
        if (!timestamp) return '-';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString();
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t('leads.title')}</h2>
                    <p className="text-slate-500 dark:text-slate-400">{t('leads.subtitle')}</p>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, parroquia o email..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emaus-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Leads List */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('leads.table.name')}</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('leads.table.parish')}</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('leads.table.status')}</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('leads.table.date')}</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">{t('leads.table.actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {loading ? (
                                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">Cargando solicitudes...</td></tr>
                            ) : filteredLeads.length === 0 ? (
                                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">No hay solicitudes.</td></tr>
                            ) : (
                                filteredLeads.map(lead => (
                                    <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                                {lead.name}
                                            </div>
                                            <div className="text-xs text-slate-500 mt-1 flex flex-col gap-1">
                                                <span className="flex items-center gap-1"><Briefcase className="w-3 h-3"/> {lead.role}</span>
                                                <span className="flex items-center gap-1"><Mail className="w-3 h-3"/> {lead.email}</span>
                                                <span className="flex items-center gap-1"><Phone className="w-3 h-3"/> {lead.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{lead.parish}</div>
                                            <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                                <MapPin className="w-3 h-3"/> {lead.diocese}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select 
                                                value={lead.status}
                                                onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                                                className={`text-xs font-bold uppercase rounded-lg px-2 py-1 border-none focus:ring-0 cursor-pointer ${STATUS_COLORS[lead.status]}`}
                                            >
                                                <option value="new">{t('leads.status.new')}</option>
                                                <option value="contacted">{t('leads.status.contacted')}</option>
                                                <option value="demo_scheduled">{t('leads.status.demo_scheduled')}</option>
                                                <option value="closed">{t('leads.status.closed')}</option>
                                                <option value="lost">{t('leads.status.lost')}</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                                            {formatDate(lead.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => handleDelete(lead.id)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LeadsManagement;
