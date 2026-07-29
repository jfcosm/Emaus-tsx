import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ParishDirectoryEntry } from '../types';
import { getAllUsers, updateUserPlan, createUserAsAdmin, sendUserPasswordReset } from '../services/adminService';
import { usePlansConfig } from '../contexts/PlansConfigContext';
import { savePlansConfig } from '../services/plansConfigService';
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
  UserPlus,
  Loader2
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

  // Tabs state
  const [activeTab, setActiveTab] = useState<'users' | 'plans'>('users');

  // Plans config state
  const { plansConfig, refreshPlansConfig } = usePlansConfig();
  const [localConfig, setLocalConfig] = useState(plansConfig);
  const [isSavingConfig, setIsSavingConfig] = useState(false);

  // Sync local config when context config changes
  useEffect(() => {
    setLocalConfig(plansConfig);
  }, [plansConfig]);

  const handleSaveConfig = async () => {
    setIsSavingConfig(true);
    try {
      await savePlansConfig(localConfig);
      await refreshPlansConfig();
      alert("Configuración de planes guardada exitosamente");
    } catch (err: any) {
      alert("Error al guardar configuración: " + err.message);
    } finally {
      setIsSavingConfig(false);
    }
  };

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

  const renderPlansConfigurator = () => {
    if (!localConfig) return null;
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* PLAN BÁSICO CARD */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-300 dark:bg-slate-700"></div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-slate-500" /> Plan Básico
              </h3>
              <p className="text-sm text-slate-500 mt-1">Configure los límites y accesos por defecto para parroquias con plan básico.</p>
            </div>
            
            <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              {/* Finances */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-sm text-slate-700 dark:text-slate-300">Módulo Contable (Finanzas)</label>
                  <input 
                    type="checkbox" 
                    checked={localConfig.basic.financesEnabled}
                    onChange={(e) => setLocalConfig(prev => ({
                      ...prev,
                      basic: { ...prev.basic, financesEnabled: e.target.checked }
                    }))}
                    className="w-4 h-4 text-emaus-600 rounded border-slate-300 focus:ring-emaus-500"
                  />
                </div>
                {localConfig.basic.financesEnabled && (
                  <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <label className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">Transacciones Máximas / Mes:</label>
                    <div className="flex items-center gap-2 flex-1">
                      <input 
                        type="number"
                        disabled={localConfig.basic.maxTransactionsPerMonth === -1}
                        value={localConfig.basic.maxTransactionsPerMonth === -1 ? '' : localConfig.basic.maxTransactionsPerMonth}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          basic: { ...prev.basic, maxTransactionsPerMonth: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-20 px-3 py-1.5 text-sm rounded border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                      <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={localConfig.basic.maxTransactionsPerMonth === -1}
                          onChange={(e) => setLocalConfig(prev => ({
                            ...prev,
                            basic: { ...prev.basic, maxTransactionsPerMonth: e.target.checked ? -1 : 10 }
                          }))}
                          className="w-3.5 h-3.5 text-emaus-600 rounded border-slate-300"
                        />
                        Ilimitado
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Documents */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-sm text-slate-700 dark:text-slate-300">Editor de Certificados (Documentos)</label>
                  <input 
                    type="checkbox" 
                    checked={localConfig.basic.documentsEnabled}
                    onChange={(e) => setLocalConfig(prev => ({
                      ...prev,
                      basic: { ...prev.basic, documentsEnabled: e.target.checked }
                    }))}
                    className="w-4 h-4 text-emaus-600 rounded border-slate-300"
                  />
                </div>
                {localConfig.basic.documentsEnabled && (
                  <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <label className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">Certificados Máximos / Mes:</label>
                    <div className="flex items-center gap-2 flex-1">
                      <input 
                        type="number"
                        disabled={localConfig.basic.maxPdfsPerMonth === -1}
                        value={localConfig.basic.maxPdfsPerMonth === -1 ? '' : localConfig.basic.maxPdfsPerMonth}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          basic: { ...prev.basic, maxPdfsPerMonth: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-20 px-3 py-1.5 text-sm rounded border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                      <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={localConfig.basic.maxPdfsPerMonth === -1}
                          onChange={(e) => setLocalConfig(prev => ({
                            ...prev,
                            basic: { ...prev.basic, maxPdfsPerMonth: e.target.checked ? -1 : 3 }
                          }))}
                          className="w-3.5 h-3.5 text-emaus-600 rounded border-slate-300"
                        />
                        Ilimitado
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Attachments */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-sm text-slate-700 dark:text-slate-300">Envío de Adjuntos (Mensajería)</label>
                  <input 
                    type="checkbox" 
                    checked={localConfig.basic.chatAttachmentsEnabled}
                    onChange={(e) => setLocalConfig(prev => ({
                      ...prev,
                      basic: { ...prev.basic, chatAttachmentsEnabled: e.target.checked }
                    }))}
                    className="w-4 h-4 text-emaus-600 rounded border-slate-300"
                  />
                </div>
                {localConfig.basic.chatAttachmentsEnabled && (
                  <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <label className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">Peso Máx de Archivo (MB):</label>
                    <input 
                      type="number"
                      value={localConfig.basic.maxAttachmentSizeMb}
                      onChange={(e) => setLocalConfig(prev => ({
                        ...prev,
                        basic: { ...prev.basic, maxAttachmentSizeMb: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-20 px-3 py-1.5 text-sm rounded border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* PLAN AVANZADO CARD */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-gold-300 to-gold-500"></div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-gold-500" /> Plan Avanzado
              </h3>
              <p className="text-sm text-slate-500 mt-1">Configure los límites y accesos por defecto para parroquias con plan avanzado.</p>
            </div>
            
            <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              {/* Finances */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-sm text-slate-700 dark:text-slate-300">Módulo Contable (Finanzas)</label>
                  <input 
                    type="checkbox" 
                    checked={localConfig.advanced.financesEnabled}
                    onChange={(e) => setLocalConfig(prev => ({
                      ...prev,
                      advanced: { ...prev.advanced, financesEnabled: e.target.checked }
                    }))}
                    className="w-4 h-4 text-emaus-600 rounded border-slate-300"
                  />
                </div>
                {localConfig.advanced.financesEnabled && (
                  <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <label className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">Transacciones Máximas / Mes:</label>
                    <div className="flex items-center gap-2 flex-1">
                      <input 
                        type="number"
                        disabled={localConfig.advanced.maxTransactionsPerMonth === -1}
                        value={localConfig.advanced.maxTransactionsPerMonth === -1 ? '' : localConfig.advanced.maxTransactionsPerMonth}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          advanced: { ...prev.advanced, maxTransactionsPerMonth: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-20 px-3 py-1.5 text-sm rounded border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                      <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={localConfig.advanced.maxTransactionsPerMonth === -1}
                          onChange={(e) => setLocalConfig(prev => ({
                            ...prev,
                            advanced: { ...prev.advanced, maxTransactionsPerMonth: e.target.checked ? -1 : 10 }
                          }))}
                          className="w-3.5 h-3.5 text-emaus-600 rounded border-slate-300"
                        />
                        Ilimitado
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Documents */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-sm text-slate-700 dark:text-slate-300">Editor de Certificados (Documentos)</label>
                  <input 
                    type="checkbox" 
                    checked={localConfig.advanced.documentsEnabled}
                    onChange={(e) => setLocalConfig(prev => ({
                      ...prev,
                      advanced: { ...prev.advanced, documentsEnabled: e.target.checked }
                    }))}
                    className="w-4 h-4 text-emaus-600 rounded border-slate-300"
                  />
                </div>
                {localConfig.advanced.documentsEnabled && (
                  <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <label className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">Certificados Máximos / Mes:</label>
                    <div className="flex items-center gap-2 flex-1">
                      <input 
                        type="number"
                        disabled={localConfig.advanced.maxPdfsPerMonth === -1}
                        value={localConfig.advanced.maxPdfsPerMonth === -1 ? '' : localConfig.advanced.maxPdfsPerMonth}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          advanced: { ...prev.advanced, maxPdfsPerMonth: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-20 px-3 py-1.5 text-sm rounded border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                      <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={localConfig.advanced.maxPdfsPerMonth === -1}
                          onChange={(e) => setLocalConfig(prev => ({
                            ...prev,
                            advanced: { ...prev.advanced, maxPdfsPerMonth: e.target.checked ? -1 : 3 }
                          }))}
                          className="w-3.5 h-3.5 text-emaus-600 rounded border-slate-300"
                        />
                        Ilimitado
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Attachments */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-sm text-slate-700 dark:text-slate-300">Envío de Adjuntos (Mensajería)</label>
                  <input 
                    type="checkbox" 
                    checked={localConfig.advanced.chatAttachmentsEnabled}
                    onChange={(e) => setLocalConfig(prev => ({
                      ...prev,
                      advanced: { ...prev.advanced, chatAttachmentsEnabled: e.target.checked }
                    }))}
                    className="w-4 h-4 text-emaus-600 rounded border-slate-300"
                  />
                </div>
                {localConfig.advanced.chatAttachmentsEnabled && (
                  <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <label className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">Peso Máx de Archivo (MB):</label>
                    <input 
                      type="number"
                      value={localConfig.advanced.maxAttachmentSizeMb}
                      onChange={(e) => setLocalConfig(prev => ({
                        ...prev,
                        advanced: { ...prev.advanced, maxAttachmentSizeMb: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-20 px-3 py-1.5 text-sm rounded border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSaveConfig}
            disabled={isSavingConfig}
            className="flex items-center gap-2 px-6 py-3 bg-emaus-700 hover:bg-emaus-800 text-white font-bold rounded-xl shadow-md transition-colors disabled:opacity-50"
          >
            {isSavingConfig ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Guardar Configuración
          </button>
        </div>

      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{activeTab === 'users' ? t('users.title') : 'Configuración de Planes'}</h2>
          <p className="text-slate-500 dark:text-slate-400">{activeTab === 'users' ? t('users.subtitle') : 'Defina los límites y características por defecto para cada plan.'}</p>
        </div>
        {activeTab === 'users' && (
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emaus-700 text-white rounded-lg hover:bg-emaus-800 font-medium shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> {t('users.create_user')}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'users' ? 'border-emaus-700 text-emaus-700 dark:border-gold-500 dark:text-gold-400' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <User className="w-4 h-4" /> {t('users.title')}
        </button>
        <button
          onClick={() => setActiveTab('plans')}
          className={`pb-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'plans' ? 'border-emaus-700 text-emaus-700 dark:border-gold-500 dark:text-gold-400' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <Shield className="w-4 h-4" /> Configuración de Planes
        </button>
      </div>

      {activeTab === 'plans' ? renderPlansConfigurator() : (
        <>
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
        </>
      )}

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