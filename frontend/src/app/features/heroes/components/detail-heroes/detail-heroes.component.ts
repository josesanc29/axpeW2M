import { FiltroHeroes } from './../../interfaces/filtros-heroes.model';
import { Superheroes } from './../../interfaces/superheroes.interface';
import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable, of, Subscription } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';
import swal from 'sweetalert';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { VerImagenDialogComponent } from 'src/app/shared/components/ver-imagen-dialog/ver-imagen-dialog.component';

@Component({
  selector: 'app-detail-heroes',
  templateUrl: './detail-heroes.component.html',
  styleUrls: ['./detail-heroes.component.css'],
})
export class DetailHeroesComponent implements OnInit, OnDestroy {
  paramsSubscription: Subscription;
  editMode: boolean;
  titulo: any;
  formulario: FormGroup;
  formularioSubscription: Subscription;
  datosDocumento$: Observable<Superheroes>;
  insertando = false;
  disabled = false;
  idDocumento: FiltroHeroes;
  filtroService: string;
  imagen: any;
  newImagePath = './../../../../../assets/images';
  emptyImage = './../../../../../assets/images/alert7.png';

  get f(): { [key: string]: AbstractControl } {
    return this.formulario.controls;
    }

  constructor(
              public dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              public translate: TranslateService,
              private heroeService: HeroesService
              ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      id: [null],
      file: [null],
      imagen: [''],
      superhero: [''],
      publisher: [''],
      alter_ego: [''],
      first_appearance: [''],
      characters: [''],
    });

    this.paramsSubscription = this.route.params.subscribe(params => {
      this.editMode = !!params.id;
      this.insertando = !this.editMode;
      this.getDatos(params.id);
    });

    this.formularioSubscription = this.heroeService.currentFilter$.subscribe((filtro: any) => {
      this.filtroService = filtro;
    });

    this.translate
      .get(this.editMode ? 'Detalle del Heroe' : 'Nuevo Superheroe')
      .subscribe((res: string) => {
        this.titulo = res;
      });

  }

  ngOnDestroy(): void {
    if (this.formularioSubscription) { this.formularioSubscription.unsubscribe(); }
    if (this.paramsSubscription) { this.paramsSubscription.unsubscribe(); }
  }

  getDatos = (id: number) => {
    this.datosDocumento$ = (id) ? this.heroeService.getHeroeId(+id) : of(id);
    forkJoin({
      datosDocumento: this.datosDocumento$
    }).pipe().subscribe( (datos: any) => {
      if ( datos.datosDocumento) {
        this.idDocumento = datos.datosDocumento.id;
        this.populateData(datos.datosDocumento);
      }
    });
  }

  backList(): void{
    this.router.navigate(['./list-heroes']);
  }

  onFileChange(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.setPathImage(file);
    }
  }

  setPathImage(file: File): void {
    const pathImage = `${this.newImagePath}/${file.name}`;
    this.formulario.controls.imagen.setValue(pathImage);
    this.dialog.open(VerImagenDialogComponent, {data: {imagen: pathImage}});
  }

  populateData( datos: any ): void {
    if ( datos ) {
      this.formulario.controls.id.setValue(datos.id);
      this.formulario.controls.imagen.setValue(datos.imagen);
      this.formulario.controls.superhero.setValue(datos.superhero);
      this.formulario.controls.publisher.setValue(datos.publisher);
      this.formulario.controls.alter_ego.setValue(datos.alter_ego);
      this.formulario.controls.first_appearance.setValue(datos.first_appearance);
      this.formulario.controls.characters.setValue(datos.characters);
    }
  }

  submit(): void {
    if (this.formulario.invalid) {
      return;
    }
    if ( !this.editMode ) {
      const documento = this.formModel;
      this.heroeService.create(documento).subscribe( result => {
        if (result) {
          swal({title: 'EL HEROE HA SIDO CREADO'});
          this.router.navigate(['./list-heroes']);
        }
      });
    } else {
      const documento = this.formModel;
      this.heroeService.modify(documento).subscribe( result => {
        if (result) {
          swal({title: 'EL HEROE HA SIDO MODIFICADO'});
          this.router.navigate(['./list-heroes']);
        }
      });
    }
  }

  load(file: File): void {
    this.formulario.patchValue({
      fileSource: file
    });
    return null;
  }

  private get formModel(): any {
    return {
      id: this.f.id.value,
      imagen: this.f.imagen.value === '' ? this.emptyImage : this.f.imagen.value,
      superhero: this.f.superhero.value,
      publisher: this.f.publisher.value,
      alter_ego: this.f.alter_ego.value,
      first_appearance: this.f.first_appearance.value,
      characters: this.f.characters.value,
    };
  }
}
