import { Component } from '@angular/core';

@Component({
  selector: 'app-cta',
  standalone: true,
  template: `
    <section class="py-16 md:py-20 bg-[#ae151e] relative overflow-hidden" id="contact">
      <!-- Decorative element -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      
      <div class="container mx-auto px-6 relative z-10">
        <div class="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div class="text-center md:text-left space-y-4" data-aos="fade-right">
            <h2 class="text-2xl md:text-4xl font-bold text-white font-['Ubuntu'] leading-tight">
              Vous êtes une entreprise à fort potentiel ?
            </h2>
            <p class="text-white/80 text-lg font-['Ubuntu'] max-w-xl">
              Parlons de votre projet et construisons ensemble votre succès futur.
            </p>
          </div>
          
          <div data-aos="fade-left">
            <button class="bg-white text-[#ae151e] px-10 md:px-12 py-4 md:py-5 rounded-2xl font-black text-sm uppercase tracking-[0.1em] hover:bg-gray-50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 shadow-xl group">
              Nous contacter
              <i class="fas fa-paper-plane ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  `
})
export class CTAComponent {}
