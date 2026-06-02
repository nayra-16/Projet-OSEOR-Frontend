import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from '../../../components/topbar/topbar.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, RouterModule, TopbarComponent, NavbarComponent, FooterComponent],
  template: `
    <header class="fixed top-0 left-0 w-full z-[1000]">
      <app-topbar></app-topbar>
      <app-navbar></app-navbar>
    </header>

    <div class="min-h-screen bg-gray-50 flex flex-col">
      <!-- HERO SECTION -->
      <section class="relative min-h-[500px] flex items-center justify-center pt-[100px] md:pt-[136px] overflow-hidden bg-cover bg-center"
               style="background-image: linear-gradient(rgba(3, 110, 177, 0.85), rgba(3, 110, 177, 0.7)), url('assets/images/sectors/services/services-1.png')">
        <div class="container mx-auto px-6 relative z-10 text-center text-white">
          <h1 class="text-4xl md:text-6xl font-black font-['Ubuntu'] uppercase tracking-widest mb-6" data-aos="fade-down">
            Secteur Services
          </h1>
          <div class="w-24 h-1.5 bg-[#ae151e] mx-auto mb-8"></div>
          <p class="text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed mb-10 opacity-90" data-aos="fade-up">
            Des services innovants et stratégiques pour propulser les entreprises vers l'excellence opérationnelle et la croissance.
          </p>
          <a routerLink="/" fragment="contact" class="inline-block bg-[#ae151e] hover:bg-[#8e1118] text-white px-10 py-4 rounded-xl font-bold uppercase tracking-wider transition-all shadow-xl hover:-translate-y-1">
            Parler d'un projet
          </a>
        </div>
      </section>

      <!-- ENTREPRISES DU SECTEUR -->
      <section class="py-20 flex-1">
        <div class="container mx-auto px-6">
          <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div class="max-w-2xl">
              <h2 class="text-[#036eb1] text-sm font-black uppercase tracking-[0.3em] mb-4">Portefeuille Tertiaire</h2>
              <h3 class="text-3xl md:text-4xl font-bold text-gray-900 font-['Ubuntu']">Entreprises du Secteur</h3>
            </div>
            <div class="h-1 bg-gray-100 flex-1 ml-10 hidden md:block mb-4"></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            <!-- KAPI CONSULT -->
            <div class="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500" data-aos="fade-up">
              <div class="p-8 md:p-10 flex flex-col h-full">
                <div class="flex items-center space-x-6 mb-8">
                  <div class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center p-2 shadow-inner border border-blue-100 flex-shrink-0">
                    <img src="assets/images/partners/kapiconsult.png" alt="KAPI CONSULT Logo" class="max-w-full max-h-full object-contain">
                  </div>
                  <div>
                    <p class="text-[10px] font-black text-[#ae151e] uppercase tracking-widest mb-1">Conseil & Formation</p>
                    <h4 class="text-2xl font-bold text-gray-900 font-['Ubuntu']">KAPI CONSULT</h4>
                  </div>
                </div>
                <p class="text-gray-500 text-sm leading-relaxed mb-6">
                  Cabinet spécialisé dans le conseil stratégique et l’assistance technique.
                </p>
                <div class="space-y-3 mb-10 flex-1">
                  <h5 class="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">Expertises</h5>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-xs font-medium text-gray-600">Analyse & Compétitivité</span>
                    <span class="px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-xs font-medium text-gray-600">Études de faisabilité</span>
                    <span class="px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-xs font-medium text-gray-600">PPP</span>
                    <span class="px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-xs font-medium text-gray-600">Formation</span>
                    <span class="px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-xs font-medium text-gray-600">Management</span>
                    <span class="px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-xs font-medium text-gray-600">Financement</span>
                  </div>
                </div>
                <a href="https://kapiconsult.tg/" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   class="w-full py-4 bg-gray-50 text-[#036eb1] font-bold rounded-xl group-hover:bg-[#036eb1] group-hover:text-white transition-all text-center block">
                  VOIR PLUS →
                </a>
              </div>
            </div>

            <!-- DIWA INTERNATIONAL -->
            <div class="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500" data-aos="fade-up" data-aos-delay="100">
              <div class="p-8 md:p-10 flex flex-col h-full">
                <div class="flex items-center space-x-6 mb-8">
                  <div class="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center p-2 shadow-inner border border-gray-100 flex-shrink-0">
                    <img src="assets/images/partners/diwa-indus.png" alt="DIWA INTERNATIONAL Logo" class="max-w-full max-h-full object-contain">
                  </div>
                  <div>
                    <p class="text-[10px] font-black text-[#ae151e] uppercase tracking-widest mb-1">Commerce & Représentation</p>
                    <h4 class="text-2xl font-bold text-gray-900 font-['Ubuntu']">DIWA INTERNATIONAL</h4>
                  </div>
                </div>
                <p class="text-gray-500 text-sm leading-relaxed mb-8">
                  Spécialiste des équipements automobiles et industriels.
                </p>
                <div class="space-y-4 mb-10 flex-1">
                  <h5 class="text-[11px] font-black text-gray-400 uppercase tracking-widest">Partenaires Stratégiques</h5>
                  <div class="grid grid-cols-2 gap-3">
                    <div class="flex items-center text-[11px] font-bold text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">Petronas</div>
                    <div class="flex items-center text-[11px] font-bold text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">ACDelco</div>
                    <div class="flex items-center text-[11px] font-bold text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">Continental</div>
                    <div class="flex items-center text-[11px] font-bold text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">Chevrolet Isuzu</div>
                    <div class="flex items-center text-[11px] font-bold text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">MG</div>
                    <div class="flex items-center text-[11px] font-bold text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">Itochu</div>
                  </div>
                </div>
                <button class="w-full py-4 bg-gray-50 text-[#036eb1] font-bold rounded-xl group-hover:bg-[#036eb1] group-hover:text-white transition-all">Voir plus</button>
              </div>
            </div>

            <!-- DIWA HOSPITALITY -->
            <div class="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500" data-aos="fade-up" data-aos-delay="200">
              <div class="p-8 md:p-10 flex flex-col h-full">
                <div class="flex items-center space-x-6 mb-8">
                  <div class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center p-2 shadow-inner border border-blue-100 flex-shrink-0">
                    <img src="assets/images/partners/hospitality.png" alt="DIWA HOSPITALITY Logo" class="max-w-full max-h-full object-contain">
                  </div>
                  <div>
                    <p class="text-[10px] font-black text-[#ae151e] uppercase tracking-widest mb-1">Tourisme & Hôtellerie</p>
                    <h4 class="text-2xl font-bold text-gray-900 font-['Ubuntu']">DIWA HOSPITALITY</h4>
                  </div>
                </div>
                <p class="text-gray-500 text-sm leading-relaxed mb-8">
                  Groupe dédié au développement hôtelier et touristique moderne.
                </p>
                <div class="grid grid-cols-2 gap-4 mb-10 flex-1">
                  <div class="p-4 bg-gray-50 rounded-2xl text-center">
                    <i class="fas fa-building text-[#036eb1] mb-2"></i>
                    <p class="text-[11px] font-bold text-gray-800">Hôtellerie</p>
                  </div>
                  <div class="p-4 bg-gray-50 rounded-2xl text-center">
                    <i class="fas fa-city text-[#036eb1] mb-2"></i>
                    <p class="text-[11px] font-bold text-gray-800">Infrastructures</p>
                  </div>
                  <div class="p-4 bg-gray-50 rounded-2xl text-center">
                    <i class="fas fa-umbrella-beach text-[#036eb1] mb-2"></i>
                    <p class="text-[11px] font-bold text-gray-800">Récréatif</p>
                  </div>
                  <div class="p-4 bg-gray-50 rounded-2xl text-center">
                    <i class="fas fa-map-location-dot text-[#036eb1] mb-2"></i>
                    <p class="text-[11px] font-bold text-gray-800">Tourisme</p>
                  </div>
                </div>
                <button class="w-full py-4 bg-gray-50 text-[#036eb1] font-bold rounded-xl group-hover:bg-[#036eb1] group-hover:text-white transition-all">Voir plus</button>
              </div>
            </div>

            <!-- DIWA PRODUCTS -->
            <div class="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500" data-aos="fade-up">
              <div class="p-8 md:p-10 flex flex-col h-full">
                <div class="flex items-center space-x-6 mb-8">
                  <div class="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center p-2 shadow-inner border border-gray-100 flex-shrink-0">
                    <img src="assets/images/partners/bonici.png" alt="DIWA PRODUCTS Logo" class="max-w-full max-h-full object-contain">
                  </div>
                  <div>
                    <p class="text-[10px] font-black text-[#ae151e] uppercase tracking-widest mb-1">Restauration & FMCG</p>
                    <h4 class="text-2xl font-bold text-gray-900 font-['Ubuntu']">DIWA PRODUCTS</h4>
                  </div>
                </div>
                <p class="text-gray-500 text-sm leading-relaxed mb-8">
                  Entreprise spécialisée dans la restauration rapide et les produits locaux.
                </p>
                <div class="space-y-4 mb-10 flex-1">
                  <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                    <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#ae151e] shadow-sm"><i class="fas fa-hamburger"></i></div>
                    <span class="font-bold text-gray-800 text-sm">Restauration rapide</span>
                  </div>
                  <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                    <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#ae151e] shadow-sm"><i class="fas fa-beer-mug-empty"></i></div>
                    <span class="font-bold text-gray-800 text-sm">Brasserie</span>
                  </div>
                  <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                    <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#ae151e] shadow-sm"><i class="fas fa-seedling"></i></div>
                    <span class="font-bold text-gray-800 text-sm">Produits locaux</span>
                  </div>
                </div>
                <button class="w-full py-4 bg-gray-50 text-[#036eb1] font-bold rounded-xl group-hover:bg-[#036eb1] group-hover:text-white transition-all">Voir plus</button>
              </div>
            </div>

            <!-- TRFS -->
            <div class="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500" data-aos="fade-up" data-aos-delay="100">
              <div class="p-8 md:p-10 flex flex-col h-full">
                <div class="flex items-center space-x-6 mb-8">
                  <div class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center p-2 shadow-inner border border-blue-100 flex-shrink-0">
                    <img src="assets/images/partners/zih.png" alt="TRFS Logo" class="max-w-full max-h-full object-contain">
                  </div>
                  <div>
                    <p class="text-[10px] font-black text-[#ae151e] uppercase tracking-widest mb-1">Transport & Logistique</p>
                    <h4 class="text-2xl font-bold text-gray-900 font-['Ubuntu']">TRFS</h4>
                  </div>
                </div>
                <p class="text-gray-500 text-sm leading-relaxed mb-10 flex-1">
                  Référence dans le transport routier et la logistique au Togo.
                </p>
                <div class="bg-[#036eb1]/5 p-6 rounded-2xl mb-10">
                   <div class="flex items-center justify-center space-x-6">
                      <div class="text-center">
                        <p class="text-xl font-black text-[#036eb1]">24/7</p>
                        <p class="text-[9px] uppercase font-bold text-gray-400">Suivi</p>
                      </div>
                      <div class="w-px h-10 bg-gray-200"></div>
                      <div class="text-center">
                        <p class="text-xl font-black text-[#036eb1]">SAFE</p>
                        <p class="text-[9px] uppercase font-bold text-gray-400">Transit</p>
                      </div>
                   </div>
                </div>
                <button class="w-full py-4 bg-gray-50 text-[#036eb1] font-bold rounded-xl group-hover:bg-[#036eb1] group-hover:text-white transition-all">Voir plus</button>
              </div>
            </div>

            <!-- @TOGO -->
            <div class="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500" data-aos="fade-up" data-aos-delay="200">
              <div class="p-8 md:p-10 flex flex-col h-full">
                <div class="flex items-center space-x-6 mb-8">
                  <div class="w-16 h-16 bg-[#ae151e]/10 rounded-2xl flex items-center justify-center p-2 shadow-inner border border-[#ae151e]/20 flex-shrink-0">
                    <img src="assets/images/partners/attogo.png" alt="&#64;TOGO Logo" class="max-w-full max-h-full object-contain">
                  </div>
                  <div>
                    <p class="text-[10px] font-black text-[#036eb1] uppercase tracking-widest mb-1">Technologies & Fintech</p>
                    <h4 class="text-2xl font-bold text-gray-900 font-['Ubuntu']">&#64;TOGO</h4>
                  </div>
                </div>
                <p class="text-gray-500 text-sm leading-relaxed mb-8">
                  Entreprise innovante spécialisée dans les solutions digitales et la fintech.
                </p>
                <div class="space-y-4 mb-10 flex-1">
                  <div class="flex items-center space-x-4">
                    <span class="w-2 h-2 bg-[#ae151e] rounded-full"></span>
                    <p class="text-sm font-bold text-gray-700">Solutions informatiques</p>
                  </div>
                  <div class="flex items-center space-x-4">
                    <span class="w-2 h-2 bg-[#ae151e] rounded-full"></span>
                    <p class="text-sm font-bold text-gray-700">Marketing digital</p>
                  </div>
                  <div class="flex items-center space-x-4">
                    <span class="w-2 h-2 bg-[#ae151e] rounded-full"></span>
                    <p class="text-sm font-bold text-gray-700">Cybersécurité</p>
                  </div>
                  <div class="flex items-center space-x-4">
                    <span class="w-2 h-2 bg-[#ae151e] rounded-full"></span>
                    <p class="text-sm font-bold text-gray-700">Fintech & Transfert</p>
                  </div>
                </div>
                <button class="w-full py-4 bg-gray-50 text-[#036eb1] font-bold rounded-xl group-hover:bg-[#036eb1] group-hover:text-white transition-all">Voir plus</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION FINALE CTA -->
      <section class="py-20 bg-[#036eb1] relative overflow-hidden text-white text-center">
        <div class="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div class="container mx-auto px-6 relative z-10">
          <h2 class="text-3xl md:text-5xl font-black font-['Ubuntu'] mb-10">Vous avez un projet dans ce secteur ?</h2>
          <a routerLink="/" fragment="contact" class="inline-block bg-[#ae151e] hover:bg-[#8e1118] text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95">
            Contactez-nous
          </a>
        </div>
      </section>
    </div>
  `
})
export class ServicesComponent {}
