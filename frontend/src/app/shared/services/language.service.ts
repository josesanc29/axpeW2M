import { Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public currentLanguage: string;
  private langConfirmedSource = new Subject<string>();
  langConfirmed$ = this.langConfirmedSource.asObservable();
  // tslint:disable-next-line:typedef
  confirmLanguage(lang: string) {
    this.langConfirmedSource.next(lang);
    this.currentLanguage = lang;
  }
  // tslint:disable-next-line:typedef
  getCurrentLanguage() {
    return this.currentLanguage;
  }
}

