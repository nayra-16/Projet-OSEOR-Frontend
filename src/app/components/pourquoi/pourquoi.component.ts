import { Component } from '@angular/core';

@Component({
  selector: 'app-pourquoi',
  standalone: true,
  template: `
    <section class="py-16 md:py-24 bg-[#f8fafc]">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-[#1e293b] mb-12 md:mb-20 font-['Ubuntu']">Pourquoi choisir OSEOR ?</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <!-- Image à gauche -->
          <div data-aos="fade-right" class="relative order-2 lg:order-1">
            <div class="absolute -inset-4 bg-oseor-blue/10 rounded-2xl -rotate-2 hidden md:block"></div>
            <img src="assets/images/hero-business.jpg" alt="Pourquoi choisir OSEOR" class="relative rounded-xl shadow-2xl w-full object-cover aspect-[4/3]">
          </div>

          <!-- Points à droite -->
          <div data-aos="fade-left" class="order-1 lg:order-2">
            <div class="space-y-8 md:space-y-12">
              <div class="flex items-start space-x-4 md:space-x-8 group">
                <div class="bg-oseor-blue text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg md:text-xl shadow-lg group-hover:scale-110 transition-transform font-['Ubuntu']">1</div>
                <div>
                  <h4 class="text-lg md:text-xl font-bold text-[#1e293b] mb-2 font-['Ubuntu']">Approche sur mesure</h4>
                  <p class="text-gray-500 text-sm md:text-base leading-relaxed font-['Ubuntu']">Chaque entreprise bénéficie d'un accompagnement unique, adapté à ses besoins spécifiques et à ses ambitions de croissance.</p>
                </div>
              </div>

              <div class="flex items-start space-x-4 md:space-x-8 group">
                <div class="bg-oseor-blue text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg md:text-xl shadow-lg group-hover:scale-110 transition-transform font-['Ubuntu']">2</div>
                <div>
                  <h4 class="text-lg md:text-xl font-bold text-[#1e293b] mb-2 font-['Ubuntu']">Expertise multidisciplinaire</h4>
                  <p class="text-gray-500 text-sm md:text-base leading-relaxed font-['Ubuntu']">Nos équipes réunissent des compétences pointues en finance, stratégie et assistance technique pour une vision à 360°.</p>
                </div>
              </div>

              <div class="flex items-start space-x-4 md:space-x-8 group">
                <div class="bg-oseor-blue text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg md:text-xl shadow-lg group-hover:scale-110 transition-transform font-['Ubuntu']">3</div>
                <div>
                  <h4 class="text-lg md:text-xl font-bold text-[#1e293b] mb-2 font-['Ubuntu']">Réseau de partenaires</h4>
                  <p class="text-gray-500 text-sm md:text-base leading-relaxed font-['Ubuntu']">Accédez à un écosystème solide de partenaires stratégiques et financiers pour accélérer votre développement durable.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class PourquoiComponent {}
