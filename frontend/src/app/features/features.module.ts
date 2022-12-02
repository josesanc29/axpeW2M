import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeaturesRoutingModule } from './features-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ListHeroesComponent } from './heroes/components/list-heroes/list-heroes.component';
import { DetailHeroesComponent } from './heroes/components/detail-heroes/detail-heroes.component';
import { environment } from 'src/environments/environment';
import { } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../material.module';
import { ToUpperCaseTxtDirective } from '../directives/touppercasetxt.directive';
import { FileUploadDirective } from '../directives/appfileupload.directive';
import { SanitizeDirective } from '../directives/filesanitize.directive';

@NgModule({
  declarations: [
    ListHeroesComponent,
    DetailHeroesComponent,
    ToUpperCaseTxtDirective,
    SanitizeDirective,
    FileUploadDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    FeaturesRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    SharedModule,
    TranslateModule.forChild({
        isolate: true,
        extend: true,
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        }
      }),
    MaterialModule
  ],
  providers: []
})
export class FeaturesModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  const pathroot = environment.production ? './assets/i18n/prod' : './assets/i18n/dev';
  return new TranslateHttpLoader(http, pathroot, '.json');
}
