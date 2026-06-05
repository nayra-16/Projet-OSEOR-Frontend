import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Participation } from '../../models/admin.models';

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

      <!-- Participations Table -->
      <div class="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
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
                    <img [src]="part.logoUrl" [alt]="part.name" class="max-w-full max-h-full object-contain">
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="font-bold text-gray-900">{{ part.name }}</div>
                  <div class="text-xs text-gray-500 truncate max-w-xs">{{ part.description }}</div>
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
          <form (ngSubmit)="saveParticipation()" class="p-8 space-y-6">
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Nom de l'entreprise</label>
                <input type="text" [(ngModel)]="editingPart.name" name="name" required
                  class="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#036eb1]/20 focus:border-[#036eb1] outline-none transition-all">
              </div>
              <div class="space-y-2">
                <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Secteur</label>
                <select [(ngModel)]="editingPart.secteur" name="secteur" required
                  class="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#036eb1]/20 focus:border-[#036eb1] outline-none transition-all">
                  <option value="Énergie">Énergie</option>
                  <option value="Industrie">Industrie</option>
                  <option value="Services">Services</option>
                </select>
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
              <textarea [(ngModel)]="editingPart.description" name="description" rows="3" required
                class="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#036eb1]/20 focus:border-[#036eb1] outline-none transition-all"></textarea>
            </div>
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">URL du Logo</label>
                <input type="text" [(ngModel)]="editingPart.logoUrl" name="logoUrl" required
                  class="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#036eb1]/20 focus:border-[#036eb1] outline-none transition-all">
              </div>
              <div class="space-y-2">
                <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Site Officiel (optionnel)</label>
                <input type="text" [(ngModel)]="editingPart.officialSite" name="officialSite"
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
export class ParticipationsComponent implements OnInit {
  participations: Participation[] = [];
  showModal = false;
  editingPart: Participation = { name: '', secteur: 'Énergie', description: '', logoUrl: '' };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadParticipations();
  }

  loadParticipations(): void {
    this.adminService.getParticipations().subscribe(data => this.participations = data);
  }

  openModal(part?: Participation): void {
    this.editingPart = part ? { ...part } : { name: '', secteur: 'Énergie', description: '', logoUrl: '' };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveParticipation(): void {
    this.adminService.saveParticipation(this.editingPart).subscribe(() => {
      this.loadParticipations();
      this.closeModal();
    });
  }

  deleteParticipation(id: number): void {
    if (confirm('Supprimer cette participation ?')) {
      this.adminService.deleteParticipation(id).subscribe(() => this.loadParticipations());
    }
  }
}
