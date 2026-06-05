import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bon-plan',
  standalone: true,
  imports: [CommonModule, NavbarComponent, TopbarComponent, FooterComponent, TranslateModule],
  templateUrl: './bon-plan.component.html',
  styleUrls: ['./bon-plan.component.scss']
})
export class BonPlanComponent {
  constructor(public translate: TranslateService) {}

  /* ── Zencard modal ── */
  openZencard() {
    const modal = document.getElementById('zencard-modal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  closeZencard() {
    const modal = document.getElementById('zencard-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  /* ── Lightbox ── */
  openAffiche(src: string, titre: string) {
    const lbImg = document.getElementById('lb-img') as HTMLImageElement;
    const lbTitre = document.getElementById('lb-titre');
    const lbModal = document.getElementById('lb-modal');
    
    if (lbImg && lbTitre && lbModal) {
      lbImg.src = src;
      lbTitre.textContent = titre;
      lbModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  closeLb() {
    const lbModal = document.getElementById('lb-modal');
    if (lbModal) {
      lbModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  /* ── Filtre catégories ── */
  filterCat(cat: string, event: Event) {
    const btns = document.querySelectorAll('.cat-btn');
    btns.forEach(b => b.classList.remove('active'));
    (event.target as HTMLElement).classList.add('active');
    
    const items = document.querySelectorAll('.bp-item') as NodeListOf<HTMLElement>;
    items.forEach(el => {
      el.style.display = (cat === 'all' || el.dataset['cat'] === cat) ? 'block' : 'none';
    });
  }
}
