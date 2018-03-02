import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {
  FETCH_ACTIES_IN_PROGRESS,
  FetchActiesFailure,
  FetchActiesInProgress,
  FetchActiesSuccess,
  UPDATE_ACTIES_IN_PROGRESS,
  UpdateActiesFailure,
  UpdateActiesInProgress,
  UpdateActiesSuccess
} from './acties.actions';
import {Observable} from 'rxjs/Observable';
import {AddAlert} from '../alerts/alerts.actions';
import {ActiesService} from '../../acties.service';

@Injectable()
export class ActiesEffects {

  @Effect()
  fetchActiesInProgress$ = this.actions$
    .ofType<FetchActiesInProgress>(FETCH_ACTIES_IN_PROGRESS)
    .switchMap(() => {
      return this.actiesService
        .getActies()
        .switchMap(response =>
          Observable.of(new FetchActiesSuccess(response))
        )
        .catch(err =>
          Observable.from([
            new FetchActiesFailure(err),
            new AddAlert({type: 'danger', message: 'Het updaten van de acties is mislukt.', err: err})
          ]));
    });

  @Effect()
  updateActiesInProgress$ = this.actions$
    .ofType<UpdateActiesInProgress>(UPDATE_ACTIES_IN_PROGRESS)
    .map(action => action.payload)
    .switchMap(acties => {
      return this.actiesService
        .saveActies(acties)
        .switchMap(() =>
          Observable.from([
            new UpdateActiesSuccess(acties),
            new AddAlert({type: 'success', message: 'Opslaan van acties gelukt', err: undefined})
          ]))
        .catch(err =>
          Observable.from([
            new UpdateActiesFailure(err),
            new AddAlert({type: 'danger', message: 'Het updaten van de acties is mislukt.', err: err})
          ]));
    });

  constructor(private actions$: Actions,
              private actiesService: ActiesService) {
  }
}
