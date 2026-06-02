import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Expertise } from '../../models/admin.models';

@Component({
  selector: 'app-expertises',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expertises.component.html',
  styleUrls: ['./expertises.component.scss']
})
export class ExpertisesComponent implements OnInit {
  expertises: Expertise[] = [];
  isLoading = true;
  showModal = false;
  isEditing = false;
  expertiseForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  selectedId: number | null = null;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.expertiseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      icon: ['fas fa-lightbulb', Validators.required]
    });
  }

  ngOnInit() {
    this.loadExpertises();
  }

  loadExpertises() {
    this.isLoading = true;
    this.errorMessage = null;
    this.adminService.getExpertises().subscribe({
      next: (data) => {
        this.expertises = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message || "Erreur de chargement des expertises.";
        this.isLoading = false;
      }
    });
  }

  openModal(item?: Expertise) {
    this.showModal = true;
    if (item) {
      this.isEditing = true;
      this.selectedId = item.id!;
      this.expertiseForm.patchValue(item);
    } else {
      this.isEditing = false;
      this.selectedId = null;
      this.expertiseForm.reset({ icon: 'fas fa-lightbulb' });
    }
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    if (this.expertiseForm.valid) {
      const expertise = this.expertiseForm.value;
      if (this.isEditing) {
        this.adminService.updateExpertise(this.selectedId!, expertise).subscribe(() => {
          this.showMessage('Expertise mise à jour avec succès');
          this.loadExpertises();
          this.closeModal();
        });
      } else {
        this.adminService.createExpertise(expertise).subscribe(() => {
          this.showMessage('Expertise ajoutée avec succès');
          this.loadExpertises();
          this.closeModal();
        });
      }
    }
  }

  onDelete(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette expertise ?')) {
      this.adminService.deleteExpertise(id).subscribe(() => {
        this.showMessage('Expertise supprimée');
        this.loadExpertises();
      });
    }
  }

  private showMessage(msg: string) {
    this.successMessage = msg;
    setTimeout(() => this.successMessage = null, 3000);
  }
}
