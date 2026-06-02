import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    // Force scroll to top on initial load and clear hash to prevent auto-scroll
    if (typeof window !== 'undefined') {
      // Clear hash immediately
      if (window.location.hash) {
        window.history.replaceState('', document.title, window.location.pathname + window.location.search);
      }
      
      // Force scroll to top
      window.scrollTo(0, 0);
      
      // Safety net: force scroll to top again after a short delay to override any late library-triggered scrolls
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }

    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out'
    });
  }
}
