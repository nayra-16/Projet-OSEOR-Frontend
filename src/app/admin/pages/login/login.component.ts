import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 animate-fade-in">
        <div class="text-center">
          <img class="mx-auto h-16 w-auto mb-6" src="assets/images/logo.png" alt="OSEOR Logo">
          <h2 class="text-3xl font-black text-gray-900 tracking-tight">Espace Admin</h2>
          <p class="mt-2 text-sm text-gray-500 font-medium">Connectez-vous pour gérer votre plateforme</p>
        </div>
        
        <form class="mt-8 space-y-6" (ngSubmit)="onSubmit()">
          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Adresse Email</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                  <i class="fas fa-envelope"></i>
                </span>
                <input type="email" [(ngModel)]="email" name="email" required
                  class="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#036eb1]/10 focus:border-[#036eb1] outline-none transition-all text-gray-900 placeholder-gray-400 font-medium"
                  placeholder="admin@oseor.tg">
              </div>
            </div>
            
            <div class="space-y-2">
              <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Mot de passe</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                  <i class="fas fa-lock"></i>
                </span>
                <input type="password" [(ngModel)]="password" name="password" required
                  class="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#036eb1]/10 focus:border-[#036eb1] outline-none transition-all text-gray-900 placeholder-gray-400 font-medium"
                  placeholder="••••••••">
              </div>
            </div>
          </div>

          <div *ngIf="error" class="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-bold flex items-center animate-shake">
            <i class="fas fa-exclamation-circle mr-2"></i>
            {{ error }}
          </div>

          <div>
            <button type="submit" [disabled]="loading"
              class="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black rounded-2xl text-white bg-[#036eb1] hover:bg-[#025a91] focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed">
              <span *ngIf="!loading">Se connecter</span>
              <span *ngIf="loading" class="flex items-center">
                <i class="fas fa-circle-notch animate-spin mr-2"></i>
                Connexion...
              </span>
            </button>
          </div>
        </form>

        <div class="text-center pt-4">
          <a routerLink="/" class="text-xs font-bold text-gray-400 hover:text-[#036eb1] transition-colors uppercase tracking-widest flex items-center justify-center">
            <i class="fas fa-arrow-left mr-2 text-[10px]"></i>
            Retour au site public
          </a>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.error = 'Veuillez remplir tous les champs';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
        this.router.navigateByUrl(returnUrl);
      },
      error: () => {
        this.error = 'Email ou mot de passe incorrect';
        this.loading = false;
      }
    });
  }
}
