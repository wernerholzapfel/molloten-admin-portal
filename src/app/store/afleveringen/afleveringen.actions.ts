import {Action} from '@ngrx/store';
import {IAflevering} from '../../interface/IAflevering';
import {IKandidaat} from '../../interface/IKandidaat';

export const FETCH_AFLEVERINGEN_IN_PROGRESS = 'FETCH_AFLEVERINGEN_IN_PROGRESS';
export const FETCH_AFLEVERINGEN_SUCCESS = 'FETCH_AFLEVERINGEN_SUCCESS';
export const FETCH_AFLEVERINGEN_FAILURE = 'FETCH_AFLEVERINGEN_FAILURE';
export const UPDATE_AFLEVERING_IN_PROGRESS = 'UPDATE_AFLEVERING_IN_PROGRESS';
export const UPDATE_AFLEVERING_SUCCESS = 'UPDATE_AFLEVERING_SUCCESS';
export const UPDATE_AFLEVERING_FAILURE = 'UPDATE_AFLEVERING_FAILURE';


export class FetchAfleveringenInProgress implements Action {
  readonly type = FETCH_AFLEVERINGEN_IN_PROGRESS;

  constructor() {
  }
}

export class FetchAfleveringenSuccess implements Action {
  readonly type = FETCH_AFLEVERINGEN_SUCCESS;

  constructor(public payload: IKandidaat[]) {
  }
}
export class FetchAfleveringenFailure implements Action {
  readonly type = FETCH_AFLEVERINGEN_FAILURE;

  constructor(public payload: any) {
  }
}

export class UpdateAfleveringInProgress implements Action {
  readonly type = UPDATE_AFLEVERING_IN_PROGRESS;

  constructor(public payload: IAflevering) {
  }
}

export class UpdateAfleveringSuccess implements Action {
  readonly type = UPDATE_AFLEVERING_SUCCESS;

  constructor(public payload: IAflevering) {
  }
}

export class UpdateAfleveringFailure implements Action {
  readonly type = UPDATE_AFLEVERING_FAILURE;

  constructor() {
  }
}


