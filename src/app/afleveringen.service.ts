import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Observable} from 'rxjs/Observable';


export interface AfleveringModel {
  id: string;
  aflevering: number;
  laatseAflevering: boolean;
  uitgezonden: boolean;
  deadlineDatetime: string;
}

@Injectable()
export class AfleveringenService {

  api = 'https://molapi.herokuapp.com/api/v1';

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


