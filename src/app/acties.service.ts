import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';
import {IActies} from './interface/IActies';

@Injectable()
export class ActiesService {

  api = environment.api;

  constructor(private authHttp: AuthHttp) {
  }

  getActies(): Observable<IActies> {
    return this.authHttp.get(`${this.api}/acties`)
      .map(res => <IActies>res.json());
  }

  saveActies(actie: IActies): Observable<IActies> {
    return this.authHttp.post(`${this.api}/acties`, actie)
      .map(res => <IActies>res.json());
  }

}
