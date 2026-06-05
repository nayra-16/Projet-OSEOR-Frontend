import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Expertise } from '../../models/admin.models';

// Je devrai ajouter Actualite à admin.models.ts plus tard
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

@Component({
  selector: 'app-admin-actualites',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6 animate-fade-in">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-black text-gray-900 tracking-tight">Gestion des Actualités</h1>
          <p class="text-gray-500 text-sm">Gérez les articles et actualités du groupe.</p>
        </div>
        <button (click)="openModal()" class="px-6 py-3 bg-[#036eb1] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center space-x-2">
          <i class="fas fa-plus"></i>
          <span>Nouvel Article</span>
        </button>
      </div>

      <div class="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-100">
                <th class="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Image</th>
                <th class="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Titre</th>
                <th class="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Date</th>
                <th class="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr *ngFor="let item of actualites" class="hover:bg-gray-50/50 transition-colors group">
                <td class="px-6 py-4">
                  <div class="w-12 h-12 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                    <img [src]="item.imageUrl" [alt]="item.title" class="w-full h-full object-cover">
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="font-bold text-gray-900">{{ item.title }}</div>
                  <div class="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1">
                    <span *ngIf="item.published" class="text-emerald-600">Publié</span>
                    <span *ngIf="!item.published" class="text-orange-500">Brouillon</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-600">{{ item.date | date:'dd/MM/yyyy' }}</div>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex justify-end space-x-2">
                    <button (click)="openModal(item)" class="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button (click)="deleteActualite(item.id!)" class="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal Form -->
      <div *ngIf="showModal" class="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
        <div class="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl overflow-hidden animate-scale-up">
          <div class="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 class="text-2xl font-black text-gray-900 tracking-tight">
              {{ editingActualite?.id ? 'Modifier l\'Article' : 'Nouvel Article' }}
            </h3>
            <button (click)="closeModal()" class="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-400 hover:text-gray-900 shadow-sm">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <form (ngSubmit)="saveActualite()" class="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Titre</label>
                <input type="text" [(ngModel)]="editingActualite.title" name="title" required
                  class="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#036eb1]/20 focus:border-[#036eb1] outline-none transition-all">
              </div>
              <div class="space-y-2">
                <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">URL Image</label>
                <input type="text" [(ngModel)]="editingActualite.imageUrl" name="imageUrl" required
                  class="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#036eb1]/20 focus:border-[#036eb1] outline-none transition-all">
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Résumé</label>
              <textarea [(ngModel)]="editingActualite.summary" name="summary" rows="2" required
                class="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#036eb1]/20 focus:border-[#036eb1] outline-none transition-all"></textarea>
            </div>
            <div class="space-y-2">
              <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Contenu</label>
              <textarea [(ngModel)]="editingActualite.content" name="content" rows="6" required
                class="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#036eb1]/20 focus:border-[#036eb1] outline-none transition-all"></textarea>
            </div>
            <div class="flex items-center space-x-6">
              <label class="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" [(ngModel)]="editingActualite.published" name="published" class="w-5 h-5 rounded border-gray-300 text-[#036eb1] focus:ring-[#036eb1]">
                <span class="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Publier immédiatement</span>
              </label>
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
export class ActualitesComponent implements OnInit {
  actualites: Actualite[] = [];
  showModal = false;
  editingActualite: Actualite = { title: '', summary: '', content: '', imageUrl: '', date: '', published: true, archived: false };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadActualites();
  }

  loadActualites(): void {
    // Appel au service admin (à implémenter dans AdminService)
    this.adminService.getExpertises().subscribe({ // Temporaire, je devrai ajouter getActualites
      next: (data: any) => {
        // this.actualites = data;
      }
    });
  }

  openModal(item?: Actualite): void {
    this.editingActualite = item ? { ...item } : { title: '', summary: '', content: '', imageUrl: '', date: new Date().toISOString(), published: true, archived: false };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveActualite(): void {
    // Sauvegarde via AdminService
    this.closeModal();
  }

  deleteActualite(id: number): void {
    if (confirm('Supprimer cet article ?')) {
      // Suppression via AdminService
    }
  }
}
