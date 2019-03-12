import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  ADD_TESTVRAAG_IN_PROGRESS,
  AddTestVraagInProgress,
  AddTestVraagSuccess,
  FETCH_TESTVRAGEN_IN_PROGRESS,
  FetchTestvragenFailure,
  FetchTestvragenInProgress,
  FetchTestvragenSuccess,
  UPDATE_TESTVRAAG_IN_PROGRESS,
  UpdateTestVraagInProgress,
  UpdateTestVraagSuccess
} from './testvragen.actions';
import {TestvragenService} from '../../testvragen.service';
import {from} from 'rxjs';
import {AddAlert} from '../alerts/alerts.actions';
import {catchError, map, switchMap} from 'rxjs/operators';

@Injectable()
export class TestvragenEffects {

  @Effect()
  fetchTestvragenInProgress$ = this.actions$
    .pipe(
      ofType<FetchTestvragenInProgress>(FETCH_TESTVRAGEN_IN_PROGRESS),
      map(action => action.payload),
      switchMap(aflevering => {
        return this.testvragenService
          .getTestvragen(aflevering)
          .pipe(
            switchMap(response =>
              from([
                new FetchTestvragenSuccess(response),
              ])),
            catchError(err =>
              from([
                new FetchTestvragenFailure(err),
                new AddAlert({type: 'danger', message: 'Ophalen van vragen is mislukt', err: err})
              ])));
      }));


  @Effect()
  addTestVraagInProgress$ = this.actions$
    .pipe(
      ofType<AddTestVraagInProgress>(ADD_TESTVRAAG_IN_PROGRESS),
      map(action => action.payload),
      switchMap(testvraag => {
        return this.testvragenService.saveTestvraag(testvraag)
          .pipe(
            switchMap(response =>
              from([
                new AddTestVraagSuccess(response),
              ])),
            catchError(err =>
              from([
                new AddAlert({type: 'danger', message: 'Opslaan van testvraag is mislukt', err: err})
              ])));
      }));

  @Effect()
  updateTestVraagInProgress$ = this.actions$
    .pipe(
      ofType<UpdateTestVraagInProgress>(UPDATE_TESTVRAAG_IN_PROGRESS),
  map(action => action.payload),
      switchMap(testvraag => {
        return this.testvragenService.updateTestvraag(testvraag)
          .pipe(
            switchMap(() =>
              from([
                new UpdateTestVraagSuccess(testvraag),
              ])),
            catchError(err =>
              from([
                new AddAlert({type: 'danger', message: 'Updaten van testvraag is mislukt', err: err})
              ])));
      }));

  constructor(private actions$: Actions,
              private testvragenService: TestvragenService) {
  }
}
