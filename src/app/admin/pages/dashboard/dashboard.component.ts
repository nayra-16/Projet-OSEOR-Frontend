import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { AdminStats } from '../../models/admin.models';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-8 animate-fade-in">
      <!-- Welcome Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-black text-gray-900 tracking-tight">Vue d'ensemble</h1>
          <p class="text-gray-500 mt-1">Bienvenue dans votre tableau de bord OSEOR.</p>
        </div>
        <div class="flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full border border-emerald-100 shadow-sm">
          <span class="relative flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span class="text-sm font-bold uppercase tracking-wider">Système en ligne</span>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <i class="fas fa-building text-xl"></i>
          </div>
          <p class="text-gray-500 text-sm font-medium uppercase tracking-wider">Participations</p>
          <div class="flex items-end justify-between mt-2">
            <h3 class="text-3xl font-black text-gray-900">{{ stats?.totalParticipations || 0 }}</h3>
            <span class="text-blue-600 text-xs font-bold bg-blue-50 px-2 py-1 rounded-lg">Filiales</span>
          </div>
        </div>

        <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <i class="fas fa-project-diagram text-xl"></i>
          </div>
          <p class="text-gray-500 text-sm font-medium uppercase tracking-wider">Projets</p>
          <div class="flex items-end justify-between mt-2">
            <h3 class="text-3xl font-black text-gray-900">{{ stats?.totalProjets || 0 }}</h3>
            <span class="text-purple-600 text-xs font-bold bg-purple-50 px-2 py-1 rounded-lg">Accompagnés</span>
          </div>
        </div>

        <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-4">
            <i class="fas fa-envelope text-xl"></i>
          </div>
          <p class="text-gray-500 text-sm font-medium uppercase tracking-wider">Messages</p>
          <div class="flex items-end justify-between mt-2">
            <h3 class="text-3xl font-black text-gray-900">{{ stats?.totalMessages || 0 }}</h3>
            <span class="text-orange-600 text-xs font-bold bg-orange-50 px-2 py-1 rounded-lg">Total</span>
          </div>
        </div>

        <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-4">
            <i class="fas fa-bell text-xl"></i>
          </div>
          <p class="text-gray-500 text-sm font-medium uppercase tracking-wider">Notifications</p>
          <div class="flex items-end justify-between mt-2">
            <h3 class="text-3xl font-black text-gray-900">{{ stats?.unreadMessages || 0 }}</h3>
            <span class="text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded-lg">Non lus</span>
          </div>
        </div>

        <!-- New Stats Row -->
        <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
            <i class="fas fa-briefcase text-xl"></i>
          </div>
          <p class="text-gray-500 text-sm font-medium uppercase tracking-wider">Offres</p>
          <div class="flex items-end justify-between mt-2">
            <h3 class="text-3xl font-black text-gray-900">{{ stats?.totalOffres || 0 }}</h3>
            <span class="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">Emploi</span>
          </div>
        </div>

        <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
            <i class="fas fa-user-graduate text-xl"></i>
          </div>
          <p class="text-gray-500 text-sm font-medium uppercase tracking-wider">Candidatures</p>
          <div class="flex items-end justify-between mt-2">
            <h3 class="text-3xl font-black text-gray-900">{{ stats?.totalCandidatures || 0 }}</h3>
            <span class="text-indigo-600 text-xs font-bold bg-indigo-50 px-2 py-1 rounded-lg">Reçues</span>
          </div>
        </div>

        <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="w-12 h-12 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mb-4">
            <i class="fas fa-file-contract text-xl"></i>
          </div>
          <p class="text-gray-500 text-sm font-medium uppercase tracking-wider">Appels d'Offres</p>
          <div class="flex items-end justify-between mt-2">
            <h3 class="text-3xl font-black text-gray-900">{{ stats?.totalAppelsOffres || 0 }}</h3>
            <span class="text-pink-600 text-xs font-bold bg-pink-50 px-2 py-1 rounded-lg">Publics</span>
          </div>
        </div>

        <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mb-4">
            <i class="fas fa-newspaper text-xl"></i>
          </div>
          <p class="text-gray-500 text-sm font-medium uppercase tracking-wider">Actualités</p>
          <div class="flex items-end justify-between mt-2">
            <h3 class="text-3xl font-black text-gray-900">{{ stats?.totalActualites || 0 }}</h3>
            <span class="text-yellow-600 text-xs font-bold bg-yellow-50 px-2 py-1 rounded-lg">Articles</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Quick Actions -->
        <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h3 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <i class="fas fa-bolt text-yellow-500 mr-3"></i>
            Actions Rapides
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <button class="p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-gray-100 transition-colors text-center group">
              <i class="fas fa-plus text-[#036eb1] mb-2 group-hover:scale-110 transition-transform"></i>
              <p class="text-sm font-bold text-gray-900">Nouveau Projet</p>
            </button>
            <button class="p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-gray-100 transition-colors text-center group">
              <i class="fas fa-plus text-[#036eb1] mb-2 group-hover:scale-110 transition-transform"></i>
              <p class="text-sm font-bold text-gray-900">Nouvelle Filiale</p>
            </button>
          </div>
        </div>

        <!-- System Status -->
        <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h3 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <i class="fas fa-server text-[#036eb1] mr-3"></i>
            Statut Système
          </h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <span class="text-sm font-bold text-gray-600 uppercase tracking-widest">Base de données</span>
              <span class="flex items-center text-emerald-600 font-bold text-sm">
                <span class="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                Connectée
              </span>
            </div>
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <span class="text-sm font-bold text-gray-600 uppercase tracking-widest">Stockage (S3/Local)</span>
              <span class="flex items-center text-emerald-600 font-bold text-sm">
                <span class="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                Opérationnel
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  stats?: AdminStats;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getStats().subscribe(stats => {
      this.stats = stats;
    });
  }
}
