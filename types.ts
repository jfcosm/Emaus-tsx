
import { LucideIcon } from 'lucide-react';

export enum ViewName {
  DASHBOARD = 'Dashboard',
  SACRAMENTS = 'Sacramentos',
  AGENDA = 'Agenda',
  DOCUMENTS = 'Documentos',
  SETTINGS = 'Configuración'
}

export enum SacramentType {
  BAUTIZO = 'Bautizo',
  CONFIRMACION = 'Confirmación',
  MATRIMONIO = 'Matrimonio',
  DEFUNCION = 'Defunción',
  PRIMERA_COMUNION = 'Primera Comunión'
}

export interface NavItem {
  name: ViewName;
  icon: LucideIcon;
  description: string;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color: string;
}

export interface SacramentRecord {
  id: string;
  type: SacramentType;
  personName: string;
  date: string;
  celebrant: string;
  book: string;
  page: string;
  parents?: string;
  godparents?: string;
  observations?: string;
  parish?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'Misa' | 'Sacramento' | 'Reunión' | 'Otro';
  location: string;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  thumbnail: string;
  category: 'Certificado' | 'Carta' | 'Acta';
}

export interface SavedDocument {
  id: string;
  parentId?: string | null; // null means root
  name: string;
  type: 'folder' | 'file';
  templateUsed?: string;
  lastModified: string;
  size?: string;
}

export interface PosterElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  content: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  borderRadius?: number;
  zIndex: number;
}

export interface PosterTemplate {
  id: string;
  name: string;
  thumbnail: string;
  backgroundColor: string;
  elements: PosterElement[];
}

export interface SavedPoster {
  id: string;
  name: string;
  thumbnail: string;
  lastModified: string;
}