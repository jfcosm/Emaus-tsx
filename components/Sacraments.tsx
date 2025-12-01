
import React, { useState, useEffect } from 'react';
import { SacramentType, SacramentRecord } from '../types';
import { mockSacraments } from '../services/mockData';
import { Search, Plus, Filter, Download, X, User, Users, Calendar, BookOpen, FileText, Edit2, Save, RotateCcw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Sacraments: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<SacramentType>(SacramentType.BAUTIZO);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<SacramentRecord | null>(null);
  
  // Edit Mode States
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<SacramentRecord | null>(null);

  // Initialize edit form when a record is selected
  useEffect(() => {
    if (selectedRecord) {
      setEditForm(selectedRecord);
      setIsEditing(false);
    }
  }, [selectedRecord]);

  const filteredData = mockSacraments.filter(
    (item) => 
      (activeTab === item.type) && 
      (item.personName.toLowerCase().includes(searchTerm.toLowerCase()) || item.celebrant.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCloseDetail = () => {
    setSelectedRecord(null);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof SacramentRecord, value: string) => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: value });
    }
  };

  const handleSave = () => {
    if (editForm) {
      setSelectedRecord(editForm);
      // In a real app, here you would call an API to save data
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditForm(selectedRecord);
    setIsEditing(false);
  };

  // --- DETAIL VIEW COMPONENT ---
  if (selectedRecord && editForm) {
    return (
      <div className="animate-fade-in space-y-6">
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
                    {isEditing ? t('sacraments.detail.editing') : `${t('sacraments.detail.view_details', {type: selectedRecord.type})}`}
                </h2>
                <p className="text-slate-500 dark:text-slate-400">{t('sacraments.detail.record_id')}: #{selectedRecord.id}</p>
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
           {/* Left Column: Main Info */}
           <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 relative">
                  
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                     <div className="w-16 h-16 bg-emaus-50 dark:bg-emaus-900/30 rounded-full flex items-center justify-center text-emaus-700 dark:text-emaus-400">
                        <User className="w-8 h-8" />
                     </div>
                     <div className="flex-1">
                        <span className="text-sm font-bold uppercase text-emaus-700 dark:text-emaus-400 tracking-wide block mb-1">
                            {t(`sacraments.types.${selectedRecord.type}`)}
                        </span>
                        {isEditing ? (
                            <input 
                                type="text"
                                value={editForm.personName}
                                onChange={(e) => handleInputChange('personName', e.target.value)}
                                className="w-full text-2xl font-bold text-slate-900 bg-white border-b-2 border-emaus-200 focus:border-emaus-500 focus:outline-none px-2 py-1 rounded shadow-sm"
                                placeholder="Nombre completo"
                            />
                        ) : (
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedRecord.personName}</h3>
                        )}
                        
                        <div className="text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-2">
                           <Calendar className="w-4 h-4" /> 
                           {isEditing ? (
                               <input 
                                   type="date"
                                   value={editForm.date}
                                   onChange={(e) => handleInputChange('date', e.target.value)}
                                   className="text-sm border border-slate-300 rounded px-2 py-1 bg-white text-slate-900 focus:ring-2 focus:ring-emaus-500 focus:outline-none shadow-sm"
                               />
                           ) : (
                               <span>{selectedRecord.date}</span>
                           )}
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                        <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                           <Users className="w-4 h-4" /> {t('sacraments.detail.parents')}
                        </h4>
                        {isEditing ? (
                            <textarea 
                                value={editForm.parents}
                                onChange={(e) => handleInputChange('parents', e.target.value)}
                                className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-emaus-500 focus:outline-none min-h-[80px] shadow-sm placeholder:text-slate-400"
                            />
                        ) : (
                            <p className="text-lg text-slate-800 dark:text-slate-200 font-medium bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                               {selectedRecord.parents || 'No registrado'}
                            </p>
                        )}
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                           <Users className="w-4 h-4" /> {t('sacraments.detail.godparents')}
                        </h4>
                        {isEditing ? (
                            <textarea 
                                value={editForm.godparents}
                                onChange={(e) => handleInputChange('godparents', e.target.value)}
                                className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-emaus-500 focus:outline-none min-h-[80px] shadow-sm placeholder:text-slate-400"
                            />
                        ) : (
                            <p className="text-lg text-slate-800 dark:text-slate-200 font-medium bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                               {selectedRecord.godparents || 'No registrado'}
                            </p>
                        )}
                     </div>
                  </div>

                  <div className="mt-8">
                     <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4" /> {t('sacraments.detail.observations')}
                     </h4>
                     {isEditing ? (
                        <textarea 
                            value={editForm.observations}
                            onChange={(e) => handleInputChange('observations', e.target.value)}
                            className="w-full p-4 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-emaus-500 focus:outline-none min-h-[100px] shadow-sm placeholder:text-slate-400"
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
                                className="w-full font-bold text-slate-800 bg-white border-b border-slate-300 focus:outline-none focus:border-emaus-500 py-1"
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
                                className="w-full font-bold text-slate-800 bg-white border-b border-slate-300 focus:outline-none focus:border-emaus-500 py-1"
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
                                className="w-full font-bold text-slate-800 bg-white border-b border-slate-300 focus:outline-none focus:border-emaus-500 py-1"
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
                                className="w-full font-bold text-slate-800 bg-white border-b border-slate-300 focus:outline-none focus:border-emaus-500 py-1"
                            />
                       ) : (
                            <span className="text-md font-bold text-slate-800 dark:text-white">{selectedRecord.parish || 'Parroquia Santa María'}</span>
                       )}
                    </div>
                 </div>
              </div>

              <div className="bg-gold-50 dark:bg-gold-900/10 p-6 rounded-2xl border border-gold-100 dark:border-gold-900/30">
                 <h4 className="text-sm font-bold text-gold-800 dark:text-gold-400 mb-2">Acciones Rápidas</h4>
                 <ul className="space-y-2">
                    <li>
                       <button className="w-full text-left text-sm text-gold-700 dark:text-gold-300 hover:text-gold-900 hover:underline py-1">
                          Generar Certificado Digital
                       </button>
                    </li>
                    <li>
                       <button className="w-full text-left text-sm text-gold-700 dark:text-gold-300 hover:text-gold-900 hover:underline py-1">
                          Ver Historial de Cambios
                       </button>
                    </li>
                 </ul>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // --- LIST VIEW (Original) ---
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t('sacraments.title')}</h2>
          <p className="text-slate-500 dark:text-slate-400">{t('sacraments.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 font-medium text-sm transition-colors">
            <Download className="w-4 h-4" /> {t('sacraments.export')}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emaus-700 text-white rounded-lg hover:bg-emaus-800 font-medium text-sm shadow-sm shadow-emaus-900/20 transition-colors">
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
              {filteredData.length > 0 ? (
                filteredData.map((record) => (
                  <tr 
                    key={record.id} 
                    className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group"
                    onClick={() => setSelectedRecord(record)}
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emaus-700 dark:group-hover:text-emaus-400 transition-colors">{record.personName}</div>
                      <div className="text-xs text-slate-400">ID: #{record.id}</div>
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
