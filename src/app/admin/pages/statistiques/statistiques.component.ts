import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Statistique } from '../../models/admin.models';

@Component({
  selector: 'app-admin-statistiques',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6 animate-fade-in">
      <h1 class="text-2xl font-black text-gray-900 tracking-tight">Gestion des Statistiques</h1>
      <p class="text-gray-500 text-sm">Gérez les chiffres clés affichés sur le site.</p>
      <!-- ... Reste du template ... -->
    </div>
  `
})
export class StatistiquesComponent implements OnInit {
  stats: Statistique[] = [];
  constructor(private adminService: AdminService) {}
  ngOnInit(): void {
    this.adminService.getStatistiques().subscribe(data => this.stats = data);
  }
}
