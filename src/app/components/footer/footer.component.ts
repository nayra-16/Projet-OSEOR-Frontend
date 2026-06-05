import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  template: `
    <footer class="bg-white text-gray-800 pt-16 pb-8 relative border-t border-gray-100">
      <div class="container mx-auto px-6 lg:px-12">
        <!-- Main Footer Content -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <!-- Column 1: Logo & Social -->
          <div class="flex flex-col items-center md:items-start space-y-6">
            <div class="transition-transform duration-300 hover:scale-105">
              <img src="assets/images/logo.png" alt="OSEOR Logo" class="h-10 w-auto">
            </div>
            <div class="flex space-x-4">
              <a href="#" class="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#036eb1] hover:text-white transition-all duration-300 shadow-sm"><i class="fab fa-linkedin-in text-sm"></i></a>
              <a href="#" class="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#036eb1] hover:text-white transition-all duration-300 shadow-sm"><i class="fab fa-facebook-f text-sm"></i></a>
              <a href="#" class="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#036eb1] hover:text-white transition-all duration-300 shadow-sm"><i class="fab fa-twitter text-sm"></i></a>
              <a href="#" class="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#036eb1] hover:text-white transition-all duration-300 shadow-sm"><i class="fab fa-instagram text-sm"></i></a>
            </div>
          </div>

          <!-- Column 2: Quick Links -->
          <div class="flex flex-col items-center md:items-start">
            <h4 class="text-[11px] font-black text-gray-900 uppercase tracking-[0.2em] mb-6 font-['Ubuntu'] relative pb-2">
              {{ 'FOOTER.QUICK_LINKS' | translate }}
              <span class="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-6 h-0.5 bg-[#ae151e]"></span>
            </h4>
            <ul class="space-y-3 text-gray-500 text-sm font-medium font-['Ubuntu'] text-center md:text-left">
              <li><a routerLink="/" class="hover:text-[#036eb1] transition-colors duration-300">{{ 'NAVBAR.HOME' | translate }}</a></li>
              <li><a routerLink="/" fragment="entreprises" class="hover:text-[#036eb1] transition-colors duration-300">{{ 'NAVBAR.ENTREPRISES' | translate }}</a></li>
              <li><a routerLink="/" fragment="projets" class="hover:text-[#036eb1] transition-colors duration-300">{{ 'NAVBAR.PROJETS' | translate }}</a></li>
              <li><a routerLink="/a-propos" class="hover:text-[#036eb1] transition-colors duration-300">{{ 'NAVBAR.ABOUT' | translate }}</a></li>
            </ul>
          </div>

          <!-- Column 3: Contact -->
          <div class="flex flex-col items-center md:items-start">
            <h4 class="text-[11px] font-black text-gray-900 uppercase tracking-[0.2em] mb-6 font-['Ubuntu'] relative pb-2">
              Contact
              <span class="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-6 h-0.5 bg-[#ae151e]"></span>
            </h4>
            <ul class="space-y-3 text-gray-500 text-sm font-medium font-['Ubuntu'] text-center md:text-left">
              <li class="flex items-center justify-center md:justify-start space-x-3">
                <i class="fas fa-map-marker-alt text-[#ae151e] text-xs"></i>
                <span>{{ 'TOPBAR.ADDRESS' | translate }}</span>
              </li>
              <li class="flex items-center justify-center md:justify-start space-x-3">
                <i class="fas fa-phone-alt text-[#ae151e] text-xs"></i>
                <span>+228 22 51 89 69</span>
              </li>
              <li class="flex items-center justify-center md:justify-start space-x-3">
                <i class="fas fa-envelope text-[#ae151e] text-xs"></i>
                <span>Info&#64;oseor.tg</span>
              </li>
            </ul>
          </div>

          <!-- Column 4: Legal -->
          <div class="flex flex-col items-center md:items-start">
            <h4 class="text-[11px] font-black text-gray-900 uppercase tracking-[0.2em] mb-6 font-['Ubuntu'] relative pb-2">
              {{ 'FOOTER.LEGAL' | translate }}
              <span class="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-6 h-0.5 bg-[#ae151e]"></span>
            </h4>
            <ul class="space-y-3 text-gray-500 text-sm font-medium font-['Ubuntu'] text-center md:text-left">
              <li><a href="#" class="hover:text-[#036eb1] transition-colors duration-300">{{ 'FOOTER.PRIVACY' | translate }}</a></li>
              <li><a href="#" class="hover:text-[#036eb1] transition-colors duration-300">{{ 'FOOTER.TERMS' | translate }}</a></li>
              <li><a href="#" class="hover:text-[#036eb1] transition-colors duration-300">{{ 'FOOTER.MENTIONS' | translate }}</a></li>
            </ul>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="border-t border-gray-100 pt-8 flex flex-col items-center space-y-4">
          <p class="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] font-['Ubuntu'] text-center">
            &copy; 2026 OSEOR. {{ 'FOOTER.RIGHTS' | translate }}
          </p>
          <p class="text-[#ffffff] text-[9px] font-medium uppercase tracking-[0.1em] font-['Ubuntu'] text-center">
            Fait par H.NAYRA
          </p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
