
import React, { useState, useEffect } from 'react';
import { SacramentType, SacramentRecord } from '../types';
import { Search, Plus, Filter, Download, X, User, Users, Calendar, BookOpen, FileText, Edit2, Save, RotateCcw, Database, Heart, Cross, Baby } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getSacraments, updateSacrament, addSacrament, seedDatabase } from '../services/sacramentsService';

const Sacraments: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<SacramentType>(SacramentType.BAUTIZO);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<SacramentRecord | null>(null);
  
  // Data States
  const [sacraments, setSacraments] = useState<SacramentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Edit Mode States
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<SacramentRecord | null>(null);

  // Load Data from Firebase
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getSacraments();
      setSacraments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedData = async () => {
    setLoading(true);
    await seedDatabase();
    await loadData();
  };

  // Initialize edit form when a record is selected
  useEffect(() => {
    if (selectedRecord) {
      setEditForm(selectedRecord);
      setIsEditing(false);
    }
  }, [selectedRecord]);

  // Create New Record Logic
  const handleCreateNew = () => {
    const newRecord: SacramentRecord = {
      id: '', // Will be assigned by Firebase
      type: activeTab,
      date: new Date().toISOString().split('T')[0],
      celebrant: '',
      book: '',
      page: '',
      parish: 'Parroquia Santa María',
      // Default empty fields
      personName: '',
      fatherName: '',
      motherName: '',
    };
    setSelectedRecord(newRecord);
    setEditForm(newRecord);
    setIsEditing(true);
  };

  // Filter logic applied to REAL data
  const filteredData = sacraments.filter(
    (item) => {
      const matchType = activeTab === item.type;
      
      // Dynamic name check depending on type
      let nameToSearch = item.personName || '';
      if (item.type === SacramentType.MATRIMONIO && item.groomName && item.brideName) {
        nameToSearch = `${item.groomName} ${item.brideName}`;
      }

      const matchSearch = 
        nameToSearch.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.celebrant.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchType && matchSearch;
    }
  );

  const handleCloseDetail = () => {
    setSelectedRecord(null);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof SacramentRecord, value: any) => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: value });
    }
  };

  const handleSave = async () => {
    if (editForm) {
      try {
        if (editForm.id) {
          // Update existing
          await updateSacrament(editForm.id, editForm);
          setSacraments(prev => prev.map(item => item.id === editForm.id ? editForm : item));
        } else {
          // Create new (exclude id to let Firebase generate it)
          const { id, ...dataToSave } = editForm;
          const newId = await addSacrament(dataToSave);
          const newRecord = { ...editForm, id: newId };
          setSacraments(prev => [newRecord, ...prev]);
          setSelectedRecord(newRecord);
        }
        setIsEditing(false);
      } catch (e) {
        console.error("Error saving:", e);
        alert("Error al guardar cambios");
      }
    }
  };

  const handleCancelEdit = () => {
    if (!selectedRecord?.id) {
      // If cancelling creation of new record
      setSelectedRecord(null);
    } else {
      setEditForm(selectedRecord);
    }
    setIsEditing(false);
  };

  // Helper to get display name based on sacrament type
  const getDisplayName = (record: SacramentRecord) => {
    if (record.type === SacramentType.MATRIMONIO) {
      return `${record.groomName || 'Sin Nombre'} & ${record.brideName || 'Sin Nombre'}`;
    }
    return record.personName || 'Sin Nombre';
  };

  // Helper to render specific fields based on Sacrament Type
  const renderSpecificFields = () => {
    if (!editForm) return null;

    switch (editForm.type) {
      case SacramentType.BAUTIZO:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre Bautizado</label>
                {isEditing ? (
                  <input type="text" value={editForm.personName || ''} onChange={(e) => handleInputChange('personName', e.target.value)} className="input-field w-full" />
                ) : <p className="text-lg font-bold">{editForm.personName}</p>}
              </div>
              <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Charlas Bautismales</label>
                 {isEditing ? (
                   <label className="flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-slate-50">
                     <input 
                       type="checkbox" 
                       checked={editForm.baptismalTalksDone || false} 
                       onChange={(e) => handleInputChange('baptismalTalksDone', e.target.checked)} 
                       className="w-5 h-5 text-emaus-600 rounded focus:ring-emaus-500"
                     />
                     <span className="text-sm text-slate-700 font-medium">Realizadas</span>
                   </label>
                 ) : (
                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${editForm.baptismalTalksDone ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                     {editForm.baptismalTalksDone ? 'Realizadas' : 'Pendientes'}
                   </span>
                 )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Fecha Nacimiento</label>
                 {isEditing ? (
                    <input type="date" value={editForm.birthDate || ''} onChange={(e) => handleInputChange('birthDate', e.target.value)} className="input-field w-full" />
                 ) : <p>{editForm.birthDate || '-'}</p>}
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Lugar Nacimiento</label>
                 {isEditing ? (
                    <input type="text" value={editForm.birthPlace || ''} onChange={(e) => handleInputChange('birthPlace', e.target.value)} className="input-field w-full" />
                 ) : <p>{editForm.birthPlace || '-'}</p>}
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Padre</label>
                  {isEditing ? (
                    <input type="text" value={editForm.fatherName || ''} onChange={(e) => handleInputChange('fatherName', e.target.value)} className="input-field w-full" />
                  ) : <p>{editForm.fatherName || '-'}</p>}
               </div>
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Madre</label>
                  {isEditing ? (
                    <input type="text" value={editForm.motherName || ''} onChange={(e) => handleInputChange('motherName', e.target.value)} className="input-field w-full" />
                  ) : <p>{editForm.motherName || '-'}</p>}
               </div>
            </div>
            <div className="mb-4">
               <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Padrinos</label>
               {isEditing ? (
                 <textarea value={editForm.godparents || ''} onChange={(e) => handleInputChange('godparents', e.target.value)} className="input-field w-full h-20" />
               ) : <p>{editForm.godparents || '-'}</p>}
            </div>
          </>
        );

      case SacramentType.MATRIMONIO:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
               {/* GROOM */}
               <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                  <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-3 border-b border-blue-200 pb-2">Datos del Novio</h4>
                  <div className="space-y-3">
                     <div>
                       <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre Novio</label>
                       {isEditing ? (
                         <input type="text" value={editForm.groomName || ''} onChange={(e) => handleInputChange('groomName', e.target.value)} className="input-field w-full" />
                       ) : <p className="font-bold">{editForm.groomName}</p>}
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Padre Novio</label>
                       {isEditing ? (
                         <input type="text" value={editForm.groomFather || ''} onChange={(e) => handleInputChange('groomFather', e.target.value)} className="input-field w-full" />
                       ) : <p>{editForm.groomFather}</p>}
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Madre Novio</label>
                       {isEditing ? (
                         <input type="text" value={editForm.groomMother || ''} onChange={(e) => handleInputChange('groomMother', e.target.value)} className="input-field w-full" />
                       ) : <p>{editForm.groomMother}</p>}
                     </div>
                  </div>
               </div>

               {/* BRIDE */}
               <div className="bg-pink-50 dark:bg-pink-900/10 p-4 rounded-lg border border-pink-100 dark:border-pink-900/30">
                  <h4 className="font-bold text-pink-800 dark:text-pink-300 mb-3 border-b border-pink-200 pb-2">Datos de la Novia</h4>
                  <div className="space-y-3">
                     <div>
                       <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre Novia</label>
                       {isEditing ? (
                         <input type="text" value={editForm.brideName || ''} onChange={(e) => handleInputChange('brideName', e.target.value)} className="input-field w-full" />
                       ) : <p className="font-bold">{editForm.brideName}</p>}
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Padre Novia</label>
                       {isEditing ? (
                         <input type="text" value={editForm.brideFather || ''} onChange={(e) => handleInputChange('brideFather', e.target.value)} className="input-field w-full" />
                       ) : <p>{editForm.brideFather}</p>}
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Madre Novia</label>
                       {isEditing ? (
                         <input type="text" value={editForm.brideMother || ''} onChange={(e) => handleInputChange('brideMother', e.target.value)} className="input-field w-full" />
                       ) : <p>{editForm.brideMother}</p>}
                     </div>
                  </div>
               </div>
            </div>
            <div className="mb-4">
               <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Testigos</label>
               {isEditing ? (
                 <textarea value={editForm.witnesses || ''} onChange={(e) => handleInputChange('witnesses', e.target.value)} className="input-field w-full h-16" />
               ) : <p>{editForm.witnesses || '-'}</p>}
            </div>
          </>
        );

      case SacramentType.CONFIRMACION:
        return (
          <>
             <div className="mb-4">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre Confirmado</label>
                {isEditing ? (
                  <input type="text" value={editForm.personName || ''} onChange={(e) => handleInputChange('personName', e.target.value)} className="input-field w-full" />
                ) : <p className="text-lg font-bold">{editForm.personName}</p>}
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Padrino/Madrina</label>
                  {isEditing ? (
                    <input type="text" value={editForm.confirmationSponsor || ''} onChange={(e) => handleInputChange('confirmationSponsor', e.target.value)} className="input-field w-full" />
                  ) : <p>{editForm.confirmationSponsor || '-'}</p>}
               </div>
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Parroquia de Bautismo</label>
                  {isEditing ? (
                    <input type="text" value={editForm.baptismParish || ''} onChange={(e) => handleInputChange('baptismParish', e.target.value)} className="input-field w-full" />
                  ) : <p>{editForm.baptismParish || '-'}</p>}
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Padre</label>
                  {isEditing ? (
                    <input type="text" value={editForm.fatherName || ''} onChange={(e) => handleInputChange('fatherName', e.target.value)} className="input-field w-full" />
                  ) : <p>{editForm.fatherName || '-'}</p>}
               </div>
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Madre</label>
                  {isEditing ? (
                    <input type="text" value={editForm.motherName || ''} onChange={(e) => handleInputChange('motherName', e.target.value)} className="input-field w-full" />
                  ) : <p>{editForm.motherName || '-'}</p>}
               </div>
            </div>
          </>
        );

      case SacramentType.DEFUNCION:
        return (
           <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre Difunto</label>
                    {isEditing ? (
                      <input type="text" value={editForm.personName || ''} onChange={(e) => handleInputChange('personName', e.target.value)} className="input-field w-full" />
                    ) : <p className="text-lg font-bold">{editForm.personName}</p>}
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Edad</label>
                    {isEditing ? (
                      <input type="number" value={editForm.age || ''} onChange={(e) => handleInputChange('age', parseInt(e.target.value))} className="input-field w-24" />
                    ) : <p>{editForm.age ? `${editForm.age} años` : '-'}</p>}
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Cónyuge (si aplica)</label>
                    {isEditing ? (
                      <input type="text" value={editForm.spouseName || ''} onChange={(e) => handleInputChange('spouseName', e.target.value)} className="input-field w-full" />
                    ) : <p>{editForm.spouseName || '-'}</p>}
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Causa de Muerte</label>
                    {isEditing ? (
                      <input type="text" value={editForm.causeOfDeath || ''} onChange={(e) => handleInputChange('causeOfDeath', e.target.value)} className="input-field w-full" />
                    ) : <p>{editForm.causeOfDeath || '-'}</p>}
                 </div>
              </div>
              <div className="mb-4">
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Cementerio</label>
                 {isEditing ? (
                   <input type="text" value={editForm.cemetery || ''} onChange={(e) => handleInputChange('cemetery', e.target.value)} className="input-field w-full" />
                 ) : <p>{editForm.cemetery || '-'}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Padre</label>
                  {isEditing ? (
                    <input type="text" value={editForm.fatherName || ''} onChange={(e) => handleInputChange('fatherName', e.target.value)} className="input-field w-full" />
                  ) : <p>{editForm.fatherName || '-'}</p>}
               </div>
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Madre</label>
                  {isEditing ? (
                    <input type="text" value={editForm.motherName || ''} onChange={(e) => handleInputChange('motherName', e.target.value)} className="input-field w-full" />
                  ) : <p>{editForm.motherName || '-'}</p>}
               </div>
            </div>
           </>
        );

      default:
        // Default generic view (Primera Comunión, etc)
        return (
          <div className="mb-4">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre</label>
            {isEditing ? (
              <input type="text" value={editForm.personName || ''} onChange={(e) => handleInputChange('personName', e.target.value)} className="input-field w-full" />
            ) : <p className="text-lg font-bold">{editForm.personName}</p>}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Padre</label>
                  {isEditing ? (
                    <input type="text" value={editForm.fatherName || ''} onChange={(e) => handleInputChange('fatherName', e.target.value)} className="input-field w-full" />
                  ) : <p>{editForm.fatherName || '-'}</p>}
               </div>
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Madre</label>
                  {isEditing ? (
                    <input type="text" value={editForm.motherName || ''} onChange={(e) => handleInputChange('motherName', e.target.value)} className="input-field w-full" />
                  ) : <p>{editForm.motherName || '-'}</p>}
               </div>
            </div>
          </div>
        );
    }
  };

  // --- DETAIL VIEW COMPONENT ---
  if (selectedRecord && editForm) {
    return (
      <div className="animate-fade-in space-y-6">
        <style>{`
          .input-field {
            @apply w-full border border-slate-300 rounded px-3 py-2 bg-white text-slate-900 focus:ring-2 focus:ring-emaus-500 focus:outline-none shadow-sm dark:bg-slate-800 dark:text-white dark:border-slate-700;
          }
        `}</style>
        {/* Detail Header */}
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
              <button 
                onClick={handleCloseDetail}
                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate-500 dark:text-slate-400" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                    {isEditing ? (selectedRecord.id ? t('sacraments.detail.editing') : 'Creando Registro') : `${t('sacraments.detail.view_details', {type: selectedRecord.type})}`}
                </h2>
                {selectedRecord.id && <p className="text-slate-500 dark:text-slate-400">{t('sacraments.detail.record_id')}: #{selectedRecord.id}</p>}
              </div>
           </div>
           
           <div className="flex gap-2">
              {!isEditing ? (
                <>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-emaus-700 text-white rounded-lg hover:bg-emaus-800 font-medium text-sm shadow-sm transition-colors"
                  >
                     <Edit2 className="w-4 h-4" /> {t('sacraments.detail.edit')}
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleCancelEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 font-medium text-sm transition-colors"
                  >
                     <RotateCcw className="w-4 h-4" /> {t('sacraments.detail.cancel')}
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm shadow-sm transition-colors"
                  >
                     <Save className="w-4 h-4" /> {t('sacraments.detail.save')}
                  </button>
                </>
              )}
           </div>
        </div>

        {/* Card Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Left Column: Specific Info */}
           <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 relative">
                  
                  {/* Header of the Form: Icon & Type */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                     <div className="w-16 h-16 bg-emaus-50 dark:bg-emaus-900/30 rounded-full flex items-center justify-center text-emaus-700 dark:text-emaus-400">
                        {selectedRecord.type === SacramentType.BAUTIZO && <Baby className="w-8 h-8" />}
                        {selectedRecord.type === SacramentType.MATRIMONIO && <Heart className="w-8 h-8" />}
                        {selectedRecord.type === SacramentType.DEFUNCION && <Cross className="w-8 h-8" />}
                        {(selectedRecord.type === SacramentType.CONFIRMACION || selectedRecord.type === SacramentType.PRIMERA_COMUNION) && <User className="w-8 h-8" />}
                     </div>
                     <div className="flex-1">
                        <span className="text-sm font-bold uppercase text-emaus-700 dark:text-emaus-400 tracking-wide block mb-1">
                            {t(`sacraments.types.${selectedRecord.type}`)}
                        </span>
                        <div className="flex items-center gap-4">
                           <div className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                              <Calendar className="w-4 h-4" /> 
                              {isEditing ? (
                                  <input 
                                      type="date"
                                      value={editForm.date}
                                      onChange={(e) => handleInputChange('date', e.target.value)}
                                      className="input-field"
                                  />
                              ) : (
                                  <span className="text-lg font-medium text-slate-800 dark:text-white">{selectedRecord.date}</span>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Dynamic Fields Section */}
                  <div className="bg-slate-50 dark:bg-slate-950/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800 mb-6">
                     {renderSpecificFields()}
                  </div>

                  {/* Observations */}
                  <div className="mt-8">
                     <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4" /> {t('sacraments.detail.observations')}
                     </h4>
                     {isEditing ? (
                        <textarea 
                            value={editForm.observations || ''}
                            onChange={(e) => handleInputChange('observations', e.target.value)}
                            className="input-field min-h-[100px]"
                        />
                     ) : (
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-amber-50 dark:bg-amber-900/10 p-4 rounded-lg border border-amber-100 dark:border-amber-900/30 italic">
                            {selectedRecord.observations || 'Sin observaciones adicionales.'}
                        </p>
                     )}
                  </div>
              </div>
           </div>

           {/* Right Column: Registry Metadata */}
           <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                 <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> {t('sacraments.detail.book_data')}
                 </h4>
                 
                 <div className="space-y-4">
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                       <span className="text-xs text-slate-400 block mb-1">{t('sacraments.detail.book')}</span>
                       {isEditing ? (
                            <input 
                                type="text"
                                value={editForm.book}
                                onChange={(e) => handleInputChange('book', e.target.value)}
                                className="input-field font-bold py-1"
                            />
                       ) : (
                            <span className="text-xl font-bold text-slate-800 dark:text-white">{selectedRecord.book}</span>
                       )}
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                       <span className="text-xs text-slate-400 block mb-1">{t('sacraments.detail.page')}</span>
                       {isEditing ? (
                            <input 
                                type="text"
                                value={editForm.page}
                                onChange={(e) => handleInputChange('page', e.target.value)}
                                className="input-field font-bold py-1"
                            />
                       ) : (
                            <span className="text-xl font-bold text-slate-800 dark:text-white">{selectedRecord.page}</span>
                       )}
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                       <span className="text-xs text-slate-400 block mb-1">{t('sacraments.table.celebrant')}</span>
                       {isEditing ? (
                            <input 
                                type="text"
                                value={editForm.celebrant}
                                onChange={(e) => handleInputChange('celebrant', e.target.value)}
                                className="input-field font-bold py-1"
                            />
                       ) : (
                            <span className="text-md font-bold text-slate-800 dark:text-white">{selectedRecord.celebrant}</span>
                       )}
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                       <span className="text-xs text-slate-400 block mb-1">{t('sacraments.detail.parish')}</span>
                       {isEditing ? (
                            <input 
                                type="text"
                                value={editForm.parish}
                                onChange={(e) => handleInputChange('parish', e.target.value)}
                                className="input-field font-bold py-1"
                            />
                       ) : (
                            <span className="text-md font-bold text-slate-800 dark:text-white">{selectedRecord.parish || 'Parroquia Santa María'}</span>
                       )}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // --- LIST VIEW (Connected to DB) ---
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t('sacraments.title')}</h2>
          <p className="text-slate-500 dark:text-slate-400">{t('sacraments.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          {sacraments.length === 0 && !loading && (
             <button 
               onClick={handleSeedData}
               className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 font-medium text-sm transition-colors border border-slate-200"
             >
                <Database className="w-4 h-4" /> Cargar Datos Ejemplo
             </button>
          )}
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 font-medium text-sm transition-colors">
            <Download className="w-4 h-4" /> {t('sacraments.export')}
          </button>
          <button 
            onClick={handleCreateNew}
            className="flex items-center gap-2 px-4 py-2 bg-emaus-700 text-white rounded-lg hover:bg-emaus-800 font-medium text-sm shadow-sm shadow-emaus-900/20 transition-colors"
          >
            <Plus className="w-4 h-4" /> {t('sacraments.new_record')}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
        {Object.values(SacramentType).map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
              ${activeTab === type 
                ? 'bg-emaus-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-md' 
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'}
            `}
          >
            {t(`sacraments.types.${type}`)}
          </button>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder={t('sacraments.search_placeholder')}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emaus-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('sacraments.table.name')}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('sacraments.table.date')}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('sacraments.table.celebrant')}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('sacraments.table.book_page')}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('sacraments.table.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                     Cargando registros...
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((record) => (
                  <tr 
                    key={record.id} 
                    className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group"
                    onClick={() => setSelectedRecord(record)}
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emaus-700 dark:group-hover:text-emaus-400 transition-colors">
                        {getDisplayName(record)}
                      </div>
                      <div className="text-xs text-slate-400">ID: #{record.id.slice(0, 8)}...</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{record.date}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{record.celebrant}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold-50 dark:bg-gold-900/20 text-gold-700 dark:text-gold-300 border border-gold-100 dark:border-gold-900/30">
                        L: {record.book} / P: {record.page}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRecord(record);
                        }}
                        className="text-emaus-700 dark:text-emaus-400 hover:text-emaus-900 dark:hover:text-emaus-200 text-sm font-medium hover:underline"
                      >
                        {t('sacraments.table.view_details')}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    {t('sacraments.table.no_records')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sacraments;
