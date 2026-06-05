import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-utilisateurs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6 animate-fade-in">
      <h1 class="text-2xl font-black text-gray-900 tracking-tight">Gestion des Utilisateurs</h1>
      <p class="text-gray-500 text-sm">Gérez les comptes administrateurs.</p>
    </div>
  `
})
export class UtilisateursComponent implements OnInit {
  constructor(private adminService: AdminService) {}
  ngOnInit(): void {}
}
