
import { SacramentType, SacramentRecord, CalendarEvent, DocumentTemplate, SavedDocument, PosterTemplate, SavedPoster } from '../types';

export const dashboardStats = [
  { name: 'Total Bautizos', value: 124, trend: '+12%', color: 'bg-blue-500' },
  { name: 'Matrimonios', value: 45, trend: '+5%', color: 'bg-pink-500' },
  { name: 'Certificados Emitidos', value: 890, trend: '+24%', color: 'bg-emerald-500' },
  { name: 'Feligreses Activos', value: 2350, trend: '+3%', color: 'bg-violet-500' },
];

export const sacramentChartData = [
  { name: 'Ene', bautizos: 12, matrimonios: 4, confirmaciones: 0 },
  { name: 'Feb', bautizos: 15, matrimonios: 6, confirmaciones: 0 },
  { name: 'Mar', bautizos: 18, matrimonios: 3, confirmaciones: 0 },
  { name: 'Abr', bautizos: 25, matrimonios: 8, confirmaciones: 15 },
  { name: 'May', bautizos: 20, matrimonios: 10, confirmaciones: 45 },
  { name: 'Jun', bautizos: 18, matrimonios: 12, confirmaciones: 30 },
];

export const mockSacraments: SacramentRecord[] = [
  { 
    id: '1', 
    type: SacramentType.BAUTIZO, 
    personName: 'Juan Pérez Gómez', 
    date: '2024-05-15', 
    celebrant: 'Pbro. Roberto González', 
    book: '104', 
    page: '23',
    parents: 'Pedro Pérez y María Gómez',
    godparents: 'Carlos Ruiz y Ana Torres',
    observations: 'Bautismo realizado en ceremonia privada.',
    parish: 'Parroquia Santa María'
  },
  { 
    id: '2', 
    type: SacramentType.MATRIMONIO, 
    personName: 'Ana Silva y Luis Rojas', 
    date: '2024-05-20', 
    celebrant: 'Pbro. Miguel Ángel', 
    book: '45', 
    page: '112',
    parents: 'Padres Ella: Juan y Rosa / Padres Él: Mario y Clara',
    godparents: 'Testigos: Roberto Díaz y Carla Méndez',
    observations: 'Matrimonio con misa.',
    parish: 'Parroquia Santa María'
  },
  { 
    id: '3', 
    type: SacramentType.CONFIRMACION, 
    personName: 'Sofía Rodríguez', 
    date: '2024-05-22', 
    celebrant: 'Mons. Carlos', 
    book: '12', 
    page: '8',
    parents: 'No aplica',
    godparents: 'Padrino: Esteban Quito',
    observations: 'Grupo de confirmación 2024.',
    parish: 'Catedral Metropolitana'
  },
  { 
    id: '4', 
    type: SacramentType.DEFUNCION, 
    personName: 'Marta Díaz', 
    date: '2024-05-25', 
    celebrant: 'Pbro. Roberto González', 
    book: '89', 
    page: '45',
    parents: 'Familia Díaz-López',
    godparents: 'N/A',
    observations: 'Misa de exequias a las 15:00 hrs.',
    parish: 'Parroquia Santa María'
  },
  { 
    id: '5', 
    type: SacramentType.BAUTIZO, 
    personName: 'Lucas Silva', 
    date: '2024-06-01', 
    celebrant: 'Pbro. Miguel Ángel', 
    book: '104', 
    page: '24',
    parents: 'Andrés Silva y Patricia Ores',
    godparents: 'Luis Silva y Carmen Ores',
    observations: '',
    parish: 'Parroquia Santa María'
  },
];

export const mockEvents: CalendarEvent[] = [
  { id: '1', title: 'Misa Dominical', date: '2024-06-16', time: '12:00', type: 'Misa', location: 'Templo Mayor' },
  { id: '2', title: 'Bautizos Grupales', date: '2024-06-16', time: '16:00', type: 'Sacramento', location: 'Capilla' },
  { id: '3', title: 'Reunión Consejo', date: '2024-06-18', time: '19:30', type: 'Reunión', location: 'Salón Parroquial' },
  { id: '4', title: 'Ensayo Coro', date: '2024-06-20', time: '18:00', type: 'Otro', location: 'Templo Menor' },
];

export const documentTemplates: DocumentTemplate[] = [
  { id: '1', name: 'Certificado de Bautizo', category: 'Certificado', thumbnail: 'https://picsum.photos/200/280?random=1' },
  { id: '2', name: 'Carta Pastoral', category: 'Carta', thumbnail: 'https://picsum.photos/200/280?random=2' },
  { id: '3', name: 'Acta Matrimonial', category: 'Acta', thumbnail: 'https://picsum.photos/200/280?random=3' },
  { id: '4', name: 'Certificado de Confirmación', category: 'Certificado', thumbnail: 'https://picsum.photos/200/280?random=4' },
];

export const mockSavedDocuments: SavedDocument[] = [
  // Root Level Folders
  { id: 'f1', parentId: null, name: 'Certificados 2024', type: 'folder', lastModified: 'Hoy, 10:30', size: '--' },
  { id: 'f2', parentId: null, name: 'Cartas al Arzobispado', type: 'folder', lastModified: 'Ayer, 15:45', size: '--' },
  { id: 'f3', parentId: null, name: 'Plantillas Propias', type: 'folder', lastModified: '01 Jun 2024', size: '--' },
  
  // Root Level Files
  { id: 'd4', parentId: null, name: 'Borrador Homilía Domingo', type: 'file', templateUsed: 'Documento en Blanco', lastModified: '08 Jun 2024', size: '12 KB' },
  
  // Inside f1 (Certificados 2024)
  { id: 'd1', parentId: 'f1', name: 'Bautismo - Juan Pérez', type: 'file', templateUsed: 'Certificado de Bautizo', lastModified: 'Hoy, 09:15', size: '1.2 MB' },
  { id: 'd3', parentId: 'f1', name: 'Acta Matrimonio Silva-Rojas', type: 'file', templateUsed: 'Acta Matrimonial', lastModified: '10 Jun 2024', size: '2.8 MB' },
  
  // Inside f2 (Cartas)
  { id: 'd2', parentId: 'f2', name: 'Solicitud de Reparaciones', type: 'file', templateUsed: 'Carta Pastoral', lastModified: '12 Jun 2024', size: '450 KB' },
];

export const mockPosterTemplates: PosterTemplate[] = [
  {
    id: '1',
    name: 'Misa Dominical',
    thumbnail: 'https://picsum.photos/300/400?random=10',
    backgroundColor: '#ffffff',
    elements: [
      {
        id: 't1',
        type: 'text',
        content: 'Misa Dominical',
        x: 50,
        y: 20,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1e293b',
        zIndex: 1
      },
      {
        id: 't2',
        type: 'text',
        content: 'Domingo 12:00 hrs',
        x: 50,
        y: 35,
        fontSize: 24,
        fontWeight: 'normal',
        color: '#334155',
        zIndex: 2
      }
    ]
  },
  {
    id: '2',
    name: 'Aviso Parroquial',
    thumbnail: 'https://picsum.photos/300/400?random=11',
    backgroundColor: '#f8fafc',
    elements: [
      {
        id: 't1',
        type: 'text',
        content: 'AVISO IMPORTANTE',
        x: 50,
        y: 15,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#b91c1c',
        zIndex: 1
      }
    ]
  },
  {
    id: '3',
    name: 'Evento Joven',
    thumbnail: 'https://picsum.photos/300/400?random=12',
    backgroundColor: '#e0e7ff',
    elements: [
      {
        id: 't1',
        type: 'text',
        content: 'ENCUENTRO JUVENIL',
        x: 50,
        y: 50,
        fontSize: 36,
        fontWeight: 'bold',
        color: '#4338ca',
        zIndex: 1
      }
    ]
  }
];

export const mockSavedPosters: SavedPoster[] = [
  {
    id: 'p1',
    name: 'Afiche Semana Santa',
    thumbnail: 'https://picsum.photos/300/400?random=13',
    lastModified: 'Hace 2 días'
  },
  {
    id: 'p2',
    name: 'Campaña Solidaria',
    thumbnail: 'https://picsum.photos/300/400?random=14',
    lastModified: 'Hace 1 semana'
  }
];