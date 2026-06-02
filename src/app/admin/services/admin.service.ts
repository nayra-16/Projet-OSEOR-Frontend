import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expertise, Projet, Message } from '../models/admin.models';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Expertises (Services)
  getExpertises(): Observable<Expertise[]> {
    return this.http.get<Expertise[]>(`${this.apiUrl}/services`);
  }

  createExpertise(expertise: Expertise): Observable<Expertise> {
    return this.http.post<Expertise>(`${this.apiUrl}/services`, expertise);
  }

  updateExpertise(id: number, expertise: Expertise): Observable<Expertise> {
    return this.http.put<Expertise>(`${this.apiUrl}/services/${id}`, expertise);
  }

  deleteExpertise(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/services/${id}`);
  }

  // Projets
  getProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}/projets`);
  }

  createProjet(projet: Projet): Observable<Projet> {
    return this.http.post<Projet>(`${this.apiUrl}/projets`, projet);
  }

  updateProjet(id: number, projet: Projet): Observable<Projet> {
    return this.http.put<Projet>(`${this.apiUrl}/projets/${id}`, projet);
  }

  deleteProjet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/projets/${id}`);
  }

  // Messages
  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/contact`);
  }
}
