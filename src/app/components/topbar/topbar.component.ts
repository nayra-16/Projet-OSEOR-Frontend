import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="bg-oseor-blue text-white py-2 px-6 text-xs hidden md:block border-b border-white/10">
      <div class="container mx-auto flex justify-between items-center">
        <!-- Gauche : Contact & Email -->
        <div class="flex items-center space-x-6">
          <span class="flex items-center">
            <i class="fas fa-phone-alt mr-2 text-[10px] text-oseor-red"></i> 
            <span class="font-semibold mr-1">{{ 'TOPBAR.CONTACT' | translate }} :</span> 22518969 / +228 93170101
          </span>
          <span class="flex items-center">
            <i class="fas fa-envelope mr-2 text-[10px] text-oseor-red"></i> 
            <span class="font-semibold mr-1">{{ 'TOPBAR.EMAIL' | translate }} :</span> 
            <a href="mailto:Info&#64;oseor.tg" target="_blank" class="hover:text-oseor-red transition-colors">
              Info&#64;oseor.tg
            </a>
          </span>
        </div>
        
        <!-- Droite : Localisation -->
        <div class="flex items-center">
          <span class="flex items-center">
            <i class="fas fa-map-marker-alt mr-2 text-[10px] text-oseor-red"></i> 
            <span class="font-semibold mr-1">{{ 'TOPBAR.LOCATION' | translate }} :</span> {{ 'TOPBAR.ADDRESS' | translate }}
          </span>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class TopbarComponent {}
