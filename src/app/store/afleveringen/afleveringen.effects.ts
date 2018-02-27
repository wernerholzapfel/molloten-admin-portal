import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import {
  FETCH_AFLEVERINGEN_IN_PROGRESS, FetchAfleveringenFailure, FetchAfleveringenInProgress, FetchAfleveringenSuccess,
  UPDATE_AFLEVERING_IN_PROGRESS, UpdateAfleveringFailure, UpdateAfleveringInProgress, UpdateAfleveringSuccess
} from './afleveringen.actions';
import {Actions, Effect} from '@ngrx/effects';
import {AfleveringenService} from '../../afleveringen.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {IAflevering} from '../../interface/IAflevering';
import {AddAlert} from '../alerts/alerts.actions';

@Injectable()
export class AfleveringenEffects {

  @Effect()
  fetchAfleveringenInProgress$ = this.actions$
    .ofType<FetchAfleveringenInProgress>(FETCH_AFLEVERINGEN_IN_PROGRESS)
    .switchMap(action => {
      return this.afleveringenService
        .getAfleveringen()
        .switchMap(response =>
          Observable.of(new FetchAfleveringenSuccess(response))
        )
        .catch(err =>
          Observable.from([
            new FetchAfleveringenFailure(err)
          ]));
    });

  @Effect()
  updateAfleveringInProgress$ = this.actions$
    .ofType<UpdateAfleveringInProgress>(UPDATE_AFLEVERING_IN_PROGRESS)
    .map(action => action.payload)
    .switchMap((aflevering: IAflevering) => {
      return this.afleveringenService
        .saveAflevering(aflevering)
        .switchMap(() =>
          Observable.from([
            new UpdateAfleveringSuccess(aflevering),
            new AddAlert({type: 'success', message: 'Opslaan van aflevering gelukt', err: undefined})
          ]))
        .catch(err =>
          Observable.from([
            new UpdateAfleveringFailure(),
            new AddAlert({type: 'danger', message: 'Het updaten van de aflevering is mislukt.', err: err})
          ]));
    });

  constructor(private actions$: Actions,
              private afleveringenService: AfleveringenService) {
  }
}
