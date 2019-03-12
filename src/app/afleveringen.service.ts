import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {IAflevering} from './interface/IAflevering';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class AfleveringenService {

  api = environment.api;

  constructor(private httpClient: HttpClient) {
  }

  getAfleveringen(): Observable<IAflevering[]> {
    return this.httpClient.get(`${this.api}/afleveringen`).pipe(
      map(res => <IAflevering[]>res));
  }

  saveAflevering(aflevering: IAflevering): Observable<any> {
    return this.httpClient.post(`${this.api}/afleveringen`, aflevering);
  }

}


