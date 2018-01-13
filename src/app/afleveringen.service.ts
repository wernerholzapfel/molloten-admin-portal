import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';


export interface AfleveringModel {
  id: string;
  aflevering: number;
  laatseAflevering: boolean;
  uitgezonden: boolean;
  hasTest?: boolean;
  hasVoorspelling?: boolean;
  deadlineDatetime: string;

}


@Injectable()
export class AfleveringenService {

  api = environment.api;

  constructor(private authHttp: AuthHttp) {
  }

  getAfleveringen(): Observable<AfleveringModel[]> {
    return this.authHttp.get(`${this.api}/afleveringen`)
      .map(res => <AfleveringModel[]>res.json());
  }

  saveAflevering(aflevering: AfleveringModel): Observable<AfleveringModel> {
    return this.authHttp.post(`${this.api}/afleveringen`, aflevering)
      .map(res => <AfleveringModel>res.json());
  }

}


