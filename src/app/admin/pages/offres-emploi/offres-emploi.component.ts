import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { OffreEmploi } from '../../models/admin.models';

@Component({
  selector: 'app-admin-offres-emploi',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6 animate-fade-in">
      <h1 class="text-2xl font-black text-gray-900 tracking-tight">Gestion des Offres d'Emploi</h1>
      <p class="text-gray-500 text-sm">Gérez les opportunités de carrière.</p>
    </div>
  `
})
export class OffresEmploiComponent implements OnInit {
  offres: OffreEmploi[] = [];
  constructor(private adminService: AdminService) {}
  ngOnInit(): void {
    this.adminService.getOffres().subscribe(data => this.offres = data);
  }
}
