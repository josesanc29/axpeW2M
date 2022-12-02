import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-imagen-dialog',
  templateUrl: './ver-imagen-dialog.component.html',
  styleUrls: ['./ver-imagen-dialog.component.scss']
})
export class VerImagenDialogComponent{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {imagen: string} ) { }

 verImagen(): void {
   console.log(this.data);
 }
}
