import {Action} from '@ngrx/store';
import {IKandidaat} from '../../interface/IKandidaat';

export const FETCH_KANDIDATEN_IN_PROGRESS = 'FETCH_KANDIDATEN_IN_PROGRESS';
export const FETCH_KANDIDATEN_SUCCESS = 'FETCH_KANDIDATEN_SUCCESS';
export const FETCH_KANDIDATEN_FAILURE = 'FETCH_KANDIDATEN_FAILURE';
export const UPDATE_KANDIDAAT_IN_PROGRESS = 'UPDATE_KANDIDAAT_IN_PROGRESS';
export const UPDATE_KANDIDAAT_SUCCESS = 'UPDATE_KANDIDAAT_SUCCESS';
export const UPDATE_KANDIDAAT_FAILURE = 'UPDATE_KANDIDAAT_FAILURE';

export class FetchKandidatenInProgress implements Action {
  readonly type = FETCH_KANDIDATEN_IN_PROGRESS;

  constructor() {
  }
}

export class FetchKandidatenSuccess implements Action {
  readonly type = FETCH_KANDIDATEN_SUCCESS;

  constructor(public payload: IKandidaat[]) {
  }
}

export class FetchKandidatenFailure implements Action {
  readonly type = FETCH_KANDIDATEN_FAILURE;

  constructor(public payload: any) {
  }
}

export class UpdateKandidaatInProgress implements Action {
  readonly type = UPDATE_KANDIDAAT_IN_PROGRESS;

  constructor(public payload: IKandidaat) {
  }
}

export class UpdateKandidaatSuccess implements Action {
  readonly type = UPDATE_KANDIDAAT_SUCCESS;

  constructor(public payload: IKandidaat) {
  }
}

export class UpdateKandidaatFailure implements Action {
  readonly type = UPDATE_KANDIDAAT_FAILURE;

  constructor() {
  }
}
