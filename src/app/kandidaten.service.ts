import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';
import {IKandidaat} from './interface/IKandidaat';

@Injectable()
export class KandidatenService {

  api = environment.api;

  constructor(private authHttp: AuthHttp) {
  }

  getKandidaten(): Observable<IKandidaat[]> {
    return this.authHttp.get(`${this.api}/kandidaten`)
      .map(res => <IKandidaat[]>res.json());
  }

  saveKandidaat(kandidaat: IKandidaat): Observable<IKandidaat> {
    return this.authHttp.post(`${this.api}/kandidaten`, kandidaat)
      .map(res => <IKandidaat>res.json());
  }

}
