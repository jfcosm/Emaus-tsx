
import { LucideIcon } from 'lucide-react';

export enum ViewName {
  DASHBOARD = 'Dashboard',
  SACRAMENTS = 'Sacramentos',
  AGENDA = 'Agenda',
  DOCUMENTS = 'Documentos',
  MESSAGES = 'Mensajes',
  FINANCES = 'Finanzas',
  COMMUNITY = 'Comunidad',
  SETTINGS = 'Configuración',
  USERS = 'Usuarios'
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

  // Common Fields
  personName?: string;
  fatherName?: string;
  motherName?: string;

  // BAPTISM
  godparents?: string;
  birthDate?: string;
  birthPlace?: string;
  catechesisDone?: boolean;

  // MARRIAGE
  groomName?: string;
  brideName?: string;
  groomFather?: string;
  groomMother?: string;
  brideFather?: string;
  brideMother?: string;
  witnesses?: string;

  // CONFIRMATION
  confirmationSponsor?: string;
  baptismParish?: string;

  // DEATH
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
  type: 'Misa' | 'Bautizo' | 'Matrimonio' | 'Confirmación' | 'Primera Comunión' | 'Reunión' | 'Otro';
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
  parentId?: string | null;
  name: string;
  type: 'folder' | 'file';
  templateUsed?: string;
  lastModified: string;
  size?: string;
  content?: string;
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

export interface ParishSettings {
  parishName: string;
  parishAddress: string;
  parishPhone: string;
  parishEmail: string;
  diocese: string;
  priestName: string;
  secretaryName: string;
  userRole?: string;
  city: string;
  planType?: 'basic' | 'advanced';
  // Visual Identity
  avatarIcon?: string; // 'church', 'cross', 'dove', etc.
  avatarColor?: string; // hex code
  coverImage?: string; // URL
}

export interface ParishDirectoryEntry {
  id: string;
  uid?: string;
  parishName: string;
  city: string;
  diocese: string;
  email: string;
  planType: 'basic' | 'advanced';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: any;
  read: boolean;
  attachmentUrl?: string;
  attachmentName?: string;
  attachmentType?: 'image' | 'file';
}

export interface ChatThread {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: any;
  unreadCount: number;
  contactName?: string;
  contactAvatar?: string;
}

export interface FinanceTransaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  paymentMethod: 'Efectivo' | 'Transferencia' | 'Cheque' | 'Otro';
  relatedSacramentId?: string;
}

export interface SocialComment {
  id: string;
  // Legacy support
  authorName: string; 
  // New Dual Identity
  authorPersonName?: string;
  authorParishName?: string;
  
  authorRole: string;
  authorAvatarIcon?: string;
  authorAvatarColor?: string;
  content: string;
  timestamp: any;
}

export interface SocialPost {
  id: string;
  authorId: string;
  // Legacy support
  authorName: string; 
  // New Dual Identity
  authorPersonName?: string;
  authorParishName?: string;
  
  authorRole: string;
  // Snapshot of author visual identity at posting time
  authorAvatarIcon?: string; 
  authorAvatarColor?: string;
  content: string;
  imageUrl?: string;
  timestamp: any;
  likes: string[];
  commentsCount?: number;
  lastEdited?: string; // Forced update field
}
// ... (existing types)

export enum NotificationType {
    SYSTEM = 'system',
    MESSAGE = 'message',
    SOCIAL_LIKE = 'social_like',
    SOCIAL_COMMENT = 'social_comment',
    AGENDA = 'agenda'
}

export interface AppNotification {
    id: string;
    recipientId: string;
    type: NotificationType;
    title: string;
    message: string;
    link?: string;
    read: boolean;
    timestamp: any;
}