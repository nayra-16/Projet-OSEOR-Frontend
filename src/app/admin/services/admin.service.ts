import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Participation, Projet, Message, AdminStats, Expertise, Actualite, OffreEmploi, Candidature, AppelOffre, Statistique, Secteur, SiteContent } from '../models/admin.models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl;
  private adminApiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  // Dashboard Stats
  getStats(): Observable<AdminStats> {
    return forkJoin({
      participations: this.http.get<Participation[]>(`${this.apiUrl}/entreprises`),
      projets: this.http.get<Projet[]>(`${this.apiUrl}/projets`),
      messages: this.http.get<Message[]>(`${this.apiUrl}/contact`),
      offres: this.http.get<OffreEmploi[]>(`${this.apiUrl}/offres-emploi/public`),
      candidatures: this.http.get<Candidature[]>(`${this.adminApiUrl}/candidatures`),
      appels: this.http.get<AppelOffre[]>(`${this.apiUrl}/appels-offres/public`),
      actualites: this.http.get<Actualite[]>(`${this.apiUrl}/actualites`)
    }).pipe(
      map(results => ({
        totalParticipations: results.participations.length,
        totalProjets: results.projets.length,
        totalMessages: results.messages.length,
        unreadMessages: results.messages.filter(m => !m.read).length,
        totalOffres: results.offres.length,
        totalCandidatures: results.candidatures.length,
        totalAppelsOffres: results.appels.length,
        totalActualites: results.actualites.length
      }))
    );
  }

  // Actualités
  getActualites(): Observable<Actualite[]> {
    return this.http.get<Actualite[]>(`${this.adminApiUrl}/actualites`);
  }

  saveActualite(actualite: Actualite): Observable<Actualite> {
    if (actualite.id) {
      return this.http.put<Actualite>(`${this.adminApiUrl}/actualites/${actualite.id}`, actualite);
    }
    return this.http.post<Actualite>(`${this.adminApiUrl}/actualites`, actualite);
  }

  deleteActualite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminApiUrl}/actualites/${id}`);
  }

  // Offres d'emploi
  getOffres(): Observable<OffreEmploi[]> {
    return this.http.get<OffreEmploi[]>(`${this.adminApiUrl}/offres`);
  }

  saveOffre(offre: OffreEmploi): Observable<OffreEmploi> {
    if (offre.id) {
      return this.http.put<OffreEmploi>(`${this.adminApiUrl}/offres/${offre.id}`, offre);
    }
    return this.http.post<OffreEmploi>(`${this.adminApiUrl}/offres`, offre);
  }

  deleteOffre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminApiUrl}/offres/${id}`);
  }

  // Candidatures
  getCandidatures(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(`${this.adminApiUrl}/candidatures`);
  }

  archiveCandidature(id: number): Observable<Candidature> {
    return this.http.post<Candidature>(`${this.adminApiUrl}/candidatures/${id}/archive`, {});
  }

  deleteCandidature(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminApiUrl}/candidatures/${id}`);
  }

  // Appels d'offres
  getAppelsOffres(): Observable<AppelOffre[]> {
    return this.http.get<AppelOffre[]>(`${this.adminApiUrl}/appels-offres`);
  }

  saveAppelOffre(appel: AppelOffre): Observable<AppelOffre> {
    if (appel.id) {
      return this.http.put<AppelOffre>(`${this.adminApiUrl}/appels-offres/${appel.id}`, appel);
    }
    return this.http.post<AppelOffre>(`${this.adminApiUrl}/appels-offres`, appel);
  }

  deleteAppelOffre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminApiUrl}/appels-offres/${id}`);
  }

  // Statistiques
  getStatistiques(): Observable<Statistique[]> {
    return this.http.get<Statistique[]>(`${this.adminApiUrl}/stats`);
  }

  saveStatistique(stat: Statistique): Observable<Statistique> {
    if (stat.id) {
      return this.http.put<Statistique>(`${this.adminApiUrl}/stats/${stat.id}`, stat);
    }
    return this.http.post<Statistique>(`${this.adminApiUrl}/stats`, stat);
  }

  deleteStatistique(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminApiUrl}/stats/${id}`);
  }

  // Secteurs
  getSecteurs(): Observable<Secteur[]> {
    return this.http.get<Secteur[]>(`${this.adminApiUrl}/secteurs`);
  }

  saveSecteur(secteur: Secteur): Observable<Secteur> {
    if (secteur.id) {
      return this.http.put<Secteur>(`${this.adminApiUrl}/secteurs/${secteur.id}`, secteur);
    }
    return this.http.post<Secteur>(`${this.adminApiUrl}/secteurs`, secteur);
  }

  deleteSecteur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminApiUrl}/secteurs/${id}`);
  }

  // Site Content
  getContent(): Observable<SiteContent[]> {
    return this.http.get<SiteContent[]>(`${this.adminApiUrl}/content`);
  }

  saveContent(content: SiteContent): Observable<SiteContent> {
    return this.http.post<SiteContent>(`${this.adminApiUrl}/content`, content);
  }

  updateContentValue(key: string, value: string): Observable<SiteContent> {
    return this.http.put<SiteContent>(`${this.adminApiUrl}/content/${key}`, value);
  }

  // Expertises
  getExpertises(): Observable<Expertise[]> {
    return this.http.get<Expertise[]>(`${this.adminApiUrl}/services`);
  }

  createExpertise(expertise: Expertise): Observable<Expertise> {
    return this.http.post<Expertise>(`${this.adminApiUrl}/services`, expertise);
  }

  updateExpertise(id: number, expertise: Expertise): Observable<Expertise> {
    return this.http.put<Expertise>(`${this.adminApiUrl}/services/${id}`, expertise);
  }

  deleteExpertise(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminApiUrl}/services/${id}`);
  }

  // Participations
  getParticipations(): Observable<Participation[]> {
    return this.http.get<Participation[]>(`${this.adminApiUrl}/entreprises`);
  }

  saveParticipation(participation: Participation): Observable<Participation> {
    if (participation.id) {
      return this.http.put<Participation>(`${this.adminApiUrl}/entreprises/${participation.id}`, participation);
    }
    return this.http.post<Participation>(`${this.adminApiUrl}/entreprises`, participation);
  }

  deleteParticipation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminApiUrl}/entreprises/${id}`);
  }

  // Projets
  getProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.adminApiUrl}/projets`);
  }

  saveProjet(projet: Projet): Observable<Projet> {
    if (projet.id) {
      return this.http.put<Projet>(`${this.adminApiUrl}/projets/${projet.id}`, projet);
    }
    return this.http.post<Projet>(`${this.adminApiUrl}/projets`, projet);
  }

  deleteProjet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminApiUrl}/projets/${id}`);
  }

  // Messages
  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.adminApiUrl}/messages`);
  }

  markMessageAsRead(id: number): Observable<void> {
    return this.http.patch<void>(`${this.adminApiUrl}/messages/${id}/read`, {});
  }

  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminApiUrl}/messages/${id}`);
  }
}
