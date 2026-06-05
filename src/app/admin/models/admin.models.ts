export interface User {
  id?: number;
  email: string;
  role: string;
  token?: string;
}

export interface AuthenticationResponse {
  token: string;
  email: string;
  role: string;
}

export interface Participation {
  id?: number;
  name: string;
  secteur: string;
  description: string;
  logoUrl: string;
  officialSite?: string;
}

export interface Projet {
  id?: number;
  title: string;
  description: string;
  image: string;
  category: string;
  officialSite?: string;
}

export interface Message {
  id?: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
  read?: boolean;
}

export interface Expertise {
  id?: number;
  title: string;
  description: string;
  icon?: string;
}

export interface Actualite {
  id?: number;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  date: string;
  published: boolean;
  archived: boolean;
}

export interface OffreEmploi {
  id?: number;
  title: string;
  description: string;
  location: string;
  contractType: string;
  deadline: string;
  published: boolean;
  archived: boolean;
  createdAt?: string;
}

export interface Candidature {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cvUrl: string;
  coverLetterUrl: string;
  createdAt: string;
  archived: boolean;
  offreId?: number;
}

export interface AppelOffre {
  id?: number;
  reference: string;
  title: string;
  description: string;
  deadline: string;
  documentUrls: string;
  published: boolean;
  archived: boolean;
  createdAt?: string;
}

export interface Statistique {
  id?: number;
  label: string;
  value: string;
  icon: string;
}

export interface Secteur {
  id?: number;
  name: string;
  imageUrl: string;
}

export interface SiteContent {
  id?: number;
  contentKey: string;
  contentValue: string;
  type: string;
  section: string;
}

export interface AdminStats {
  totalParticipations: number;
  totalProjets: number;
  totalMessages: number;
  unreadMessages: number;
  totalOffres: number;
  totalCandidatures: number;
  totalAppelsOffres: number;
  totalActualites: number;
}
