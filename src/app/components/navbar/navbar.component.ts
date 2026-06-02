import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  template: `
    <nav [ngClass]="{'bg-white shadow-md py-0': isSticky, 'bg-white/90 backdrop-blur-sm py-0': !isSticky}"
         class="w-full transition-all duration-300 px-4 md:px-8 border-b border-gray-100">
      <div class="max-w-[1400px] mx-auto flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center">
          <img src="assets/images/logo.png" alt="OSEOR Logo" class="h-14 md:h-20 lg:h-24 w-auto object-contain block">
        </div>

        <!-- Desktop Menu -->
        <div class="hidden lg:flex items-center space-x-8">
          <a routerLink="/" class="text-gray-800 hover:text-oseor-blue font-medium transition">{{ 'NAVBAR.HOME' | translate }}</a>
          <a routerLink="/" fragment="entreprises" class="text-gray-800 hover:text-oseor-blue font-medium transition">{{ 'NAVBAR.ENTREPRISES' | translate }}</a>
          <a routerLink="/" fragment="projets" class="text-gray-800 hover:text-oseor-blue font-medium transition">{{ 'NAVBAR.PROJETS' | translate }}</a>
          <a routerLink="/" fragment="secteurs" class="text-gray-800 hover:text-oseor-blue font-medium transition">{{ 'NAVBAR.SECTEURS' | translate }}</a>
          <a routerLink="/a-propos" class="text-gray-800 hover:text-oseor-blue font-medium transition">{{ 'NAVBAR.ABOUT' | translate }}</a>
          <a routerLink="/blog" class="text-gray-800 hover:text-oseor-blue font-medium transition">{{ 'NAVBAR.BLOG' | translate }}</a>
          <a routerLink="/" fragment="contact" class="text-gray-800 hover:text-oseor-blue font-medium transition">{{ 'NAVBAR.CONTACT' | translate }}</a>
          
          <!-- Language Switcher -->
          <div class="flex items-center bg-gray-50 rounded-full p-1 border border-gray-100">
            <button (click)="changeLang('fr')" 
                    [class.bg-white]="currentLang === 'fr'"
                    [class.shadow-sm]="currentLang === 'fr'"
                    [class.text-oseor-blue]="currentLang === 'fr'"
                    class="px-2 py-1 rounded-full text-[10px] font-bold transition-all duration-300 flex items-center space-x-1">
              <span>FR</span>
            </button>
            <button (click)="changeLang('en')" 
                    [class.bg-white]="currentLang === 'en'"
                    [class.shadow-sm]="currentLang === 'en'"
                    [class.text-oseor-blue]="currentLang === 'en'"
                    class="px-2 py-1 rounded-full text-[10px] font-bold transition-all duration-300 flex items-center space-x-1">
              <span>EN</span>
            </button>
          </div>

          <a routerLink="/bon-plan" class="bg-oseor-blue text-white px-6 py-2 rounded-sm font-semibold hover:bg-oseor-blue/90 transition shadow-sm">
            {{ 'NAVBAR.BON_PLAN' | translate }}
          </a>
        </div>

        <!-- Mobile Toggle -->
        <div class="lg:hidden flex items-center space-x-4">
          <!-- Mobile Language Switcher -->
          <div class="flex items-center bg-gray-50 rounded-full p-1 border border-gray-100 scale-90">
            <button (click)="changeLang('fr')" 
                    [class.bg-white]="currentLang === 'fr'"
                    class="px-2 py-1 rounded-full text-[10px] font-bold transition-all">
              FR
            </button>
            <button (click)="changeLang('en')" 
                    [class.bg-white]="currentLang === 'en'"
                    class="px-2 py-1 rounded-full text-[10px] font-bold transition-all">
              EN
            </button>
          </div>
          <button (click)="toggleMenu()" class="text-2xl text-oseor-blue focus:outline-none">
            <i [class]="isMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div *ngIf="isMenuOpen" 
           class="lg:hidden bg-white absolute top-full left-0 w-full shadow-xl border-t border-gray-100 overflow-hidden animate-fade-in-down">
        <div class="flex flex-col p-6 space-y-4">
          <a routerLink="/" (click)="toggleMenu()" class="text-gray-800 hover:text-oseor-blue font-semibold py-2 border-b border-gray-50 transition">{{ 'NAVBAR.HOME' | translate }}</a>
          <a routerLink="/" fragment="entreprises" (click)="toggleMenu()" class="text-gray-800 hover:text-oseor-blue font-semibold py-2 border-b border-gray-50 transition">{{ 'NAVBAR.ENTREPRISES' | translate }}</a>
          <a routerLink="/" fragment="projets" (click)="toggleMenu()" class="text-gray-800 hover:text-oseor-blue font-semibold py-2 border-b border-gray-50 transition">{{ 'NAVBAR.PROJETS' | translate }}</a>
          <a routerLink="/" fragment="secteurs" (click)="toggleMenu()" class="text-gray-800 hover:text-oseor-blue font-semibold py-2 border-b border-gray-50 transition">{{ 'NAVBAR.SECTEURS' | translate }}</a>
          <a routerLink="/a-propos" (click)="toggleMenu()" class="text-gray-800 hover:text-oseor-blue font-semibold py-2 border-b border-gray-50 transition">{{ 'NAVBAR.ABOUT' | translate }}</a>
          <a routerLink="/" fragment="contact" (click)="toggleMenu()" class="text-gray-800 hover:text-oseor-blue font-semibold py-2 border-b border-gray-50 transition">{{ 'NAVBAR.CONTACT' | translate }}</a>
          <a routerLink="/bon-plan" (click)="toggleMenu()" class="bg-oseor-blue text-white px-6 py-3 rounded-sm font-bold w-full text-center shadow-md mt-4 hover:bg-oseor-blue/90 transition">
            {{ 'NAVBAR.BON_PLAN' | translate }}
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: []
})
export class NavbarComponent {
  isSticky = false;
  isMenuOpen = false;

  constructor(private languageService: LanguageService) {}

  get currentLang(): string {
    return this.languageService.getCurrentLang();
  }

  changeLang(lang: string) {
    this.languageService.useLanguage(lang);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isSticky = window.scrollY > 20;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

