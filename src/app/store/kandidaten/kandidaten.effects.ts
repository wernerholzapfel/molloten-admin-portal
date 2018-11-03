import {from as observableFrom, of as observableOf} from 'rxjs';

import {catchError, map, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';


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
    .ofType<FetchKandidatenInProgress>(FETCH_KANDIDATEN_IN_PROGRESS).pipe(
    switchMap(action => {
      return this.kandidatenService
        .getKandidaten().pipe(
        switchMap(response =>
          observableOf(new FetchKandidatenSuccess(response))
        ),
        catchError(err =>
          observableFrom([
            new FetchKandidatenFailure(err)
          ])));
    }));

  @Effect()
  updateKandidaatInProgress$ = this.actions$
    .ofType<UpdateKandidaatInProgress>(UPDATE_KANDIDAAT_IN_PROGRESS)
    .pipe(map(action => action.payload),
    switchMap((kandidaat: IKandidaat) => {
      return this.kandidatenService
        .saveKandidaat(kandidaat).pipe(
        switchMap(response =>
          observableOf(new UpdateKandidaatSuccess(kandidaat))
        ),
        catchError(err =>
          observableFrom([
            new UpdateKandidaatFailure(),
            new AddAlert({type: 'danger', message: 'Het updaten van de kandidaat is mislukt.', err: err})
          ])));
    }));

  constructor(private actions$: Actions,
              private kandidatenService: KandidatenService) {
  }
}
