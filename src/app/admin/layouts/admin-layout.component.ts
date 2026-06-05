import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex h-screen bg-gray-100 font-sans">
      <!-- Sidebar -->
      <aside class="w-64 bg-[#036eb1] text-white flex flex-col shadow-xl transition-all duration-300">
        <div class="p-6 flex items-center space-x-3">
          <img src="assets/images/logo.png" alt="OSEOR" class="h-8 brightness-0 invert">
          <span class="font-bold text-xl tracking-tight">Admin</span>
        </div>
        
        <nav class="flex-1 mt-6 px-4 space-y-2">
          <a routerLink="./dashboard" routerLinkActive="bg-white/10" class="flex items-center space-x-3 p-3 rounded-xl transition-all hover:bg-white/5 group">
            <i class="fas fa-chart-pie w-5 text-blue-200 group-hover:text-white"></i>
            <span>Tableau de bord</span>
          </a>
          <a routerLink="./participations" routerLinkActive="bg-white/10" class="flex items-center space-x-3 p-3 rounded-xl transition-all hover:bg-white/5 group">
            <i class="fas fa-building w-5 text-blue-200 group-hover:text-white"></i>
            <span>Participations</span>
          </a>
          <a routerLink="./projets" routerLinkActive="bg-white/10" class="flex items-center space-x-3 p-3 rounded-xl transition-all hover:bg-white/5 group">
            <i class="fas fa-project-diagram w-5 text-blue-200 group-hover:text-white"></i>
            <span>Projets</span>
          </a>
          <a routerLink="./expertises" routerLinkActive="bg-white/10" class="flex items-center space-x-3 p-3 rounded-xl transition-all hover:bg-white/5 group">
            <i class="fas fa-lightbulb w-5 text-blue-200 group-hover:text-white"></i>
            <span>Expertises</span>
          </a>
          <a routerLink="./secteurs" routerLinkActive="bg-white/10" class="flex items-center space-x-3 p-3 rounded-xl transition-all hover:bg-white/5 group">
            <i class="fas fa-th-large w-5 text-blue-200 group-hover:text-white"></i>
            <span>Secteurs</span>
          </a>
          <a routerLink="./statistiques" routerLinkActive="bg-white/10" class="flex items-center space-x-3 p-3 rounded-xl transition-all hover:bg-white/5 group">
            <i class="fas fa-chart-bar w-5 text-blue-200 group-hover:text-white"></i>
            <span>Statistiques</span>
          </a>
          <a routerLink="./actualites" routerLinkActive="bg-white/10" class="flex items-center space-x-3 p-3 rounded-xl transition-all hover:bg-white/5 group">
            <i class="fas fa-newspaper w-5 text-blue-200 group-hover:text-white"></i>
            <span>Actualités</span>
          </a>
          <a routerLink="./offres-emploi" routerLinkActive="bg-white/10" class="flex items-center space-x-3 p-3 rounded-xl transition-all hover:bg-white/5 group">
            <i class="fas fa-briefcase w-5 text-blue-200 group-hover:text-white"></i>
            <span>Offres d'emploi</span>
          </a>
          <a routerLink="./candidatures" routerLinkActive="bg-white/10" class="flex items-center space-x-3 p-3 rounded-xl transition-all hover:bg-white/5 group">
            <i class="fas fa-user-graduate w-5 text-blue-200 group-hover:text-white"></i>
            <span>Candidatures</span>
          </a>
          <a routerLink="./appels-offres" routerLinkActive="bg-white/10" class="flex items-center space-x-3 p-3 rounded-xl transition-all hover:bg-white/5 group">
            <i class="fas fa-file-contract w-5 text-blue-200 group-hover:text-white"></i>
            <span>Appels d'offres</span>
          </a>
          <a routerLink="./messages" routerLinkActive="bg-white/10" class="flex items-center space-x-3 p-3 rounded-xl transition-all hover:bg-white/5 group">
            <i class="fas fa-envelope w-5 text-blue-200 group-hover:text-white"></i>
            <span>Messages</span>
          </a>
          <div class="pt-6 pb-2">
            <span class="px-3 text-xs font-semibold text-blue-300 uppercase tracking-widest">Système</span>
          </div>
          <a routerLink="./utilisateurs" routerLinkActive="bg-white/10" class="flex items-center space-x-3 p-3 rounded-xl transition-all hover:bg-white/5 group">
            <i class="fas fa-users w-5 text-blue-200 group-hover:text-white"></i>
            <span>Utilisateurs</span>
          </a>
          <a routerLink="./settings" routerLinkActive="bg-white/10" class="flex items-center space-x-3 p-3 rounded-xl transition-all hover:bg-white/5 group">
            <i class="fas fa-cog w-5 text-blue-200 group-hover:text-white"></i>
            <span>Paramètres</span>
          </a>
        </nav>

        <div class="p-4 border-t border-white/10">
          <button (click)="logout()" class="w-full flex items-center space-x-3 p-3 rounded-xl text-red-200 hover:bg-red-500/20 hover:text-red-100 transition-all group">
            <i class="fas fa-sign-out-alt w-5"></i>
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 flex flex-col overflow-hidden">
        <!-- Header -->
        <header class="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 shadow-sm">
          <h2 class="text-xl font-bold text-gray-800">Espace Administration</h2>
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <p class="text-sm font-bold text-gray-900">{{ userEmail }}</p>
              <p class="text-xs text-gray-500 uppercase tracking-tighter">Administrateur</p>
            </div>
            <div class="w-10 h-10 rounded-full bg-[#036eb1] flex items-center justify-center text-white font-bold shadow-md">
              {{ userInitial }}
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <div class="flex-1 overflow-y-auto p-8 bg-gray-50/50">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `
})
export class AdminLayoutComponent {
  userEmail: string = '';
  userInitial: string = '';

  constructor(private authService: AuthService) {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userEmail = user.email;
      this.userInitial = user.email.charAt(0).toUpperCase();
    }
  }

  logout() {
    this.authService.logout();
  }
}
