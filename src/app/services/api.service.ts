import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Service, Secteur, Entreprise, Projet, Stat, Contact } from '../models/oseor.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/services`);
  }

  getSecteurs(): Observable<Secteur[]> {
    return this.http.get<Secteur[]>(`${this.apiUrl}/secteurs`);
  }

  getEntreprises(): Observable<Entreprise[]> {
    return this.http.get<Entreprise[]>(`${this.apiUrl}/entreprises`);
  }

  getProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}/projets`);
  }

  getStats(): Observable<Stat[]> {
    return this.http.get<Stat[]>(`${this.apiUrl}/stats`);
  }

  sendContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiUrl}/contact`, contact);
  }
}
