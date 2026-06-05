import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="relative h-[650px] md:h-[750px] flex items-center overflow-hidden bg-[#0a0e64]">
      <!-- Overlay Gradient permanent (#036eb1) -->
      <div class="absolute inset-0 z-10 pointer-events-none"
           style="background: linear-gradient(90deg, rgba(3,110,177,0.95) 0%, rgba(3,110,177,0.85) 30%, rgba(3,110,177,0.55) 50%, rgba(3,110,177,0.20) 70%, rgba(3,110,177,0.00) 100%)">
      </div>
      
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img src="assets/images/hero-business.jpg" alt="OSEOR Business" class="w-full h-full object-cover">
      </div>

      <div class="container mx-auto px-6 relative z-20">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight font-['Ubuntu']" data-aos="fade-up">
            {{ 'HERO.TITLE' | translate }}
          </h1>
          <p class="text-lg md:text-xl text-white/80 mb-10 leading-relaxed font-['Ubuntu'] max-w-2xl" data-aos="fade-up" data-aos-delay="100">
            {{ 'HERO.DESCRIPTION' | translate }}
          </p>
          <div class="flex flex-col sm:flex-row gap-5" data-aos="fade-up" data-aos-delay="200">
            <button class="bg-oseor-red text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.15em] hover:bg-[#ae151e] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 shadow-xl group">
              {{ 'HERO.BUTTON' | translate }}
              <i class="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Éléments décoratifs -->
      <div class="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-t from-oseor-blue/20 to-transparent z-10 blur-3xl"></div>
    </section>
  `,
  styles: []
})
export class HeroComponent {}
