import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, TopbarComponent, FooterComponent],
  template: `
    <header class="fixed top-0 left-0 w-full z-[1000]">
      <app-topbar></app-topbar>
      <app-navbar></app-navbar>
    </header>

    <main class="pt-[80px] md:pt-[116px] min-h-screen bg-gray-50">
      <section class="bg-oseor-blue py-16 md:py-24 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-oseor-blue to-oseor-blue/80 z-0"></div>
        <div class="container mx-auto px-6 relative z-10">
          <div class="max-w-3xl" data-aos="fade-right">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-['Ubuntu']">
              Contactez-nous
            </h1>
            <p class="text-lg md:text-xl text-white/90 leading-relaxed font-['Ubuntu'] font-light">
              Envoyez-nous un message
            </p>
          </div>
        </div>
      </section>

      <div class="container mx-auto px-6 py-12">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden" data-aos="fade-up">
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="p-8 space-y-6">
              <div *ngIf="isSubmitted" class="bg-green-50 border border-green-100 text-green-700 px-6 py-4 rounded-lg flex items-center">
                <i class="fas fa-check-circle text-2xl mr-4"></i>
                <p class="font-medium">Votre message a été envoyé avec succès.</p>
              </div>

              <div *ngIf="submitError" class="bg-red-50 border border-red-100 text-red-700 px-6 py-4 rounded-lg flex items-center">
                <i class="fas fa-exclamation-circle text-2xl mr-4"></i>
                <p class="font-medium">Une erreur est survenue. Veuillez réessayer.</p>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-bold text-gray-700 uppercase tracking-wider font-['Ubuntu']">
                  Nom complet <span class="text-oseor-red">*</span>
                </label>
                <input type="text" formControlName="name"
                       class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-oseor-blue focus:ring-2 focus:ring-oseor-blue/20 outline-none transition-all"
                       [class.border-red-500]="contactForm.get('name')?.invalid && contactForm.get('name')?.touched">
              </div>

              <div class="space-y-2">
                <label class="text-sm font-bold text-gray-700 uppercase tracking-wider font-['Ubuntu']">
                  Adresse e-mail <span class="text-oseor-red">*</span>
                </label>
                <input type="email" formControlName="email"
                       class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-oseor-blue focus:ring-2 focus:ring-oseor-blue/20 outline-none transition-all"
                       [class.border-red-500]="contactForm.get('email')?.invalid && contactForm.get('email')?.touched">
              </div>

              <div class="space-y-2">
                <label class="text-sm font-bold text-gray-700 uppercase tracking-wider font-['Ubuntu']">
                  Objet <span class="text-oseor-red">*</span>
                </label>
                <input type="text" formControlName="subject"
                       class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-oseor-blue focus:ring-2 focus:ring-oseor-blue/20 outline-none transition-all"
                       [class.border-red-500]="contactForm.get('subject')?.invalid && contactForm.get('subject')?.touched">
              </div>

              <div class="space-y-2">
                <label class="text-sm font-bold text-gray-700 uppercase tracking-wider font-['Ubuntu']">
                  Message <span class="text-oseor-red">*</span>
                </label>
                <textarea formControlName="message" rows="6"
                          class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-oseor-blue focus:ring-2 focus:ring-oseor-blue/20 outline-none transition-all resize-none"
                          [class.border-red-500]="contactForm.get('message')?.invalid && contactForm.get('message')?.touched"></textarea>
              </div>

              <div class="pt-6 border-t border-gray-100 flex justify-end">
                <button type="submit" [disabled]="contactForm.invalid || isSubmitting"
                        class="w-full md:w-auto bg-oseor-red text-white px-10 py-4 rounded-lg font-bold hover:bg-oseor-red/90 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg uppercase tracking-widest">
                  <i *ngIf="isSubmitting" class="fas fa-spinner animate-spin mr-2"></i>
                  Envoyer le message
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
  `]
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  isSubmitted = false;
  submitError = false;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitError = false;

    this.apiService.sendContact(this.contactForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.contactForm.reset();
        window.scrollTo({ top: 400, behavior: 'smooth' });
      },
      error: () => {
        this.isSubmitting = false;
        this.submitError = true;
      }
    });
  }
}
