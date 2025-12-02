
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';
import { Save, User, MapPin, Phone, Mail, Building, FileSignature, CheckCircle } from 'lucide-react';
import { ParishSettings } from '../types';
import { getSettings, saveSettings } from '../services/settingsService';

const Settings: React.FC = () => {
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  const { refreshSettings } = useSettings();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  const [formData, setFormData] = useState<ParishSettings>({
    parishName: '',
    parishAddress: '',
    parishPhone: '',
    parishEmail: '',
    diocese: '',
    priestName: '',
    secretaryName: '',
    city: ''
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    const data = await getSettings();
    setFormData(data);
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    try {
      await saveSettings(formData);
      await refreshSettings(); // Update global context immediately
      setSuccessMsg('Configuración guardada exitosamente.');
      // Auto hide success message
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      alert("Error al guardar la configuración");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Cargando configuración...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t('sidebar.settings')}</h2>
          <p className="text-slate-500 dark:text-slate-400">Personalice los datos institucionales y operativos.</p>
        </div>
        
        {successMsg && (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg animate-fade-in">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">{successMsg}</span>
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: User Info (Read Only) */}
        <div className="space-y-6">
             <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Cuenta Actual</h3>
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-emaus-100 dark:bg-emaus-900/30 rounded-full flex items-center justify-center text-emaus-700 dark:text-emaus-400">
                        <User className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase">Usuario conectado</p>
                        <p className="font-bold text-slate-800 dark:text-white truncate max-w-[200px]">{currentUser?.email}</p>
                    </div>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-xs leading-relaxed">
                   Este es el usuario administrador de la cuenta. Los cambios que realice aquí afectarán a los documentos y registros generados.
                </div>
             </div>
        </div>

        {/* Right Column: Settings Form */}
        <div className="lg:col-span-2">
           <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* SECTION 1: INSTITUTIONAL DATA */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                     <Building className="w-5 h-5 text-emaus-600" /> Datos de la Parroquia
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre de la Parroquia</label>
                          <input 
                            type="text"
                            name="parishName"
                            value={formData.parishName}
                            onChange={handleInputChange}
                            placeholder="Ej: Parroquia Santa María Reina"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emaus-500 focus:outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white dark:border-slate-700"
                          />
                      </div>

                      <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Diócesis / Arquidiócesis</label>
                          <input 
                            type="text"
                            name="diocese"
                            value={formData.diocese}
                            onChange={handleInputChange}
                            placeholder="Ej: Arquidiócesis de Santiago"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emaus-500 focus:outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white dark:border-slate-700"
                          />
                      </div>
                      
                      <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Ciudad / Comuna</label>
                          <input 
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Ej: Providencia"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emaus-500 focus:outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white dark:border-slate-700"
                          />
                      </div>

                      <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Dirección</label>
                          <input 
                            type="text"
                            name="parishAddress"
                            value={formData.parishAddress}
                            onChange={handleInputChange}
                            placeholder="Calle Principal 123"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emaus-500 focus:outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white dark:border-slate-700"
                          />
                      </div>

                      <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1"><Phone className="w-3 h-3" /> Teléfono</label>
                          <input 
                            type="text"
                            name="parishPhone"
                            value={formData.parishPhone}
                            onChange={handleInputChange}
                            placeholder="+56 2 2222 3333"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emaus-500 focus:outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white dark:border-slate-700"
                          />
                      </div>

                      <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1"><Mail className="w-3 h-3" /> Correo Electrónico</label>
                          <input 
                            type="email"
                            name="parishEmail"
                            value={formData.parishEmail}
                            onChange={handleInputChange}
                            placeholder="contacto@parroquia.cl"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emaus-500 focus:outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white dark:border-slate-700"
                          />
                      </div>
                  </div>
              </div>

              {/* SECTION 2: STAFF & OPERATIONAL */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                     <FileSignature className="w-5 h-5 text-emaus-600" /> Datos del Personal
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-6">
                      <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre del Párroco (Celebrante por defecto)</label>
                          <input 
                            type="text"
                            name="priestName"
                            value={formData.priestName}
                            onChange={handleInputChange}
                            placeholder="Ej: Pbro. Juan Pérez"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emaus-500 focus:outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white dark:border-slate-700"
                          />
                          <p className="text-xs text-slate-400 mt-1">Este nombre aparecerá automáticamente al crear nuevos registros de sacramentos.</p>
                      </div>

                      <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre de la Secretaria (Operador)</label>
                          <input 
                            type="text"
                            name="secretaryName"
                            value={formData.secretaryName}
                            onChange={handleInputChange}
                            placeholder="Ej: María González"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emaus-500 focus:outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white dark:border-slate-700"
                          />
                          <p className="text-xs text-slate-400 mt-1">Nombre utilizado para firmas de documentos internos o pies de página.</p>
                      </div>
                  </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-end pt-4">
                  <button 
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 px-8 py-3 bg-emaus-700 text-white rounded-xl hover:bg-emaus-800 font-bold shadow-lg shadow-emaus-900/20 transition-all disabled:opacity-50"
                  >
                     <Save className="w-5 h-5" />
                     {saving ? 'Guardando...' : 'Guardar Configuración'}
                  </button>
              </div>

           </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
