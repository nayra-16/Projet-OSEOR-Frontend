import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Expertise } from '../../models/admin.models';

@Component({
  selector: 'app-admin-expertises',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6 animate-fade-in">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-black text-gray-900 tracking-tight">Gestion des Expertises</h1>
          <p class="text-gray-500 text-sm">Gérez les expertises affichées sur le site.</p>
        </div>
        <button (click)="openModal()" class="px-6 py-3 bg-[#036eb1] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center space-x-2">
          <i class="fas fa-plus"></i>
          <span>Nouvelle Expertise</span>
        </button>
      </div>

      <!-- Expertises Table -->
      <div class="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-100">
                <th class="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Titre</th>
                <th class="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Description</th>
                <th class="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Icone</th>
                <th class="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr *ngFor="let item of expertises" class="hover:bg-gray-50/50 transition-colors group">
                <td class="px-6 py-4">
                  <div class="font-bold text-gray-900">{{ item.title }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-xs text-gray-500 truncate max-w-xs">{{ item.description }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-[#036eb1]">
                    <i [class]="item.icon"></i>
                  </div>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex justify-end space-x-2">
                    <button (click)="openModal(item)" class="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button (click)="deleteExpertise(item.id!)" class="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm">
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
        <div class="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-scale-up">
          <div class="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 class="text-2xl font-black text-gray-900 tracking-tight">
              {{ editingExpertise?.id ? 'Modifier l\'Expertise' : 'Nouvelle Expertise' }}
            </h3>
            <button (click)="closeModal()" class="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-400 hover:text-gray-900 shadow-sm">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <form (ngSubmit)="saveExpertise()" class="p-8 space-y-6">
            <div class="space-y-2">
              <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Titre</label>
              <input type="text" [(ngModel)]="editingExpertise.title" name="title" required
                class="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#036eb1]/20 focus:border-[#036eb1] outline-none transition-all">
            </div>
            <div class="space-y-2">
              <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
              <textarea [(ngModel)]="editingExpertise.description" name="description" rows="4" required
                class="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#036eb1]/20 focus:border-[#036eb1] outline-none transition-all"></textarea>
            </div>
            <div class="space-y-2">
              <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Icone (FontAwesome)</label>
              <input type="text" [(ngModel)]="editingExpertise.icon" name="icon" required placeholder="fas fa-chart-line"
                class="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#036eb1]/20 focus:border-[#036eb1] outline-none transition-all">
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
export class ExpertisesComponent implements OnInit {
  expertises: Expertise[] = [];
  showModal = false;
  editingExpertise: Expertise = { title: '', description: '', icon: 'fas fa-chart-line' };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadExpertises();
  }

  loadExpertises(): void {
    this.adminService.getExpertises().subscribe({
      next: (data: Expertise[]) => {
        this.expertises = data;
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des expertises', err);
      }
    });
  }

  openModal(expertise?: Expertise): void {
    this.editingExpertise = expertise ? { ...expertise } : { title: '', description: '', icon: 'fas fa-chart-line' };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveExpertise(): void {
    if (this.editingExpertise.id) {
      this.adminService.updateExpertise(this.editingExpertise.id, this.editingExpertise).subscribe({
        next: (data: Expertise) => {
          this.loadExpertises();
          this.closeModal();
        },
        error: (err: any) => {
          console.error('Erreur lors de la modification', err);
        }
      });
    } else {
      this.adminService.createExpertise(this.editingExpertise).subscribe({
        next: (data: Expertise) => {
          this.loadExpertises();
          this.closeModal();
        },
        error: (err: any) => {
          console.error('Erreur lors de la création', err);
        }
      });
    }
  }

  deleteExpertise(id: number): void {
    if (confirm('Supprimer cette expertise ?')) {
      this.adminService.deleteExpertise(id).subscribe({
        next: () => {
          this.loadExpertises();
        },
        error: (err: any) => {
          console.error('Erreur lors de la suppression', err);
        }
      });
    }
  }
}
