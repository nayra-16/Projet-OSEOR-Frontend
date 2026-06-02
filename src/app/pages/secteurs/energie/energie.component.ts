import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from '../../../components/topbar/topbar.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';

export interface EnergyCompany {
  id: 'zih' | 'zener_togo' | 'pls' | 'pgs' | 'diwa' | 'bluen' | 'zener_benin' | 'zen_grupo';
  name: string;
  description: string;
  logoUrl: string;
  isExpandable: boolean;
}

@Component({
  selector: 'app-energie',
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
               style="background-image: linear-gradient(rgba(3, 110, 177, 0.85), rgba(3, 110, 177, 0.7)), url('assets/images/sectors/energie/energie-1.png')">
        <div class="container mx-auto px-6 relative z-10 text-center text-white">
          <h1 class="text-4xl md:text-6xl font-black font-['Ubuntu'] uppercase tracking-widest mb-6" data-aos="fade-down">
            Secteur Énergie
          </h1>
          <div class="w-24 h-1.5 bg-[#ae151e] mx-auto mb-8"></div>
          <p class="text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed mb-10 opacity-90" data-aos="fade-up">
            OSEOR soutient les acteurs majeurs de l'énergie pour garantir une transition durable et une souveraineté énergétique régionale.
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
              <h2 class="text-[#036eb1] text-sm font-black uppercase tracking-[0.3em] mb-4">Portefeuille Corporate</h2>
              <h3 class="text-3xl md:text-4xl font-bold text-gray-900 font-['Ubuntu']">Entreprises du Secteur</h3>
            </div>
            <div class="h-1 bg-gray-100 flex-1 ml-10 hidden md:block mb-4"></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 items-start">
            <div *ngFor="let item of energyCompanies; let i = index" 
                 [class.xl:col-span-2]="item.isExpandable && expandedCardId === item.id"
                 [class.lg:col-span-2]="item.isExpandable && expandedCardId === item.id"
                 class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col h-full" 
                 data-aos="fade-up" [attr.data-aos-delay]="i * 50">
              
              <div class="p-8 md:p-10 flex flex-col h-full items-center text-center">
                <!-- Icon/Logo Container -->
                <div class="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center p-4 shadow-inner border border-gray-100 flex-shrink-0 mb-6 group-hover:bg-white transition-colors duration-500">
                  <img [src]="item.logoUrl" [alt]="item.name" class="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110">
                </div>
                
                <!-- Content -->
                <div class="flex-1 flex flex-col items-center w-full">
                  <h4 class="text-lg font-bold text-gray-900 font-['Ubuntu'] mb-4 group-hover:text-oseor-blue transition-colors line-clamp-2 min-h-[3.5rem] flex items-center">
                    {{ item.name }}
                  </h4>
                  <p class="text-gray-500 text-sm leading-relaxed font-['Ubuntu']" [class.line-clamp-2]="!item.isExpandable || expandedCardId !== item.id">
                    {{ item.description }}
                  </p>

                  <!-- Expanded Content for ZIH -->
                  <div *ngIf="item.id === 'zih' && expandedCardId === 'zih'" class="mt-8 text-left w-full animate-fade-in border-t border-gray-100 pt-8">
                    <div class="space-y-6">
                      <div>
                        <h5 class="text-[#ae151e] font-black text-xs uppercase tracking-widest mb-4 flex items-center">
                          <span class="w-8 h-[2px] bg-[#ae151e] mr-3"></span> Brève présentation
                        </h5>
                        <div class="text-gray-600 text-sm leading-relaxed space-y-4 font-['Ubuntu']">
                          <p>Zener International Holding (ZIH) est la holding ENERGIE du Groupe ZENER. C’est une société à 100% capitaux privés détenus par des investisseurs togolais.</p>
                          <p>Basée au Togo, elle est en charge des investissements du Groupe, avec un développement principalement axé sur le secteur de l’énergie (gaz, pétrole, électricité, solaire, éolien et hydrogène).</p>
                          <p>Elle fait partie du réseau de sociétés du Groupe OSEOR, qui opère dans divers secteurs d’activités dont l’Energie, le trading et la distribution de produits pétroliers, le transport et les concessions automobiles, l’industrie, l’agro-alimentaire, le BTP, le conseil et l’ingénierie, le numérique, etc.</p>
                          <p>D’ici à 2028, ZIH projette son expansion au Burkina-Faso, au Niger, au Mali, au Tchad et en RDC. Nourri de véritables ambitions africaines, le groupe entend se positionner comme un acteur majeur de l’énergie dans la sous-région Afrique de l’Ouest & Centrale.</p>
                        </div>
                      </div>

                      <div class="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <h5 class="text-[#036eb1] font-black text-xs uppercase tracking-widest mb-4 flex items-center">
                          <i class="fas fa-chart-line mr-3"></i> DONNÉES-CLÉS
                        </h5>
                        <ul class="space-y-3 text-sm text-gray-700 font-['Ubuntu']">
                          <li class="flex items-start"><span class="font-bold min-w-[140px] text-oseor-blue">Forme juridique:</span> <span>Société Anonyme avec Conseil d’Administration</span></li>
                          <li class="flex items-start"><span class="font-bold min-w-[140px] text-oseor-blue">Siège social:</span> <span>Lomé (Togo)</span></li>
                          <li class="flex items-start"><span class="font-bold min-w-[140px] text-oseor-blue">Secteurs cibles:</span> <span>Gaz, Pétrole, Solaire, Electricité, Eolien, Hydrogène</span></li>
                          <li class="flex items-start"><span class="font-bold min-w-[140px] text-oseor-blue">Présence géo:</span> <span>Afrique de l’Ouest et Centrale (Togo, Bénin, Guinée Bissau)</span></li>
                          <li class="flex items-start"><span class="font-bold min-w-[140px] text-oseor-blue">Pays cibles:</span> <span>Côte d’Ivoire, Bénin, Burkina Faso, Cap vert, Niger, RDC, Tchad</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <!-- Expanded Content for ZEN GRUPO LDA -->
                  <div *ngIf="item.id === 'zen_grupo' && expandedCardId === 'zen_grupo'" class="mt-8 text-left w-full animate-fade-in border-t border-gray-100 pt-8">
                    <div class="space-y-8">
                      <div>
                        <h5 class="text-[#ae151e] font-black text-xs uppercase tracking-widest mb-4 flex items-center">
                          <span class="w-8 h-[2px] bg-[#ae151e] mr-3"></span> Zen Grupo Lda
                        </h5>
                        <div class="text-gray-600 text-sm leading-relaxed space-y-4 font-['Ubuntu']">
                          <p>est la filiale en Guinée-Bissau acquis en 2025 et qui occupe une position dominante sur le marché oil & gas dans le pays. Elle regroupe un stockage de 20 000 m3 de produits blancs jet A1, un stockage de 1200 T de GPL, un réseau de 16 stations services (plus grand réseau), et un parc logistique</p>
                        </div>
                      </div>

                      <div>
                        <h5 class="text-[#036eb1] font-black text-xs uppercase tracking-widest mb-4 flex items-center">
                          <span class="w-8 h-[2px] bg-[#036eb1] mr-3"></span> Présentation de l’activité de Zen Grupo
                        </h5>
                        <div class="text-gray-600 text-sm leading-relaxed space-y-4 font-['Ubuntu']">
                          <p>Zen Grupo, anciennement Petrogal GB, est l’acteur dominant du secteur aval du pétrole et du gaz en Guinée-Bissau. Le groupe occupe une position centrale sur l’ensemble de la chaîne de valeur, notamment dans l’importation, le stockage et la distribution des produits pétroliers, dans un marché fortement dépendant des importations.</p>
                          <p>Il contrôle une part significative des infrastructures stratégiques du pays et opère à travers plusieurs filiales spécialisées, dont Petromar, Petrogas, ASB et CLC. Le groupe est également leader sur le segment du carburant aviation, via ASB, qui exploite un dépôt en partenariat avec Elton pour l’approvisionnement en Jet A1 à l’aéroport international Osvaldo Vieira.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Expanded Content for POWER LINK SOLUTIONS SA -->
                  <div *ngIf="item.id === 'pls' && expandedCardId === 'pls'" class="mt-8 text-left w-full animate-fade-in border-t border-gray-100 pt-8">
                    <div class="space-y-6">
                      <div>
                        <h5 class="text-[#ae151e] font-black text-xs uppercase tracking-widest mb-4 flex items-center">
                          <span class="w-8 h-[2px] bg-[#ae151e] mr-3"></span> Présentation
                        </h5>
                        <div class="text-gray-600 text-sm leading-relaxed space-y-4 font-['Ubuntu']">
                          <p>POWER LINK SOLUTIONS SA est une société spécialisée dans le trading et le stockage de gaz butane au Togo. Elle opère un dépôt gazier de plus de 5300 m3 situé en zone portuaire et relié au quai pétrolier de Lomé par un pipeline privé.</p>
                          <p>Basée au Togo, elle offre des services de passage aux pays de l’hinterland.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Expanded Content for POWER & GAS STORAGE SA -->
                   <div *ngIf="item.id === 'pgs' && expandedCardId === 'pgs'" class="mt-8 text-left w-full animate-fade-in border-t border-gray-100 pt-8">
                     <div class="space-y-6">
                       <div>
                         <h5 class="text-[#ae151e] font-black text-xs uppercase tracking-widest mb-4 flex items-center">
                           <span class="w-8 h-[2px] bg-[#ae151e] mr-3"></span> Activité principale de PGS
                         </h5>
                         <p class="text-gray-600 text-sm leading-relaxed mb-4 font-['Ubuntu']">
                           Société spécialisée dans l’importation, le stockage et la distribution du propane et les autres produits pétroliers et dérivés.
                         </p>
                         <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                           <li class="flex items-center text-sm text-gray-700 font-['Ubuntu']"><i class="fas fa-check text-[#ae151e] mr-3 text-[10px]"></i>Plateforme multilink</li>
                           <li class="flex items-center text-sm text-gray-700 font-['Ubuntu']"><i class="fas fa-check text-[#ae151e] mr-3 text-[10px]"></i>Propane et gaz naturel</li>
                           <li class="flex items-center text-sm text-gray-700 font-['Ubuntu']"><i class="fas fa-check text-[#ae151e] mr-3 text-[10px]"></i>Terminaux gazier</li>
                           <li class="flex items-center text-sm text-gray-700 font-['Ubuntu']"><i class="fas fa-check text-[#ae151e] mr-3 text-[10px]"></i>Solaire et hydro</li>
                         </ul>
                       </div>

                       <div class="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                         <h5 class="text-[#036eb1] font-black text-xs uppercase tracking-widest mb-4 flex items-center">
                           <i class="fas fa-warehouse mr-3"></i> Infrastructures du dépôt
                         </h5>
                         <ul class="space-y-3 text-sm text-gray-700 font-['Ubuntu']">
                           <li class="flex items-start"><i class="fas fa-caret-right text-oseor-blue mt-1 mr-3"></i> <span>Construction sur le site d'un stockage exclusivement dédié pour le propane de capacité d’environ 9 600 m3 (16 cuves de 600m3 chacune)</span></li>
                           <li class="flex items-start"><i class="fas fa-caret-right text-oseor-blue mt-1 mr-3"></i> <span>Un stockage tampon (Buffer Tank) d’une capacité 1 200 m3 (2 cuves de 600 m3)</span></li>
                           <li class="flex items-start"><i class="fas fa-caret-right text-oseor-blue mt-1 mr-3"></i> <span>Lignes de transfert entre les stockages principaux et le stockage tampon (situé sur le site de la centrale KEKELI)</span></li>
                           <li class="flex items-start"><i class="fas fa-caret-right text-oseor-blue mt-1 mr-3"></i> <span>Système de pompes performant</span></li>
                           <li class="flex items-start"><i class="fas fa-caret-right text-oseor-blue mt-1 mr-3"></i> <span>Système de vapo-détendeurs (débit 100 000 kg/h ; pression 50 bars ; température 150°C)</span></li>
                           <li class="flex items-start"><i class="fas fa-caret-right text-oseor-blue mt-1 mr-3"></i> <span>Système de sécurité de pointe et lutte contre les incendies</span></li>
                         </ul>
                       </div>
                     </div>
                   </div>

                   <!-- Expanded Content for DIWA INDUSTRIES SA -->
                   <div *ngIf="item.id === 'diwa' && expandedCardId === 'diwa'" class="mt-8 text-left w-full animate-fade-in border-t border-gray-100 pt-8">
                     <div class="space-y-6">
                       <div>
                         <h5 class="text-[#ae151e] font-black text-xs uppercase tracking-widest mb-4 flex items-center">
                           <span class="w-8 h-[2px] bg-[#ae151e] mr-3"></span> Présentation
                         </h5>
                         <div class="text-gray-600 text-sm leading-relaxed space-y-4 font-['Ubuntu']">
                           <p>DIWA Industries est une société togolaise spécialisée dans les solutions de mobilité. A ce titre, elle couvre les secteurs de l’automobile, de la tribologie et des équipements industriels et technologiques.</p>
                           <p>Elle offre des solutions exclusives d’équipements dans l’industrie, le transport et l’agriculture.</p>
                           <p>Elle se veut la référence locale en matière de fourniture d’équipements et de services de mobilité.</p>
                           <p>Les activités de DIWA International ont effectivement démarré entre 2011 et 2013.</p>
                         </div>
                       </div>
                     </div>
                   </div>

                   <!-- Expanded Content for BLUEN SA -->
                    <div *ngIf="item.id === 'bluen' && expandedCardId === 'bluen'" class="mt-8 text-left w-full animate-fade-in border-t border-gray-100 pt-8">
                      <div class="space-y-6">
                        <div>
                          <h5 class="text-[#ae151e] font-black text-xs uppercase tracking-widest mb-4 flex items-center">
                            <span class="w-8 h-[2px] bg-[#ae151e] mr-3"></span> Présentation
                          </h5>
                          <div class="text-gray-600 text-sm leading-relaxed space-y-4 font-['Ubuntu']">
                            <p>Bluen SA est une filiale de développement de solutions d’énergies renouvelables et transition énergétique : solutions solaires résidentielles, industrielles et centrales gas to power. Elle explore également les opportunités dans les solutions éoliennes et hydrogène.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Expanded Content for ZENER BENIN SA -->
                    <div *ngIf="item.id === 'zener_benin' && expandedCardId === 'zener_benin'" class="mt-8 text-left w-full animate-fade-in border-t border-gray-100 pt-8">
                      <div class="space-y-8">
                        <div>
                          <h5 class="text-[#ae151e] font-black text-xs uppercase tracking-widest mb-4 flex items-center">
                            <span class="w-8 h-[2px] bg-[#ae151e] mr-3"></span> Présentation
                          </h5>
                          <div class="text-gray-600 text-sm leading-relaxed space-y-4 font-['Ubuntu']">
                            <p>Filiale installée au Benin en 2023, ZENER BENIN investit dans la distribution de produits blancs et GPL, HFO, lubrifiants, etc.</p>
                            <p>Société filiale de ZENER INTERNATIONAL HOLDING (ZIH), elle a été créée dans le cadre de la mise en œuvre de la stratégie d’une expansion sous-régionale des produits de ZENER. Le capital social de la société est de 300 millions de F CFA. L’objectif principal est de devenir un acteur majeur de l’énergie au Bénin.</p>
                            <p>À sa création, ZENER BENIN a commencé son exploitation avec la création d’une station-service (Oasis) et distribue les produits comme le Gaz et les dérivés des hydrocarbures.</p>
                          </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div class="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <h5 class="text-[#036eb1] font-black text-xs uppercase tracking-widest mb-4 flex items-center">
                              <i class="fas fa-info-circle mr-3"></i> Données clés
                            </h5>
                            <ul class="space-y-2 text-sm text-gray-700 font-['Ubuntu']">
                              <li><span class="font-bold text-oseor-blue">Forme Juridique :</span> SA</li>
                              <li><span class="font-bold text-oseor-blue">Année de création :</span> 2023</li>
                              <li><span class="font-bold text-oseor-blue">Capital :</span> 300 millions</li>
                              <li><span class="font-bold text-oseor-blue">Siège social :</span> Cotonou</li>
                              <li><span class="font-bold text-oseor-blue">Recettes 2024 :</span> 636 millions</li>
                              <li><span class="font-bold text-oseor-blue">Résultat net 2024 :</span> -23 millions</li>
                            </ul>
                          </div>

                          <div class="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                            <h5 class="text-[#036eb1] font-black text-xs uppercase tracking-widest mb-4 flex items-center">
                              <i class="fas fa-bullseye mr-3"></i> Ambitions
                            </h5>
                            <ul class="space-y-2 text-sm text-gray-700 font-['Ubuntu']">
                              <li class="flex items-start"><i class="fas fa-check text-[#ae151e] mt-1 mr-2 text-[10px]"></i> 15 stations-services d’ici 5 ans</li>
                              <li class="flex items-start"><i class="fas fa-check text-[#ae151e] mt-1 mr-2 text-[10px]"></i> Dépôt de gaz et 2 centres emplisseurs</li>
                              <li class="flex items-start"><i class="fas fa-check text-[#ae151e] mt-1 mr-2 text-[10px]"></i> Réseau Enora (gaz en bouteille)</li>
                              <li class="flex items-start"><i class="fas fa-check text-[#ae151e] mt-1 mr-2 text-[10px]"></i> Kits solaires et photovoltaïques</li>
                              <li class="flex items-start"><i class="fas fa-check text-[#ae151e] mt-1 mr-2 text-[10px]"></i> Explorer les projets GtP</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                <!-- Bouton Voir Plus / Lien Externe -->
                <ng-container *ngIf="item.id === 'zener_togo'">
                  <a href="https://zener.tg/" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     class="mt-8 text-[#036eb1] font-bold text-xs uppercase tracking-widest flex items-center group-hover:translate-x-2 transition-all cursor-pointer">
                    VOIR PLUS →
                  </a>
                </ng-container>

                <button *ngIf="item.id !== 'zener_togo'"
                        (click)="item.isExpandable ? toggleCard(item.id) : null" 
                        class="mt-8 text-[#036eb1] font-bold text-xs uppercase tracking-widest flex items-center group-hover:translate-x-2 transition-all">
                  {{ item.isExpandable && expandedCardId === item.id ? 'Voir moins' : 'Voir plus' }} 
                  <i class="fas ml-2 text-[10px]" [class.fa-arrow-right]="!item.isExpandable || expandedCardId !== item.id" [class.fa-chevron-up]="item.isExpandable && expandedCardId === item.id"></i>
                </button>
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
export class EnergieComponent {
  expandedCardId: EnergyCompany['id'] | null = null;

  toggleCard(id: EnergyCompany['id']) {
    if (this.expandedCardId === id) {
      this.expandedCardId = null;
    } else {
      this.expandedCardId = id;
    }
  }

  energyCompanies: EnergyCompany[] = [
    { 
      id: 'zih',
      name: 'ZIH — ZENER International Holding', 
      description: 'Holding énergie du Groupe ZENER spécialisée dans les investissements, infrastructures de stockage, transport de combustible et solutions énergétiques diversifiées.', 
      logoUrl: 'assets/images/partners/zih.png',
      isExpandable: true
    },
    { 
      id: 'zener_togo',
      name: 'ZENER TOGO SA', 
      description: 'Filiale spécialisée dans l’importation, le stockage et la distribution des produits pétroliers, GPL, lubrifiants et accessoires du gaz.', 
      logoUrl: 'assets/images/partners/zih.png',
      isExpandable: false
    },
    { 
      id: 'pls',
      name: 'POWER LINK SOLUTIONS SA', 
      description: 'Entreprise spécialisée dans le trading, le stockage et les infrastructures de gaz butane avec dépôt gazier en zone portuaire.', 
      logoUrl: 'assets/images/partners/pls.png',
      isExpandable: true
    },
    { 
      id: 'pgs',
      name: 'POWER & GAS STORAGE SA', 
      description: 'Entreprise spécialisée dans le stockage de propane, terminaux gaziers et solutions énergétiques destinées au secteur industriel.', 
      logoUrl: 'assets/images/partners/pgs.png',
      isExpandable: true
    },
    { 
      id: 'diwa',
      name: 'DIWA INDUSTRIES SA', 
      description: 'Filiale spécialisée dans la production et commercialisation d’emballages et contenants métalliques certifiée ISO 9001/2025.', 
      logoUrl: 'assets/images/partners/diwa-indus.png',
      isExpandable: true
    },
    { 
      id: 'bluen',
      name: 'BLUEN SA', 
      description: 'Filiale de développement de solutions d’énergies renouvelables, solutions solaires et transition énergétique.', 
      logoUrl: 'assets/images/partners/bluen.png',
      isExpandable: true
    },
    { 
      id: 'zener_benin',
      name: 'ZENER BENIN SA', 
      description: 'Filiale créée en 2023 spécialisée dans la distribution de produits pétroliers, GPL et développement énergétique au Bénin.', 
      logoUrl: 'assets/images/partners/zih.png',
      isExpandable: true
    },
    { 
      id: 'zen_grupo',
      name: 'ZEN GRUPO LDA', 
      description: 'Acteur dominant du secteur pétrolier et gazier en Guinée-Bissau spécialisé dans le stockage et la distribution énergétique.', 
      logoUrl: 'assets/images/partners/zih.png',
      isExpandable: true
    }
  ];
}
