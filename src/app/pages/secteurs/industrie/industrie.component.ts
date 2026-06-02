import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from '../../../components/topbar/topbar.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-industrie',
  standalone: true,
  imports: [CommonModule, RouterModule, TopbarComponent, NavbarComponent, FooterComponent],
  styles: [
    `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fadeIn 0.5s ease forwards;
      }
    `
  ],
  template: `
    <header class="fixed top-0 left-0 w-full z-[1000]">
      <app-topbar></app-topbar>
      <app-navbar></app-navbar>
    </header>

    <div class="min-h-screen bg-gray-50 flex flex-col">
      <!-- HERO SECTION -->
      <section class="relative min-h-[500px] flex items-center justify-center pt-[100px] md:pt-[136px] overflow-hidden bg-cover bg-center"
               style="background-image: linear-gradient(rgba(3, 110, 177, 0.85), rgba(3, 110, 177, 0.7)), url('assets/images/sectors/industrie/industrie-4.png')">
        <div class="container mx-auto px-6 relative z-10 text-center text-white">
          <h1 class="text-4xl md:text-6xl font-black font-['Ubuntu'] uppercase tracking-widest mb-6" data-aos="fade-down">
            Secteur Industrie
          </h1>
          <div class="w-24 h-1.5 bg-[#ae151e] mx-auto mb-8"></div>
          <p class="text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed mb-10 opacity-90" data-aos="fade-up">
            L'industrie au cœur de notre stratégie pour bâtir une économie forte, résiliente et tournée vers l'avenir.
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
              <h2 class="text-[#036eb1] text-sm font-black uppercase tracking-[0.3em] mb-4">Portefeuille Industriel</h2>
              <h3 class="text-3xl md:text-4xl font-bold text-gray-900 font-['Ubuntu']">Entreprises du Secteur</h3>
            </div>
            <div class="h-1 bg-gray-100 flex-1 ml-10 hidden md:block mb-4"></div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- DIWA INDUSTRIES -->
            <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500" 
                 [ngClass]="{'lg:col-span-2': expandedCardId === 'diwa'}" 
                 data-aos="fade-up">
              <div class="flex flex-col" [ngClass]="{'lg:flex-row': expandedCardId === 'diwa'}">
                <div class="overflow-hidden relative" 
                     [class.h-64]="expandedCardId !== 'diwa'" 
                     [ngClass]="{
                       'lg:w-2/5': expandedCardId === 'diwa',
                       'lg:h-auto': expandedCardId === 'diwa'
                     }">
                  <img src="assets/images/sectors/industrie/industrie-1.png" alt="DIWA INDUSTRIES" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                  <div class="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm">
                    <span class="text-[#036eb1] font-black text-xs uppercase tracking-widest">DIWA INDUSTRIES</span>
                  </div>
                </div>
                <div class="p-8 md:p-10 flex-1">
                  <div class="flex items-center space-x-6 mb-8">
                    <div class="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center p-3 shadow-inner border border-gray-100 flex-shrink-0">
                      <img src="assets/images/partners/diwa-indus.png" alt="DIWA INDUSTRIES Logo" class="max-w-full max-h-full object-contain">
                    </div>
                    <div>
                      <h4 class="text-2xl md:text-3xl font-bold text-gray-900 font-['Ubuntu']">DIWA INDUSTRIES SA</h4>
                      <p class="text-gray-500 text-sm mt-2">Spécialiste de l’emballage industriel et du stockage énergétique.</p>
                    </div>
                  </div>

                  <div class="space-y-6" *ngIf="expandedCardId === 'diwa'">
                    <h5 class="text-sm font-black text-[#036eb1] uppercase tracking-widest">Spécialités</h5>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3">
                      <div class="flex items-center p-4 bg-gray-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
                        <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#ae151e] shadow-sm mr-4">
                          <i class="fas fa-box"></i>
                        </div>
                        <span class="font-bold text-gray-800 text-sm">Production de contenants</span>
                      </div>
                      <div class="flex items-center p-4 bg-gray-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
                        <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#ae151e] shadow-sm mr-4">
                          <i class="fas fa-archive"></i>
                        </div>
                        <span class="font-bold text-gray-800 text-sm">Emballage métallique</span>
                      </div>
                      <div class="flex items-center p-4 bg-gray-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
                        <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#ae151e] shadow-sm mr-4">
                          <i class="fas fa-gas-pump"></i>
                        </div>
                        <span class="font-bold text-gray-800 text-sm">Stockage gaz & énergie</span>
                      </div>
                    </div>
                  </div>

                  <!-- Contenu Détaillé Accordéon -->
                  <div *ngIf="expandedCardId === 'diwa'" class="mt-8 pt-8 border-t border-gray-100 animate-fade-in">
                    <div class="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
                      <h5 class="text-[#ae151e] font-black text-xs uppercase tracking-widest mb-6 flex items-center">
                        <span class="w-8 h-[2px] bg-[#ae151e] mr-3"></span> Présentation Détaillée
                      </h5>
                      <div class="text-gray-600 text-sm md:text-base leading-relaxed space-y-4 font-['Ubuntu']">
                        <p>C’est la filiale spécialisée dans la production et commercialisation d’emballages et contenants métalliques au Togo. Elle produit pour le marché togolais et exporte dans la sous région. Elle est certifiée ISO 9001/2025</p>
                      </div>
                    </div>
                  </div>

                  <button (click)="toggleCard('diwa')" class="mt-10 text-[#036eb1] font-bold text-sm uppercase tracking-widest flex items-center group-hover:translate-x-2 transition-all">
                    {{ expandedCardId === 'diwa' ? 'Voir moins' : 'Voir plus' }} 
                    <i class="fas ml-3 text-xs transition-transform" [class.fa-arrow-right]="expandedCardId !== 'diwa'" [class.fa-chevron-up]="expandedCardId === 'diwa'"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- JCEMGROUP TOGO -->
            <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500" 
                 [ngClass]="{'lg:col-span-2': expandedCardId === 'jcem'}" 
                 data-aos="fade-up" data-aos-delay="100">
              <div class="flex flex-col" [ngClass]="{'lg:flex-row': expandedCardId === 'jcem'}">
                <div class="overflow-hidden relative" 
                     [class.h-64]="expandedCardId !== 'jcem'" 
                     [ngClass]="{
                       'lg:w-2/5': expandedCardId === 'jcem',
                       'lg:h-auto': expandedCardId === 'jcem'
                     }">
                  <img src="assets/images/sectors/industrie/industrie-2.png" alt="JCEMGROUP" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                  <div class="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm">
                    <span class="text-[#036eb1] font-black text-xs uppercase tracking-widest">JCEMGROUP</span>
                  </div>
                </div>
                <div class="p-8 md:p-10 flex-1">
                  <div class="flex items-center space-x-6 mb-8">
                    <div class="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center p-3 shadow-inner border border-gray-100 flex-shrink-0">
                      <img src="assets/images/partners/jcem.png" alt="JCEMGROUP Logo" class="max-w-full max-h-full object-contain">
                    </div>
                    <div>
                      <h4 class="text-2xl md:text-3xl font-bold text-gray-900 font-['Ubuntu']">JCEM GROUPE TOGO SAS</h4>
                      <p class="text-gray-500 text-sm mt-2">Expert en béton prêt à l’emploi et solutions BTP modernes.</p>
                    </div>
                  </div>
                  <div class="space-y-6" *ngIf="expandedCardId === 'jcem'">
                    <h5 class="text-sm font-black text-[#036eb1] uppercase tracking-widest">Expertise BTP</h5>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4">
                      <div class="flex items-center p-4 bg-gray-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
                        <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#ae151e] shadow-sm mr-4">
                          <i class="fas fa-fill-drip"></i>
                        </div>
                        <span class="font-bold text-gray-800 text-sm">Bétons prêts à l'emploi</span>
                      </div>
                      <div class="flex items-center p-4 bg-gray-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
                        <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#ae151e] shadow-sm mr-4">
                          <i class="fas fa-link"></i>
                        </div>
                        <span class="font-bold text-gray-800 text-sm">Armatures</span>
                      </div>
                      <div class="flex items-center p-4 bg-gray-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
                        <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#ae151e] shadow-sm mr-4">
                          <i class="fas fa-hard-hat"></i>
                        </div>
                        <span class="font-bold text-gray-800 text-sm">Intrants BTP</span>
                      </div>
                      <div class="flex items-center p-4 bg-gray-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
                        <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#ae151e] shadow-sm mr-4">
                          <i class="fas fa-palette"></i>
                        </div>
                        <span class="font-bold text-gray-800 text-sm">Bétons décoratifs</span>
                      </div>
                    </div>
                  </div>

                  <!-- Contenu Détaillé Accordéon -->
                  <div *ngIf="expandedCardId === 'jcem'" class="mt-8 pt-8 border-t border-gray-100 animate-fade-in">
                    <div class="space-y-8">
                      <div class="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
                        <h5 class="text-[#ae151e] font-black text-xs uppercase tracking-widest mb-6 flex items-center">
                          <span class="w-8 h-[2px] bg-[#ae151e] mr-3"></span> Présentation
                        </h5>
                        <div class="text-gray-600 text-sm md:text-base leading-relaxed space-y-4 font-['Ubuntu']">
                          <p>La société JCEM GROUPE TOGO SAS est née des cendres de la société JELCEM. JCEM GROUPE, comme JELCEM, est une société qui fournit du béton prêt à l’emploi pour les travaux de construction de bâtiments et d’infrastructures. Elle exploite une centrale à béton d’une capacité de 120 000 m3/an. Le béton est obtenu par mélange minutieux du ciment et autres matières (sable, gravier, adjuvant, eau) en divers dosages. Entièrement dépendant du marché de la construction, la fabrication du béton prêt à l’emploi enregistre une forte demande à cause des grands travaux d’infrastructures entrepris non seulement par le Gouvernement mais aussi par le secteur privée (construction de nouveau port de pêche de Gbetsogbé, la construction du siège de la NSIA-Togo, la construction des immeubles pour multiple usages, la construction d’hôtels etc, les habitations, pour ne citer que ceux-là). La demande potentielle de béton au Togo est évaluée à 5,4 millions de m3 par an.</p>
                        </div>
                      </div>

                      <div class="bg-blue-50/50 rounded-2xl p-6 md:p-8 border border-blue-100">
                        <h5 class="text-[#036eb1] font-black text-xs uppercase tracking-widest mb-6 flex items-center">
                          <span class="w-8 h-[2px] bg-[#036eb1] mr-3"></span> Avantages du béton prêt à l’emploi
                        </h5>
                        <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm md:text-base font-['Ubuntu']">
                          <li class="flex items-start">
                            <i class="fas fa-check-circle text-[#ae151e] mt-1 mr-3"></i>
                            <span>Gain de temps dans la préparation du béton</span>
                          </li>
                          <li class="flex items-start">
                            <i class="fas fa-check-circle text-[#ae151e] mt-1 mr-3"></i>
                            <span>Assurance de la qualité du béton (dosage et homogénéité)</span>
                          </li>
                          <li class="flex items-start">
                            <i class="fas fa-check-circle text-[#ae151e] mt-1 mr-3"></i>
                            <span>Utilisation d’adjuvants adaptés à chaque catégorie</span>
                          </li>
                          <li class="flex items-start">
                            <i class="fas fa-check-circle text-[#ae151e] mt-1 mr-3"></i>
                            <span>Disponibilité rapide et en quantité suffisante</span>
                          </li>
                          <li class="flex items-start">
                            <i class="fas fa-check-circle text-[#ae151e] mt-1 mr-3"></i>
                            <span>Assurance d’exécuter les travaux à temps</span>
                          </li>
                          <li class="flex items-start">
                            <i class="fas fa-check-circle text-[#ae151e] mt-1 mr-3"></i>
                            <span>Prix très compétitifs</span>
                          </li>
                          <li class="flex items-start">
                            <i class="fas fa-check-circle text-[#ae151e] mt-1 mr-3"></i>
                            <span>Économie d’investissement ou de location de matériel</span>
                          </li>
                          <li class="flex items-start">
                            <i class="fas fa-check-circle text-[#ae151e] mt-1 mr-3"></i>
                            <span>Gestion simplifiée de la main d’œuvre sur chantier</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <button (click)="toggleCard('jcem')" class="mt-10 text-[#036eb1] font-bold text-sm uppercase tracking-widest flex items-center group-hover:translate-x-2 transition-all">
                    {{ expandedCardId === 'jcem' ? 'Voir moins' : 'Voir plus' }} 
                    <i class="fas ml-3 text-xs transition-transform" [class.fa-arrow-right]="expandedCardId !== 'jcem'" [class.fa-chevron-up]="expandedCardId === 'jcem'"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- DABA -->
            <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500 lg:col-span-2" 
                 data-aos="fade-up">
              <div class="flex flex-col md:flex-row">
                <div class="md:w-2/5 overflow-hidden relative" 
                     [ngClass]="{
                       'h-64 md:h-auto': expandedCardId !== 'daba',
                       'lg:h-auto': expandedCardId === 'daba'
                     }">
                  <img src="assets/images/sectors/industrie/industrie-3.png" alt="DABA" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                  <div class="absolute inset-0 bg-black/10"></div>
                </div>
                <div class="p-8 md:p-12 md:w-3/5 flex-1">
                  <div class="flex items-center space-x-6 mb-8">
                    <div class="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center p-3 shadow-inner border border-gray-100 flex-shrink-0">
                      <img src="assets/images/partners/daba.png" alt="DABA Logo" class="max-w-full max-h-full object-contain">
                    </div>
                    <div>
                      <div class="inline-block bg-blue-50 text-[#036eb1] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-2">Agro-Business</div>
                      <h4 class="text-3xl font-bold text-gray-900 font-['Ubuntu']">DABA SAS</h4>
                      <p class="text-gray-500 text-sm mt-1">Entreprise agro-industrielle spécialisée dans la transformation de produits d’élevage.</p>
                    </div>
                  </div>

                  <!-- Résumé visible uniquement quand fermé -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10" *ngIf="expandedCardId !== 'daba'">
                    <div class="space-y-4">
                      <div class="flex items-start">
                        <i class="fas fa-leaf text-[#ae151e] mt-1 mr-4"></i>
                        <div>
                          <p class="font-bold text-gray-900 text-sm">Agro-business</p>
                          <p class="text-xs text-gray-500 mt-1">Développement de filières agricoles durables.</p>
                        </div>
                      </div>
                      <div class="flex items-start">
                        <i class="fas fa-cow text-[#ae151e] mt-1 mr-4"></i>
                        <div>
                          <p class="font-bold text-gray-900 text-sm">Transformation</p>
                          <p class="text-xs text-gray-500 mt-1">Valorisation des produits d’élevage.</p>
                        </div>
                      </div>
                    </div>
                    <div class="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-200 flex flex-col justify-center text-center">
                       <i class="fas fa-building-circle-check text-2xl text-[#036eb1] mb-3"></i>
                       <p class="text-sm font-bold text-gray-800 uppercase tracking-tighter">Abattoir moderne</p>
                       <p class="text-[10px] text-gray-400 mt-1 uppercase">Standard International</p>
                    </div>
                  </div>

                  <!-- Contenu Détaillé Accordéon -->
                  <div *ngIf="expandedCardId === 'daba'" class="mt-8 pt-8 border-t border-gray-100 animate-fade-in">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div class="space-y-8">
                        <div class="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
                          <h5 class="text-[#ae151e] font-black text-xs uppercase tracking-widest mb-6 flex items-center">
                            <span class="w-8 h-[2px] bg-[#ae151e] mr-3"></span> Présentation Générale
                          </h5>
                          <div class="space-y-6">
                            <div>
                              <p class="text-xs font-black text-[#036eb1] uppercase tracking-tighter mb-2">Siège social</p>
                              <p class="text-gray-700 text-sm font-['Ubuntu']">Lomé, BKS, quartier Agoè-nyivé</p>
                            </div>
                            <div>
                              <p class="text-xs font-black text-[#036eb1] uppercase tracking-tighter mb-4">Objet social</p>
                              <p class="text-gray-600 text-sm mb-4">Elle a pour objet social :</p>
                              <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                                <li class="flex items-center text-sm text-gray-700 font-['Ubuntu']"><i class="fas fa-check text-[#ae151e] mr-2 text-[10px]"></i>L’agro-industrie</li>
                                <li class="flex items-center text-sm text-gray-700 font-['Ubuntu']"><i class="fas fa-check text-[#ae151e] mr-2 text-[10px]"></i>La transformation</li>
                                <li class="flex items-center text-sm text-gray-700 font-['Ubuntu']"><i class="fas fa-check text-[#ae151e] mr-2 text-[10px]"></i>L’élevage</li>
                                <li class="flex items-center text-sm text-gray-700 font-['Ubuntu']"><i class="fas fa-check text-[#ae151e] mr-2 text-[10px]"></i>L’abattage</li>
                                <li class="flex items-center text-sm text-gray-700 font-['Ubuntu']"><i class="fas fa-check text-[#ae151e] mr-2 text-[10px]"></i>Commercialisation viandes</li>
                                <li class="flex items-center text-sm text-gray-700 font-['Ubuntu']"><i class="fas fa-check text-[#ae151e] mr-2 text-[10px]"></i>Produits d’abattoirs</li>
                                <li class="flex items-center text-sm text-gray-700 font-['Ubuntu']"><i class="fas fa-check text-[#ae151e] mr-2 text-[10px]"></i>Fruits et légumes</li>
                                <li class="flex items-center text-sm text-gray-700 font-['Ubuntu']"><i class="fas fa-check text-[#ae151e] mr-2 text-[10px]"></i>Charcuteries</li>
                                <li class="flex items-center text-sm text-gray-700 font-['Ubuntu']"><i class="fas fa-check text-[#ae151e] mr-2 text-[10px]"></i>Pisciculture</li>
                                <li class="flex items-center text-sm text-gray-700 font-['Ubuntu']"><i class="fas fa-check text-[#ae151e] mr-2 text-[10px]"></i>Produits surgelés/laitiers</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="flex flex-col justify-center">
                        <div class="bg-blue-50/50 rounded-3xl p-8 border border-blue-100 relative overflow-hidden">
                          <i class="fas fa-quote-left absolute top-6 right-8 text-4xl text-blue-100/50"></i>
                          <p class="text-gray-700 text-lg leading-relaxed font-['Ubuntu'] italic relative z-10">
                            DABA SAS est une société spécialisée dans l’agro-business, production et transformation de produits agricoles et d’élevage, abattoir moderne, industries de transformation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button (click)="toggleCard('daba')" 
                          class="mt-10 text-[#036eb1] font-bold text-sm uppercase tracking-widest flex items-center group-hover:translate-x-2 transition-all">
                    {{ expandedCardId === 'daba' ? 'Voir moins' : 'Voir plus' }} 
                    <i class="fas ml-3 text-xs transition-transform" 
                       [class.fa-arrow-right]="expandedCardId !== 'daba'" 
                       [class.fa-chevron-up]="expandedCardId === 'daba'"></i>
                  </button>
                </div>
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
    <app-footer></app-footer>
  `
})
export class IndustrieComponent {
  expandedCardId: string | null = null;

  toggleCard(id: string) {
    if (this.expandedCardId === id) {
      this.expandedCardId = null;
    } else {
      this.expandedCardId = id;
    }
  }
}
