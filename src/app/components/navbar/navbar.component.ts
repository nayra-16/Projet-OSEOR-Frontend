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
          <a routerLink="/a-propos" class="text-gray-800 hover:text-oseor-blue font-medium transition">{{ 'NAVBAR.ABOUT' | translate }}</a>
          <a routerLink="/" fragment="entreprises" class="text-gray-800 hover:text-oseor-blue font-medium transition">{{ 'NAVBAR.ENTREPRISES' | translate }}</a>
          <a routerLink="/" fragment="projets" class="text-gray-800 hover:text-oseor-blue font-medium transition">{{ 'NAVBAR.PROJETS' | translate }}</a>
          <a routerLink="/" fragment="secteurs" class="text-gray-800 hover:text-oseor-blue font-medium transition">{{ 'NAVBAR.SECTEURS' | translate }}</a>
          
          <!-- Careers Dropdown -->
          <div class="relative dropdown-container">
            <button (click)="isCareersDropdownOpen = !isCareersDropdownOpen" 
                    class="flex items-center space-x-1 text-gray-800 hover:text-oseor-blue font-medium transition focus:outline-none">
              <span>{{ 'NAVBAR.CAREERS' | translate }}</span>
              <i class="fas fa-chevron-down text-[10px] transition-transform duration-200" [class.rotate-180]="isCareersDropdownOpen"></i>
            </button>
            
            <div *ngIf="isCareersDropdownOpen" 
                 class="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-100 py-2 z-50 animate-fade-in">
              <a routerLink="/carrieres/offres" (click)="isCareersDropdownOpen = false" 
                 class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-oseor-blue transition font-medium">
                {{ 'NAVBAR.JOB_OFFERS' | translate }}
              </a>
              <a routerLink="/carrieres/candidature" (click)="isCareersDropdownOpen = false" 
                 class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-oseor-blue transition font-medium">
                {{ 'NAVBAR.SPONTANEOUS_CANDIDACY' | translate }}
              </a>
            </div>
          </div>

          <a routerLink="/" fragment="contact" class="text-gray-800 hover:text-oseor-blue font-medium transition">{{ 'NAVBAR.CONTACT' | translate }}</a>
          
          <!-- Language Dropdown -->
          <div class="relative dropdown-container">
            <button (click)="isLangDropdownOpen = !isLangDropdownOpen" 
                    class="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full border border-gray-100 transition focus:outline-none">
              <span class="text-[11px] font-bold text-gray-700">{{ currentLangLabel }}</span>
              <i class="fas fa-chevron-down text-[10px] text-gray-400 transition-transform duration-200" [class.rotate-180]="isLangDropdownOpen"></i>
            </button>
            
            <div *ngIf="isLangDropdownOpen" 
                 class="absolute top-full right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-50 animate-fade-in">
              <button (click)="changeLang('fr')" class="w-full text-left px-4 py-2 text-[11px] font-bold text-gray-700 hover:bg-gray-50 hover:text-oseor-blue transition">
                Français
              </button>
              <button (click)="changeLang('en')" class="w-full text-left px-4 py-2 text-[11px] font-bold text-gray-700 hover:bg-gray-50 hover:text-oseor-blue transition">
                English
              </button>
              <button (click)="changeLang('pt')" class="w-full text-left px-4 py-2 text-[11px] font-bold text-gray-700 hover:bg-gray-50 hover:text-oseor-blue transition">
                Português
              </button>
            </div>
          </div>

          <!-- Bon Plan Dropdown -->
          <div class="relative dropdown-container">
            <button (click)="isBonPlanDropdownOpen = !isBonPlanDropdownOpen" 
                    class="bg-oseor-blue text-white px-6 py-2 rounded-sm font-semibold hover:bg-oseor-blue/90 transition shadow-sm flex items-center space-x-2">
              <span>{{ 'NAVBAR.BON_PLAN' | translate }}</span>
              <i class="fas fa-chevron-down text-[10px] transition-transform duration-200" [class.rotate-180]="isBonPlanDropdownOpen"></i>
            </button>
            
            <div *ngIf="isBonPlanDropdownOpen" 
                 class="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 py-2 z-50 animate-fade-in">
              <a routerLink="/bon-plan" (click)="isBonPlanDropdownOpen = false" 
                 class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-oseor-blue transition">
                {{ 'NAVBAR.NEWS' | translate }}
              </a>
              <a routerLink="/appels-offres" (click)="isBonPlanDropdownOpen = false" 
                 class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-oseor-blue transition">
                {{ 'NAVBAR.TENDERS' | translate }}
              </a>
            </div>
          </div>
        </div>

        <!-- Mobile Toggle -->
        <div class="lg:hidden flex items-center space-x-4">
          <!-- Mobile Language Dropdown -->
          <div class="relative dropdown-container">
            <button (click)="isLangDropdownOpen = !isLangDropdownOpen" 
                    class="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-full border border-gray-100 scale-90 focus:outline-none">
              <span class="text-[10px] font-bold text-gray-700">{{ currentLang.toUpperCase() }}</span>
              <i class="fas fa-chevron-down text-[8px] text-gray-400"></i>
            </button>
            <div *ngIf="isLangDropdownOpen" 
                 class="absolute top-full right-0 mt-2 w-24 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-50">
              <button (click)="changeLang('fr')" class="w-full text-left px-3 py-2 text-[10px] font-bold text-gray-700 hover:bg-gray-50">FR</button>
              <button (click)="changeLang('en')" class="w-full text-left px-3 py-2 text-[10px] font-bold text-gray-700 hover:bg-gray-50">EN</button>
              <button (click)="changeLang('pt')" class="w-full text-left px-3 py-2 text-[10px] font-bold text-gray-700 hover:bg-gray-50">PT</button>
            </div>
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
          <a routerLink="/a-propos" (click)="toggleMenu()" class="text-gray-800 hover:text-oseor-blue font-semibold py-2 border-b border-gray-50 transition">{{ 'NAVBAR.ABOUT' | translate }}</a>
          <a routerLink="/" fragment="entreprises" (click)="toggleMenu()" class="text-gray-800 hover:text-oseor-blue font-semibold py-2 border-b border-gray-50 transition">{{ 'NAVBAR.ENTREPRISES' | translate }}</a>
          <a routerLink="/" fragment="projets" (click)="toggleMenu()" class="text-gray-800 hover:text-oseor-blue font-semibold py-2 border-b border-gray-50 transition">{{ 'NAVBAR.PROJETS' | translate }}</a>
          <a routerLink="/" fragment="secteurs" (click)="toggleMenu()" class="text-gray-800 hover:text-oseor-blue font-semibold py-2 border-b border-gray-50 transition">{{ 'NAVBAR.SECTEURS' | translate }}</a>
          
          <!-- Mobile Careers -->
          <div class="py-2 border-b border-gray-50">
            <button (click)="isCareersDropdownOpen = !isCareersDropdownOpen" 
                    class="flex items-center justify-between w-full text-gray-800 hover:text-oseor-blue font-semibold transition">
              <span>{{ 'NAVBAR.CAREERS' | translate }}</span>
              <i class="fas fa-chevron-down text-xs transition-transform" [class.rotate-180]="isCareersDropdownOpen"></i>
            </button>
            <div *ngIf="isCareersDropdownOpen" class="mt-3 ml-4 flex flex-col space-y-3">
              <a routerLink="/carrieres/offres" (click)="toggleMenu()" class="text-gray-600 hover:text-oseor-blue text-sm transition">
                {{ 'NAVBAR.JOB_OFFERS' | translate }}
              </a>
              <a routerLink="/carrieres/candidature" (click)="toggleMenu()" class="text-gray-600 hover:text-oseor-blue text-sm transition">
                {{ 'NAVBAR.SPONTANEOUS_CANDIDACY' | translate }}
              </a>
            </div>
          </div>

          <a routerLink="/" fragment="contact" (click)="toggleMenu()" class="text-gray-800 hover:text-oseor-blue font-semibold py-2 border-b border-gray-50 transition">{{ 'NAVBAR.CONTACT' | translate }}</a>
          
          <!-- Mobile Bon Plan -->
          <div class="py-2 border-b border-gray-50">
            <button (click)="isBonPlanDropdownOpen = !isBonPlanDropdownOpen" 
                    class="flex items-center justify-between w-full text-oseor-blue font-bold transition">
              <span>{{ 'NAVBAR.BON_PLAN' | translate }}</span>
              <i class="fas fa-chevron-down text-xs transition-transform" [class.rotate-180]="isBonPlanDropdownOpen"></i>
            </button>
            <div *ngIf="isBonPlanDropdownOpen" class="mt-3 ml-4 flex flex-col space-y-3">
              <a routerLink="/bon-plan" (click)="toggleMenu()" class="text-gray-600 hover:text-oseor-blue text-sm transition font-semibold">
                {{ 'NAVBAR.NEWS' | translate }}
              </a>
              <a routerLink="/appels-offres" (click)="toggleMenu()" class="text-gray-600 hover:text-oseor-blue text-sm transition font-semibold">
                {{ 'NAVBAR.TENDERS' | translate }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }
    .animate-fade-in-down {
      animation: fadeInDown 0.4s ease-out forwards;
    }
  `]
})
export class NavbarComponent {
  isSticky = false;
  isMenuOpen = false;
  isCareersDropdownOpen = false;
  isLangDropdownOpen = false;
  isBonPlanDropdownOpen = false;

  constructor(private languageService: LanguageService) {}

  get currentLang(): string {
    return this.languageService.getCurrentLang();
  }

  get currentLangLabel(): string {
    switch (this.currentLang) {
      case 'fr': return 'Français';
      case 'en': return 'English';
      case 'pt': return 'Português';
      default: return 'Français';
    }
  }

  changeLang(lang: string) {
    this.languageService.useLanguage(lang);
    this.isLangDropdownOpen = false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isSticky = window.scrollY > 20;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      this.isCareersDropdownOpen = false;
      this.isLangDropdownOpen = false;
      this.isBonPlanDropdownOpen = false;
    }
  }
}

