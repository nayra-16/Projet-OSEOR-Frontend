import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Service } from '../../models/oseor.models';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-expertises',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="relative py-12 md:py-16 bg-[#036eb1]">
      <!-- Badge rouge rectangulaire centré (Totalement visible) -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 z-20">
        <div class="bg-[#ae151e] text-white px-7 py-2 shadow-md">
          <h2 class="text-xl md:text-2xl font-bold text-center font-['Ubuntu'] whitespace-nowrap leading-none">
            {{ 'EXPERTISES.TITLE' | translate }}
          </h2>
        </div>
      </div>

      <div class="container mx-auto px-4 max-w-[1100px] relative z-10">
        <!-- Loader -->
        <div *ngIf="isLoading" class="flex justify-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>

        <!-- Error Message -->
        <div *ngIf="error" class="text-center py-8 text-white font-medium text-sm">
          {{ error }}
        </div>

        <!-- Une seule rangée de 4 Cartes (Identique à la maquette) -->
        <div *ngIf="!isLoading && !error" 
             class="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:items-stretch justify-center gap-[20px] mt-4">
          <div *ngFor="let item of expertises; let i = index" 
               class="bg-white rounded-[10px] shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col w-full lg:w-[240px] flex-shrink-0" 
               data-aos="fade-up" [attr.data-aos-delay]="i * 100">
            
            <!-- Image (object-fit: cover) -->
            <div class="h-[140px] w-full overflow-hidden">
              <img [src]="getImagePath(item.title)" 
                   [alt]="item.title" 
                   class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
            </div>

            <!-- Bandeau blanc avec titre en bas -->
            <div class="bg-white py-4 px-2 text-center border-t border-gray-50">
              <h3 class="text-[14px] font-bold text-gray-900 font-['Ubuntu'] leading-tight">
                {{ getExpertiseTitle(item.title) }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ExpertisesComponent implements OnInit {
  expertises: Service[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private apiService: ApiService,
    private translate: TranslateService
  ) {}

  getExpertiseTitle(title: string): string {
    const titleMap: { [key: string]: string } = {
      'Investissements Stratégiques': 'EXPERTISES.STRATEGIC',
      'Ingénierie financière': 'EXPERTISES.FINANCIAL',
      'Gouvernance & Performance': 'EXPERTISES.GOVERNANCE',
      'Digitalisation & Influence': 'EXPERTISES.DIGITAL'
    };
    return this.translate.instant(titleMap[title] || title);
  }

  getImagePath(title: string): string {
    const images: { [key: string]: string } = {
      'Investissements Stratégiques': 'assets/images/investissement.jpg',
      'Ingénierie financière': 'assets/images/ingenierie.jpg',
      'Gouvernance & Performance': 'assets/images/conseil.jpg',
      'Digitalisation & Influence': 'assets/images/assistance.jpg'
    };
    return images[title] || 'assets/images/default-logo.png';
  }

  ngOnInit() {
    this.apiService.getServices().subscribe({
      next: (data) => {
        const titleMapping: { [key: string]: string } = {
          'Investissement en capital': 'Investissements Stratégiques',
          'Conseil stratégique': 'Gouvernance & Performance',
          'Assistance technique': 'Digitalisation & Influence'
        };

        // EXACTEMENT 4 cartes, ni plus ni moins
        this.expertises = data.slice(0, 4).map(service => ({
          ...service,
          title: titleMapping[service.title] || service.title
        }));
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message || "Erreur de chargement des expertises.";
        this.isLoading = false;
      }
    });
  }
}
