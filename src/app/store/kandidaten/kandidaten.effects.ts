import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import {
  FETCH_KANDIDATEN_IN_PROGRESS,
  FetchKandidatenFailure,
  FetchKandidatenInProgress,
  FetchKandidatenSuccess,
  UPDATE_KANDIDAAT_IN_PROGRESS,
  UpdateKandidaatFailure,
  UpdateKandidaatInProgress,
  UpdateKandidaatSuccess
} from './kandidaten.actions';
import {IKandidaat} from '../../interface/IKandidaat';
import {KandidatenService} from '../../kandidaten.service';
import {AddAlert} from '../alerts/alerts.actions';

@Injectable()
export class KandidatenEffects {

  @Effect()
  fetchKandidatenInProgress$ = this.actions$
    .ofType<FetchKandidatenInProgress>(FETCH_KANDIDATEN_IN_PROGRESS)
    .switchMap(action => {
      return this.kandidatenService
        .getKandidaten()
        .switchMap(response =>
          Observable.of(new FetchKandidatenSuccess(response))
        )
        .catch(err =>
          Observable.from([
            new FetchKandidatenFailure(err)
          ]));
    });

  @Effect()
  updateKandidaatInProgress$ = this.actions$
    .ofType<UpdateKandidaatInProgress>(UPDATE_KANDIDAAT_IN_PROGRESS)
    .map(action => action.payload)
    .switchMap((kandidaat: IKandidaat) => {
      return this.kandidatenService
        .saveKandidaat(kandidaat)
        .switchMap(response =>
          Observable.of(new UpdateKandidaatSuccess(kandidaat))
        )
        .catch(err =>
          Observable.from([
            new UpdateKandidaatFailure(),
            new AddAlert({type: 'danger', message: 'Het updaten van de kandidaat is mislukt.', err: err})
          ]));
    });

  constructor(private actions$: Actions,
              private kandidatenService: KandidatenService) {
  }
}
