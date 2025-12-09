
import React, { useState, useEffect, useRef } from 'react';
import { SacramentType, SacramentRecord } from '../types';
import { Search, Plus, Filter, Download, X, User, Users, Calendar, BookOpen, FileText, Edit2, Save, RotateCcw, Database, Heart, Cross, Baby, ArrowLeft, ChevronRight, Printer, Cloud, Check, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../contexts/SettingsContext';
import { getSacraments, updateSacrament, addSacrament, seedDatabase } from '../services/sacramentsService';
import { createDocument, ensureFolderStructure } from '../services/documentsService';
import { formatRut, validateRut, cleanRut } from '../services/rutUtils';

declare var html2pdf: any;

// --- REUSABLE RUT INPUT COMPONENT ---
interface RutInputProps {
    value: string;
    onChange: (val: string) => void;
    label?: string;
    className?: string;
    placeholder?: string;
}

const RutInput: React.FC<RutInputProps> = ({ value, onChange, label, className, placeholder = '12.345.678-9' }) => {
    const isValid = validateRut(value);
    const isEmpty = !value || value.trim() === '';
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // User types, we clean and format on the fly or just let them type and format on blur?
        // Prompt says "el guion se escribira automaticamente".
        // Let's format as they type (basic) or just handle raw input and format the display value.
        const raw = e.target.value;
        // If user is deleting, allow it. If user types, enforce format.
        // Simple approach: Format on every change if possible, but handle cursor.
        // For simplicity in React without complex cursor management:
        // We will just let them type and apply formatRut logic which is robust.
        
        // However, standard behavior is allowing typing and formatting. 
        // Let's just update the value with formatted version if it looks like a RUT.
        
        // Edge case: don't double format if deleting.
        // We will pass the formatted value back.
        const clean = cleanRut(raw);
        const formatted = formatRut(clean);
        onChange(formatted);
    };

    return (
        <div className={className}>
            {label && <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">{label}</label>}
            <div className="relative">
                <input 
                    type="text" 
                    value={value} 
                    onChange={handleChange}
                    placeholder={placeholder}
                    maxLength={12}
                    className={`w-full border rounded px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:outline-none pr-10 
                        ${isEmpty ? 'border-slate-300 dark:border-slate-600 focus:ring-emaus-500' : 
                          isValid ? 'border-green-500 focus:ring-green-500' : 'border-red-500 focus:ring-red-500'}`}
                />
                {!isEmpty && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {isValid ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-red-500" />}
                    </div>
                )}
            </div>
            {!isEmpty && !isValid && (
                <p className="text-[10px] text-red-500 mt-1">RUT inválido</p>
            )}
        </div>
    );
};

// --- REUSABLE NAME LIST INPUT (TAGS) ---
interface NameListInputProps {
    value: string; // Comma separated string from DB
    onChange: (val: string) => void;
    label: string;
    placeholder?: string;
    className?: string;
}

const NameListInput: React.FC<NameListInputProps> = ({ value, onChange, label, placeholder, className }) => {
    const [inputValue, setInputValue] = useState('');
    const names = value ? value.split(',').map(s => s.trim()).filter(s => s !== '') : [];

    const addName = () => {
        if (!inputValue.trim()) return;
        const newNames = [...names, inputValue.trim()];
        onChange(newNames.join(', '));
        setInputValue('');
    };

    const removeName = (index: number) => {
        const newNames = names.filter((_, i) => i !== index);
        onChange(newNames.join(', '));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addName();
        }
        if (e.key === 'Backspace' && inputValue === '' && names.length > 0) {
            removeName(names.length - 1);
        }
    };

    return (
        <div className={className}>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">{label}</label>
            <div className="w-full border border-slate-300 dark:border-slate-600 rounded px-2 py-2 bg-white dark:bg-slate-800 focus-within:ring-2 focus-within:ring-emaus-500 focus-within:border-transparent flex flex-wrap gap-2 min-h-[42px]">
                {names.map((name, idx) => (
                    <span key={idx} className="bg-emaus-100 dark:bg-emaus-900/40 text-emaus-800 dark:text-emaus-200 text-sm px-2 py-1 rounded-full flex items-center gap-1 animate-fade-in">
                        {name}
                        <button 
                            onClick={() => removeName(idx)}
                            className="hover:bg-emaus-200 dark:hover:bg-emaus-800 rounded-full p-0.5 transition-colors"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </span>
                ))}
                <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={addName} // Add on blur as well
                    placeholder={names.length === 0 ? placeholder : ''}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white min-w-[120px] text-sm p-1"
                />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Presiona Enter o Coma para agregar nombres</p>
        </div>
    );
};

const Sacraments: React.FC = () => {
  const { t } = useLanguage();
  const { settings } = useSettings();
  
  // State
  const [activeTab, setActiveTab] = useState<SacramentType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<SacramentRecord | null>(null);
  const [sacraments, setSacraments] = useState<SacramentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<SacramentRecord | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  // Certificate State
  const [generatingCert, setGeneratingCert] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  // Load Data
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

  useEffect(() => {
    if (selectedRecord) {
      setEditForm(selectedRecord);
      if (selectedRecord.id) {
        setIsEditing(false);
      }
    }
  }, [selectedRecord]);

  const handleCreateNew = () => {
    if (!activeTab) return;
    const newRecord: SacramentRecord = {
      id: '', 
      type: activeTab,
      date: new Date().toISOString().split('T')[0],
      celebrant: settings.priestName || '',
      book: '',
      page: '',
      parish: settings.parishName || 'Parroquia Santa María',
      personName: '',
      rut: '', // Initialize generic RUT
      fatherName: '',
      motherName: '',
    };
    setSelectedRecord(newRecord);
    setEditForm(newRecord);
    setIsEditing(true);
  };

  const filteredData = sacraments.filter((item) => {
      const matchType = activeTab === item.type;
      let nameToSearch = item.personName || '';
      if (item.type === SacramentType.MATRIMONIO && item.groomName && item.brideName) {
        nameToSearch = `${item.groomName} ${item.brideName}`;
      }
      const matchSearch = 
        nameToSearch.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.celebrant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.rut || '').includes(searchTerm);
      return matchType && matchSearch;
  });

  const handleCloseDetail = () => {
    setSelectedRecord(null);
    setIsEditing(false);
    setValidationError(null);
  };

  const handleInputChange = (field: keyof SacramentRecord, value: any) => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: value });
    }
  };

  const validateForm = (): boolean => {
      if (!editForm) return false;
      
      // Generic RUT check
      if (editForm.rut && !validateRut(editForm.rut)) {
          setValidationError("El RUT ingresado no es válido.");
          return false;
      }

      // Marriage Specifics
      if (editForm.type === SacramentType.MATRIMONIO) {
          if (editForm.groomRut && !validateRut(editForm.groomRut)) {
              setValidationError("El RUT del novio no es válido.");
              return false;
          }
          if (editForm.brideRut && !validateRut(editForm.brideRut)) {
              setValidationError("El RUT de la novia no es válido.");
              return false;
          }
      }

      setValidationError(null);
      return true;
  };

  const handleSave = async () => {
    if (editForm) {
      if (!validateForm()) return; // Stop if validation fails

      try {
        if (editForm.id) {
          await updateSacrament(editForm.id, editForm);
          setSacraments(prev => prev.map(item => item.id === editForm.id ? editForm : item));
        } else {
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
    setValidationError(null);
    if (!selectedRecord?.id) {
      setSelectedRecord(null);
    } else {
      setEditForm(selectedRecord);
    }
    setIsEditing(false);
  };

  // --- CERTIFICATE GENERATION LOGIC ---

  const generateCertificateHTML = () => {
      if (!selectedRecord || !certRef.current) return '';
      // Clone the content of the hidden cert ref
      return certRef.current.innerHTML;
  };

  const handlePrintCertificate = () => {
      const content = generateCertificateHTML();
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.width = '0px';
      iframe.style.height = '0px';
      document.body.appendChild(iframe);
      
      const doc = iframe.contentWindow?.document;
      if (doc) {
          doc.open();
          doc.write(`
              <html>
                  <head>
                      <title>Certificado de ${selectedRecord?.type}</title>
                      <script src="https://cdn.tailwindcss.com"></script>
                      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap" rel="stylesheet">
                      <style>
                          body { -webkit-print-color-adjust: exact; font-family: 'Cinzel', serif; }
                          @media print { body { padding: 0; margin: 0; } }
                      </style>
                  </head>
                  <body>${content}</body>
              </html>
          `);
          doc.close();
          iframe.onload = () => {
              setTimeout(() => {
                  iframe.contentWindow?.print();
                  setTimeout(() => document.body.removeChild(iframe), 1000);
              }, 500);
          }
      }
  };

  const handleExportPDF = () => {
      if (!certRef.current) return;
      const element = certRef.current;
      const opt = {
          margin: 10,
          filename: `Certificado_${selectedRecord?.personName || 'Sacramento'}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
  };

  const handleSaveToCloud = async () => {
      if (!selectedRecord || !certRef.current) return;
      setGeneratingCert(true);
      try {
          // 1. Ensure structure: Sacramentos > [Type]
          const folderName = `Sacramentos`;
          const subFolderName = selectedRecord.type;
          
          const parentId = await ensureFolderStructure([folderName, subFolderName]);
          
          // 2. Save Document
          const content = certRef.current.innerHTML; // Simplified HTML saving for the editor
          
          // Wrap in editor-friendly structure
          const editorContent = `
             <div style="font-family: 'Cinzel', serif; padding: 40px; color: black;">
                ${content}
             </div>
          `;

          await createDocument({
              name: `Certificado - ${getDisplayName(selectedRecord)}`,
              type: 'file',
              parentId: parentId,
              templateUsed: 'Certificado Automático',
              lastModified: new Date().toLocaleDateString(),
              size: '15 KB',
              content: editorContent
          });
          
          alert("Certificado guardado en Documentos exitosamente.");
      } catch (e) {
          console.error(e);
          alert("Error al guardar en la nube.");
      } finally {
          setGeneratingCert(false);
      }
  };

  // --- RENDERING HELPERS ---

  const getDisplayName = (record: SacramentRecord) => {
    if (record.type === SacramentType.MATRIMONIO) {
      return `${record.groomName || 'Novio'} & ${record.brideName || 'Novia'}`;
    }
    return record.personName || 'Sin Nombre';
  };

  const getSacramentConfig = (type: SacramentType) => {
    switch(type) {
      case SacramentType.BAUTIZO:
        return { icon: Baby, color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-100', hover: 'hover:border-cyan-300' };
      case SacramentType.PRIMERA_COMUNION:
        return { icon: Users, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-100', hover: 'hover:border-yellow-300' };
      case SacramentType.CONFIRMACION:
        return { icon: User, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100', hover: 'hover:border-orange-300' };
      case SacramentType.MATRIMONIO:
        return { icon: Heart, color: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-100', hover: 'hover:border-pink-300' };
      case SacramentType.DEFUNCION:
        return { icon: Cross, color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200', hover: 'hover:border-slate-400' };
      default:
        return { icon: BookOpen, color: 'text-emaus-600', bg: 'bg-emaus-50', border: 'border-emaus-100', hover: 'hover:border-emaus-300' };
    }
  };

  const renderSpecificFields = () => {
    if (!editForm) return null;
    const commonInputClass = "w-full border border-slate-300 dark:border-slate-600 rounded px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emaus-500 focus:outline-none";
    const commonLabelClass = "block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1";
    const commonTextClass = "font-medium text-slate-800 dark:text-white";

    const CatechesisCheckbox = () => (
      <div>
         <label className={commonLabelClass}>Catequesis</label>
         {isEditing ? (
           <label className="flex items-center space-x-2 p-2 border border-slate-300 dark:border-slate-600 rounded cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
             <input 
               type="checkbox" 
               checked={editForm.catechesisDone || false} 
               onChange={(e) => handleInputChange('catechesisDone', e.target.checked)} 
               className="w-5 h-5 text-emaus-600 rounded focus:ring-emaus-500"
             />
             <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Realizada</span>
           </label>
         ) : (
           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${editForm.catechesisDone ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`}>
             {editForm.catechesisDone ? 'Realizada' : 'Pendiente'}
           </span>
         )}
      </div>
    );

    switch (editForm.type) {
      case SacramentType.BAUTIZO:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="md:col-span-2 grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className={commonLabelClass}>Nombre Bautizado</label>
                    {isEditing ? (
                      <input type="text" value={editForm.personName || ''} onChange={(e) => handleInputChange('personName', e.target.value)} className={commonInputClass} />
                    ) : <p className={`text-lg font-bold ${commonTextClass}`}>{editForm.personName}</p>}
                  </div>
                  <div>
                    <label className={commonLabelClass}>RUT</label>
                    {isEditing ? (
                        <RutInput value={editForm.rut || ''} onChange={(val) => handleInputChange('rut', val)} />
                    ) : <p className={commonTextClass}>{editForm.rut || '-'}</p>}
                  </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
               <div>
                 <label className={commonLabelClass}>Fecha Nacimiento</label>
                 {isEditing ? (
                    <input type="date" value={editForm.birthDate || ''} onChange={(e) => handleInputChange('birthDate', e.target.value)} className={commonInputClass} />
                 ) : <p className={commonTextClass}>{editForm.birthDate || '-'}</p>}
               </div>
               <div>
                 <label className={commonLabelClass}>Lugar Nacimiento</label>
                 {isEditing ? (
                    <input type="text" value={editForm.birthPlace || ''} onChange={(e) => handleInputChange('birthPlace', e.target.value)} className={commonInputClass} />
                 ) : <p className={commonTextClass}>{editForm.birthPlace || '-'}</p>}
               </div>
               <CatechesisCheckbox />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
               <div>
                  <label className={commonLabelClass}>Padre</label>
                  {isEditing ? (
                    <input type="text" value={editForm.fatherName || ''} onChange={(e) => handleInputChange('fatherName', e.target.value)} className={commonInputClass} />
                  ) : <p className={commonTextClass}>{editForm.fatherName || '-'}</p>}
               </div>
               <div>
                  <label className={commonLabelClass}>Madre</label>
                  {isEditing ? (
                    <input type="text" value={editForm.motherName || ''} onChange={(e) => handleInputChange('motherName', e.target.value)} className={commonInputClass} />
                  ) : <p className={commonTextClass}>{editForm.motherName || '-'}</p>}
               </div>
            </div>
            <div className="mb-4">
               {isEditing ? (
                 <NameListInput 
                    label="Padrinos" 
                    value={editForm.godparents || ''} 
                    onChange={(val) => handleInputChange('godparents', val)} 
                    placeholder="Escriba un nombre y presione Enter..."
                 />
               ) : (
                 <div>
                    <label className={commonLabelClass}>Padrinos</label>
                    <p className={commonTextClass}>{editForm.godparents || '-'}</p>
                 </div>
               )}
            </div>
          </>
        );

      case SacramentType.MATRIMONIO:
        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* GROOM */}
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/30">
                        <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2"><User className="w-4 h-4" /> Datos del Novio</h4>
                        <div className="space-y-3">
                            <div>
                                <label className={commonLabelClass}>Nombre Completo</label>
                                {isEditing ? (
                                    <input type="text" value={editForm.groomName || ''} onChange={(e) => handleInputChange('groomName', e.target.value)} className={commonInputClass} />
                                ) : <p className="font-bold">{editForm.groomName}</p>}
                            </div>
                            <div>
                                <label className={commonLabelClass}>RUT</label>
                                {isEditing ? (
                                    <RutInput value={editForm.groomRut || ''} onChange={(val) => handleInputChange('groomRut', val)} />
                                ) : <p>{editForm.groomRut || '-'}</p>}
                            </div>
                            <div>
                                <label className={commonLabelClass}>Padre</label>
                                {isEditing ? (
                                    <input type="text" value={editForm.groomFather || ''} onChange={(e) => handleInputChange('groomFather', e.target.value)} className={commonInputClass} />
                                ) : <p>{editForm.groomFather || '-'}</p>}
                            </div>
                            <div>
                                <label className={commonLabelClass}>Madre</label>
                                {isEditing ? (
                                    <input type="text" value={editForm.groomMother || ''} onChange={(e) => handleInputChange('groomMother', e.target.value)} className={commonInputClass} />
                                ) : <p>{editForm.groomMother || '-'}</p>}
                            </div>
                        </div>
                    </div>

                    {/* BRIDE */}
                    <div className="p-4 bg-pink-50 dark:bg-pink-900/10 rounded-lg border border-pink-100 dark:border-pink-900/30">
                        <h4 className="font-bold text-pink-800 dark:text-pink-300 mb-3 flex items-center gap-2"><User className="w-4 h-4" /> Datos de la Novia</h4>
                        <div className="space-y-3">
                            <div>
                                <label className={commonLabelClass}>Nombre Completo</label>
                                {isEditing ? (
                                    <input type="text" value={editForm.brideName || ''} onChange={(e) => handleInputChange('brideName', e.target.value)} className={commonInputClass} />
                                ) : <p className="font-bold">{editForm.brideName}</p>}
                            </div>
                            <div>
                                <label className={commonLabelClass}>RUT</label>
                                {isEditing ? (
                                    <RutInput value={editForm.brideRut || ''} onChange={(val) => handleInputChange('brideRut', val)} />
                                ) : <p>{editForm.brideRut || '-'}</p>}
                            </div>
                            <div>
                                <label className={commonLabelClass}>Padre</label>
                                {isEditing ? (
                                    <input type="text" value={editForm.brideFather || ''} onChange={(e) => handleInputChange('brideFather', e.target.value)} className={commonInputClass} />
                                ) : <p>{editForm.brideFather || '-'}</p>}
                            </div>
                            <div>
                                <label className={commonLabelClass}>Madre</label>
                                {isEditing ? (
                                    <input type="text" value={editForm.brideMother || ''} onChange={(e) => handleInputChange('brideMother', e.target.value)} className={commonInputClass} />
                                ) : <p>{editForm.brideMother || '-'}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        {isEditing ? (
                            <NameListInput 
                                label="Testigos" 
                                value={editForm.witnesses || ''} 
                                onChange={(val) => handleInputChange('witnesses', val)} 
                                placeholder="Agregar testigo..."
                            />
                        ) : (
                            <div>
                                <label className={commonLabelClass}>Testigos</label>
                                <p className={commonTextClass}>{editForm.witnesses || '-'}</p>
                            </div>
                        )}
                    </div>
                    <CatechesisCheckbox />
                </div>
            </>
        );

      case SacramentType.CONFIRMACION:
      case SacramentType.PRIMERA_COMUNION:
        return (
            <>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="col-span-2">
                        <label className={commonLabelClass}>Nombre Confirmado/a</label>
                        {isEditing ? (
                            <input type="text" value={editForm.personName || ''} onChange={(e) => handleInputChange('personName', e.target.value)} className={commonInputClass} />
                        ) : <p className={`text-lg font-bold ${commonTextClass}`}>{editForm.personName}</p>}
                    </div>
                    <div>
                        <label className={commonLabelClass}>RUT</label>
                        {isEditing ? (
                            <RutInput value={editForm.rut || ''} onChange={(val) => handleInputChange('rut', val)} />
                        ) : <p className={commonTextClass}>{editForm.rut || '-'}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className={commonLabelClass}>Padre</label>
                        {isEditing ? (
                            <input type="text" value={editForm.fatherName || ''} onChange={(e) => handleInputChange('fatherName', e.target.value)} className={commonInputClass} />
                        ) : <p className={commonTextClass}>{editForm.fatherName || '-'}</p>}
                    </div>
                    <div>
                        <label className={commonLabelClass}>Madre</label>
                        {isEditing ? (
                            <input type="text" value={editForm.motherName || ''} onChange={(e) => handleInputChange('motherName', e.target.value)} className={commonInputClass} />
                        ) : <p className={commonTextClass}>{editForm.motherName || '-'}</p>}
                    </div>
                </div>
                <div className="mb-4">
                    {/* Using godparents field for generic "Padrinos" in UI for Confirmacion/Primera Comunion */}
                    {isEditing ? (
                        <NameListInput 
                            label="Padrinos" 
                            value={editForm.godparents || ''} 
                            onChange={(val) => handleInputChange('godparents', val)} 
                            placeholder="Agregar padrino..."
                        />
                    ) : (
                        <div>
                            <label className={commonLabelClass}>Padrinos</label>
                            <p className={commonTextClass}>{editForm.godparents || '-'}</p>
                        </div>
                    )}
                </div>
                <CatechesisCheckbox />
            </>
        );

      default:
         return (
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="col-span-2">
              <label className={commonLabelClass}>Nombre</label>
              {isEditing ? (
                <input type="text" value={editForm.personName || ''} onChange={(e) => handleInputChange('personName', e.target.value)} className={commonInputClass} />
              ) : <p className={`text-lg font-bold ${commonTextClass}`}>{editForm.personName}</p>}
            </div>
            <div>
              <label className={commonLabelClass}>RUT</label>
              {isEditing ? (
                  <RutInput value={editForm.rut || ''} onChange={(val) => handleInputChange('rut', val)} />
              ) : <p className={commonTextClass}>{editForm.rut || '-'}</p>}
            </div>
          </div>
         );
    }
  };

  // --- MAIN RENDER ---

  if (!activeTab) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{t('sacraments.title')}</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl">{t('sacraments.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(SacramentType).map((type) => {
            const config = getSacramentConfig(type);
            const Icon = config.icon;
            return (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={`
                  relative overflow-hidden bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm 
                  border-2 ${config.border} ${config.hover}
                  text-left transition-all duration-200 group hover:shadow-lg hover:-translate-y-1
                `}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${config.bg} ${config.color} transition-transform group-hover:scale-110`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-emaus-700 dark:group-hover:text-emaus-400">
                  {t(`sacraments.types.${type}`)}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 group-hover:gap-3 transition-all">
                  Gestionar registros <ChevronRight className="w-4 h-4" />
                </p>
                <div className={`absolute -right-4 -bottom-4 w-32 h-32 rounded-full opacity-5 ${config.bg}`}></div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (selectedRecord && editForm) {
    return (
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="flex items-center gap-4">
              <button onClick={handleCloseDetail} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-500 dark:text-slate-400" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                    {isEditing ? (selectedRecord.id ? t('sacraments.detail.editing') : t('sacraments.new_record')) : `${t('sacraments.detail.record_card')} ${t(`sacraments.types.${selectedRecord.type}`)}`}
                </h2>
                {selectedRecord.id && <p className="text-slate-500 dark:text-slate-400 text-sm">ID: #{selectedRecord.id}</p>}
              </div>
           </div>
           
           <div className="flex flex-wrap gap-2">
              {!isEditing ? (
                <>
                  <button onClick={handlePrintCertificate} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium transition-colors">
                     <Printer className="w-4 h-4" /> Imprimir
                  </button>
                  <button onClick={handleExportPDF} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium transition-colors">
                     <FileText className="w-4 h-4" /> PDF
                  </button>
                  <button onClick={handleSaveToCloud} disabled={generatingCert} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium transition-colors">
                     {generatingCert ? <span className="animate-spin">...</span> : <Cloud className="w-4 h-4" />} Guardar
                  </button>
                  <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-4 py-2 bg-emaus-700 text-white rounded-lg hover:bg-emaus-800 font-medium text-sm shadow-sm transition-colors">
                     <Edit2 className="w-4 h-4" /> {t('sacraments.detail.edit')}
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleCancelEdit} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 font-medium text-sm transition-colors">
                     <RotateCcw className="w-4 h-4" /> {t('sacraments.detail.cancel')}
                  </button>
                  <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm shadow-sm transition-colors">
                     <Save className="w-4 h-4" /> {t('sacraments.detail.save')}
                  </button>
                </>
              )}
           </div>
        </div>

        {/* VALIDATION ERROR MODAL */}
        {validationError && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl max-w-sm w-full border border-red-200 dark:border-red-900">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-500 mb-4">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">No se puede guardar</h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-6">{validationError}</p>
                        <button 
                            onClick={() => setValidationError(null)}
                            className="w-full py-2 bg-slate-800 text-white rounded-lg font-bold hover:bg-slate-900"
                        >
                            Entendido
                        </button>
                    </div>
                </div>
            </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 relative">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                     <div className="w-16 h-16 bg-emaus-50 dark:bg-emaus-900/30 rounded-full flex items-center justify-center text-emaus-700 dark:text-emaus-400">
                        {selectedRecord.type === SacramentType.BAUTIZO && <Baby className="w-8 h-8" />}
                        {/* Other icons... */}
                        {![SacramentType.BAUTIZO].includes(selectedRecord.type) && <BookOpen className="w-8 h-8" />}
                     </div>
                     <div className="flex-1">
                        <span className="text-sm font-bold uppercase text-emaus-700 dark:text-emaus-400 tracking-wide block mb-1">
                            {t(`sacraments.types.${selectedRecord.type}`)}
                        </span>
                        <div className="flex items-center gap-2 text-slate-900 dark:text-white text-lg font-medium">
                           <Calendar className="w-5 h-5 text-slate-400" />
                           {isEditing ? (
                               <input type="date" value={editForm.date} onChange={(e) => handleInputChange('date', e.target.value)} className="bg-transparent border-b border-slate-300 dark:border-slate-600 focus:outline-none" />
                           ) : selectedRecord.date}
                        </div>
                     </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800 mb-6">
                     {renderSpecificFields()}
                  </div>

                  <div>
                     <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4" /> {t('sacraments.detail.observations')}
                     </h4>
                     {isEditing ? (
                        <textarea value={editForm.observations || ''} onChange={(e) => handleInputChange('observations', e.target.value)} className="w-full border border-slate-300 dark:border-slate-600 rounded px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white h-24" />
                     ) : (
                        <p className="text-slate-800 dark:text-slate-200 leading-relaxed bg-amber-50 dark:bg-amber-900/10 p-4 rounded-lg border border-amber-100 dark:border-amber-900/30 italic">
                            {selectedRecord.observations || 'Sin observaciones adicionales.'}
                        </p>
                     )}
                  </div>
              </div>
           </div>

           <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                 <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> {t('sacraments.detail.book_data')}
                 </h4>
                 
                 <div className="space-y-4">
                    {['book', 'page', 'celebrant', 'parish'].map((field) => (
                        <div key={field} className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                           <span className="text-xs text-slate-400 block mb-1 uppercase">{field === 'book' ? t('sacraments.detail.book') : field === 'page' ? t('sacraments.detail.page') : field === 'celebrant' ? t('sacraments.table.celebrant') : t('sacraments.detail.parish')}</span>
                           {isEditing ? (
                                <input type="text" value={(editForm as any)[field]} onChange={(e) => handleInputChange(field as any, e.target.value)} className="w-full bg-transparent font-bold text-slate-800 dark:text-white border-b border-slate-200 focus:outline-none" />
                           ) : (
                                <span className="text-md font-bold text-slate-800 dark:text-white">{(selectedRecord as any)[field] || '-'}</span>
                           )}
                        </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* HIDDEN CERTIFICATE TEMPLATE */}
        <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
            <div ref={certRef} className="bg-white text-black p-12 max-w-[210mm] min-h-[297mm] relative font-serif">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold uppercase">{settings.parishName || 'Parroquia Santa María'}</h1>
                    <p className="text-sm uppercase tracking-widest">{settings.diocese || 'Diócesis'}</p>
                    <div className="w-20 h-1 bg-black mx-auto mt-4"></div>
                </div>
                
                <h2 className="text-center text-3xl font-bold underline mb-12 uppercase mt-12">
                    CERTIFICADO DE {selectedRecord.type}
                </h2>

                <div className="text-lg leading-loose text-justify px-8">
                    <p className="mb-6">
                        El Párroco que suscribe certifica que en el Libro de <strong>{selectedRecord.type}</strong> N° <strong>{selectedRecord.book}</strong>, 
                        página <strong>{selectedRecord.page}</strong>, se encuentra inscrita la partida correspondiente a:
                    </p>
                    
                    <h3 className="text-2xl font-bold text-center my-8 uppercase">{getDisplayName(selectedRecord)}</h3>
                    
                    {selectedRecord.rut && <p className="text-center mb-4">RUT: {selectedRecord.rut}</p>}

                    <p>
                        Quien recibió el sacramento el día <strong>{new Date(selectedRecord.date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>,
                        administrado por el Reverendo <strong>{selectedRecord.celebrant}</strong>.
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                        {selectedRecord.fatherName && <p><strong>Padre:</strong> {selectedRecord.fatherName}</p>}
                        {selectedRecord.motherName && <p><strong>Madre:</strong> {selectedRecord.motherName}</p>}
                        {selectedRecord.godparents && <p className="col-span-2"><strong>Padrinos:</strong> {selectedRecord.godparents}</p>}
                    </div>

                    <p className="mt-8 text-sm italic">
                        {selectedRecord.observations ? `Nota Marginal: ${selectedRecord.observations}` : ''}
                    </p>
                </div>

                <div className="mt-24 flex justify-between items-end px-12">
                    {/* PARISH SEAL */}
                    <div className="flex flex-col items-center justify-center w-40">
                        {settings.parishSeal ? (
                            <img src={settings.parishSeal} alt="Sello Parroquial" className="w-32 h-32 object-contain opacity-80" />
                        ) : (
                            <div className="w-24 h-24 border-4 border-double border-slate-300 rounded-full flex items-center justify-center text-xs text-center p-2 text-slate-300 font-bold uppercase transform -rotate-12">
                                Sello Parroquial
                            </div>
                        )}
                    </div>

                    {/* PRIEST SIGNATURE */}
                    <div className="text-center w-64">
                        <div className="h-20 flex items-end justify-center mb-2">
                            {settings.celebrantSignature ? (
                                <img src={settings.celebrantSignature} alt="Firma" className="max-h-full max-w-full object-contain" />
                            ) : null}
                        </div>
                        <div className="border-t border-black pt-2">
                            <p className="font-bold">{settings.priestName}</p>
                            <p className="text-sm">Párroco</p>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-12 left-0 right-0 text-center text-xs text-gray-500">
                    Documento generado el {new Date().toLocaleDateString()} a través de Emaús Gestión Parroquial.
                </div>
            </div>
        </div>

      </div>
    );
  }

  // --- LIST VIEW ---
  const config = getSacramentConfig(activeTab);
  const Icon = config.icon;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setActiveTab(null)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500 dark:text-slate-400">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Libro de {t(`sacraments.types.${activeTab}`)}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Registros oficiales de la parroquia</p>
          </div>
        </div>
      </div>

      <div onClick={handleCreateNew} className={`mt-4 mb-8 p-6 rounded-2xl border ${config.border} ${config.bg} flex items-center justify-between relative overflow-hidden group cursor-pointer transition-all hover:shadow-md`}>
        <div className="relative z-10 flex items-center gap-6">
            <div className={`w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm ${config.color}`}>
                <Icon className="w-8 h-8" />
            </div>
            <div>
                <h3 className={`text-xl font-bold text-slate-800`}>Registrar nuevo {t(`sacraments.types.${activeTab}`)}</h3>
                <p className="text-slate-600">Haga clic aquí para agregar una nueva partida al libro oficial.</p>
            </div>
        </div>
        <div className="relative z-10 bg-white/50 p-2 rounded-full"><Plus className={`w-6 h-6 ${config.color}`} /></div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder={t('sacraments.search_placeholder')}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emaus-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

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
                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">Cargando registros...</td></tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group" onClick={() => setSelectedRecord(record)}>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emaus-700 dark:group-hover:text-emaus-400 transition-colors">{getDisplayName(record)}</div>
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
                      <button className="text-emaus-700 dark:text-emaus-400 hover:text-emaus-900 dark:hover:text-emaus-200 text-sm font-medium hover:underline">
                        {t('sacraments.table.view_details')}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">{t('sacraments.table.no_records')}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sacraments;
