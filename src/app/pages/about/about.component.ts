import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, NavbarComponent, TopbarComponent, FooterComponent],
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
            <img [src]="'assets/images/about/about.jpg'" alt="À propos d'OSEOR" class="relative w-full h-full object-cover rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
          </div>

          <!-- Texte -->
          <div data-aos="fade-left" class="max-w-xl space-y-8">
            <div class="space-y-4">
              <h1 class="text-oseor-blue font-bold text-lg uppercase tracking-widest font-['Ubuntu']">À propos d’OSEOR</h1>
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight font-['Ubuntu']">
                Une vision stratégique au service de la croissance
              </h2>
            </div>
            
            <div class="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Fondée en 2015, OSEOR accompagne le développement de groupes d’entreprises à travers la prise de participation dans des sociétés à fort potentiel.
              </p>
              <p>
                Aujourd’hui, l’entreprise compte 15 sociétés partenaires, illustrant la solidité de son positionnement et l’étendue de son engagement.
              </p>
              <p>
                Devenue Société Anonyme (SA) en 2020–2021, OSEOR a renforcé sa crédibilité et sa capacité d’action. 
                Son siège social est situé à Lomé, Agoènyivé, BKS 1, immeuble D&D.
              </p>
            </div>
          </div>
        </div>

        <!-- Section Gouvernance -->
        <div class="max-w-3xl mx-auto text-center mb-20 md:mb-32">
          <div data-aos="fade-up" class="space-y-8">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 font-['Ubuntu']">Une gouvernance structurée</h3>
            <div class="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Un conseil d’administration, présidé par Monsieur <span class="font-bold text-gray-900 underline decoration-oseor-red/30">DAOU AKLESSO Yérima</span>, définit les grandes orientations stratégiques.
              </p>
              <p>
                La direction générale est assurée par Monsieur <span class="font-bold text-gray-900 underline decoration-oseor-red/30">Pascal PAMASSI</span>, qui pilote le développement et la performance de l’entreprise.
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
