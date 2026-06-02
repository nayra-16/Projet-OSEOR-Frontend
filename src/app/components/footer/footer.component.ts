import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  template: `
    <footer class="bg-white text-gray-800 pt-20 pb-10 relative border-t border-gray-50">
      <div class="container mx-auto px-6 lg:px-12">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-16">
          <!-- Logo & Description -->
          <div class="space-y-8 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div class="transition-transform duration-300 hover:scale-105">
              <img src="assets/images/logo.png" alt="OSEOR Logo" class="h-12 w-auto">
            </div>
            <p class="text-gray-500 text-sm leading-relaxed max-w-xs font-['Ubuntu']">
              {{ 'FOOTER.DESCRIPTION' | translate }}
            </p>
            <div class="flex space-x-5">
              <a href="#" class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-oseor-blue hover:text-white hover:shadow-lg transition-all duration-300"><i class="fab fa-twitter"></i></a>
              <a href="#" class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-oseor-blue hover:text-white hover:shadow-lg transition-all duration-300"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-oseor-blue hover:text-white hover:shadow-lg transition-all duration-300"><i class="fab fa-instagram"></i></a>
              <a href="#" class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-oseor-blue hover:text-white hover:shadow-lg transition-all duration-300"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 class="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-8 font-['Ubuntu'] relative pb-2">
              {{ 'FOOTER.QUICK_LINKS' | translate }}
              <span class="absolute bottom-0 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 w-8 h-0.5 bg-oseor-red"></span>
            </h4>
            <ul class="space-y-4 text-gray-500 text-sm font-medium font-['Ubuntu']">
              <li><a routerLink="/" class="hover:text-oseor-blue hover:translate-x-2 transition-all duration-300 flex items-center justify-center sm:justify-start">{{ 'NAVBAR.HOME' | translate }}</a></li>
              <li><a routerLink="/" fragment="entreprises" class="hover:text-oseor-blue hover:translate-x-2 transition-all duration-300 flex items-center justify-center sm:justify-start">{{ 'NAVBAR.ENTREPRISES' | translate }}</a></li>
              <li><a routerLink="/" fragment="projets" class="hover:text-oseor-blue hover:translate-x-2 transition-all duration-300 flex items-center justify-center sm:justify-start">{{ 'NAVBAR.PROJETS' | translate }}</a></li>
              <li><a routerLink="/a-propos" class="hover:text-oseor-blue hover:translate-x-2 transition-all duration-300 flex items-center justify-center sm:justify-start">{{ 'NAVBAR.ABOUT' | translate }}</a></li>
            </ul>
          </div>

          <!-- Empty spacer or more links -->
          <div class="hidden lg:block"></div>

          <!-- Legal -->
          <div class="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 class="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-8 font-['Ubuntu'] relative pb-2">
              {{ 'FOOTER.LEGAL' | translate }}
              <span class="absolute bottom-0 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 w-8 h-0.5 bg-oseor-red"></span>
            </h4>
            <ul class="space-y-4 text-gray-500 text-sm font-medium font-['Ubuntu']">
              <li><a href="#" class="hover:text-oseor-blue hover:translate-x-2 transition-all duration-300 block">{{ 'FOOTER.PRIVACY' | translate }}</a></li>
              <li><a href="#" class="hover:text-oseor-blue hover:translate-x-2 transition-all duration-300 block">{{ 'FOOTER.TERMS' | translate }}</a></li>
              <li><a href="#" class="hover:text-oseor-blue hover:translate-x-2 transition-all duration-300 block">{{ 'FOOTER.MENTIONS' | translate }}</a></li>
            </ul>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="border-t border-gray-50 pt-10 flex flex-col items-center relative">
          <p class="text-gray-400 text-[11px] font-bold uppercase tracking-[0.2em] font-['Ubuntu'] text-center">
            &copy; 2026 OSEOR. {{ 'FOOTER.RIGHTS' | translate }}
          </p>
          
          <!-- Discreet signature -->
          <div class="absolute bottom-0 right-0 opacity-0 md:opacity-100">
            <span class="text-white text-[8px] font-light tracking-widest cursor-default select-none">
              par H.nayra
            </span>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
