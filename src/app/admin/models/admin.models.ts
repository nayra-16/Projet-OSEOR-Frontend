export interface User {
  email: string;
  role: string;
  token?: string;
}

export interface AuthenticationResponse {
  token: string;
  email: string;
  role: string;
}

export interface Expertise {
  id?: number;
  title: string;
  description: string;
  icon: string;
}

export interface Projet {
  id?: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

export interface Message {
  id?: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}
