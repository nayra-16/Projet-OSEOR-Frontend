import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Stat } from '../../models/oseor.models';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section #statsSection class="py-16 bg-white relative overflow-hidden">
      <div class="container mx-auto px-6 relative z-10">
        <!-- Loader -->
        <div *ngIf="isLoading" class="flex justify-center py-6">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-oseor-blue"></div>
        </div>

        <!-- Error Message -->
        <div *ngIf="error" class="text-center py-6 text-[#ae151e]">
          {{ 'COMMON.ERROR' | translate }}
        </div>

        <div *ngIf="!isLoading && !error" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-0">
          <div *ngFor="let stat of stats; let last = last" 
               class="p-8 text-center group relative flex flex-col items-center justify-center transition-all duration-300 hover:bg-gray-50/50 rounded-2xl" 
               data-aos="fade-up">
            <!-- Icon with background -->
            <div class="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100 group-hover:bg-oseor-blue group-hover:text-white transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-sm">
              <i [class]="stat.icon" class="text-3xl text-gray-700 group-hover:text-white transition-colors"></i>
            </div>
            
            <!-- Value with counter animation -->
            <div class="flex items-baseline mb-2">
              <span class="text-4xl md:text-5xl font-black text-gray-900 font-['Ubuntu'] tabular-nums tracking-tighter">+{{ stat.currentValue || 0 }}</span>
            </div>
            
            <!-- Label with decorative line -->
            <div class="relative pt-4 px-4">
              <div class="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-oseor-red group-hover:w-16 transition-all duration-500 rounded-full"></div>
              <p class="text-xs font-black uppercase tracking-[0.15em] text-oseor-blue font-['Ubuntu']">
                {{ getStatLabel(stat) }}
              </p>
            </div>
            
            <!-- Vertical divider for desktop -->
            <div *ngIf="!last" class="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class StatsComponent implements OnInit, AfterViewInit, OnDestroy {
  stats: any[] = [];
  isLoading = true;
  error: string | null = null;
  
  @ViewChild('statsSection') statsSection!: ElementRef;
  private observer: IntersectionObserver | null = null;
  private hasAnimated = false;
  private isVisible = false;

  constructor(
    private apiService: ApiService,
    private translate: TranslateService
  ) {}

  getStatLabel(stat: any): string {
    const labelMap: { [key: string]: string } = {
      'entreprises': 'STATS.ENTREPRISES',
      'projets': 'STATS.PROJETS',
      'secteurs': 'STATS.SECTEURS',
      'missions': 'STATS.MISSIONS'
    };

    for (const [key, translationKey] of Object.entries(labelMap)) {
      if (stat.label.toLowerCase().includes(key)) {
        return this.translate.instant(translationKey);
      }
    }
    return stat.label;
  }

  ngOnInit() {
    this.apiService.getStats().subscribe({
      next: (data) => {
        // Enforce strict uniqueness and filter for ONLY the 4 required stats
        // This prevents duplicates if the DB has multiple entries
        const requiredKeys = ['entreprises', 'projets', 'secteurs', 'missions'];
        const uniqueMap = new Map();
        
        data.forEach(item => {
          const label = item.label.toLowerCase();
          requiredKeys.forEach(key => {
            if (label.includes(key) && !uniqueMap.has(key)) {
              uniqueMap.set(key, item);
            }
          });
        });

        // Reconstruct stats array in the exact order requested: Entreprises, Projets, Secteurs, Missions
        this.stats = requiredKeys
          .map(key => uniqueMap.get(key))
          .filter(item => !!item)
          .map(s => {
            return {
              ...s,
              targetValue: parseInt(s.value.replace(/\D/g, '')),
              currentValue: 0
            };
          });

        this.isLoading = false;
        this.tryStartAnimation();
      },
      error: (err) => {
        this.error = err.message || "Erreur de chargement des statistiques.";
        this.isLoading = false;
      }
    });
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          this.tryStartAnimation();
        }
      });
    }, options);

    if (this.statsSection) {
      this.observer.observe(this.statsSection.nativeElement);
    }
  }

  tryStartAnimation() {
    if (this.isVisible && !this.hasAnimated && this.stats.length > 0) {
      this.startAnimations();
      this.hasAnimated = true;
      if (this.statsSection) {
        this.observer?.unobserve(this.statsSection.nativeElement);
      }
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  startAnimations() {
    this.stats.forEach(stat => {
      this.animateCount(stat);
    });
  }

  animateCount(stat: any) {
    const duration = 3500; // Animation plus lente (3.5 secondes)
    const startTime = performance.now();
    const startValue = 1; // Commence à 1 comme demandé
    const endValue = stat.targetValue;

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Utilisation d'un assouplissement plus linéaire (easeOutQuad) 
      // pour que l'animation paraisse plus lente et constante
      const easeOutQuad = (t: number): number => t * (2 - t);
      
      const easedProgress = easeOutQuad(progress);
      stat.currentValue = Math.floor(startValue + easedProgress * (endValue - startValue));

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        stat.currentValue = endValue;
      }
    };

    requestAnimationFrame(update);
  }
}
