import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { StatsCardComponent } from '../../components/stats-card/stats-card.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, StatsCardComponent],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-black text-gray-900 font-['Ubuntu'] tracking-tight">Vue d'ensemble</h1>
        <p class="text-gray-500 font-medium mt-1">Bienvenue dans votre tableau de bord OSEOR.</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <app-stats-card 
          title="Expertises" 
          [value]="stats.expertises" 
          icon="fas fa-lightbulb" 
          color="bg-[#036eb1]"
          [loading]="isLoading">
        </app-stats-card>
        <app-stats-card 
          title="Projets" 
          [value]="stats.projets" 
          icon="fas fa-project-diagram" 
          color="bg-purple-600"
          [loading]="isLoading">
        </app-stats-card>
        <app-stats-card 
          title="Entreprises" 
          [value]="stats.entreprises" 
          icon="fas fa-building" 
          color="bg-emerald-600"
          [loading]="isLoading">
        </app-stats-card>
        <app-stats-card 
          title="Messages" 
          [value]="stats.messages" 
          icon="fas fa-envelope" 
          color="bg-orange-600"
          [loading]="isLoading">
        </app-stats-card>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <!-- Recent Activity or placeholder -->
        <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h3 class="text-xl font-bold text-gray-900 font-['Ubuntu'] mb-6 flex items-center">
            <i class="fas fa-chart-line text-[#036eb1] mr-3"></i>
            Activité récente
          </h3>
          <div class="space-y-6">
            <div *ngFor="let i of [1,2,3]" class="flex items-center">
              <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#036eb1] shadow-sm mr-4">
                <i class="fas fa-check-circle"></i>
              </div>
              <div>
                <p class="text-sm font-bold text-gray-900">Mise à jour effectuée</p>
                <p class="text-xs text-gray-500 mt-1">Il y a 2 heures</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Status -->
        <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h3 class="text-xl font-bold text-gray-900 font-['Ubuntu'] mb-6">Statut Système</h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="p-6 bg-[#036eb1]/10 rounded-3xl border border-[#036eb1]/20 text-center">
              <p class="text-xs font-black text-[#036eb1] uppercase tracking-[0.2em] mb-2">API</p>
              <div class="flex items-center justify-center space-x-2">
                <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span class="text-lg font-bold text-[#036eb1]">En ligne</span>
              </div>
            </div>
            <div class="p-6 bg-purple-50/50 rounded-3xl border border-purple-100/50 text-center">
              <p class="text-xs font-black text-purple-600 uppercase tracking-[0.2em] mb-2">DB</p>
              <div class="flex items-center justify-center space-x-2">
                <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                <span class="text-lg font-bold text-purple-900">Connecté</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  stats = {
    expertises: 0,
    projets: 0,
    entreprises: 0,
    messages: 0
  };
  isLoading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.isLoading = true;
    // En production, on ferait un appel API dédié
    // Pour l'instant on simule
    setTimeout(() => {
      this.stats = {
        expertises: 4,
        projets: 15,
        entreprises: 15,
        messages: 24
      };
      this.isLoading = false;
    }, 800);
  }
}
