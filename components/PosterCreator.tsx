
import React, { useState } from 'react';
import { 
  Layout, 
  Type, 
  Image as ImageIcon, 
  Square, 
  Download, 
  Save, 
  ArrowLeft,
  Plus,
  Trash2,
  Move,
  ZoomIn,
  ZoomOut,
  Palette
} from 'lucide-react';
import { PosterElement, PosterTemplate, SavedPoster } from '../types';
import { mockPosterTemplates, mockSavedPosters } from '../services/mockData';

type EditorMode = 'gallery' | 'editor';
type ToolTab = 'templates' | 'text' | 'background' | 'elements';

const PosterCreator: React.FC = () => {
  const [mode, setMode] = useState<EditorMode>('gallery');
  const [activeTab, setActiveTab] = useState<ToolTab>('templates');
  const [zoom, setZoom] = useState(100);
  
  // Editor State
  const [currentPosterName, setCurrentPosterName] = useState('Nuevo Diseño');
  const [elements, setElements] = useState<PosterElement[]>([]);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  const selectedElement = elements.find(el => el.id === selectedElementId);

  // --- ACTIONS ---

  const handleCreateNew = (template?: PosterTemplate) => {
    if (template) {
      setElements([...template.elements]);
      setBackgroundColor(template.backgroundColor);
      setCurrentPosterName(`Copia de ${template.name}`);
    } else {
      setElements([]);
      setBackgroundColor('#ffffff');
      setCurrentPosterName('Nuevo Diseño');
    }
    setMode('editor');
  };

  const handleAddText = (fontSize: number = 24, fontWeight: string = 'normal') => {
    const newElement: PosterElement = {
      id: Date.now().toString(),
      type: 'text',
      content: 'Texto Nuevo',
      x: 50,
      y: 50,
      width: 60,
      fontSize,
      fontWeight,
      color: '#000000',
      zIndex: elements.length + 1
    };
    setElements([...elements, newElement]);
    setSelectedElementId(newElement.id);
  };

  const handleAddShape = (color: string) => {
    const newElement: PosterElement = {
      id: Date.now().toString(),
      type: 'shape',
      content: '',
      x: 50,
      y: 50,
      width: 30,
      height: 150, // px relative approx
      backgroundColor: color,
      borderRadius: 0,
      zIndex: elements.length + 1
    };
    setElements([...elements, newElement]);
    setSelectedElementId(newElement.id);
  };

  const updateElement = (id: string, updates: Partial<PosterElement>) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const deleteElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
    setSelectedElementId(null);
  };

  // --- RENDERERS ---

  if (mode === 'gallery') {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Creador de Afiches</h2>
            <p className="text-slate-500">Diseñe avisos para misas, eventos y comunicados.</p>
          </div>
          <button 
            onClick={() => handleCreateNew()}
            className="flex items-center gap-2 px-4 py-2 bg-emaus-600 text-white rounded-lg hover:bg-emaus-700 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Lienzo en Blanco
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-700">Plantillas Sugeridas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mockPosterTemplates.map(template => (
              <div 
                key={template.id} 
                onClick={() => handleCreateNew(template)}
                className="group cursor-pointer bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="aspect-[4/5] bg-slate-100 relative">
                  <img src={template.thumbnail} alt={template.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-white px-3 py-1 rounded-full text-xs font-bold shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-all">
                      Usar
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-medium text-sm text-slate-800 truncate">{template.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-700">Mis Diseños Guardados</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mockSavedPosters.map(poster => (
              <div key={poster.id} className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-emaus-300 transition-all">
                 <div className="aspect-[4/5] bg-slate-100 relative">
                    <img src={poster.thumbnail} alt={poster.name} className="w-full h-full object-cover" />
                 </div>
                 <div className="p-3">
                    <p className="font-medium text-sm text-slate-800 truncate">{poster.name}</p>
                    <p className="text-xs text-slate-400">Editado {poster.lastModified}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- EDITOR UI ---

  return (
    <div className="fixed inset-0 z-50 bg-slate-100 flex flex-col font-sans">
      {/* 1. TOP BAR */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setMode('gallery')}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="h-6 w-px bg-slate-200"></div>
          <input 
            type="text" 
            value={currentPosterName}
            onChange={(e) => setCurrentPosterName(e.target.value)}
            className="font-bold text-slate-800 bg-transparent border-none focus:ring-0 hover:bg-slate-50 px-2 rounded"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 rounded-lg px-2 py-1 gap-2 mr-4">
            <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="p-1 hover:bg-white rounded"><ZoomOut className="w-4 h-4 text-slate-500" /></button>
            <span className="text-xs font-mono text-slate-600 w-8 text-center">{zoom}%</span>
            <button onClick={() => setZoom(Math.min(200, zoom + 10))} className="p-1 hover:bg-white rounded"><ZoomIn className="w-4 h-4 text-slate-500" /></button>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium">
            <Save className="w-4 h-4" /> Guardar
          </button>
          <button 
             onClick={() => alert('La exportación de imágenes requiere librerías externas (ej: html2canvas) no disponibles en este entorno demo.')}
             className="flex items-center gap-2 px-3 py-1.5 bg-emaus-600 text-white hover:bg-emaus-700 rounded-lg text-sm font-medium shadow-sm"
          >
            <Download className="w-4 h-4" /> Descargar
          </button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDEBAR (TOOLS) */}
        <div className="w-20 bg-slate-900 flex flex-col items-center py-4 gap-4 z-10">
          <button 
            onClick={() => setActiveTab('templates')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg w-16 transition-colors ${activeTab === 'templates' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            <Layout className="w-5 h-5" />
            <span className="text-[10px]">Plantillas</span>
          </button>
          <button 
             onClick={() => setActiveTab('text')}
             className={`flex flex-col items-center gap-1 p-2 rounded-lg w-16 transition-colors ${activeTab === 'text' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            <Type className="w-5 h-5" />
            <span className="text-[10px]">Texto</span>
          </button>
          <button 
             onClick={() => setActiveTab('background')}
             className={`flex flex-col items-center gap-1 p-2 rounded-lg w-16 transition-colors ${activeTab === 'background' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            <Palette className="w-5 h-5" />
            <span className="text-[10px]">Fondo</span>
          </button>
          <button 
             onClick={() => setActiveTab('elements')}
             className={`flex flex-col items-center gap-1 p-2 rounded-lg w-16 transition-colors ${activeTab === 'elements' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            <Square className="w-5 h-5" />
            <span className="text-[10px]">Formas</span>
          </button>
        </div>

        {/* TOOL DRAWER (EXPANDABLE) */}
        <div className="w-64 bg-white border-r border-slate-200 flex flex-col overflow-y-auto">
          <div className="p-4">
            <h3 className="font-bold text-slate-800 mb-4 capitalize">{activeTab}</h3>
            
            {activeTab === 'templates' && (
              <div className="grid grid-cols-2 gap-2">
                {mockPosterTemplates.map(t => (
                  <div key={t.id} onClick={() => handleCreateNew(t)} className="cursor-pointer hover:opacity-80">
                    <img src={t.thumbnail} className="rounded-lg border border-slate-200" />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'text' && (
              <div className="space-y-3">
                <button onClick={() => handleAddText(32, 'bold')} className="w-full bg-slate-100 hover:bg-slate-200 p-4 rounded-lg text-left text-2xl font-bold text-slate-800">
                  Añadir Título
                </button>
                <button onClick={() => handleAddText(24, 'normal')} className="w-full bg-slate-100 hover:bg-slate-200 p-3 rounded-lg text-left text-lg font-medium text-slate-800">
                  Añadir Subtítulo
                </button>
                <button onClick={() => handleAddText(16, 'normal')} className="w-full bg-slate-100 hover:bg-slate-200 p-2 rounded-lg text-left text-sm text-slate-600">
                  Añadir texto de cuerpo
                </button>
              </div>
            )}

            {activeTab === 'background' && (
              <div className="grid grid-cols-4 gap-2">
                {['#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0', '#fee2e2', '#ffedd5', '#fef3c7', '#dcfce7', '#dbeafe', '#e0e7ff', '#fae8ff', '#ffe4e6'].map(color => (
                  <button 
                    key={color} 
                    onClick={() => setBackgroundColor(color)}
                    className="w-10 h-10 rounded-full border border-slate-200 shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            )}

            {activeTab === 'elements' && (
               <div className="space-y-4">
                  <p className="text-xs text-slate-500 mb-2">Formas Básicas</p>
                  <div className="flex gap-4">
                    <button onClick={() => handleAddShape('#94a3b8')} className="w-12 h-12 bg-slate-400 rounded-sm"></button>
                    <button onClick={() => {
                        const id = Date.now().toString();
                        setElements([...elements, {id, type:'shape', content:'', x:50, y:50, width:30, height:100, backgroundColor:'#94a3b8', borderRadius:50, zIndex:elements.length+1}]);
                        setSelectedElementId(id);
                    }} className="w-12 h-12 bg-slate-400 rounded-full"></button>
                  </div>
                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-xs text-yellow-800">
                      <strong>Nota:</strong> En esta versión demo no es posible subir imágenes propias.
                    </p>
                  </div>
               </div>
            )}
          </div>
        </div>

        {/* CANVAS AREA */}
        <div className="flex-1 bg-slate-100 overflow-auto flex items-center justify-center p-10 relative">
          <div 
             className="bg-white shadow-xl relative overflow-hidden transition-transform duration-200 ease-out"
             style={{ 
               width: '400px', 
               height: '560px', 
               backgroundColor,
               transform: `scale(${zoom / 100})`
             }}
             onClick={() => setSelectedElementId(null)}
          >
             {elements.map((el) => (
                <div
                  key={el.id}
                  onClick={(e) => { e.stopPropagation(); setSelectedElementId(el.id); }}
                  style={{
                    position: 'absolute',
                    left: `${el.x}%`,
                    top: `${el.y}%`,
                    width: el.type === 'text' ? 'auto' : `${el.width}%`,
                    height: el.type === 'shape' ? `${el.height}px` : 'auto',
                    transform: 'translate(-50%, -50%)',
                    fontSize: el.fontSize,
                    fontWeight: el.fontWeight,
                    color: el.color,
                    backgroundColor: el.backgroundColor,
                    borderRadius: el.borderRadius ? `${el.borderRadius}%` : '0',
                    zIndex: el.zIndex,
                    cursor: 'pointer',
                    border: selectedElementId === el.id ? '2px solid #0d9488' : '1px dashed transparent',
                    whiteSpace: el.type === 'text' ? 'nowrap' : 'normal'
                  }}
                  className="hover:border-slate-300 transition-colors"
                >
                  {el.type === 'text' && el.content}
                  {el.type === 'image' && <img src={el.content} className="w-full h-full object-cover pointer-events-none" />}
                </div>
             ))}
          </div>
        </div>

        {/* RIGHT PROPERTY PANEL (CONTEXTUAL) */}
        {selectedElement && (
          <div className="w-64 bg-white border-l border-slate-200 p-4 overflow-y-auto">
             <h3 className="font-bold text-slate-800 mb-4 border-b pb-2">Propiedades</h3>
             
             <div className="space-y-4">
                {selectedElement.type === 'text' && (
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1">Contenido</label>
                    <input 
                      type="text" 
                      value={selectedElement.content}
                      onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
                      className="w-full border border-slate-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                )}

                <div>
                   <label className="text-xs font-bold text-slate-500 block mb-1">Posición X (%)</label>
                   <input 
                     type="range" min="0" max="100" 
                     value={selectedElement.x}
                     onChange={(e) => updateElement(selectedElement.id, { x: parseInt(e.target.value) })}
                     className="w-full accent-emaus-600"
                   />
                </div>
                <div>
                   <label className="text-xs font-bold text-slate-500 block mb-1">Posición Y (%)</label>
                   <input 
                     type="range" min="0" max="100" 
                     value={selectedElement.y}
                     onChange={(e) => updateElement(selectedElement.id, { y: parseInt(e.target.value) })}
                     className="w-full accent-emaus-600"
                   />
                </div>

                {selectedElement.type === 'text' && (
                  <>
                     <div>
                        <label className="text-xs font-bold text-slate-500 block mb-1">Tamaño Fuente</label>
                        <input 
                          type="number"
                          value={selectedElement.fontSize}
                          onChange={(e) => updateElement(selectedElement.id, { fontSize: parseInt(e.target.value) })}
                          className="w-full border border-slate-300 rounded px-2 py-1 text-sm"
                        />
                     </div>
                     <div>
                        <label className="text-xs font-bold text-slate-500 block mb-1">Color Texto</label>
                        <div className="flex gap-2 flex-wrap">
                           {['#000000', '#ffffff', '#1e293b', '#b91c1c', '#0d9488', '#d97706'].map(c => (
                             <button 
                               key={c}
                               onClick={() => updateElement(selectedElement.id, { color: c })}
                               className={`w-6 h-6 rounded-full border border-slate-200 ${selectedElement.color === c ? 'ring-2 ring-offset-1 ring-slate-400' : ''}`}
                               style={{ backgroundColor: c }}
                             />
                           ))}
                        </div>
                     </div>
                  </>
                )}

                {(selectedElement.type === 'shape') && (
                   <div>
                      <label className="text-xs font-bold text-slate-500 block mb-1">Color Relleno</label>
                      <input 
                        type="color" 
                        value={selectedElement.backgroundColor}
                        onChange={(e) => updateElement(selectedElement.id, { backgroundColor: e.target.value })}
                        className="w-full h-8 cursor-pointer"
                      />
                   </div>
                )}
                
                <div className="pt-6 border-t border-slate-100">
                   <button 
                     onClick={() => deleteElement(selectedElement.id)}
                     className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-medium transition-colors"
                   >
                      <Trash2 className="w-4 h-4" /> Eliminar Elemento
                   </button>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PosterCreator;
