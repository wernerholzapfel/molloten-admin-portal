import { Injectable } from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Observable} from 'rxjs/Observable';
import {KandidaatModel} from './kandidaten.service';

export interface TestvraagModel {
  id?: number;
  vraag?: string;
  aflevering?: number;
  antwoorden?: AntwoordModel[];
  molloot?: string;
}

export interface AntwoordModel {
  'id'?: number;
  'antwoord': string;
  'kandidaten': KandidaatModel[];
}

@Injectable()
export class TestvragenService {
  api = 'https://molapi.herokuapp.com/api/v1';
  // api = 'http://localhost:3000/api/v1';

  constructor(private authHttp: AuthHttp) {
  }

  getTestvragen(afleveringId): Observable<TestvraagModel[]> {
    return this.authHttp.get(`${this.api}/quizvragen/aflevering/${afleveringId}`)
      .map(res => <TestvraagModel[]>res.json());
  }


  saveTestvraag(testVraag: TestvraagModel): Observable<TestvraagModel> {
    return this.authHttp.post(`${this.api}/quizvragen`, testVraag)
      .map(res => <TestvraagModel>res.json());
  }

}
