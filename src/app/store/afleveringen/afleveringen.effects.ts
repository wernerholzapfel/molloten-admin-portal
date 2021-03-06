import {from as observableFrom, of as observableOf} from 'rxjs';

import {catchError, map, switchMap} from 'rxjs/operators';


import {
  FETCH_AFLEVERINGEN_IN_PROGRESS,
  FetchAfleveringenFailure,
  FetchAfleveringenInProgress,
  FetchAfleveringenSuccess,
  UPDATE_AFLEVERING_IN_PROGRESS,
  UpdateAfleveringFailure,
  UpdateAfleveringInProgress,
  UpdateAfleveringSuccess
} from './afleveringen.actions';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AfleveringenService} from '../../afleveringen.service';
import {Injectable} from '@angular/core';
import {IAflevering} from '../../interface/IAflevering';
import {AddAlert} from '../alerts/alerts.actions';

@Injectable()
export class AfleveringenEffects {

  @Effect()
  fetchAfleveringenInProgress$ = this.actions$
    .pipe(ofType<FetchAfleveringenInProgress>(FETCH_AFLEVERINGEN_IN_PROGRESS),
      switchMap(action => {
        return this.afleveringenService
          .getAfleveringen().pipe(
            switchMap(response =>
              observableOf(new FetchAfleveringenSuccess(response))
            ),
            catchError(err =>
              observableFrom([
                new FetchAfleveringenFailure(err)
              ])));
      }));

  @Effect()
  updateAfleveringInProgress$ = this.actions$
    .pipe(ofType<UpdateAfleveringInProgress>(UPDATE_AFLEVERING_IN_PROGRESS),
      map(action => action.payload),
      switchMap((aflevering: IAflevering) => {
        return this.afleveringenService
          .saveAflevering(aflevering).pipe(
            switchMap(() =>
              observableFrom([
                new UpdateAfleveringSuccess(aflevering),
                new AddAlert({type: 'success', message: 'Opslaan van aflevering gelukt', err: undefined})
              ])),
            catchError(err =>
              observableFrom([
                new UpdateAfleveringFailure(),
                new AddAlert({type: 'danger', message: 'Het updaten van de aflevering is mislukt.', err: err})
              ])));
      }));

  constructor(private actions$: Actions,
              private afleveringenService: AfleveringenService) {
  }
}
