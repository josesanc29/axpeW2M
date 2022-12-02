import { ChangeDetectorRef } from '@angular/core';
import { Superheroes } from '../../interfaces/superheroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import * as moment from 'moment';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-heroes',
  templateUrl: './list-heroes.component.html',
  styleUrls: ['./list-heroes.component.css']
})
export class ListHeroesComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource){
      this.dataSource.paginator = value;
    }
  }
  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    if (this.dataSource){
      this.dataSource.sort = value;
    }
  }
  today = moment().format('DD/MM/yyyy');
  superheroes: Superheroes[] = [];
  dataSource = new MatTableDataSource<Superheroes>([]) ;
  emptyImage = './../../../../../assets/images/alert7.png';
  loading = false;
  typeSelected: string;
  txtfiltro = '';
  heroesFiltered = [];
  displayedColumns: string[] = ['imagen', 'superhero', 'publisher', 'alter_ego', 'first_appearance', 'characters', 'botones'];

  constructor(
              private heroesService: HeroesService,
              public translate: TranslateService,
              private spinner: NgxSpinnerService,
              private router: Router,
              ) {
                this.typeSelected = 'ball-fussion';
              }

  ngOnInit(): void {
    this.getAllHeroes();
  }

  getAllHeroes(): void{
    this.spinner.show();
    this.heroesService.getListHeroes().subscribe((listHeroes: Superheroes[]) => {
      this.spinner.hide();
      this.dataSource = new MatTableDataSource (listHeroes);
      this.superheroes = listHeroes;
    });
  }

  selectHero(heroe: Superheroes): void{
    this.heroesService.filter = heroe;
    this.router.navigate(['heroe/', heroe.id]);
  }

  deleteHero(heroe: Superheroes): void {
              swal({
                title: `Estas seguro que quieres eliminar el superheroe ${heroe.superhero}?`,
                text: 'Una vez eliminado sera completamente irrecuperable este item, asegurese antes de eliminar.',
                icon: 'warning',
                buttons: {
                  cancel: true,
                  ok: true
                },
                dangerMode: true,
              }).then((willDelete) => {
                if (willDelete) {
                  this.confirmDeleteHero(heroe);
                } else {
                  swal('Hemos cancelado la petición eliminar');
                }
              });
  }

  confirmDeleteHero(heroe: Superheroes): void{
    this.heroesService.deleteHero(heroe.id).subscribe(() => {
      swal({title: 'EL HEROE HA SIDO ELIMINADO'});
      this.getAllHeroes();
    });
  }

  add(): void {
    this.router.navigate(['heroe']);
  }

  filterData(event: Event): void {
    this.txtfiltro = (event.target as HTMLInputElement).value;
    if (this.txtfiltro.length >= 3) {
      this.dataSource.filter = this.txtfiltro.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    } else {
      this.dataSource.filter = this.txtfiltro.trim().toLowerCase();
      this.dataSource.paginator.firstPage();
    }
  }

}
