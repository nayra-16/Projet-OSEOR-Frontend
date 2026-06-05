import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, NavbarComponent, TopbarComponent, FooterComponent, TranslateModule],
  template: `
    <header class="fixed top-0 left-0 w-full z-[1000]">
      <app-topbar></app-topbar>
      <app-navbar></app-navbar>
    </header>
    
    <main class="pt-[80px] md:pt-[116px] pb-16 md:pb-24 bg-white">
      <div class="container mx-auto px-6">
        <!-- Section À propos d’OSEOR -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 md:mb-32">
          <!-- Image -->
          <div data-aos="fade-right" class="relative group h-full min-h-[400px]">
            <div class="absolute -inset-4 bg-oseor-blue/5 rounded-2xl -rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
            <img [src]="'assets/images/about/about.jpg'" [alt]="'ABOUT_PAGE.BADGE' | translate" class="relative w-full h-full object-cover rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
          </div>

          <!-- Texte -->
          <div data-aos="fade-left" class="max-w-xl space-y-8">
            <div class="space-y-4">
              <h1 class="text-oseor-blue font-bold text-lg uppercase tracking-widest font-['Ubuntu'] mt-6 md:mt-8">
                {{ 'ABOUT_PAGE.BADGE' | translate }}
              </h1>
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight font-['Ubuntu']">
                {{ 'ABOUT_PAGE.TITLE' | translate }}
              </h2>
            </div>
            
            <div class="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                {{ 'ABOUT_PAGE.P1' | translate }}
              </p>
              <p>
                {{ 'ABOUT_PAGE.P2' | translate }}
              </p>
              <p>
                {{ 'ABOUT_PAGE.P3' | translate }}
              </p>
            </div>
          </div>
        </div>

        <!-- Section Gouvernance -->
        <div class="max-w-3xl mx-auto text-center mb-20 md:mb-32">
          <div data-aos="fade-up" class="space-y-8">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 font-['Ubuntu']">
              {{ 'ABOUT_PAGE.GOV_TITLE' | translate }}
            </h3>
            <div class="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                {{ 'ABOUT_PAGE.GOV_P1' | translate }}
              </p>
              <p>
                {{ 'ABOUT_PAGE.GOV_P2' | translate }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <app-footer></app-footer>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AboutComponent {}
