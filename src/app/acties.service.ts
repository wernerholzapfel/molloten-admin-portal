import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';

export interface ActiesModel {
  id?: number;
  voorspellingaflevering?: number;
  testaflevering?: number;
  testDeadlineDatetime?: string;
  voorspellingDeadlineDatetime?: string;
}

@Injectable()
export class ActiesService {

  api = environment.api;

  constructor(private authHttp: AuthHttp) {
  }

  getActies(): Observable<ActiesModel> {
    return this.authHttp.get(`${this.api}/acties`)
      .map(res => <ActiesModel>res.json());
  }

  saveActies(actie: ActiesModel): Observable<ActiesModel> {
    return this.authHttp.post(`${this.api}/acties`, actie)
      .map(res => <ActiesModel>res.json());
  }

}
