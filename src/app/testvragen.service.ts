import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IKandidaat} from './interface/IKandidaat';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';

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
  'is_niet_meer_mogelijk_sinds'?: number;
}

@Injectable()
export class TestvragenService {
  api = environment.api;

  constructor(private httpClient: HttpClient) {
  }

  getTestvragen(afleveringId): Observable<TestvraagModel[]> {
    return this.httpClient.get(`${this.api}/quizvragen/aflevering/${afleveringId}`).pipe(
      map(res => <TestvraagModel[]>res));
  }


  saveTestvraag(testVraag: TestvraagModel): Observable<TestvraagModel> {
    return this.httpClient.post(`${this.api}/quizvragen`, testVraag).pipe(
      map(res => <TestvraagModel>res));
  }

  updateTestvraag(testVraag: TestvraagModel): Observable<TestvraagModel> {
    return this.httpClient.post(`${this.api}/quizvragen/update`, testVraag).pipe(
      map(res => <TestvraagModel>res));
  }

  updatevraag(testVraag: TestvraagModel): Observable<TestvraagModel> {
    return this.httpClient.post(`${this.api}/quizvragen/updatevraag`, testVraag).pipe(
      map(res => <TestvraagModel>res));
  }

  updateAntwoorden(antwoorden: AntwoordModel[]): Observable<TestvraagModel> {
    return this.httpClient.post(`${this.api}/quizvragen/updateantwoorden`, antwoorden).pipe(
      map(res => <TestvraagModel>res));
  }


}
