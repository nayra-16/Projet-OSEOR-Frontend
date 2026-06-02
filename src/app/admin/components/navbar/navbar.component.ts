import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-white h-16 shadow-sm flex items-center justify-between px-8 z-10 border-b border-gray-100">
      <div class="flex items-center">
        <h2 class="text-lg font-semibold text-gray-800 tracking-tight">Espace Administration</h2>
      </div>
      
      <div class="flex items-center space-x-6">
        <!-- Notifications -->
        <button class="relative p-2 text-gray-400 hover:text-[#036eb1] transition-colors">
          <i class="fas fa-bell"></i>
          <span class="absolute top-2 right-2 w-2 h-2 bg-[#ae151e] rounded-full border-2 border-white"></span>
        </button>

        <!-- User Profile -->
        <div class="flex items-center space-x-3 pl-6 border-l border-gray-100">
          <div class="text-right hidden sm:block">
            <p class="text-sm font-bold text-gray-900 leading-none">{{ userEmail }}</p>
            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">Administrateur</p>
          </div>
          <div class="w-10 h-10 bg-gradient-to-tr from-[#036eb1] to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md shadow-[#036eb1]/20 ring-2 ring-white">
            <i class="fas fa-user-shield"></i>
          </div>
        </div>
      </div>
    </header>
  `
})
export class NavbarComponent {
  userEmail: string = '';

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
      }
    });
  }
}
