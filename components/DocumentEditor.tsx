
import React, { useState } from 'react';
import { documentTemplates, mockSavedDocuments } from '../services/mockData';
import { 
  FileText, 
  Save, 
  Printer, 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Image as ImageIcon,
  Folder,
  Plus,
  Search,
  LayoutGrid,
  List as ListIcon,
  ChevronRight,
  Clock,
  ArrowLeft,
  Type,
  Eraser,
  Undo,
  Redo,
  ListOrdered,
  ChevronDown
} from 'lucide-react';
import { SavedDocument } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

type EditorView = 'list' | 'templates' | 'editor';
type DisplayMode = 'list' | 'grid';

const DocumentEditor: React.FC = () => {
  const { t } = useLanguage();
  const [view, setView] = useState<EditorView>('list');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [docTitle, setDocTitle] = useState(t('documents.untitled'));
  
  // New States for Navigation and Display
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('list');

  // Filter documents based on current folder
  const currentDocuments = mockSavedDocuments.filter(doc => {
    if (currentFolderId === null) {
      return !doc.parentId;
    }
    return doc.parentId === currentFolderId;
  });

  // Get current folder details for breadcrumbs
  const currentFolder = currentFolderId 
    ? mockSavedDocuments.find(d => d.id === currentFolderId)
    : null;

  const handleFolderClick = (folderId: string) => {
    setCurrentFolderId(folderId);
  };

  const handleFileClick = (doc: SavedDocument) => {
    setDocTitle(doc.name);
    setSelectedTemplateId(doc.templateUsed === 'Documento en Blanco' ? 'blank' : '1'); // Mock logic
    setView('editor');
  };

  const handleNavigateUp = () => {
    // Simple 1-level navigation for now, can be recursive if needed
    if (currentFolder?.parentId) {
      setCurrentFolderId(currentFolder.parentId);
    } else {
      setCurrentFolderId(null);
    }
  };

  // --- SUB-COMPONENT: FILE LIST (Mac Finder Style) ---
  const renderFileList = () => (
    <div className="space-y-4 h-full flex flex-col">
      {/* Header / Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t('documents.title')}</h2>
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-1">
             <button 
               onClick={() => setCurrentFolderId(null)}
               className={`hover:text-emaus-600 dark:hover:text-emaus-400 transition-colors ${!currentFolderId ? 'font-bold text-slate-800 dark:text-slate-200' : ''}`}
             >
               Emaús
             </button>
             {currentFolderId && (
               <>
                 <ChevronRight className="w-4 h-4" />
                 <span className="font-bold text-slate-800 dark:text-slate-200">{currentFolder?.name}</span>
               </>
             )}
          </div>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder={t('documents.search')}
              className="pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emaus-500 text-slate-800 dark:text-white"
            />
          </div>
          <button 
            onClick={() => setView('templates')}
            className="flex items-center gap-2 px-4 py-2 bg-emaus-700 text-white rounded-lg hover:bg-emaus-800 font-medium text-sm shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> {t('documents.new_document')}
          </button>
        </div>
      </div>

      {/* MacOS Finder Window */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex-1 flex flex-col overflow-hidden">
        {/* Finder Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex gap-4 text-slate-500">
             <div className="flex items-center gap-2 mr-4">
                {currentFolderId && (
                  <button onClick={handleNavigateUp} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-400">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
             </div>
             
             {/* View Toggle Buttons */}
             <div className="flex bg-slate-200 dark:bg-slate-700 rounded p-0.5">
               <button 
                 onClick={() => setDisplayMode('grid')}
                 className={`p-1 rounded ${displayMode === 'grid' ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
               >
                 <LayoutGrid className="w-4 h-4" />
               </button>
               <button 
                 onClick={() => setDisplayMode('list')}
                 className={`p-1 rounded ${displayMode === 'list' ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
               >
                 <ListIcon className="w-4 h-4" />
               </button>
             </div>
          </div>
          <span className="text-xs font-medium text-slate-400">{currentDocuments.length} {t('documents.items')}</span>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-900">
          
          {displayMode === 'list' ? (
            /* LIST VIEW (TABLE) */
            <div className="min-w-full">
               {/* Table Header */}
              <div className="grid grid-cols-12 px-6 py-2 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <div className="col-span-6">Nombre</div>
                <div className="col-span-3">Clase</div>
                <div className="col-span-2">Fecha Modif.</div>
                <div className="col-span-1 text-right">Tamaño</div>
              </div>

              {/* Rows */}
              <div className="p-2">
                {currentDocuments.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <Folder className="w-12 h-12 mx-auto mb-2 opacity-20" />
                    <p>{t('documents.empty_folder')}</p>
                  </div>
                ) : (
                  currentDocuments.map((doc) => (
                    <div 
                      key={doc.id}
                      className="grid grid-cols-12 px-4 py-3 items-center hover:bg-gold-50 dark:hover:bg-gold-900/10 rounded-lg cursor-pointer group transition-colors border-b border-transparent hover:border-gold-100 dark:hover:border-gold-900/20"
                      onClick={() => doc.type === 'folder' ? handleFolderClick(doc.id) : handleFileClick(doc)}
                    >
                      <div className="col-span-6 flex items-center gap-3">
                        {doc.type === 'folder' ? (
                          <Folder className="w-5 h-5 text-blue-400 fill-blue-400" />
                        ) : (
                          <FileText className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-emaus-600 dark:group-hover:text-emaus-400" />
                        )}
                        <span className={`text-sm font-medium ${doc.type === 'folder' ? 'text-slate-700 dark:text-slate-200' : 'text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                          {doc.name}
                        </span>
                      </div>
                      <div className="col-span-3 text-xs text-slate-500 dark:text-slate-400">
                        {doc.type === 'folder' ? '--' : doc.templateUsed}
                      </div>
                      <div className="col-span-2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        {doc.type === 'file' && <Clock className="w-3 h-3 text-slate-300 dark:text-slate-600" />}
                        {doc.lastModified}
                      </div>
                      <div className="col-span-1 text-right text-xs text-slate-400 font-mono">
                        {doc.size}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            /* GRID VIEW (ICONS) */
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
               {currentDocuments.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-slate-400">
                    <Folder className="w-12 h-12 mx-auto mb-2 opacity-20" />
                    <p>{t('documents.empty_folder')}</p>
                  </div>
                ) : (
                  currentDocuments.map((doc) => (
                    <div 
                      key={doc.id}
                      onClick={() => doc.type === 'folder' ? handleFolderClick(doc.id) : handleFileClick(doc)}
                      className="group cursor-pointer flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gold-50 dark:hover:bg-gold-900/10 transition-colors border border-transparent hover:border-gold-100 dark:hover:border-gold-900/20"
                    >
                       <div className="w-16 h-16 flex items-center justify-center transition-transform group-hover:scale-105">
                          {doc.type === 'folder' ? (
                            <Folder className="w-14 h-14 text-blue-400 fill-blue-400" />
                          ) : (
                            <div className="relative">
                              <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 group-hover:text-emaus-500 fill-white dark:fill-slate-800" />
                              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-800 rounded-md text-[8px] font-bold border dark:border-slate-600 px-1 py-0.5 text-slate-500 uppercase">DOC</div>
                            </div>
                          )}
                       </div>
                       <div className="text-center w-full">
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate w-full group-hover:text-slate-900 dark:group-hover:text-white">
                            {doc.name}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            {doc.lastModified}
                          </p>
                       </div>
                    </div>
                  ))
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // --- SUB-COMPONENT: TEMPLATE SELECTOR ---
  const renderTemplateSelector = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <button 
             onClick={() => setView('list')}
             className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 text-sm font-medium flex items-center gap-1 mb-2"
           >
              &larr; {t('documents.cancel_back')}
           </button>
           <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t('documents.create_title')}</h2>
           <p className="text-slate-500 dark:text-slate-400">{t('documents.create_subtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Blank Document Option */}
        <div 
          onClick={() => {
            setSelectedTemplateId('blank');
            setDocTitle('Nuevo Documento');
            setView('editor');
          }}
          className="group cursor-pointer bg-white dark:bg-slate-800 rounded-xl overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-emaus-500 dark:hover:border-emaus-400 hover:bg-gold-50 dark:hover:bg-gold-900/10 transition-all duration-300 flex flex-col justify-center items-center h-64"
        >
           <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8 text-emaus-600 dark:text-emaus-400" />
           </div>
           <h3 className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-emaus-700 dark:group-hover:text-emaus-400">{t('documents.blank_doc')}</h3>
           <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('documents.start_scratch')}</p>
        </div>

        {/* Existing Templates */}
        {documentTemplates.map((template) => (
          <div 
            key={template.id}
            onClick={() => {
              setSelectedTemplateId(template.id);
              setDocTitle('Nuevo ' + template.name);
              setView('editor');
            }}
            className="group cursor-pointer bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-emaus-300 dark:hover:border-emaus-700 transition-all duration-300 h-64 flex flex-col"
          >
            <div className="flex-1 bg-slate-100 dark:bg-slate-700 overflow-hidden relative">
               <img src={template.thumbnail} alt={template.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
               <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all">
                  <span className="opacity-0 group-hover:opacity-100 bg-white text-slate-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-all">
                    {t('documents.use_template')}
                  </span>
               </div>
            </div>
            <div className="p-4 border-t border-slate-100 dark:border-slate-700">
              <span className="text-xs font-bold text-emaus-600 dark:text-emaus-400 uppercase tracking-wide block mb-1">{template.category}</span>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm leading-tight group-hover:text-emaus-700 dark:group-hover:text-emaus-400">{template.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- SUB-COMPONENT: EDITOR ---
  const renderEditor = () => {
    const isBlank = selectedTemplateId === 'blank';
    
    // Editor Action Helpers
    const execCmd = (command: string, value: string | undefined = undefined) => {
       document.execCommand(command, false, value);
    };

    const getInitialContent = () => {
        if (isBlank) {
            return `<div class="text-slate-800"><p>Escriba aquí el contenido de su documento...</p></div>`;
        } else {
            const dateStr = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
            return `
                <div class="text-center mb-8">
                    <h1 class="text-2xl font-serif font-bold text-slate-900 mb-2">PARROQUIA SANTA MARÍA</h1>
                    <p class="text-sm text-slate-500 uppercase tracking-widest">Diócesis de Santiago</p>
                    <div class="w-16 h-1 bg-slate-900 mx-auto mt-4"></div>
                </div>
                
                <p class="text-right mb-8 font-serif">Santiago, ${dateStr}</p>
                
                <h2 class="text-center text-xl font-bold underline mb-8">CERTIFICADO DE BAUTISMO</h2>
                
                <p class="mb-4 text-justify leading-relaxed font-serif text-lg">
                    El infrascrito Cura Párroco certifica que en el Libro de Bautismos N° <strong>104</strong>, página <strong>23</strong>, se encuentra la partida correspondiente a:
                </p>
                
                <p class="text-center text-2xl font-bold my-8 font-serif uppercase bg-slate-50 py-4">
                    JUAN PÉREZ
                </p>
    
                <p class="mb-4 text-justify leading-relaxed font-serif text-lg">
                    Nacido el 12 de Enero de 2024, hijo de Pedro Pérez y María Gómez. Fue bautizado el día 15 de Mayo de 2024.
                </p>
    
                <div class="mt-20 pt-8 border-t border-slate-900 w-64 mx-auto text-center">
                    <p class="font-bold">Pbro. Roberto González</p>
                    <p class="text-sm">Párroco</p>
                </div>
            `;
        }
    };

    return (
      <div className="h-[calc(100vh-8rem)] flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Editor Toolbar */}
        <div className="border-b border-slate-200 dark:border-slate-800 p-2 flex flex-wrap items-center justify-between gap-y-2 bg-slate-50 dark:bg-slate-800/50">
          
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 custom-scrollbar">
              <button 
                onClick={() => setView('list')} 
                className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors mr-2"
                title={t('documents.close')}
              >
                  <ArrowLeft className="w-5 h-5" />
              </button>
              
              {/* History */}
              <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1 shadow-sm">
                 <button onClick={() => execCmd('undo')} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300" title="Deshacer"><Undo className="w-4 h-4" /></button>
                 <button onClick={() => execCmd('redo')} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300" title="Rehacer"><Redo className="w-4 h-4" /></button>
                 <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                 <button onClick={() => execCmd('removeFormat')} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded text-slate-600 dark:text-slate-300 hover:text-red-600" title="Limpiar Formato"><Eraser className="w-4 h-4" /></button>
              </div>

              {/* Typography */}
              <div className="flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1 shadow-sm">
                 {/* Font Family */}
                 <div className="relative group">
                    <select 
                      onChange={(e) => execCmd('fontName', e.target.value)}
                      className="w-28 text-xs bg-transparent border-none focus:ring-0 text-slate-700 dark:text-slate-300 font-medium py-1 px-2 cursor-pointer appearance-none"
                    >
                       <option value="Inter">Inter</option>
                       <option value="Cinzel">Cinzel</option>
                       <option value="Georgia">Georgia</option>
                       <option value="Courier New">Courier</option>
                       <option value="Arial">Arial</option>
                    </select>
                    <ChevronDown className="w-3 h-3 absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                 </div>
                 <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                 {/* Font Size (1-7) */}
                 <div className="relative">
                    <select 
                      onChange={(e) => execCmd('fontSize', e.target.value)}
                      className="w-12 text-xs bg-transparent border-none focus:ring-0 text-slate-700 dark:text-slate-300 font-medium py-1 px-1 cursor-pointer appearance-none text-center"
                      defaultValue="3"
                    >
                       <option value="1">10</option>
                       <option value="2">13</option>
                       <option value="3">16</option>
                       <option value="4">18</option>
                       <option value="5">24</option>
                       <option value="6">32</option>
                       <option value="7">48</option>
                    </select>
                    <ChevronDown className="w-3 h-3 absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                 </div>
              </div>
  
              {/* Formatting Tools */}
              <div className="flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1 shadow-sm">
                  <button onClick={() => execCmd('bold')} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300 font-bold" title="Negrita"><Bold className="w-4 h-4" /></button>
                  <button onClick={() => execCmd('italic')} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300 italic" title="Cursiva"><Italic className="w-4 h-4" /></button>
                  <button onClick={() => execCmd('underline')} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300 underline" title="Subrayado"><Underline className="w-4 h-4" /></button>
              </div>

               {/* Align & Lists */}
              <div className="flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1 shadow-sm">
                  <button onClick={() => execCmd('justifyLeft')} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300" title="Izquierda"><AlignLeft className="w-4 h-4" /></button>
                  <button onClick={() => execCmd('justifyCenter')} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300" title="Centro"><AlignCenter className="w-4 h-4" /></button>
                  <button onClick={() => execCmd('justifyRight')} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300" title="Derecha"><AlignRight className="w-4 h-4" /></button>
                  <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                  <button onClick={() => execCmd('insertUnorderedList')} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300" title="Viñetas"><ListIcon className="w-4 h-4" /></button>
                  <button onClick={() => execCmd('insertOrderedList')} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300" title="Lista Numérica"><ListOrdered className="w-4 h-4" /></button>
              </div>

               {/* Media */}
              <div className="flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1 shadow-sm">
                  <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300"><ImageIcon className="w-4 h-4" /></button>
              </div>
          </div>
  
          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              {/* Document Title Input */}
              <input 
                  type="text" 
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-emaus-500 text-sm font-bold text-slate-800 dark:text-white focus:outline-none w-32 md:w-48 text-right md:text-left transition-colors"
               />
              <button 
                onClick={() => window.print()} 
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                title={t('documents.print')}
              >
                  <Printer className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setView('list')}
                className="flex items-center gap-2 px-3 py-1.5 bg-emaus-700 text-white rounded-lg hover:bg-emaus-800 font-medium text-sm transition-colors shadow-sm"
              >
                  <Save className="w-4 h-4" /> {t('documents.save')}
              </button>
          </div>
        </div>
  
        {/* Editor Canvas */}
        <div className="flex-1 bg-slate-100 dark:bg-slate-950/50 overflow-y-auto p-4 md:p-8 flex justify-center">
          <div 
              className="bg-white w-[210mm] min-h-[297mm] shadow-lg p-[25mm] focus:outline-none text-slate-900"
              contentEditable
              suppressContentEditableWarning
              style={{ fontFamily: 'Inter, sans-serif' }}
              dangerouslySetInnerHTML={{ __html: getInitialContent() }}
          />
        </div>
      </div>
    );
  };

  // Main Render Switch
  switch (view) {
    case 'templates':
      return renderTemplateSelector();
    case 'editor':
      return renderEditor();
    case 'list':
    default:
      return renderFileList();
  }
};

export default DocumentEditor;
