import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Projet } from '../../models/oseor.models';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-projets',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="py-16 bg-white" id="projets">
      <div class="container mx-auto px-4 max-w-[1100px]">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-['Ubuntu']">
            {{ 'PROJETS.TITLE' | translate }}
          </h2>
          <p class="text-gray-600 text-[11px] md:text-sm font-['Ubuntu'] whitespace-nowrap text-center leading-none">
            {{ 'PROJETS.DESCRIPTION' | translate }}
          </p>
        </div>

        <!-- Loader -->
        <div *ngIf="isLoading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-oseor-blue"></div>
        </div>

        <!-- Error Message -->
        <div *ngIf="error" class="text-center py-12 text-[#ae151e] font-['Ubuntu']">
          {{ error }}
        </div>

        <!-- Slider Horizontal (Cartes style Maquette) -->
        <div class="relative group" *ngIf="!isLoading && !error">
          <div #slider
               class="flex overflow-x-auto gap-4 md:gap-6 pb-8 no-scrollbar snap-x snap-mandatory scroll-smooth justify-center"
               (scroll)="onScroll()">
            <div *ngFor="let item of projets" 
                 class="bg-white rounded-[10px] shadow-sm hover:shadow-md transition-all duration-300 flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[260px] snap-center overflow-hidden border border-gray-50">
              
              <!-- Image Claire (Haut) -->
              <div class="h-[160px] w-full overflow-hidden">
                <img [src]="getImagePath(item.title)" 
                     [alt]="item.title" 
                     class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
              </div>
              
              <!-- Contenu & Bouton (Bas) -->
              <div class="p-5 text-center flex flex-col items-center">
                <h3 class="text-[15px] font-bold text-gray-900 font-['Ubuntu'] mb-4 line-clamp-1">
                  {{ getProjectTitle(item.title) }}
                </h3>
                <button class="w-full bg-oseor-blue text-white py-2.5 rounded-[6px] text-[12px] font-bold uppercase tracking-widest hover:bg-oseor-blue/90 transition-all font-['Ubuntu']">
                  {{ 'COMMON.SEE_DETAILS' | translate }}
                </button>
              </div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <button (click)="scrollPrev()" 
                  class="absolute -left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white text-oseor-blue rounded-full shadow-lg flex items-center justify-center hover:bg-oseor-blue hover:text-white transition-all duration-300 z-10 border border-gray-100 opacity-0 group-hover:opacity-100">
            <i class="fas fa-chevron-left text-xs"></i>
          </button>
          
          <button (click)="scrollNext()" 
                  class="absolute -right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white text-oseor-blue rounded-full shadow-lg flex items-center justify-center hover:bg-oseor-blue hover:text-white transition-all duration-300 z-10 border border-gray-100 opacity-0 group-hover:opacity-100">
            <i class="fas fa-chevron-right text-xs"></i>
          </button>
        </div>

        <!-- Carousel Dots (2 points) -->
        <div *ngIf="!isLoading && !error" class="flex justify-center space-x-2 mt-4">
          <span class="w-2 h-2 rounded-full transition-all duration-300"
                [ngClass]="isFirstHalf ? 'bg-oseor-blue w-4' : 'bg-gray-200'"></span>
          <span class="w-2 h-2 rounded-full transition-all duration-300"
                [ngClass]="!isFirstHalf ? 'bg-oseor-blue w-4' : 'bg-gray-200'"></span>
        </div>
      </div>
    </section>
  `
})
export class ProjetsComponent implements OnInit {
  @ViewChild('slider') slider!: ElementRef;
  
  projets: Projet[] = [];
  isLoading = true;
  error: string | null = null;
  isFirstHalf = true;

  constructor(
    private apiService: ApiService,
    private translate: TranslateService
  ) {}

  getProjectTitle(title: string): string {
    const titleMap: { [key: string]: string } = {
      'Centrale Solaire Blitta': 'PROJETS.P1_TITLE',
      'Complexe Industriel Kara': 'PROJETS.P2_TITLE',
      'Pont de l\'Émergence': 'PROJETS.P3_TITLE'
    };
    return this.translate.instant(titleMap[title] || title);
  }

  getImagePath(title: string): string {
    const images: { [key: string]: string } = {
      'Centrale Solaire Blitta': 'assets/images/projet-1.jpg',
      'Complexe Industriel Kara': 'assets/images/projet-2.jpg',
      'Pont de l\'Émergence': 'assets/images/projet-3.jpg'
    };
    return images[title] || 'assets/images/default-logo.png';
  }

  ngOnInit() {
    this.apiService.getProjets().subscribe({
      next: (data) => {
        this.projets = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message || "Erreur de chargement des projets.";
        this.isLoading = false;
      }
    });
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
