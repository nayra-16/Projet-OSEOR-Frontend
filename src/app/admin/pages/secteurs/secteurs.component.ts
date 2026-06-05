import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Secteur } from '../../models/admin.models';

@Component({
  selector: 'app-admin-secteurs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6 animate-fade-in">
      <h1 class="text-2xl font-black text-gray-900 tracking-tight">Gestion des Secteurs</h1>
      <p class="text-gray-500 text-sm">Gérez les secteurs d'activité (Énergie, Services, etc.).</p>
    </div>
  `
})
export class SecteursComponent implements OnInit {
  secteurs: Secteur[] = [];
  constructor(private adminService: AdminService) {}
  ngOnInit(): void {
    this.adminService.getSecteurs().subscribe(data => this.secteurs = data);
  }
}
