import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Entreprise } from '../../models/oseor.models';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-entreprises',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="py-20 bg-gray-50/50" id="entreprises">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16 max-w-3xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-['Ubuntu']">
            {{ 'PARTICIPATIONS.TITLE' | translate }}
          </h2>
          <p class="text-gray-600 text-lg leading-relaxed font-['Ubuntu']">
            {{ 'PARTICIPATIONS.DESCRIPTION' | translate }}
          </p>
        </div>

        <!-- Filtres par Secteur -->
        <div class="flex justify-center flex-wrap gap-3 mb-12" data-aos="fade-up">
          <button *ngFor="let cat of categories" 
                  (click)="filterBySecteur(cat)"
                  [ngClass]="selectedSecteur === cat ? 'bg-oseor-blue text-white shadow-lg scale-105' : 'bg-white text-gray-600 border border-gray-100 hover:border-oseor-blue hover:text-oseor-blue shadow-sm'"
                  class="px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 transform">
            {{ getCategoryLabel(cat) }}
          </button>
        </div>

        <!-- Loader -->
        <div *ngIf="loading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-oseor-blue"></div>
        </div>

        <!-- Error Message -->
        <div *ngIf="error" class="text-center py-12 text-[#ae151e] font-medium">
          {{ error }}
        </div>

        <!-- Grille des Entreprises (Slider Horizontal) -->
        <div class="relative group" *ngIf="!loading && !error">
          <div #slider
               class="flex overflow-x-auto gap-6 md:gap-8 pb-12 no-scrollbar snap-x snap-mandatory scroll-smooth"
               (scroll)="onScroll()">
            <div *ngFor="let item of filteredEntreprises" 
                 class="bg-white border border-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center group flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[calc((100%-4rem)/3)] snap-center transform hover:-translate-y-2">
              <!-- Icon/Logo -->
              <div class="w-32 h-32 mb-8 flex items-center justify-center bg-gray-50 rounded-2xl group-hover:bg-white transition-colors duration-500 overflow-hidden p-4">
                <img [src]="item.logoUrl" 
                     [alt]="item.name" 
                     width="96" 
                     height="96" 
                     loading="lazy" 
                     class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110">
              </div>
              
              <h3 class="text-xl font-bold text-gray-900 mb-4 font-['Ubuntu'] group-hover:text-oseor-blue transition-colors">{{ item.name }}</h3>
              <p class="text-gray-500 text-sm leading-relaxed font-['Ubuntu'] line-clamp-2 mb-6">{{ item.description }}</p>
              
              <!-- Bouton VOIR PLUS -->
              <a *ngIf="item.officialSite" 
                 [href]="item.officialSite" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 class="mt-auto inline-flex items-center text-oseor-blue font-bold text-sm uppercase tracking-wider hover:text-[#ae151e] transition-colors group/btn">
                Voir plus
                <i class="fas fa-arrow-right ml-2 transform group-hover/btn:translate-x-1 transition-transform"></i>
              </a>
            </div>
          </div>

          <!-- Bouton Précédent / Prev -->
          <button (click)="scrollPrev()" 
                  class="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white text-oseor-blue rounded-full shadow-2xl flex items-center justify-center hover:bg-oseor-blue hover:text-white transition-all duration-300 z-10 border border-gray-100 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0">
            <i class="fas fa-chevron-left"></i>
          </button>

          <!-- Bouton Suivant / Next -->
          <button (click)="scrollNext()" 
                  class="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white text-oseor-blue rounded-full shadow-2xl flex items-center justify-center hover:bg-oseor-blue hover:text-white transition-all duration-300 z-10 border border-gray-100 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>

        <!-- Indicateurs du slider (2 points) -->
        <div *ngIf="!loading && !error" class="flex justify-center space-x-2 mt-4">
          <span class="w-2.5 h-2.5 rounded-full transition-all duration-300"
                [ngClass]="isFirstHalf ? 'bg-oseor-blue w-6' : 'bg-gray-200'"></span>
          <span class="w-2.5 h-2.5 rounded-full transition-all duration-300"
                [ngClass]="!isFirstHalf ? 'bg-oseor-blue w-6' : 'bg-gray-200'"></span>
        </div>
      </div>
    </section>
  `
})
export class EntreprisesComponent implements OnInit {
  @ViewChild('slider') slider!: ElementRef;
  
  entreprises: Entreprise[] = [
    { name: 'ZIH — ZENER International Holding', secteur: 'Énergie', description: 'Holding énergie du Groupe ZENER spécialisée dans les investissements, infrastructures de stockage, transport de combustible et solutions énergétiques diversifiées.', logoUrl: 'assets/images/partners/zih.png' } as Entreprise,
    { name: 'ZENER TOGO SA', secteur: 'Énergie', description: 'Filiale spécialisée dans l’importation, le stockage et la distribution des produits pétroliers, GPL, lubrifiants et accessoires du gaz.', logoUrl: 'assets/images/partners/zener .png', officialSite: 'https://zener.tg/' } as Entreprise,
    { name: 'POWER LINK SOLUTIONS SA', secteur: 'Énergie', description: 'Entreprise spécialisée dans le trading, le stockage et les infrastructures de gaz butane avec dépôt gazier en zone portuaire.', logoUrl: 'assets/images/partners/pls.png', officialSite: 'https://pls.tg/' } as Entreprise,
    { name: 'POWER & GAS STORAGE SA', secteur: 'Énergie', description: 'Entreprise spécialisée dans le stockage de propane, terminaux gaziers et solutions énergétiques destinées au secteur industriel.', logoUrl: 'assets/images/partners/pgs.png', officialSite: 'https://pgs.tg/' } as Entreprise,
    { name: 'DIWA INDUSTRIES SA', secteur: 'Énergie', description: 'Filiale spécialisée dans la production et commercialisation d’emballages et contenants métalliques certifiée ISO 9001/2025.', logoUrl: 'assets/images/partners/diwa-indus.png', officialSite: 'https://diwaindustries.tg/' } as Entreprise,
    { name: 'BLUEN SA', secteur: 'Énergie', description: 'Filiale de développement de solutions d’énergies renouvelables, solutions solaires et transition énergétique.', logoUrl: 'assets/images/partners/bluen.png', officialSite: 'https://bluen.tg/' } as Entreprise,
    { name: 'ZENER BENIN SA', secteur: 'Énergie', description: 'Filiale créée en 2023 spécialisée dans la distribution de produits pétroliers, GPL et développement énergétique au Bénin.', logoUrl: 'assets/images/partners/zih.png' } as Entreprise,
    { name: 'ZEN GRUPO LDA', secteur: 'Énergie', description: 'Acteur dominant du secteur pétrolier et gazier en Guinée-Bissau spécialisé dans le stockage et la distribution énergétique.', logoUrl: 'assets/images/partners/zih.png' } as Entreprise,
    { name: 'KAPI CONSULT', secteur: 'Services', description: 'Cabinet spécialisé dans le conseil stratégique et l’assistance technique.', logoUrl: 'assets/images/partners/kapiconsult.png', officialSite: 'https://kapiconsult.tg/' } as Entreprise,
    { name: 'DIWA INTERNATIONAL', secteur: 'Services', description: 'Spécialiste des équipements automobiles et industriels.', logoUrl: 'assets/images/partners/diwa-indus.png' } as Entreprise,
    { name: 'BONICI', secteur: 'Industrie', description: 'Entreprise spécialisée dans la restauration rapide et les produits locaux.', logoUrl: 'assets/images/partners/bonici.png', officialSite: 'https://bonici.africa/' } as Entreprise,
    { name: 'TRFS', secteur: 'Services', description: 'Référence dans le transport routier et la logistique au Togo.', logoUrl: 'assets/images/partners/trfs.png', officialSite: 'https://trfs.africa/' } as Entreprise,
    { name: '@TOGO', secteur: 'Industrie', description: 'Entreprise innovante spécialisée dans les solutions digitales et la fintech.', logoUrl: 'assets/images/partners/attogo.png', officialSite: 'https://arobase.tg/' } as Entreprise,
    { name: 'DIWA INDUSTRIES', secteur: 'Industrie', description: 'Spécialiste de l’emballage industriel et du stockage énergétique.', logoUrl: 'assets/images/partners/diwa-indus.png', officialSite: 'https://diwaindustries.tg/' } as Entreprise,
    { name: 'JCEMGROUP TOGO', secteur: 'Industrie', description: 'Expert en béton prêt à l’emploi et solutions BTP modernes.', logoUrl: 'assets/images/partners/jcem.png', officialSite: 'https://jcem.tg/' } as Entreprise,
    { name: 'DABA', secteur: 'Industrie', description: 'Entreprise agro-industrielle spécialisée dans la transformation de produits d’élevage.', logoUrl: 'assets/images/partners/daba.png', officialSite: 'https://daba.tg/' } as Entreprise
  ];

  filteredEntreprises: Entreprise[] = [];
  categories: string[] = ['Tous', 'Énergie', 'Services'];
  selectedSecteur: string = 'Tous';
  loading: boolean = false;
  error: string | null = null;
  isFirstHalf = true;
  
  constructor(private translate: TranslateService) {}

  getCategoryLabel(cat: string): string {
    const map: { [key: string]: string } = {
      'Tous': 'PARTICIPATIONS.FILTERS.ALL',
      'Énergie': 'PARTICIPATIONS.FILTERS.ENERGY',
      'Services': 'PARTICIPATIONS.FILTERS.SERVICES'
    };
    return this.translate.instant(map[cat] || cat);
  }

  ngOnInit(): void {
    this.filterBySecteur('Tous');
  }

  filterBySecteur(secteur: string): void {
    this.selectedSecteur = secteur;
    if (secteur === 'Tous') {
      this.filteredEntreprises = [...this.entreprises];
    } else {
      this.filteredEntreprises = this.entreprises.filter(e => e.secteur === secteur);
    }
    if (this.slider) {
      this.slider.nativeElement.scrollLeft = 0;
    }
  }

  scrollPrev() {
    if (this.slider) {
      const el = this.slider.nativeElement;
      const scrollAmount = el.offsetWidth;

      if (el.scrollLeft <= 10) {
        el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  }

  scrollNext() {
    if (this.slider) {
      const el = this.slider.nativeElement;
      const scrollAmount = el.offsetWidth;
      const maxScroll = el.scrollWidth - el.offsetWidth;

      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  }

  onScroll() {
    if (this.slider) {
      const el = this.slider.nativeElement;
      const maxScroll = el.scrollWidth - el.offsetWidth;
      this.isFirstHalf = el.scrollLeft < maxScroll / 2;
    }
  }
}
