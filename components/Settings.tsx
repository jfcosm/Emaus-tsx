import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';
import { Save, User, MapPin, Phone, Mail, Building, FileSignature, CheckCircle, Shield, UserPlus, Image as ImageIcon, Camera, Loader2, Cross, Book, Church, Heart, Sun, Star, Music, Users, Upload } from 'lucide-react';
import { ParishSettings } from '../types';
import { getSettings, saveSettings, initializeParishDb, uploadParishImage } from '../services/settingsService';

// Import Firebase Compat for Admin tools
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Force git sync v1.9.7
const Settings: React.FC = () => {
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  const { refreshSettings } = useSettings();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  // Admin State
  const [isAdmin, setIsAdmin] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPass, setNewUserPass] = useState('');
  const [newUserPlan, setNewUserPlan] = useState<'basic' | 'advanced'>('basic');
  const [creatingUser, setCreatingUser] = useState(false);
  const [adminMsg, setAdminMsg] = useState('');
  
  // Visual Identity State
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<ParishSettings>({
    parishName: '',
    parishAddress: '',
    parishPhone: '',
    parishEmail: '',
    diocese: '',
    priestName: '',
    secretaryName: '',
    userRole: '',
    city: '',
    planType: 'advanced',
    avatarIcon: 'church',
    avatarColor: 'bg-emaus-600',
    coverImage: '',
    profileImage: ''
  });

  const avatarIcons = [
      { id: 'cross', icon: Cross, label: 'Cruz' },
      { id: 'church', icon: Church, label: 'Iglesia' },
      { id: 'book', icon: Book, label: 'Biblia' },
      { id: 'heart', icon: Heart, label: 'Corazón' },
      { id: 'sun', icon: Sun, label: 'Luz' },
      { id: 'star', icon: Star, label: 'Estrella' },
      { id: 'music', icon: Music, label: 'Música' },
      { id: 'users', icon: Users, label: 'Comunidad' },
  ];

  const avatarColors = [
      'bg-emaus-600', // Burdeos
      'bg-gold-500',  // Dorado
      'bg-blue-600',  // Mariano
      'bg-green-600', // Tiempo Ordinario
      'bg-purple-600', // Adviento/Cuaresma
      'bg-red-600',    // Mártires/Espíritu
      'bg-slate-700',  // Neutro
      'bg-orange-500', // Vivo
  ];

  useEffect(() => {
    loadSettings();
    if (currentUser?.email === 'admin@emaus.app') {
      setIsAdmin(true);
    }
  }, [currentUser]);

  const loadSettings = async () => {
    setLoading(true);
    const data = await getSettings();
    // Ensure defaults for visual identity
    setFormData({
        ...data,
        avatarIcon: data.avatarIcon || 'church',
        avatarColor: data.avatarColor || 'bg-emaus-600'
    });
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarIconChange = (iconId: string) => {
      setFormData(prev => ({ ...prev, avatarIcon: iconId }));
  };

  const handleAvatarColorChange = (colorClass: string) => {
      setFormData(prev => ({ ...prev, avatarColor: colorClass }));
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploadingCover(true);
      try {
          const url = await uploadParishImage(file, 'cover');
          setFormData(prev => ({ ...prev, coverImage: url }));
      } catch (error) {
          alert("Error al subir imagen");
      } finally {
          setUploadingCover(false);
      }
  };

  const handleProfileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploadingProfile(true);
      try {
          const url = await uploadParishImage(file, 'profile');
          setFormData(prev => ({ ...prev, profileImage: url }));
      } catch (error) {
          alert("Error al subir imagen de perfil");
      } finally {
          setUploadingProfile(false);
      }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    try {
      await saveSettings(formData);
      await refreshSettings();
      setSuccessMsg('Configuración guardada exitosamente.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      alert("Error al guardar la configuración");
    } finally {
      setSaving(false);
    }
  };

  // --- SUPER ADMIN LOGIC ---
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingUser(true);
    setAdminMsg('');
    try {
      const secondaryApp = firebase.initializeApp(firebase.app().options, "Secondary");
      const userCred = await secondaryApp.auth().createUserWithEmailAndPassword(newUserEmail, newUserPass);
      if (userCred.user) {
         await initializeParishDb(userCred.user.uid, newUserEmail, newUserPlan);
      }
      await secondaryApp.auth().signOut();
      await secondaryApp.delete();
      setAdminMsg(`Usuario creado: ${newUserEmail} (${newUserPlan})`);
      setNewUserEmail('');
      setNewUserPass('');
    } catch (error: any) {
      console.error("Error creating user:", error);
      setAdminMsg(`Error: ${error.message}`);
    } finally {
      setCreatingUser(false);
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
        {/* Left Column: User Info & Admin Tools */}
        <div className="space-y-6">
             <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Cuenta Actual</h3>
                <div className="flex items-center gap-4 mb-4">
                    {formData.profileImage ? (
                        <img 
                            src={formData.profileImage} 
                            alt="Perfil" 
                            className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                        />
                    ) : (
                        <div className={`w-12 h-12 ${formData.avatarColor} rounded-full flex items-center justify-center text-white`}>
                            {(() => {
                                const Icon = avatarIcons.find(i => i.id === formData.avatarIcon)?.icon || Church;
                                return <Icon className="w-6 h-6" />;
                            })()}
                        </div>
                    )}
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase">Usuario conectado</p>
                        <p className="font-bold text-slate-800 dark:text-white truncate max-w-[200px]">{currentUser?.email}</p>
                    </div>
                </div>
                
                {/* Plan Badge */}
                <div className="mb-4">
                   <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${formData.planType === 'basic' ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-gold-100 text-gold-700 border-gold-200'}`}>
                      {formData.planType === 'basic' ? 'Plan Básico' : 'Plan Avanzado'}
                   </span>
                </div>
             </div>

             {/* SUPER ADMIN PANEL */}
             {isAdmin && (
                 <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700 relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-2 opacity-10">
                        <Shield className="w-24 h-24 text-white" />
                     </div>
                     <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-gold-400" /> Super Admin
                     </h3>
                     
                     <form onSubmit={handleCreateUser} className="space-y-4 relative z-10">
                        <div>
                           <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nuevo Usuario (Email)</label>
                           <input 
                             type="email" 
                             required
                             value={newUserEmail}
                             onChange={(e) => setNewUserEmail(e.target.value)}
                             className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-gold-500 focus:outline-none"
                           />
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Contraseña</label>
                           <input 
                             type="text" 
                             required
                             value={newUserPass}
                             onChange={(e) => setNewUserPass(e.target.value)}
                             className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-gold-500 focus:outline-none"
                           />
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Plan</label>
                           <select 
                             value={newUserPlan}
                             onChange={(e) => setNewUserPlan(e.target.value as any)}
                             className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-gold-500 focus:outline-none"
                           >
                              <option value="basic">Plan Básico</option>
                              <option value="advanced">Plan Avanzado</option>
                           </select>
                        </div>
                        
                        <button 
                           type="submit"
                           disabled={creatingUser}
                           className="w-full py-2 bg-gold-500 text-emaus-900 rounded-lg font-bold text-sm hover:bg-gold-400 transition-colors flex items-center justify-center gap-2"
                        >
                           {creatingUser ? 'Creando...' : <><UserPlus className="w-4 h-4" /> Crear Usuario</>}
                        </button>
                        
                        {adminMsg && (
                           <div className={`text-xs p-2 rounded ${adminMsg.includes('Error') ? 'bg-red-900/50 text-red-200' : 'bg-green-900/50 text-green-200'}`}>
                              {adminMsg}
                           </div>
                        )}
                     </form>
                 </div>
             )}
        </div>

        {/* Right Column: Settings Form */}
        <div className="lg:col-span-2 space-y-6">
           <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* SECTION 1: VISUAL IDENTITY (NEW) */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                     <ImageIcon className="w-5 h-5 text-emaus-600" /> {t('settings.identity')}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Avatar & Profile Photo */}
                      <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-3">Foto de Perfil</label>
                          <div className="flex items-center gap-4 mb-6 bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                              <div className="relative group cursor-pointer" onClick={() => profileInputRef.current?.click()}>
                                  {formData.profileImage ? (
                                      <img 
                                          src={formData.profileImage} 
                                          alt="Profile" 
                                          className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-slate-600 shadow-md" 
                                      />
                                  ) : (
                                      <div className={`w-20 h-20 ${formData.avatarColor} rounded-full flex items-center justify-center text-white border-4 border-white dark:border-slate-600 shadow-md`}>
                                          {(() => {
                                              const Icon = avatarIcons.find(i => i.id === formData.avatarIcon)?.icon || Church;
                                              return <Icon className="w-10 h-10" />;
                                          })()}
                                      </div>
                                  )}
                                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Camera className="w-6 h-6 text-white" />
                                  </div>
                                  {uploadingProfile && (
                                      <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                                          <Loader2 className="w-6 h-6 text-white animate-spin" />
                                      </div>
                                  )}
                              </div>
                              <div className="flex-1">
                                  <p className="text-sm font-medium text-slate-800 dark:text-white mb-1">Imagen de Perfil</p>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Aparecerá en tus comentarios y publicaciones.</p>
                                  <button
                                    type="button"
                                    onClick={() => profileInputRef.current?.click()}
                                    className="text-xs bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 px-3 py-1.5 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors flex items-center gap-2"
                                  >
                                      <Upload className="w-3 h-3" /> Subir Foto
                                  </button>
                                  <input 
                                    ref={profileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleProfileUpload}
                                  />
                              </div>
                          </div>

                          <label className="block text-xs font-bold text-slate-500 uppercase mb-3">{t('settings.avatar_desc')}</label>
                          <div className="mb-4">
                              <p className="text-xs text-slate-400 mb-2">Icono (Se usa si no hay foto)</p>
                              <div className="grid grid-cols-4 gap-2">
                                  {avatarIcons.map(item => (
                                      <button
                                        type="button"
                                        key={item.id}
                                        onClick={() => handleAvatarIconChange(item.id)}
                                        className={`p-2 rounded-lg flex items-center justify-center transition-all ${formData.avatarIcon === item.id ? 'bg-emaus-100 border-2 border-emaus-500 text-emaus-700' : 'bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100'}`}
                                      >
                                          <item.icon className="w-6 h-6" />
                                      </button>
                                  ))}
                              </div>
                          </div>

                          <div>
                              <p className="text-xs text-slate-400 mb-2">Color Litúrgico</p>
                              <div className="flex flex-wrap gap-2">
                                  {avatarColors.map(color => (
                                      <button
                                        type="button"
                                        key={color}
                                        onClick={() => handleAvatarColorChange(color)}
                                        className={`w-8 h-8 rounded-full border-2 transition-all ${formData.avatarColor === color ? 'border-slate-800 scale-110' : 'border-transparent hover:scale-105'}`}
                                      >
                                          <div className={`w-full h-full rounded-full ${color}`}></div>
                                      </button>
                                  ))}
                              </div>
                          </div>
                      </div>

                      {/* Cover Image Upload */}
                      <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-3">{t('settings.cover_desc')}</label>
                          <div className="relative aspect-video rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-700 group">
                              {formData.coverImage ? (
                                  <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
                              ) : (
                                  <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                      <ImageIcon className="w-8 h-8 mb-2" />
                                      <span className="text-xs">{t('settings.cover_image')}</span>
                                  </div>
                              )}
                              
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <button
                                    type="button"
                                    onClick={() => coverInputRef.current?.click()}
                                    disabled={uploadingCover}
                                    className="px-4 py-2 bg-white text-slate-900 rounded-lg text-sm font-bold flex items-center gap-2"
                                  >
                                      {uploadingCover ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                                      {t('settings.upload_cover')}
                                  </button>
                              </div>
                              <input 
                                ref={coverInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleCoverUpload}
                              />
                          </div>
                      </div>
                  </div>
              </div>

              {/* SECTION 2: INSTITUTIONAL DATA */}
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

              {/* SECTION 3: STAFF */}
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
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre del Usuario (Operador)</label>
                              <input 
                                type="text"
                                name="secretaryName"
                                value={formData.secretaryName}
                                onChange={handleInputChange}
                                placeholder="Ej: María González"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emaus-500 focus:outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white dark:border-slate-700"
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Cargo / Rol</label>
                              <input 
                                type="text"
                                name="userRole"
                                value={formData.userRole}
                                onChange={handleInputChange}
                                placeholder="Ej: Secretaria, Diácono..."
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emaus-500 focus:outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white dark:border-slate-700"
                              />
                          </div>
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