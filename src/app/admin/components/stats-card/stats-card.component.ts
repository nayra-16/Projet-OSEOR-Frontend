import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div class="flex items-center justify-between mb-4">
        <div [class]="color + ' w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform duration-300'">
          <i [class]="icon + ' text-xl'"></i>
        </div>
        <div *ngIf="!loading" class="text-[10px] font-black bg-gray-50 text-gray-500 px-3 py-1 rounded-full uppercase tracking-widest">
          Temps réel
        </div>
      </div>
      
      <div class="space-y-1">
        <h3 class="text-xs font-black text-gray-400 uppercase tracking-[0.2em] font-['Ubuntu']">
          {{ title }}
        </h3>
        <div *ngIf="loading" class="h-10 w-24 bg-gray-100 animate-pulse rounded-lg mt-2"></div>
        <p *ngIf="!loading" class="text-4xl font-black text-gray-900 font-['Ubuntu'] tracking-tight">
          {{ value }}
        </p>
      </div>
    </div>
  `
})
export class StatsCardComponent {
  @Input() title: string = '';
  @Input() value: number | string = 0;
  @Input() icon: string = '';
  @Input() color: string = 'bg-[#036eb1]';
  @Input() loading: boolean = false;
}
