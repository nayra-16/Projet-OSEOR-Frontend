import { Component } from '@angular/core';

@Component({
  selector: 'app-bandeau-rouge',
  standalone: true,
  template: `
    <div class="bg-oseor-red py-4">
      <div class="container mx-auto px-6 text-center">
        <p class="text-white text-sm md:text-base font-normal leading-relaxed" data-aos="zoom-in">
          OSEOR est une holding spécialisée en investissement et en ingénierie financière. <br class="hidden md:block">
          Nous accompagnons les PME et start-up à fort potentiel dans la structuration, le financement et le développement de leurs activités.
        </p>
      </div>
    </div>
  `
})
export class BandeauRougeComponent {}
