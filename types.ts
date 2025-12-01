
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
  date: string;
  celebrant: string;
  book: string;
  page: string;
  parish?: string;
  observations?: string;

  // Common Fields (Single Person Sacraments: Baptism, Confirmation, Communion, Death)
  personName?: string;
  fatherName?: string;
  motherName?: string;

  // BAPTISM Specific
  godparents?: string;
  birthDate?: string;
  birthPlace?: string;
  baptismalTalksDone?: boolean; // Check for talks

  // MARRIAGE Specific
  groomName?: string;
  brideName?: string;
  groomFather?: string;
  groomMother?: string;
  brideFather?: string;
  brideMother?: string;
  witnesses?: string;

  // CONFIRMATION Specific
  confirmationSponsor?: string; // Padrino/Madrina
  baptismParish?: string; // Where they were baptized

  // DEATH Specific
  age?: number;
  spouseName?: string;
  cemetery?: string;
  causeOfDeath?: string;
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
  content?: string; // HTML Content
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
