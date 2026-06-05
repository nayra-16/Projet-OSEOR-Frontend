import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { Message } from '../../models/admin.models';

@Component({
  selector: 'app-admin-messages',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6 animate-fade-in">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-black text-gray-900 tracking-tight">Messages de Contact</h1>
          <p class="text-gray-500 text-sm">Gérez les demandes reçues via le formulaire de contact.</p>
        </div>
        <button (click)="loadMessages()" class="p-2 text-gray-400 hover:text-[#036eb1] transition-colors">
          <i class="fas fa-sync-alt" [class.animate-spin]="loading"></i>
        </button>
      </div>

      <!-- Messages Table -->
      <div class="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-100">
                <th class="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Statut</th>
                <th class="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Expéditeur</th>
                <th class="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Sujet</th>
                <th class="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Date</th>
                <th class="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr *ngFor="let msg of messages" class="hover:bg-gray-50/50 transition-colors group">
                <td class="px-6 py-4">
                  <span *ngIf="!msg.read" class="flex h-2 w-2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.5)]"></span>
                  <span *ngIf="msg.read" class="flex h-2 w-2 rounded-full bg-gray-300"></span>
                </td>
                <td class="px-6 py-4">
                  <div class="font-bold text-gray-900">{{ msg.name }}</div>
                  <div class="text-xs text-gray-500">{{ msg.email }}</div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600 truncate max-w-xs">
                  {{ msg.subject || 'Sans sujet' }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">
                  {{ msg.createdAt | date:'dd/MM/yyyy HH:mm' }}
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex justify-end space-x-2">
                    <button (click)="viewMessage(msg)" class="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                      <i class="fas fa-eye"></i>
                    </button>
                    <button (click)="deleteMessage(msg.id!)" class="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr *ngIf="messages.length === 0 && !loading">
                <td colspan="5" class="px-6 py-12 text-center text-gray-500 italic">
                  Aucun message reçu pour le moment.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Message Modal (Quick View) -->
      <div *ngIf="selectedMessage" class="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
        <div class="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-scale-up">
          <div class="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div>
              <h3 class="text-2xl font-black text-gray-900 tracking-tight">Détails du Message</h3>
              <p class="text-sm text-gray-500 mt-1">Reçu le {{ selectedMessage.createdAt | date:'dd MMMM yyyy à HH:mm' }}</p>
            </div>
            <button (click)="closeModal()" class="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-400 hover:text-gray-900 shadow-sm transition-all">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="p-8 space-y-6">
            <div class="grid grid-cols-2 gap-6">
              <div class="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                <p class="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Expéditeur</p>
                <p class="font-bold text-gray-900">{{ selectedMessage.name }}</p>
              </div>
              <div class="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                <p class="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Email</p>
                <p class="font-bold text-gray-900">{{ selectedMessage.email }}</p>
              </div>
            </div>
            <div class="p-6 bg-gray-50 rounded-3xl border border-gray-100 min-h-[150px]">
              <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Message</p>
              <p class="text-gray-700 leading-relaxed">{{ selectedMessage.message }}</p>
            </div>
          </div>
          <div class="p-8 bg-gray-50/50 border-t border-gray-100 flex justify-end">
            <button (click)="closeModal()" class="px-8 py-3 bg-[#036eb1] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  loading: boolean = false;
  selectedMessage: Message | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.loading = true;
    this.adminService.getMessages().subscribe({
      next: (data) => {
        this.messages = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  viewMessage(msg: Message): void {
    this.selectedMessage = msg;
    if (!msg.read) {
      this.adminService.markMessageAsRead(msg.id!).subscribe(() => {
        msg.read = true;
      });
    }
  }

  deleteMessage(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      this.adminService.deleteMessage(id).subscribe(() => {
        this.messages = this.messages.filter(m => m.id !== id);
      });
    }
  }

  closeModal(): void {
    this.selectedMessage = null;
  }
}
