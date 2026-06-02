import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="w-64 bg-slate-900 text-white flex flex-col h-full shadow-xl z-20 transition-all duration-300">
      <div class="p-6 border-b border-slate-800 flex items-center space-x-3">
        <div class="w-8 h-8 bg-[#036eb1] rounded-lg flex items-center justify-center font-bold text-white shadow-lg">O</div>
        <span class="text-xl font-bold tracking-tight">OSEOR Admin</span>
      </div>
      
      <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
        <a routerLink="/admin/dashboard" routerLinkActive="bg-[#036eb1] text-white shadow-md" class="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-800 transition-all duration-200 group">
          <i class="fas fa-th-large w-5 text-slate-400 group-hover:text-white"></i>
          <span class="font-medium">Dashboard</span>
        </a>
        
        <div class="pt-4 pb-2 px-3 text-[10px] font-black uppercase tracking-widest text-slate-500">Gestion</div>
        
        <a routerLink="/admin/expertises" routerLinkActive="bg-[#036eb1] text-white shadow-md" class="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-800 transition-all duration-200 group">
          <i class="fas fa-lightbulb w-5 text-slate-400 group-hover:text-white"></i>
          <span class="font-medium">Expertises</span>
        </a>
        
        <a routerLink="/admin/projets" routerLinkActive="bg-[#036eb1] text-white shadow-md" class="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-800 transition-all duration-200 group">
          <i class="fas fa-project-diagram w-5 text-slate-400 group-hover:text-white"></i>
          <span class="font-medium">Projets</span>
        </a>
        
        <a routerLink="/admin/messages" routerLinkActive="bg-[#036eb1] text-white shadow-md" class="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-800 transition-all duration-200 group">
          <i class="fas fa-envelope w-5 text-slate-400 group-hover:text-white"></i>
          <span class="font-medium">Messages</span>
        </a>
        
        <div class="pt-4 pb-2 px-3 text-[10px] font-black uppercase tracking-widest text-slate-500">Système</div>
        
        <a routerLink="/admin/settings" routerLinkActive="bg-[#036eb1] text-white shadow-md" class="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-800 transition-all duration-200 group">
          <i class="fas fa-cog w-5 text-slate-400 group-hover:text-white"></i>
          <span class="font-medium">Paramètres</span>
        </a>
      </nav>
      
      <div class="p-4 border-t border-slate-800">
        <button (click)="onLogout()" class="flex items-center space-x-3 p-3 w-full rounded-xl text-[#ae151e] hover:bg-[#ae151e]/10 transition-all duration-200 group">
          <i class="fas fa-sign-out-alt w-5 group-hover:translate-x-1 transition-transform"></i>
          <span class="font-medium">Déconnexion</span>
        </button>
      </div>
    </div>
  `
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
}
