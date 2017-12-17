import { Injectable } from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Observable} from 'rxjs/Observable';

export interface TestvraagModel {
  uid?: number;
  aflevering?: number;
  id?: number;
  vraag?: string;
  aantalOpenVragen?: number;
  antwoord?: AntwoordModel[];
  molloot?: string;
}

export interface AntwoordModel {
  'id': number;
  'antwoord': string;
  'mollen': [string];
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

  // saveKandidaat(kandidaat: TestvraagModel): Observable<TestvraagModel> {
  //   return this.authHttp.post(`${this.api}/kandidaten`, kandidaat)
  //     .map(res => <TestvraagModel>res.json());
  // }

}
