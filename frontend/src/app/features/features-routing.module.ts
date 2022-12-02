import { HomeComponent } from './../shared/components/home/components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailHeroesComponent } from './heroes/components/detail-heroes/detail-heroes.component';
import { ListHeroesComponent } from './heroes/components/list-heroes/list-heroes.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { titulo: 'Inicio' }
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'list-heroes',
    component: ListHeroesComponent,
    data: { titulo: 'Tabla de Superheroes' }
  },
  {
    path: 'heroe',
    component: DetailHeroesComponent,
    data: { titulo: 'Nuevo Superheroe' }
  },
  {
    path: 'heroe/:id',
    component: DetailHeroesComponent,
    data: { titulo: 'Detalle del superheroe' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
