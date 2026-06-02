import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="relative min-h-[600px] md:min-h-[850px] flex items-center overflow-hidden pt-20 md:pt-16 bg-cover bg-center bg-no-repeat"
             [style.background-image]="'linear-gradient(to right, rgba(15, 76, 129, 0.85) 0%, rgba(15, 76, 129, 0.7) 50%, rgba(15, 76, 129, 0.3) 100%), url(assets/images/hero-business.jpg)'">
      
      <div class="container mx-auto px-6 md:px-12 relative z-10">
        <!-- Text Content -->
        <div data-aos="fade-right" class="max-w-4xl text-left">
          <div class="border-l-[4px] border-white pl-6 md:pl-8 mb-8">
            <h1 class="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] font-['Ubuntu']">
              {{ 'HERO.TITLE' | translate }}
            </h1>
          </div>
          <p class="text-base md:text-xl text-white/90 mb-10 md:mb-14 leading-relaxed max-w-2xl font-['Ubuntu'] font-light">
            {{ 'HERO.DESCRIPTION' | translate }}
          </p>
          <div class="flex justify-center md:justify-start">
            <button class="bg-[#ae151e] text-white px-8 md:px-10 py-3 md:py-4 rounded-xl font-bold text-sm md:text-base hover:bg-[#ae151e] transition-all duration-300 flex items-center group shadow-2xl uppercase tracking-wider transform hover:-translate-y-1">
              {{ 'HERO.BUTTON' | translate }}
              <i class="fas fa-chevron-right ml-3 md:ml-4 group-hover:translate-x-2 transition-transform"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class HeroComponent {}
