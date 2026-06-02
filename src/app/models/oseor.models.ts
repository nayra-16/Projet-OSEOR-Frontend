export interface Service {
  id?: number;
  title: string;
  description: string;
  icon: string;
}

export interface Secteur {
  id?: number;
  name: string;
  imageUrl: string;
}

export interface Entreprise {
  id?: number;
  name: string;
  secteur: string;
  description: string;
  logoUrl: string;
}

export interface Projet {
  id?: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Stat {
  id?: number;
  label: string;
  value: string;
  icon: string;
}

export interface Contact {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
}
