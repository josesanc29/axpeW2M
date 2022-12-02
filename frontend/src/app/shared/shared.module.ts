import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './components/home/components/home/home.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeadComponent } from './components/head/head.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { VerImagenDialogComponent } from './components/ver-imagen-dialog/ver-imagen-dialog.component';
import { FeaturesRoutingModule } from '../features/features-routing.module';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    HeadComponent,
    HomeComponent,
    VerImagenDialogComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    TranslateModule.forRoot({
      isolate: true,
      extend: true,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }
    }),
    FeaturesRoutingModule
  ],
  exports: [
    NgbModule,
    FontAwesomeModule,
    HeadComponent,
    VerImagenDialogComponent,
    HomeComponent
  ],
  providers: []
})
export class SharedModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  const pathroot = environment.production ? './assets/i18n/prod' : './assets/i18n/dev';
  return new TranslateHttpLoader(http, pathroot, '.json');
}
