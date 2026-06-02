import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BonPlanComponent } from './pages/bon-plan/bon-plan.component';
import { authGuard } from './admin/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'a-propos', component: AboutComponent },
  { path: 'bon-plan', component: BonPlanComponent },
  
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
        path: 'expertises', 
        loadComponent: () => 
          import('./admin/pages/expertises/expertises.component') 
            .then(m => m.ExpertisesComponent) 
      },
      { 
        path: 'projets', 
        loadComponent: () => 
          import('./admin/pages/projets/projets.component') 
            .then(m => m.ProjetsComponent) 
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
