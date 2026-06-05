import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { Candidature } from '../../models/admin.models';

@Component({
  selector: 'app-admin-candidatures',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6 animate-fade-in">
      <h1 class="text-2xl font-black text-gray-900 tracking-tight">Gestion des Candidatures</h1>
      <p class="text-gray-500 text-sm">Consultez les CV et lettres de motivation reçus.</p>
    </div>
  `
})
export class CandidaturesComponent implements OnInit {
  candidatures: Candidature[] = [];
  constructor(private adminService: AdminService) {}
  ngOnInit(): void {
    this.adminService.getCandidatures().subscribe(data => this.candidatures = data);
  }
}
