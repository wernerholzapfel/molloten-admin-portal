import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';
import {IAflevering} from './interface/IAflevering';


@Injectable()
export class AfleveringenService {

  api = environment.api;

  constructor(private authHttp: AuthHttp) {
  }

  getAfleveringen(): Observable<IAflevering[]> {
    return this.authHttp.get(`${this.api}/afleveringen`)
      .map(res => <IAflevering[]>res.json());
  }

  saveAflevering(aflevering: IAflevering): Observable<any> {
    return this.authHttp.post(`${this.api}/afleveringen`, aflevering);
  }

}


