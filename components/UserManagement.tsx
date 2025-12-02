import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ParishDirectoryEntry } from '../types';
import { getAllUsers, updateUserPlan, createUserAsAdmin, sendUserPasswordReset } from '../services/adminService';
import { 
  Search, 
  Plus, 
  User, 
  Shield, 
  CheckCircle, 
  Lock, 
  Edit2, 
  RefreshCw, 
  KeyRound, 
  X, 
  Save,
  UserPlus
} from 'lucide-react';

const UserManagement: React.FC = () => {
  const { t } = useLanguage();
  
  const [users, setUsers] = useState<ParishDirectoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Create Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPlan, setNewPlan] = useState<'basic' | 'advanced'>('basic');
  const [creating, setCreating] = useState(false);

  // Edit Plan Modal State
  const [editingUser, setEditingUser] = useState<ParishDirectoryEntry | null>(null);
  const [editPlan, setEditPlan] = useState<'basic' | 'advanced'>('basic');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const data = await getAllUsers();
    setUsers(data);
    setLoading(false);
  };

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.parishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      await createUserAsAdmin(newEmail, newPassword, newPlan);
      await loadUsers();
      setShowCreateModal(false);
      setNewEmail('');
      setNewPassword('');
      alert("Usuario creado exitosamente");
    } catch (error: any) {
      alert("Error al crear usuario: " + error.message);
    } finally {
      setCreating(false);
    }
  };

  const handleSavePlan = async () => {
    if (!editingUser) return;
    setSaving(true);
    try {
      await updateUserPlan(editingUser, editPlan);
      await loadUsers();
      setEditingUser(null);
    } catch (error) {
      alert("Error al actualizar plan");
    } finally {
      setSaving(false);
    }
  };

  const handleResetPassword = async (email: string) => {
    if (confirm(`¿Enviar correo de recuperación a ${email}?`)) {
        try {
            await sendUserPasswordReset(email);
            alert("Correo enviado.");
        } catch (error: any) {
            alert("Error: " + error.message);
        }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t('users.title')}</h2>
          <p className="text-slate-500 dark:text-slate-400">{t('users.subtitle')}</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emaus-700 text-white rounded-lg hover:bg-emaus-800 font-medium shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> {t('users.create_user')}
        </button>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder={t('users.search_placeholder')}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emaus-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('users.table.email')}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('users.table.parish')}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('users.table.city')}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('users.table.plan')}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">{t('users.table.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">Cargando usuarios...</td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">No se encontraron usuarios.</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.email} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800 dark:text-white">{user.email}</div>
                      <div className={`text-xs font-mono mt-1 ${user.uid ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-400'}`}>
                         {user.uid ? 'UID Linked' : 'No UID (Log in user to fix)'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{user.parishName}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{user.city}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                        user.planType === 'advanced' 
                          ? 'bg-gold-100 text-gold-800 dark:bg-gold-900/30 dark:text-gold-400' 
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {user.planType === 'advanced' ? <CheckCircle className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                        {user.planType === 'basic' ? 'Básico' : 'Avanzado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => { setEditingUser(user); setEditPlan(user.planType); }}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                          title={t('users.actions.edit_plan')}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleResetPassword(user.email)}
                          className="p-2 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg"
                          title={t('users.actions.reset_pass')}
                        >
                          <KeyRound className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
           <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                 <h3 className="font-bold text-lg text-slate-800 dark:text-white">{t('users.modal.create_title')}</h3>
                 <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleCreate} className="p-6 space-y-4">
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('users.modal.email')}</label>
                    <input 
                      type="email" 
                      required 
                      value={newEmail} 
                      onChange={e => setNewEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emaus-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('users.modal.password')}</label>
                    <input 
                      type="text" 
                      required 
                      value={newPassword} 
                      onChange={e => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emaus-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('users.modal.plan')}</label>
                    <select 
                      value={newPlan} 
                      onChange={e => setNewPlan(e.target.value as any)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emaus-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    >
                       <option value="basic">Plan Básico</option>
                       <option value="advanced">Plan Avanzado</option>
                    </select>
                 </div>
                 <button 
                   type="submit" 
                   disabled={creating}
                   className="w-full py-2 bg-emaus-700 text-white rounded-lg font-bold hover:bg-emaus-800 transition-colors flex justify-center items-center gap-2"
                 >
                    {creating ? 'Creando...' : <><UserPlus className="w-4 h-4" /> {t('users.modal.create')}</>}
                 </button>
              </form>
           </div>
        </div>
      )}

      {/* EDIT PLAN MODAL */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
           <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                 <h3 className="font-bold text-lg text-slate-800 dark:text-white">{t('users.modal.edit_plan_title')}</h3>
                 <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                 <p className="text-sm text-slate-500 dark:text-slate-400">Usuario: <strong>{editingUser.email}</strong></p>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('users.modal.plan')}</label>
                    <select 
                      value={editPlan} 
                      onChange={e => setEditPlan(e.target.value as any)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emaus-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    >
                       <option value="basic">Plan Básico</option>
                       <option value="advanced">Plan Avanzado</option>
                    </select>
                 </div>
                 <button 
                   onClick={handleSavePlan}
                   disabled={saving}
                   className="w-full py-2 bg-emaus-700 text-white rounded-lg font-bold hover:bg-emaus-800 transition-colors flex justify-center items-center gap-2"
                 >
                    {saving ? 'Guardando...' : <><Save className="w-4 h-4" /> {t('users.modal.save')}</>}
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;