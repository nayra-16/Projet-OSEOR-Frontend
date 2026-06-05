import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { AppelOffre } from '../../models/admin.models';

@Component({
  selector: 'app-admin-appels-offres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6 animate-fade-in">
      <h1 class="text-2xl font-black text-gray-900 tracking-tight">Gestion des Appels d'Offres</h1>
      <p class="text-gray-500 text-sm">Gérez les appels d'offres publics.</p>
    </div>
  `
})
export class AppelsOffresComponent implements OnInit {
  appels: AppelOffre[] = [];
  constructor(private adminService: AdminService) {}
  ngOnInit(): void {
    this.adminService.getAppelsOffres().subscribe(data => this.appels = data);
  }
}
