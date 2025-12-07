// Version 1.10.1 - Critical Save Strategy
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
  USERS = 'Usuarios',
  SUPPORT = 'Soporte'
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
  profileImage?: string; // URL for circular profile picture
}

export interface ParishDirectoryEntry {
  id: string;
  uid?: string;
  parishName: string;
  city: string;
  diocese: string;
  email: string;
  planType: 'basic' | 'advanced';
  // Added images for public profile view
  coverImage?: string;
  profileImage?: string;
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
  authorId?: string; // Added to support new comment logic
  // Legacy support
  authorName: string; 
  // New Dual Identity
  authorPersonName?: string;
  authorParishName?: string;
  
  authorRole: string;
  authorAvatarIcon?: string;
  authorAvatarColor?: string;
  authorProfileImage?: string; // Added
  content: string;
  timestamp: any;
  isEdited?: boolean; // Added to support editing
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
  authorProfileImage?: string; // Added
  content: string;
  imageUrl?: string;
  timestamp: any;
  likes: string[];
  commentsCount?: number;
  lastEdited?: string; // Forced update field
  isEdited?: boolean; // Added to support editing
}

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

// --- SUPPORT TYPES ---
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface TicketMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: any;
  isAdmin: boolean;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userEmail: string;
  parishName?: string;
  subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: any;
  updatedAt: any;
  unreadAdmin?: boolean;
  unreadUser?: boolean;
}