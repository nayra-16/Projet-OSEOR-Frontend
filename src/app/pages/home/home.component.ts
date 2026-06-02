import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { BandeauRougeComponent } from '../../components/bandeau-rouge/bandeau-rouge.component';
import { StatsComponent } from '../../components/stats/stats.component';
import { ExpertisesComponent } from '../../components/expertises/expertises.component';
import { SecteursComponent } from '../../components/secteurs/secteurs.component';
import { EntreprisesComponent } from '../../components/entreprises/entreprises.component';
import { ProjetsComponent } from '../../components/projets/projets.component';
import { PourquoiComponent } from '../../components/pourquoi/pourquoi.component';
import { CTAComponent } from '../../components/cta/cta.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TopbarComponent,
    NavbarComponent,
    HeroComponent,
    BandeauRougeComponent,
    StatsComponent,
    ExpertisesComponent,
    SecteursComponent,
    EntreprisesComponent,
    ProjetsComponent,
    PourquoiComponent,
    CTAComponent,
    FooterComponent
  ],
  template: `
    <header class="fixed top-0 left-0 w-full z-[1000]">
      <app-topbar></app-topbar>
      <app-navbar></app-navbar>
    </header>
    <main class="pt-[80px] md:pt-[116px]">
      <app-hero></app-hero>
      <app-bandeau-rouge></app-bandeau-rouge>
      <app-stats></app-stats>
      <app-expertises></app-expertises>
      <app-secteurs></app-secteurs>
      <app-entreprises></app-entreprises>
      <app-projets></app-projets>
      <app-pourquoi></app-pourquoi>
      <app-cta></app-cta>
    </main>
    <app-footer></app-footer>
  `,
  styles: []
})
export class HomeComponent {}
