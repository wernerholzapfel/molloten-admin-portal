import { Injectable } from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Observable} from 'rxjs/Observable';
import {IKandidaat} from './interface/IKandidaat';
import {environment} from '../environments/environment';

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
  'kandidaten': IKandidaat[];
}

@Injectable()
export class TestvragenService {
  api = environment.api;

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

  updateTestvraag(testVraag: TestvraagModel): Observable<TestvraagModel> {
    return this.authHttp.post(`${this.api}/quizvragen/update`, testVraag)
      .map(res => <TestvraagModel>res.json());
  }

  updatevraag(testVraag: TestvraagModel): Observable<TestvraagModel> {
    return this.authHttp.post(`${this.api}/quizvragen/updatevraag`, testVraag)
      .map(res => <TestvraagModel>res.json());
  }

  updateAntwoorden(antwoorden: AntwoordModel[]): Observable<TestvraagModel> {
    return this.authHttp.post(`${this.api}/quizvragen/updateantwoorden`, antwoorden)
      .map(res => <TestvraagModel>res.json());
  }


}
