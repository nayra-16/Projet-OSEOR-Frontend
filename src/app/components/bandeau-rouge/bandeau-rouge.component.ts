import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-bandeau-rouge',
  standalone: true,
  imports: [TranslateModule],
  template: `
    <div class="bg-oseor-red py-4">
      <div class="container mx-auto px-6 text-center">
        <p class="text-white text-sm md:text-base font-normal leading-relaxed" data-aos="zoom-in">
          {{ 'BANDEAU.TEXT' | translate }}
        </p>
      </div>
    </div>
  `
})
export class BandeauRougeComponent {}
