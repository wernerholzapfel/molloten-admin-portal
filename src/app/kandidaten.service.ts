import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

export interface KandidaatModel {
  'id': string;
  'display_name': string;
  'image_url': string;
  'mol': boolean;
  'winner': boolean;
  'aflevering': number;
}

@Injectable()
export class KandidatenService {

  api = 'https://molapi.herokuapp.com/api/v1';

  constructor(private authHttp: AuthHttp) {
  }

  getKandidaten(): Observable<KandidaatModel[]> {
    return this.authHttp.get(`${this.api}/kandidaten`)
      .map(res => <KandidaatModel[]>res.json());
  }

  saveKandidaat(kandidaat: KandidaatModel): Observable<KandidaatModel> {
    return this.authHttp.post(`${this.api}/kandidaten`, kandidaat)
      .map(res => <KandidaatModel>res.json());
  }

}
