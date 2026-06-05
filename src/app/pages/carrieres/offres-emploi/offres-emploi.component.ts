import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { TopbarComponent } from '../../../components/topbar/topbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';

interface JobOffer {
  id: number;
  title: string;
  location: string;
  contractType: string;
  description: string;
  deadline: string;
}

@Component({
  selector: 'app-offres-emploi',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, TopbarComponent, FooterComponent, TranslateModule],
  template: `
    <header class="fixed top-0 left-0 w-full z-[1000]">
      <app-topbar></app-topbar>
      <app-navbar></app-navbar>
    </header>

    <main class="pt-[80px] md:pt-[116px] min-h-screen bg-gray-50">
      <!-- Bannière d'en-tête -->
      <section class="bg-oseor-blue py-16 md:py-24 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-oseor-blue to-oseor-blue/80 z-0"></div>
        <div class="container mx-auto px-6 relative z-10">
          <div class="max-w-3xl" data-aos="fade-right">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-['Ubuntu']">
              {{ 'CAREERS_PAGE.OFFERS_TITLE' | translate }}
            </h1>
            <p class="text-lg md:text-xl text-white/90 leading-relaxed font-['Ubuntu'] font-light">
              {{ 'CAREERS_PAGE.OFFERS_SUBTITLE' | translate }}
            </p>
          </div>
        </div>
      </section>

      <div class="container mx-auto px-6 py-12">
        <div class="max-w-5xl mx-auto">
          
          <!-- Adresse email RH -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-12 text-center" data-aos="fade-up">
            <p class="text-gray-600 mb-2 font-['Ubuntu']">
              {{ 'CAREERS_PAGE.RH_EMAIL_TEXT' | translate }}
            </p>
            <a href="mailto:recrutement@oseor.tg" class="text-2xl md:text-3xl font-bold text-oseor-blue hover:text-oseor-red transition-colors font-['Ubuntu']">
              {{ 'CAREERS_PAGE.RH_EMAIL' | translate }}
            </a>
          </div>

          <!-- Liste des offres -->
          <div *ngIf="!selectedOfferId" class="space-y-6">
            <div *ngIf="offers.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
              <i class="fas fa-briefcase text-4xl text-gray-200 mb-4"></i>
              <p class="text-gray-500 font-['Ubuntu']">{{ 'CAREERS_PAGE.NO_OFFERS' | translate }}</p>
            </div>

            <div *ngFor="let offer of offers" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-md transition-shadow" data-aos="fade-up">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="space-y-4">
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-oseor-blue/10 text-oseor-blue text-xs font-bold rounded-full uppercase tracking-wider">{{ offer.contractType }}</span>
                    <span class="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wider">
                      <i class="fas fa-map-marker-alt mr-1"></i> {{ offer.location }}
                    </span>
                  </div>
                  <h2 class="text-2xl font-bold text-gray-900 font-['Ubuntu']">{{ offer.title }}</h2>
                  <p class="text-gray-600 font-['Ubuntu'] leading-relaxed">{{ offer.description }}</p>
                  <div class="text-sm text-oseor-red font-medium">
                    <i class="far fa-calendar-alt mr-2"></i> Date limite : {{ offer.deadline }}
                  </div>
                </div>
                <button (click)="selectOffer(offer)" class="whitespace-nowrap bg-oseor-blue text-white px-8 py-3 rounded-lg font-bold hover:bg-oseor-blue/90 transition shadow-sm uppercase tracking-wider text-sm">
                  {{ 'CAREERS_PAGE.POSTULER' | translate }}
                </button>
              </div>
            </div>
          </div>

          <!-- Formulaire de candidature -->
          <div *ngIf="selectedOfferId" class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden" data-aos="zoom-in">
            <div class="bg-gray-50 px-8 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 class="font-bold text-gray-900 font-['Ubuntu']">Postuler pour : {{ getSelectedOfferTitle() }}</h3>
              <button (click)="cancelSelection()" class="text-gray-400 hover:text-gray-600 transition-colors">
                <i class="fas fa-times text-xl"></i>
              </button>
            </div>

            <form [formGroup]="applyForm" (ngSubmit)="onSubmit()" class="p-8 space-y-6">
              <div *ngIf="isSubmitted" class="bg-green-50 border border-green-100 text-green-700 px-6 py-4 rounded-lg mb-6 flex items-center">
                <i class="fas fa-check-circle text-2xl mr-4"></i>
                <p class="font-medium">{{ 'CAREERS_PAGE.CONFIRMATION' | translate }}</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Nom Complet -->
                <div class="space-y-2">
                  <label class="text-sm font-bold text-gray-700 uppercase tracking-wider font-['Ubuntu']">
                    {{ 'CAREERS_PAGE.FORM.FULL_NAME' | translate }} <span class="text-oseor-red">*</span>
                  </label>
                  <input type="text" formControlName="fullName" 
                         class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-oseor-blue focus:ring-2 focus:ring-oseor-blue/20 outline-none transition-all"
                         [class.border-red-500]="applyForm.get('fullName')?.invalid && applyForm.get('fullName')?.touched">
                </div>

                <!-- Email -->
                <div class="space-y-2">
                  <label class="text-sm font-bold text-gray-700 uppercase tracking-wider font-['Ubuntu']">
                    {{ 'CAREERS_PAGE.FORM.EMAIL' | translate }} <span class="text-oseor-red">*</span>
                  </label>
                  <input type="email" formControlName="email" 
                         class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-oseor-blue focus:ring-2 focus:ring-oseor-blue/20 outline-none transition-all"
                         [class.border-red-500]="applyForm.get('email')?.invalid && applyForm.get('email')?.touched">
                </div>

                <!-- Téléphone -->
                <div class="space-y-2">
                  <label class="text-sm font-bold text-gray-700 uppercase tracking-wider font-['Ubuntu']">
                    {{ 'CAREERS_PAGE.FORM.PHONE' | translate }} <span class="text-oseor-red">*</span>
                  </label>
                  <input type="tel" formControlName="phone" 
                         class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-oseor-blue focus:ring-2 focus:ring-oseor-blue/20 outline-none transition-all"
                         [class.border-red-500]="applyForm.get('phone')?.invalid && applyForm.get('phone')?.touched">
                </div>
              </div>

              <!-- Documents -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <!-- CV -->
                <div class="space-y-3">
                  <label class="text-sm font-bold text-gray-700 uppercase tracking-wider font-['Ubuntu']">
                    {{ 'CAREERS_PAGE.FORM.CV' | translate }} <span class="text-oseor-red">*</span>
                  </label>
                  <div class="relative">
                    <input type="file" (change)="onFileSelected($event, 'cv')" accept=".pdf,.doc,.docx" class="hidden" #cvInput>
                    <button type="button" (click)="cvInput.click()" 
                            class="w-full px-4 py-3 rounded-lg border-2 border-dashed border-gray-200 hover:border-oseor-blue hover:bg-oseor-blue/5 transition-all text-left flex items-center justify-between group">
                      <span class="text-gray-500 group-hover:text-oseor-blue">{{ files['cv']?.name || ('CAREERS_PAGE.FORM.FILE_TYPE' | translate) }}</span>
                      <i class="fas fa-cloud-upload-alt text-gray-400 group-hover:text-oseor-blue"></i>
                    </button>
                  </div>
                </div>

                <!-- Lettre de motivation -->
                <div class="space-y-3">
                  <label class="text-sm font-bold text-gray-700 uppercase tracking-wider font-['Ubuntu']">
                    {{ 'CAREERS_PAGE.FORM.LM' | translate }} <span class="text-oseor-red">*</span>
                  </label>
                  <div class="relative">
                    <input type="file" (change)="onFileSelected($event, 'lm')" accept=".pdf,.doc,.docx" class="hidden" #lmInput>
                    <button type="button" (click)="lmInput.click()" 
                            class="w-full px-4 py-3 rounded-lg border-2 border-dashed border-gray-200 hover:border-oseor-blue hover:bg-oseor-blue/5 transition-all text-left flex items-center justify-between group">
                      <span class="text-gray-500 group-hover:text-oseor-blue">{{ files['lm']?.name || ('CAREERS_PAGE.FORM.FILE_TYPE' | translate) }}</span>
                      <i class="fas fa-cloud-upload-alt text-gray-400 group-hover:text-oseor-blue"></i>
                    </button>
                  </div>
                </div>

                <!-- Diplômes -->
                <div class="space-y-3 md:col-span-2">
                  <label class="text-sm font-bold text-gray-700 uppercase tracking-wider font-['Ubuntu']">
                    {{ 'CAREERS_PAGE.FORM.DOCS' | translate }}
                  </label>
                  <div class="relative">
                    <input type="file" (change)="onFileSelected($event, 'docs')" accept=".pdf,.doc,.docx" class="hidden" #docsInput>
                    <button type="button" (click)="docsInput.click()" 
                            class="w-full px-4 py-3 rounded-lg border-2 border-dashed border-gray-200 hover:border-oseor-blue hover:bg-oseor-blue/5 transition-all text-left flex items-center justify-between group">
                      <span class="text-gray-500 group-hover:text-oseor-blue">{{ files['docs']?.name || ('CAREERS_PAGE.FORM.FILE_TYPE' | translate) }}</span>
                      <i class="fas fa-cloud-upload-alt text-gray-400 group-hover:text-oseor-blue"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Conditions -->
              <div class="flex items-start space-x-3 pt-4">
                <input type="checkbox" formControlName="acceptTerms" id="terms" class="mt-1 w-4 h-4 rounded border-gray-300 text-oseor-blue focus:ring-oseor-blue">
                <label for="terms" class="text-sm text-gray-600 font-['Ubuntu']">
                  {{ 'CAREERS_PAGE.FORM.ACCEPT_TERMS' | translate }}
                </label>
              </div>

              <!-- Submit -->
              <div class="pt-6 border-t border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                <p class="text-xs text-gray-400">* Champs obligatoires</p>
                <button type="submit" [disabled]="applyForm.invalid || !files['cv'] || !files['lm'] || isSubmitting"
                        class="w-full md:w-auto bg-oseor-red text-white px-10 py-4 rounded-lg font-bold hover:bg-oseor-red/90 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg uppercase tracking-widest">
                  <i *ngIf="isSubmitting" class="fas fa-spinner animate-spin mr-2"></i>
                  {{ 'CAREERS_PAGE.APPLY_NOW' | translate }}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </main>

    <app-footer></app-footer>
  `,
  styles: [`
    :host { display: block; }
    .bg-oseor-blue { background-color: #0f4c81; }
    .text-oseor-blue { color: #0f4c81; }
    .bg-oseor-red { background-color: #ae151e; }
    .text-oseor-red { color: #ae151e; }
    .focus\\:border-oseor-blue:focus { border-color: #0f4c81; }
    .focus\\:ring-oseor-blue\\/20:focus { --tw-ring-color: rgba(15, 76, 129, 0.2); }
    .hover\\:bg-oseor-blue\\/5:hover { background-color: rgba(15, 76, 129, 0.05); }
    .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class OffresEmploiComponent {
  offers: JobOffer[] = [
    // Exemple d'offres (peuvent être récupérées via un service plus tard)
    {
      id: 1,
      title: 'Chargé d’Affaires Senior',
      location: 'Lomé, Togo',
      contractType: 'CDI',
      description: 'Nous recherchons un expert en ingénierie financière pour piloter la structuration de projets d’envergure.',
      deadline: '30/06/2026'
    },
    {
      id: 2,
      title: 'Analyste Financier',
      location: 'Lomé, Togo',
      contractType: 'CDI',
      description: 'Sous la direction du DAF, vous participerez à l’analyse de la performance des filiales du groupe.',
      deadline: '15/07/2026'
    }
  ];

  selectedOfferId: number | null = null;
  applyForm: FormGroup;
  files: { [key: string]: File | null } = { cv: null, lm: null, docs: null };
  isSubmitting = false;
  isSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.applyForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  selectOffer(offer: JobOffer) {
    this.selectedOfferId = offer.id;
    this.isSubmitted = false;
    window.scrollTo({ top: 400, behavior: 'smooth' });
  }

  getSelectedOfferTitle(): string {
    return this.offers.find(o => o.id === this.selectedOfferId)?.title || '';
  }

  cancelSelection() {
    this.selectedOfferId = null;
    this.applyForm.reset();
    this.files = { cv: null, lm: null, docs: null };
  }

  onFileSelected(event: any, type: string) {
    const file = event.target.files[0];
    if (file) {
      this.files[type] = file;
    }
  }

  onSubmit() {
    if (this.applyForm.valid && this.files['cv'] && this.files['lm']) {
      this.isSubmitting = true;
      
      // Simulation d'envoi
      setTimeout(() => {
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.applyForm.reset();
        this.files = { cv: null, lm: null, docs: null };
        
        // Cacher le message après 5 secondes et revenir à la liste
        setTimeout(() => {
          this.selectedOfferId = null;
        }, 5000);
      }, 1500);
    }
  }
}
