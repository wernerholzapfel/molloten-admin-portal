import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {IKandidaat} from './interface/IKandidaat';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class KandidatenService {

  api = environment.api;

  constructor(private httpClient: HttpClient) {
  }

  getKandidaten(): Observable<IKandidaat[]> {
    return this.httpClient.get(`${this.api}/kandidaten`).pipe(
      map(res => <IKandidaat[]>res));
  }

  saveKandidaat(kandidaat: IKandidaat): Observable<IKandidaat> {
    return this.httpClient.post(`${this.api}/kandidaten`, kandidaat).pipe(
      map(res => <IKandidaat>res));
  }

}
