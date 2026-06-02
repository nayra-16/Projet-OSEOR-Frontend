import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Projet } from '../../models/admin.models';

@Component({
  selector: 'app-projets',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.scss']
})
export class ProjetsComponent implements OnInit {
  projets: Projet[] = [];
  isLoading = true;
  showModal = false;
  isEditing = false;
  projetForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  selectedId: number | null = null;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.projetForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['assets/images/hero-business.jpg', Validators.required],
      category: ['Énergie', Validators.required]
    });
  }

  ngOnInit() {
    this.loadProjets();
  }

  loadProjets() {
    this.isLoading = true;
    this.errorMessage = null;
    this.adminService.getProjets().subscribe({
      next: (data) => {
        this.projets = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message || "Erreur de chargement des projets.";
        this.isLoading = false;
      }
    });
  }

  openModal(item?: Projet) {
    this.showModal = true;
    if (item) {
      this.isEditing = true;
      this.selectedId = item.id!;
      this.projetForm.patchValue(item);
    } else {
      this.isEditing = false;
      this.selectedId = null;
      this.projetForm.reset({ image: 'assets/images/hero-business.jpg', category: 'Énergie' });
    }
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    if (this.projetForm.valid) {
      const projet = this.projetForm.value;
      if (this.isEditing) {
        this.adminService.updateProjet(this.selectedId!, projet).subscribe(() => {
          this.showMessage('Projet mis à jour avec succès');
          this.loadProjets();
          this.closeModal();
        });
      } else {
        this.adminService.createProjet(projet).subscribe(() => {
          this.showMessage('Projet ajouté avec succès');
          this.loadProjets();
          this.closeModal();
        });
      }
    }
  }

  onDelete(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.adminService.deleteProjet(id).subscribe(() => {
        this.showMessage('Projet supprimé');
        this.loadProjets();
      });
    }
  }

  private showMessage(msg: string) {
    this.successMessage = msg;
    setTimeout(() => this.successMessage = null, 3000);
  }
}
