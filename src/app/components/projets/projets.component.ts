import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface ProjectDisplay {
  title: string;
  description: string;
  imageUrl: string;
}

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

        <!-- Slider Horizontal (Cartes style Maquette) -->
        <div class="relative group">
          <div #slider
               class="flex overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory scroll-smooth"
               [style.scrollBehavior]="'smooth'"
               (scroll)="onScroll()">
            <!-- Slides (2 sur desktop/tablet, 4 sur mobile) -->
            <div *ngFor="let slide of currentSlides; let i = index" 
                 class="flex flex-shrink-0 w-full gap-6 justify-center px-4 sm:px-0 snap-start">
              <div *ngFor="let item of slide" 
                   class="bg-white rounded-[18px] shadow-md hover:shadow-xl transition-all duration-300 flex-shrink-0 w-[90%] sm:w-[calc(50%-12px)] lg:w-[350px] overflow-hidden hover:-translate-y-[8px]">
                
                <!-- Image en haut (coins supérieurs arrondis) -->
                <div class="h-[230px] w-full overflow-hidden rounded-t-[18px]">
                  <img [src]="item.imageUrl" 
                       [alt]="item.title" 
                       class="w-full h-full object-cover">
                </div>
                
                <!-- Partie inférieure bleue -->
                <div class="p-5 flex flex-col items-center text-center bg-[#036eb1] h-[170px]">
                  <h3 class="text-white text-base font-bold font-['Ubuntu'] mb-2 uppercase leading-tight">
                    {{ item.title }}
                  </h3>
                  
                  <!-- Description courte -->
                  <p class="text-white text-sm font-['Ubuntu'] mb-4 leading-relaxed">
                    {{ item.description }}
                  </p>
                  
                  <!-- Bouton VOIR DÉTAILS -->
                  <button class="w-[80%] h-[45px] bg-[#ae151e] text-white font-bold font-['Ubuntu'] uppercase tracking-wide rounded-full hover:shadow-lg hover:-translate-y-[2px] transition-all duration-300 mt-auto">
                    VOIR DÉTAILS
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <button (click)="scrollPrev()" 
                  class="absolute -left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white text-[#036eb1] rounded-full shadow-lg flex items-center justify-center hover:bg-[#036eb1] hover:text-white transition-all duration-300 z-10 border border-gray-100 opacity-0 group-hover:opacity-100">
            <i class="fas fa-chevron-left text-xs"></i>
          </button>
          
          <button (click)="scrollNext()" 
                  class="absolute -right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white text-[#036eb1] rounded-full shadow-lg flex items-center justify-center hover:bg-[#036eb1] hover:text-white transition-all duration-300 z-10 border border-gray-100 opacity-0 group-hover:opacity-100">
            <i class="fas fa-chevron-right text-xs"></i>
          </button>
        </div>

        <!-- Carousel Dots -->
        <div class="flex justify-center space-x-2 mt-4">
          <span *ngFor="let dot of dots; let i = index"
                class="w-2 h-2 rounded-full transition-all duration-300"
                [ngClass]="currentSlideIndex === i ? 'bg-[#036eb1] w-4' : 'bg-gray-200'"></span>
        </div>
      </div>
    </section>
  `
})
export class ProjetsComponent implements OnInit, OnDestroy {
  @ViewChild('slider') slider!: ElementRef;
  
  currentSlideIndex = 0;

  // Projets spécifiques demandés
  projectDisplays: ProjectDisplay[] = [
    {
      title: 'ZENER SA',
      description: 'Mobilisation de 16 milliards FCFA pour développer les activités de distribution de gaz.',
      imageUrl: 'assets/images/zener-sa.png'
    },
    {
      title: 'Radisson Abidjan',
      description: 'Étude et mobilisation de ressources pour la construction d\'un hôtel 5 étoiles Radisson Blu.',
      imageUrl: 'assets/images/radisson-abidjan.png'
    },
    {
      title: 'Sheraton Bamako',
      description: 'Étude et mobilisation de ressources pour le financement de Sheraton Bamako.',
      imageUrl: 'assets/images/sheraton-bamako.png'
    },
    {
      title: 'Aéroport International Gnassingbé Eyadema',
      description: 'Contrôle des travaux du système hydrant de l\'Aéroport International.',
      imageUrl: 'assets/images/aeroport-gnassingbe-eyadema.png'
    }
  ];

  // Slides pour desktop/tablet (2 cartes par slide)
  desktopSlides: ProjectDisplay[][] = [];
  
  // Slides pour mobile (1 carte par slide)
  mobileSlides: ProjectDisplay[][] = [];
  
  // Slides actuels en fonction de la taille de l'écran
  currentSlides: ProjectDisplay[][] = [];
  
  // Points indicateurs du carousel
  dots: number[] = [];
  
  // Listener pour le resize
  private resizeListener!: (() => void);

  constructor(
    private translate: TranslateService
  ) {
    // Initialiser les slides
    this.desktopSlides = [
      [this.projectDisplays[0], this.projectDisplays[1]],
      [this.projectDisplays[2], this.projectDisplays[3]]
    ];
    
    this.mobileSlides = this.projectDisplays.map(p => [p]);
  }

  ngOnInit() {
    this.updateSlides();
    
    // Ajouter un listener pour le resize
    this.resizeListener = () => this.updateSlides();
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy() {
    // Retirer le listener
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  updateSlides() {
    // Vérifier si on est sur mobile (< 640px)
    const isMobile = window.innerWidth < 640;
    
    this.currentSlides = isMobile ? this.mobileSlides : this.desktopSlides;
    this.dots = Array(this.currentSlides.length).fill(0);
    this.currentSlideIndex = 0;
    
    // Réinitialiser la position du slider
    setTimeout(() => {
      if (this.slider) {
        this.slider.nativeElement.scrollLeft = 0;
      }
    }, 0);
  }

  scrollPrev() {
    if (this.slider) {
      const el = this.slider.nativeElement;
      const slideWidth = el.offsetWidth;

      if (el.scrollLeft <= 10) {
        // Passer au dernier slide
        el.scrollTo({ left: el.scrollWidth - slideWidth, behavior: 'smooth' });
      } else {
        // Revenir au slide précédent
        el.scrollBy({ left: -slideWidth, behavior: 'smooth' });
      }
    }
  }

  scrollNext() {
    if (this.slider) {
      const el = this.slider.nativeElement;
      const slideWidth = el.offsetWidth;
      const maxScroll = el.scrollWidth - slideWidth;

      if (el.scrollLeft >= maxScroll - 10) {
        // Revenir au premier slide
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Passer au slide suivant
        el.scrollBy({ left: slideWidth, behavior: 'smooth' });
      }
    }
  }

  onScroll() {
    if (this.slider) {
      const el = this.slider.nativeElement;
      const slideWidth = el.offsetWidth;
      // Calculer l'index du slide actuel
      this.currentSlideIndex = Math.round(el.scrollLeft / slideWidth);
    }
  }
}
