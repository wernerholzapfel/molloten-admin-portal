import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {
  ADD_TESTVRAAG_IN_PROGRESS,
  AddTestVraagInProgress,
  AddTestVraagSuccess, DELETE_TESTVRAAG_IN_PROGRESS, DeleteTestVraagInProgress,
  FETCH_TESTVRAGEN_IN_PROGRESS,
  FetchTestvragenFailure,
  FetchTestvragenInProgress,
  FetchTestvragenSuccess, UPDATE_TESTVRAAG_IN_PROGRESS, UpdateTestVraagInProgress, UpdateTestVraagSuccess
} from './testvragen.actions';
import {TestvragenService} from '../../testvragen.service';
import {Observable} from 'rxjs/Observable';
import {AddAlert} from '../alerts/alerts.actions';

@Injectable()
export class TestvragenEffects {

  @Effect()
  fetchTestvragenInProgress$ = this.actions$
    .ofType<FetchTestvragenInProgress>(FETCH_TESTVRAGEN_IN_PROGRESS)
    .map(action => action.payload)
    .switchMap(aflevering => {
      return this.testvragenService
        .getTestvragen(aflevering)
        .switchMap(response =>
          Observable.from([
            new FetchTestvragenSuccess(response),
          ]))
        .catch(err =>
          Observable.from([
            new FetchTestvragenFailure(err),
            new AddAlert({type: 'danger', message: 'Ophalen van vragen is mislukt', err: err})
          ]));
    });


  @Effect()
  addTestVraagInProgress$ = this.actions$
    .ofType<AddTestVraagInProgress>(ADD_TESTVRAAG_IN_PROGRESS)
    .map(action => action.payload)
    .switchMap(testvraag => {
      return this.testvragenService.saveTestvraag(testvraag)
        .switchMap(response =>
          Observable.from([
            new AddTestVraagSuccess(response),
          ]))
        .catch(err =>
          Observable.from([
            new AddAlert({type: 'danger', message: 'Opslaan van testvraag is mislukt', err: err})
          ]));
    });

  @Effect()
  updateTestVraagInProgress$ = this.actions$
    .ofType<UpdateTestVraagInProgress>(UPDATE_TESTVRAAG_IN_PROGRESS)
    .map(action => action.payload)
    .switchMap(testvraag => {
      return this.testvragenService.updateTestvraag(testvraag)
        .switchMap(() =>
          Observable.from([
            new UpdateTestVraagSuccess(testvraag),
          ]))
        .catch(err =>
          Observable.from([
            new AddAlert({type: 'danger', message: 'Updaten van testvraag is mislukt', err: err})
          ]));
    });

  constructor(private actions$: Actions,
              private testvragenService: TestvragenService) {
  }
}
