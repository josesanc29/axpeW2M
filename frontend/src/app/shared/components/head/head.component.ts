import { Component, OnInit } from '@angular/core';
import { IdiomaHelper } from './../../models/idiomas.model';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  today = moment(new Date()).format('DD/MM/yyyy hh:mm');

  constructor() {
    }

  ngOnInit(): void {
  }

}
