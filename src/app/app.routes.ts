import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BonPlanComponent } from './pages/bon-plan/bon-plan.component';
import { OffresEmploiComponent } from './pages/carrieres/offres-emploi/offres-emploi.component';
import { CandidatureSpontaneeComponent } from './pages/carrieres/candidature-spontanee/candidature-spontanee.component';
import { authGuard } from './admin/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'a-propos', component: AboutComponent },
  { path: 'bon-plan', component: BonPlanComponent },
  { path: 'appels-offres', loadComponent: () => import('./pages/appels-offres/appels-offres.component').then(m => m.AppelsOffresComponent) },
  { path: 'carrieres/offres', component: OffresEmploiComponent },
  { path: 'carrieres/candidature', component: CandidatureSpontaneeComponent },
  
  // Secteurs Routes
  { path: 'secteurs/energie', loadComponent: () => import('./pages/secteurs/energie/energie.component').then(m => m.EnergieComponent) },
  { path: 'secteurs/industrie', loadComponent: () => import('./pages/secteurs/industrie/industrie.component').then(m => m.IndustrieComponent) },
  { path: 'secteurs/services', loadComponent: () => import('./pages/secteurs/services/services.component').then(m => m.ServicesComponent) },
  
  // Admin Routes
  { 
    path: 'admin/login', 
    loadComponent: () => import('./admin/pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/layouts/admin-layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { 
        path: 'dashboard', 
        loadComponent: () => import('./admin/pages/dashboard/dashboard.component').then(m => m.DashboardComponent) 
      },
      { 
        path: 'participations', 
        loadComponent: () => 
          import('./admin/pages/participations/participations.component') 
            .then(m => m.ParticipationsComponent) 
      },
      { 
        path: 'projets', 
        loadComponent: () => 
          import('./admin/pages/projets/projets.component') 
            .then(m => m.ProjetsComponent) 
      },
      { 
        path: 'expertises', 
        loadComponent: () => 
          import('./admin/pages/expertises/expertises.component') 
            .then(m => m.ExpertisesComponent) 
      },
      { 
        path: 'secteurs', 
        loadComponent: () => 
          import('./admin/pages/secteurs/secteurs.component') 
            .then(m => m.SecteursComponent) 
      },
      { 
        path: 'statistiques', 
        loadComponent: () => 
          import('./admin/pages/statistiques/statistiques.component') 
            .then(m => m.StatistiquesComponent) 
      },
      { 
        path: 'actualites', 
        loadComponent: () => 
          import('./admin/pages/actualites/actualites.component') 
            .then(m => m.ActualitesComponent) 
      },
      { 
        path: 'offres-emploi', 
        loadComponent: () => 
          import('./admin/pages/offres-emploi/offres-emploi.component') 
            .then(m => m.OffresEmploiComponent) 
      },
      { 
        path: 'candidatures', 
        loadComponent: () => 
          import('./admin/pages/candidatures/candidatures.component') 
            .then(m => m.CandidaturesComponent) 
      },
      { 
        path: 'appels-offres', 
        loadComponent: () => 
          import('./admin/pages/appels-offres/appels-offres.component') 
            .then(m => m.AppelsOffresComponent) 
      },
      { 
        path: 'utilisateurs', 
        loadComponent: () => 
          import('./admin/pages/utilisateurs/utilisateurs.component') 
            .then(m => m.UtilisateursComponent) 
      },
      { 
        path: 'messages', 
        loadComponent: () => 
          import('./admin/pages/messages/messages.component') 
            .then(m => m.MessagesComponent) 
      },
      { 
        path: 'settings', 
        loadComponent: () => 
          import('./admin/pages/settings/settings.component') 
            .then(m => m.SettingsComponent) 
      }
    ]
  },
  
  { path: '**', redirectTo: '' }
];
