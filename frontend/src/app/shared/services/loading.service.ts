import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

  constructor(private spinner: NgxSpinnerService) { }

  simulate(seconds: number): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, seconds * 1000);
  }
}
