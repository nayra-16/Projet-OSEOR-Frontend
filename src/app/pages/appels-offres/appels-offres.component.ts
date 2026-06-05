import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-appels-offres',
  standalone: true,
  imports: [CommonModule, TopbarComponent, NavbarComponent, FooterComponent, TranslateModule],
  template: `
    <header class="fixed top-0 left-0 w-full z-[1000]">
      <app-topbar></app-topbar>
      <app-navbar></app-navbar>
    </header>

    <main class="pt-[80px] md:pt-[116px] min-h-screen bg-gray-50">
      <div class="container mx-auto px-6 py-12">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-['Ubuntu']">
            {{ 'NAVBAR.TENDERS' | translate }}
          </h1>
          
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <div class="w-20 h-20 bg-oseor-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-file-contract text-3xl text-oseor-blue"></i>
            </div>
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Aucun appel d'offre en cours</h2>
            <p class="text-gray-600 max-w-md mx-auto">
              Il n'y a actuellement aucun appel d'offre ouvert. Veuillez revenir plus tard ou nous contacter pour plus d'informations.
            </p>
          </div>
        </div>
      </div>
    </main>

    <app-footer></app-footer>
  `,
  styles: []
})
export class AppelsOffresComponent {}
