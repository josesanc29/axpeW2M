import {Directive, HostBinding, Input} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[sanitizeImg]'
})
export class SanitizeDirective {
  @Input() sanitizeImg: string;
  constructor(private sanitizer: DomSanitizer) {}
  @HostBinding('img')
  get innerHtml(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.sanitizeImg);
  }
}
