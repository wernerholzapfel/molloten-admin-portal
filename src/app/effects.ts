import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {
  AddErrorMessage,
  FETCH_AFLEVERINGEN_IN_PROGRESS,
  FETCH_KANDIDATEN_IN_PROGRESS, FetchAfleveringenFailure, FetchAfleveringenInProgress, FetchAfleveringenSuccess,
  FetchKandidatenFailure,
  FetchKandidatenInProgress,
  FetchKandidatenSuccess, UPDATE_AFLEVERING_IN_PROGRESS, UPDATE_KANDIDAAT_IN_PROGRESS, UpdateAfleveringFailure,
  UpdateAfleveringInProgress,
  UpdateAfleveringSuccess, UpdateKandidaatFailure, UpdateKandidaatInProgress, UpdateKandidaatSuccess
} from './actions';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import {KandidatenService} from './kandidaten.service';
import {AfleveringenService} from './afleveringen.service';
import {IAflevering} from './interface/IAflevering';
import {IKandidaat} from './interface/IKandidaat';

@Injectable()
export class Effects {

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
        .switchMap(response => [
          Observable.of(new UpdateAfleveringSuccess(aflevering))
          ]
        )
        .catch(err =>
          Observable.from([
            new UpdateAfleveringFailure(),
            new AddErrorMessage({type: 'danger', message: 'Het updaten van de aflevering is mislukt.', err: err})
          ]));
    });

 @Effect()
  updateKandidaatInProgress$ = this.actions$
    .ofType<UpdateKandidaatInProgress>(UPDATE_KANDIDAAT_IN_PROGRESS)
    .map(action => action.payload)
    .switchMap((kandidaat: IKandidaat) => {
      return this.kandidatenService
        .saveKandidaat(kandidaat)
        .switchMap(response => [
          Observable.of(new UpdateKandidaatSuccess(kandidaat))
          ]
        )
        .catch(err =>
          Observable.from([
            new UpdateKandidaatFailure(),
            new AddErrorMessage({type: 'danger', message: 'Het updaten van de kandidaat is mislukt.', err: err})
          ]));
    });

  constructor(private actions$: Actions,
              private kandidatenService: KandidatenService,
              private afleveringenService: AfleveringenService) {}
}
