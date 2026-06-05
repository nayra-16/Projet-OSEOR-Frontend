import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Projet } from '../../models/admin.models';

@Component({
  selector: 'app-admin-projets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6 animate-fade-in">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-black text-gray-900 tracking-tight">Gestion des Projets</h1>
          <p class="text-gray-500 text-sm">Ajoutez ou modifiez les projets accompagnés par OSEOR.</p>
        </div>
        <button (click)="openModal()" class="px-6 py-3 bg-[#036eb1] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center space-x-2">
          <i class="fas fa-plus"></i>
          <span>Nouveau Projet</span>
        </button>
      </div>

      <!-- Projets Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let projet of projets" class="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-500">
          <div class="relative h-48 overflow-hidden">
            <img [src]="projet.image" [alt]="projet.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <span class="text-white text-xs font-bold uppercase tracking-widest bg-[#036eb1] px-3 py-1 rounded-full">
                {{ projet.category }}
              </span>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2 truncate">{{ projet.title }}</h3>
            <p class="text-gray-500 text-sm line-clamp-2 mb-6">{{ projet.description }}</p>
            <div class="flex justify-between items-center">
              <a *ngIf="projet.officialSite" [href]="projet.officialSite" target="_blank" class="text-[#036eb1] text-xs font-bold uppercase tracking-widest hover:underline">
                Voir le site
              </a>
              <div class="flex space-x-2 ml-auto">
                <button (click)="openModal(projet)" class="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                  <i class="fas fa-edit"></i>
                </button>
                <button (click)="deleteProjet(projet.id!)" class="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Form -->
      <div *ngIf="showModal" class="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
        <div class="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-scale-up">
          <div class="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 class="text-2xl font-black text-gray-900 tracking-tight">
              {{ editingProjet.id ? 'Modifier le Projet' : 'Nouveau Projet' }}
            </h3>
            <button (click)="closeModal()" class="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-400 hover:text-gray-900 shadow-sm">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <form (ngSubmit)="saveProjet()" class="p-8 space-y-6">
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Titre du Projet</label>
                <input type="text" [(ngModel)]="editingProjet.title" name="title" required
                  class="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#036eb1]/20 focus:border-[#036eb1] outline-none transition-all">
              </div>
              <div class="space-y-2">
                <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Catégorie</label>
                <select [(ngModel)]="editingProjet.category" name="category" required
                  class="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#036eb1]/20 focus:border-[#036eb1] outline-none transition-all">
                  <option value="Énergie">Énergie</option>
                  <option value="Industrie">Industrie</option>
                  <option value="Services">Services</option>
                </select>
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
              <textarea [(ngModel)]="editingProjet.description" name="description" rows="3" required
                class="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#036eb1]/20 focus:border-[#036eb1] outline-none transition-all"></textarea>
            </div>
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">URL Image</label>
                <input type="text" [(ngModel)]="editingProjet.image" name="image" required
                  class="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#036eb1]/20 focus:border-[#036eb1] outline-none transition-all">
              </div>
              <div class="space-y-2">
                <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Site Officiel (optionnel)</label>
                <input type="text" [(ngModel)]="editingProjet.officialSite" name="officialSite"
                  class="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#036eb1]/20 focus:border-[#036eb1] outline-none transition-all">
              </div>
            </div>
            <div class="pt-4 flex justify-end space-x-4">
              <button type="button" (click)="closeModal()" class="px-8 py-3 text-gray-500 font-bold hover:text-gray-900 transition-colors">
                Annuler
              </button>
              <button type="submit" class="px-8 py-3 bg-[#036eb1] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class ProjetsComponent implements OnInit {
  projets: Projet[] = [];
  showModal = false;
  editingProjet: Projet = { title: '', description: '', image: '', category: 'Énergie' };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadProjets();
  }

  loadProjets(): void {
    this.adminService.getProjets().subscribe(data => this.projets = data);
  }

  openModal(projet?: Projet): void {
    this.editingProjet = projet ? { ...projet } : { title: '', description: '', image: '', category: 'Énergie' };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveProjet(): void {
    this.adminService.saveProjet(this.editingProjet).subscribe(() => {
      this.loadProjets();
      this.closeModal();
    });
  }

  deleteProjet(id: number): void {
    if (confirm('Supprimer ce projet ?')) {
      this.adminService.deleteProjet(id).subscribe(() => this.loadProjets());
    }
  }
}
