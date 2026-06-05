import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/admin.models';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 class="text-2xl font-black text-gray-900 tracking-tight">Paramètres</h1>
        <p class="text-gray-500 text-sm">Gérez votre profil administrateur et les configurations.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Profile Info -->
        <div class="md:col-span-2 space-y-6">
          <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h3 class="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <i class="fas fa-user-circle text-[#036eb1] mr-3"></i>
              Informations du profil
            </h3>
            <div class="space-y-4">
              <div class="space-y-2">
                <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Adresse Email</label>
                <input type="email" [value]="user?.email" disabled
                  class="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-500 cursor-not-allowed">
                <p class="text-[10px] text-gray-400 italic mt-1">L'email ne peut pas être modifié pour des raisons de sécurité.</p>
              </div>
              <div class="space-y-2">
                <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Rôle</label>
                <input type="text" [value]="user?.role" disabled
                  class="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-500 cursor-not-allowed">
              </div>
            </div>
          </div>

          <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h3 class="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <i class="fas fa-key text-[#036eb1] mr-3"></i>
              Sécurité
            </h3>
            <p class="text-sm text-gray-500 mb-6">Pour changer votre mot de passe, veuillez contacter l'administrateur système principal.</p>
            <button class="px-6 py-3 bg-gray-100 text-gray-400 font-bold rounded-xl cursor-not-allowed">
              Changer le mot de passe
            </button>
          </div>
        </div>

        <!-- System Info -->
        <div class="space-y-6">
          <div class="bg-[#036eb1] p-8 rounded-[2.5rem] shadow-xl text-white">
            <h3 class="text-lg font-bold mb-6">Version Système</h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center border-b border-white/10 pb-4">
                <span class="text-blue-200 text-xs uppercase tracking-widest">Version</span>
                <span class="font-bold">2.0.0-PRO</span>
              </div>
              <div class="flex justify-between items-center border-b border-white/10 pb-4">
                <span class="text-blue-200 text-xs uppercase tracking-widest">Angular</span>
                <span class="font-bold">v17.3</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-blue-200 text-xs uppercase tracking-widest">Spring</span>
                <span class="font-bold">v3.5</span>
              </div>
            </div>
          </div>
          
          <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 text-center">
            <div class="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-trash-alt text-xl"></i>
            </div>
            <h3 class="text-gray-900 font-bold mb-2">Vider le cache</h3>
            <p class="text-xs text-gray-500 mb-4">Réinitialise les données locales stockées par l'admin.</p>
            <button (click)="clearCache()" class="w-full py-3 border border-red-100 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-colors">
              Réinitialiser
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SettingsComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  clearCache(): void {
    if (confirm('Voulez-vous vraiment vider le cache local ? Vous serez déconnecté.')) {
      this.authService.logout();
    }
  }
}
