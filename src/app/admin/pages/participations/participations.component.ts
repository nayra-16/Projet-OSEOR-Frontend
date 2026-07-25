import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Entreprise } from '../../../models/oseor.models';

@Component({
  selector: 'app-admin-participations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6 animate-fade-in">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-black text-gray-900 tracking-tight">Gestion des Participations</h1>
          <p class="text-gray-500 text-sm">Gérez les filiales et participations du groupe OSEOR.</p>
        </div>
        <button (click)="openModal()" class="px-6 py-3 bg-[#036eb1] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center space-x-2">
          <i class="fas fa-plus"></i>
          <span>Nouvelle Filiale</span>
        </button>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="flex justify-center py-16">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-[#036eb1]"></div>
      </div>

      <!-- API Error -->
      <div *ngIf="!loading && apiError" class="bg-red-50 border border-red-100 text-[#ae151e] px-6 py-4 rounded-2xl text-sm font-medium flex items-start space-x-3">
        <i class="fas fa-exclamation-circle mt-0.5"></i>
        <div>
          <p class="font-bold">Erreur de chargement</p>
          <p>{{ apiError }}</p>
          <button (click)="loadParticipations()" class="underline mt-1 hover:text-red-800">Réessayer</button>
        </div>
      </div>

      <!-- Participations Table -->
      <ng-container *ngIf="!loading && !apiError">
        <div *ngIf="participations.length === 0" class="bg-white rounded-[2rem] shadow-sm border border-gray-100 py-16 text-center text-gray-500">
          <i class="fas fa-building text-5xl mb-4 text-gray-300"></i>
          <p>Aucune participation enregistrée.</p>
        </div>

        <div *ngIf="participations.length > 0" class="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-100">
                  <th class="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Logo</th>
                  <th class="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Nom</th>
                  <th class="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Secteur</th>
                  <th class="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr *ngFor="let part of participations" class="hover:bg-gray-50/50 transition-colors group">
                  <td class="px-6 py-4">
                    <div class="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center p-2 border border-gray-100">
                      <img [src]="part.logoUrl || defaultLogoUrl" (error)="onLogoError($event)" [alt]="part.name" class="max-w-full max-h-full object-contain">
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="font-bold text-gray-900">{{ part.name }}</div>
                    <div class="text-xs text-gray-500 truncate max-w-xs">{{ part.description }}</div>
                    <div *ngIf="part.officialSite" class="text-[10px] text-[#036eb1] mt-1 truncate max-w-xs">
                      <i class="fas fa-link mr-1"></i>{{ part.officialSite }}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 bg-blue-50 text-[#036eb1] text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100">
                      {{ part.secteur }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <div class="flex justify-end space-x-2">
                      <button (click)="openModal(part)" class="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button (click)="deleteParticipation(part.id!)" class="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </ng-container>

      <!-- Modal Form -->
      <div *ngIf="showModal" class="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
        <div class="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-scale-up">
          <div class="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 class="text-2xl font-black text-gray-900 tracking-tight">
              {{ editingPart.id ? 'Modifier la Filiale' : 'Nouvelle Filiale' }}
            </h3>
            <button (click)="closeModal()" class="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-400 hover:text-gray-900 shadow-sm">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <!-- Form error banner -->
          <div *ngIf="formError" class="mx-8 mt-6 bg-red-50 border border-red-100 text-[#ae151e] px-4 py-3 rounded-xl text-xs flex items-start space-x-2">
            <i class="fas fa-exclamation-circle mt-0.5"></i>
            <p>{{ formError }}</p>
          </div>

          <form (ngSubmit)="saveParticipation()" class="p-8 space-y-6">
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Nom de l'entreprise <span class="text-[#ae151e]">*</span></label>
                <input type="text" [(ngModel)]="editingPart.name" name="name" required
                  [ngClass]="{'border-red-300 bg-red-50': fieldErrors.name}"
                  class="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#036eb1]/20 focus:border-[#036eb1] outline-none transition-all">
                <p *ngIf="fieldErrors.name" class="text-[10px] text-[#ae151e] font-medium">{{ fieldErrors.name }}</p>
              </div>
              <div class="space-y-2">
                <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Secteur <span class="text-[#ae151e]">*</span></label>
                <select [(ngModel)]="editingPart.secteur" name="secteur" required
                  [ngClass]="{'border-red-300 bg-red-50': fieldErrors.secteur}"
                  class="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#036eb1]/20 focus:border-[#036eb1] outline-none transition-all">
                  <option value="Énergie">Énergie</option>
                  <option value="Industrie">Industrie</option>
                  <option value="Services">Services</option>
                </select>
                <p *ngIf="fieldErrors.secteur" class="text-[10px] text-[#ae151e] font-medium">{{ fieldErrors.secteur }}</p>
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Description <span class="text-[#ae151e]">*</span></label>
              <textarea [(ngModel)]="editingPart.description" name="description" rows="3" required
                [ngClass]="{'border-red-300 bg-red-50': fieldErrors.description}"
                class="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#036eb1]/20 focus:border-[#036eb1] outline-none transition-all"></textarea>
              <p *ngIf="fieldErrors.description" class="text-[10px] text-[#ae151e] font-medium">{{ fieldErrors.description }}</p>
            </div>
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">URL du Logo <span class="text-[#ae151e]">*</span></label>
                <input type="text" [(ngModel)]="editingPart.logoUrl" name="logoUrl" required
                  [ngClass]="{'border-red-300 bg-red-50': fieldErrors.logoUrl}"
                  class="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#036eb1]/20 focus:border-[#036eb1] outline-none transition-all">
                <p *ngIf="fieldErrors.logoUrl" class="text-[10px] text-[#ae151e] font-medium">{{ fieldErrors.logoUrl }}</p>
                <!-- Preview -->
                <div *ngIf="editingPart.logoUrl" class="mt-2 flex items-center space-x-2">
                  <span class="text-[10px] text-gray-400 uppercase tracking-widest">Aperçu :</span>
                  <div class="w-10 h-10 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center p-1">
                    <img [src]="editingPart.logoUrl" (error)="onLogoError($event)" alt="preview" class="max-w-full max-h-full object-contain">
                  </div>
                </div>
              </div>
              <div class="space-y-2">
                <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Site Officiel (optionnel)</label>
                <input type="text" [(ngModel)]="editingPart.officialSite" name="officialSite" placeholder="https://..."
                  [ngClass]="{'border-red-300 bg-red-50': fieldErrors.officialSite}"
                  class="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#036eb1]/20 focus:border-[#036eb1] outline-none transition-all">
                <p *ngIf="fieldErrors.officialSite" class="text-[10px] text-[#ae151e] font-medium">{{ fieldErrors.officialSite }}</p>
              </div>
            </div>
            <div class="pt-4 flex justify-end space-x-4">
              <button type="button" (click)="closeModal()" [disabled]="saving" class="px-8 py-3 text-gray-500 font-bold hover:text-gray-900 transition-colors disabled:opacity-50">
                Annuler
              </button>
              <button type="submit" [disabled]="saving" class="px-8 py-3 bg-[#036eb1] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:hover:translate-y-0 disabled:shadow-lg flex items-center space-x-2">
                <i *ngIf="saving" class="fas fa-spinner fa-spin"></i>
                <span>{{ saving ? 'Enregistrement...' : 'Enregistrer' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class ParticipationsComponent implements OnInit {
  readonly defaultLogoUrl = 'assets/images/default-logo.png';

  participations: Entreprise[] = [];
  loading = false;
  apiError: string | null = null;
  formError: string | null = null;
  saving = false;

  showModal = false;
  editingPart: Entreprise = { name: '', secteur: 'Énergie', description: '', logoUrl: '' };
  fieldErrors: {
    name?: string;
    secteur?: string;
    description?: string;
    logoUrl?: string;
    officialSite?: string;
  } = {};

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadParticipations();
  }

  loadParticipations(): void {
    this.loading = true;
    this.apiError = null;
    this.adminService.getParticipations().subscribe({
      next: (data) => {
        this.participations = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: () => {
        this.apiError = 'Impossible de charger les participations. Vérifiez la connexion au serveur.';
        this.participations = [];
        this.loading = false;
      }
    });
  }

  openModal(part?: Entreprise): void {
    this.fieldErrors = {};
    this.formError = null;
    this.editingPart = part
      ? { ...part, officialSite: part.officialSite ?? undefined }
      : { name: '', secteur: 'Énergie', description: '', logoUrl: '' };
    this.showModal = true;
  }

  closeModal(): void {
    if (this.saving) return;
    this.showModal = false;
    this.fieldErrors = {};
    this.formError = null;
  }

  private validate(): boolean {
    this.fieldErrors = {};
    if (!this.editingPart.name || !this.editingPart.name.trim()) {
      this.fieldErrors.name = 'Le nom est obligatoire.';
    }
    if (!this.editingPart.secteur || !this.editingPart.secteur.trim()) {
      this.fieldErrors.secteur = 'Le secteur est obligatoire.';
    }
    if (!this.editingPart.description || !this.editingPart.description.trim()) {
      this.fieldErrors.description = 'La description est obligatoire.';
    }
    if (!this.editingPart.logoUrl || !this.editingPart.logoUrl.trim()) {
      this.fieldErrors.logoUrl = "L'URL du logo est obligatoire.";
    }
    if (this.editingPart.officialSite && this.editingPart.officialSite.trim()) {
      try {
        const url = new URL(this.editingPart.officialSite.trim());
        if (!/^https?:$/.test(url.protocol)) throw new Error();
      } catch {
        this.fieldErrors.officialSite = "L'URL du site officiel est invalide (ex: https://exemple.com).";
      }
    }
    return Object.keys(this.fieldErrors).length === 0;
  }

  saveParticipation(): void {
    if (!this.validate()) return;
    this.saving = true;
    this.formError = null;

    // Normalize officialSite: empty string => undefined (NULL en base)
    const payload: Entreprise = {
      ...this.editingPart,
      officialSite: this.editingPart.officialSite && this.editingPart.officialSite.trim()
        ? this.editingPart.officialSite.trim()
        : undefined
    };

    this.adminService.saveParticipation(payload).subscribe({
      next: () => {
        this.loadParticipations();
        this.closeModal();
        this.saving = false;
      },
      error: () => {
        this.formError = "Impossible d'enregistrer la participation. Vérifiez les champs ou réessayez.";
        this.saving = false;
      }
    });
  }

  deleteParticipation(id: number): void {
    if (!confirm('Supprimer cette participation ?')) return;
    this.adminService.deleteParticipation(id).subscribe({
      next: () => this.loadParticipations(),
      error: () => {
        this.apiError = 'Suppression impossible : cette participation est peut-être référencée ailleurs.';
      }
    });
  }

  onLogoError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img && img.src !== this.defaultLogoUrl) {
      img.src = this.defaultLogoUrl;
    }
  }
}
