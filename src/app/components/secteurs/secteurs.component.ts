import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Secteur } from '../../models/oseor.models';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-secteurs',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  template: `
    <section class="py-12 md:py-16 bg-white" id="secteurs">
      <div class="container mx-auto px-4 max-w-[1100px]">
        <div class="text-center mb-10">
          <!-- Badge bleu corporate centré -->
          <div class="inline-block bg-[#036eb1] text-white px-8 py-2.5 shadow-md mb-6">
            <h2 class="text-xl md:text-2xl font-bold font-['Ubuntu'] whitespace-nowrap">
              {{ 'SECTEURS.TITLE' | translate }}
            </h2>
          </div>
          <!-- Description centrée sur une seule ligne -->
          <p class="text-gray-700 text-[11px] md:text-sm font-['Ubuntu'] whitespace-nowrap text-center mb-10 leading-none">
            {{ 'SECTEURS.DESCRIPTION' | translate }}
          </p>
        </div>

        <!-- Loader -->
        <div *ngIf="isLoading" class="flex justify-center py-10">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#036eb1]"></div>
        </div>

        <!-- Error Message -->
        <div *ngIf="error" class="text-center py-10 text-[#ae151e] font-['Ubuntu'] text-sm">
          {{ 'COMMON.ERROR' | translate }}
        </div>

        <!-- Grille des Secteurs (EXACTEMENT 3 cartes sur une ligne) -->
        <div *ngIf="!isLoading && !error" 
             class="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row justify-center gap-4 md:gap-6">
          <div *ngFor="let item of secteurs" 
               (click)="navigateToSecteur(item.name)"
               class="relative group overflow-hidden rounded-[4px] aspect-square cursor-pointer shadow-sm w-full lg:w-[260px] flex-shrink-0 mx-auto">
            
            <!-- Image de fond -->
            <img [src]="getImagePath(item.name)" 
                 [alt]="item.name" 
                 class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
            
            <!-- Overlay violet/bleu (Design maquette) -->
            <div class="absolute inset-0 bg-[#036eb1]/60 mix-blend-multiply group-hover:bg-[#036eb1]/40 transition-colors duration-500"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-[#6b21a8]/40 to-transparent opacity-60"></div>
            
            <!-- Label Blanc en bas -->
            <div class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white px-6 py-3 shadow-xl min-w-[85%] text-center rounded-[2px]">
              <h3 class="text-gray-900 text-[13px] font-black uppercase tracking-wider font-['Ubuntu']">
                {{ getSecteurName(item) }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class SecteursComponent implements OnInit {
  secteurs: Secteur[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private translate: TranslateService
  ) {}

  getSecteurName(item: Secteur): string {
    const nameMap: { [key: string]: string } = {
      'Énergie': 'SECTEURS.ENERGIE',
      'Industrie': 'SECTEURS.INDUSTRIE',
      'Services': 'SECTEURS.SERVICES'
    };
    return this.translate.instant(nameMap[item.name] || item.name);
  }

  getImagePath(name: string): string {
    const images: { [key: string]: string } = {
      'Énergie': 'assets/images/energie.jpg',
      'Industrie': 'assets/images/industrie.jpg',
      'Services': 'assets/images/services.jpg'
    };
    return images[name] || 'assets/images/default-logo.png';
  }

  navigateToSecteur(name: string) {
    const slug = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    this.router.navigate([`/secteurs/${slug}`]);
  }

  ngOnInit() {
    this.apiService.getSecteurs().subscribe({
      next: (data) => {
        // STRICTEMENT 3 secteurs dans cet ordre exact
        const order = ['Énergie', 'Industrie', 'Services'];
        this.secteurs = order
          .map(name => data.find(s => s.name === name))
          .filter((s): s is Secteur => !!s);
        
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message || "Erreur lors du chargement des secteurs.";
        this.isLoading = false;
      }
    });
  }
}
