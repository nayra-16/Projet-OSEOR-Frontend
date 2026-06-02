import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly LANG_KEY = 'oseor_lang';

  constructor(private translate: TranslateService) {
    this.initLanguage();
  }

  private initLanguage() {
    // 1. Check localStorage
    const savedLang = localStorage.getItem(this.LANG_KEY);
    
    // 2. Check browser language if no saved lang
    const browserLang = this.translate.getBrowserLang();
    const defaultLang = savedLang || (browserLang?.match(/en|fr/) ? browserLang : 'fr');

    this.translate.addLangs(['fr', 'en']);
    this.translate.setDefaultLang('fr');
    this.useLanguage(defaultLang);
  }

  public useLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem(this.LANG_KEY, lang);
  }

  public getCurrentLang(): string {
    return this.translate.currentLang || this.translate.defaultLang || 'fr';
  }
}
