import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      <!-- Background Shapes -->
      <div class="absolute top-0 -left-4 w-72 h-72 bg-[#036eb1] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div class="absolute bottom-0 -right-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div class="max-w-md w-full relative">
        <div class="bg-white/10 backdrop-blur-xl p-10 rounded-[2rem] border border-white/10 shadow-2xl">
          <div class="text-center mb-10">
            <div class="w-16 h-16 bg-[#036eb1] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#036eb1]/20 rotate-3 group hover:rotate-0 transition-all duration-300">
              <i class="fas fa-user-shield text-2xl text-white"></i>
            </div>
            <h1 class="text-3xl font-black text-white font-['Ubuntu'] tracking-tight">Espace Admin</h1>
            <p class="text-slate-400 mt-2 font-medium">Connectez-vous pour gérer OSEOR</p>
          </div>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-300 ml-1">Email professionnel</label>
              <div class="relative">
                <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
                <input 
                  type="email" 
                  formControlName="email"
                  class="w-full bg-slate-900/50 border border-slate-800 text-white pl-11 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-[#036eb1] focus:border-transparent outline-none transition-all duration-200 placeholder-slate-600"
                  placeholder="admin@oseor.tg">
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-300 ml-1">Mot de passe</label>
              <div class="relative">
                <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
                <input 
                  type="password" 
                  formControlName="password"
                  class="w-full bg-slate-900/50 border border-slate-800 text-white pl-11 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-[#036eb1] focus:border-transparent outline-none transition-all duration-200 placeholder-slate-600"
                  placeholder="••••••••">
              </div>
            </div>

            <div *ngIf="error" class="bg-[#ae151e]/10 border border-[#ae151e]/20 text-[#ae151e] px-4 py-3 rounded-xl text-sm font-bold flex items-center space-x-2 animate-shake">
              <i class="fas fa-exclamation-circle"></i>
              <span>{{ error }}</span>
            </div>

            <button 
              type="submit" 
              [disabled]="loginForm.invalid || isLoading"
              class="w-full bg-[#036eb1] hover:bg-[#036eb1]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-[#036eb1]/20 transition-all duration-200 flex items-center justify-center space-x-2 transform active:scale-[0.98]">
              <span *ngIf="!isLoading">Se connecter</span>
              <div *ngIf="isLoading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <i *ngIf="!isLoading" class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-blob {
      animation: blob 7s infinite;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
    .animate-shake {
      animation: shake 0.2s ease-in-out 0s 2;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.error = null;
      
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/admin/dashboard']);
        },
        error: (err) => {
          this.isLoading = false;
          this.error = "Identifiants invalides ou erreur serveur.";
        }
      });
    }
  }
}
