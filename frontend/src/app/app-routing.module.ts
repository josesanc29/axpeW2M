import { Routes, RouterModule } from '@angular/router';
import { FeaturesComponent } from './features/features.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';


const appRoutes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule)
  },
  { path: '**', component: PageNotFoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
