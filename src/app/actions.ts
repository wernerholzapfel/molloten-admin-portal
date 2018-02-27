import {Action} from '@ngrx/store';
import {IKandidaat} from './interface/IKandidaat';
import {IAflevering} from './interface/IAflevering';
import {IAlert} from './interface/IAlert';

export const FETCH_KANDIDATEN_IN_PROGRESS = 'FETCH_KANDIDATEN_IN_PROGRESS';
export const FETCH_KANDIDATEN_SUCCESS = 'FETCH_KANDIDATEN_SUCCESS';
export const FETCH_KANDIDATEN_FAILURE = 'FETCH_KANDIDATEN_FAILURE';
export const UPDATE_KANDIDAAT_IN_PROGRESS = 'UPDATE_KANDIDAAT_IN_PROGRESS';
export const UPDATE_KANDIDAAT_SUCCESS = 'UPDATE_KANDIDAAT_SUCCESS';
export const UPDATE_KANDIDAAT_FAILURE = 'UPDATE_KANDIDAAT_FAILURE';

export const FETCH_AFLEVERINGEN_IN_PROGRESS = 'FETCH_AFLEVERINGEN_IN_PROGRESS';
export const FETCH_AFLEVERINGEN_SUCCESS = 'FETCH_AFLEVERINGEN_SUCCESS';
export const FETCH_AFLEVERINGEN_FAILURE = 'FETCH_AFLEVERINGEN_FAILURE';
export const UPDATE_AFLEVERING_IN_PROGRESS = 'UPDATE_AFLEVERING_IN_PROGRESS';
export const UPDATE_AFLEVERING_SUCCESS = 'UPDATE_AFLEVERING_SUCCESS';
export const UPDATE_AFLEVERING_FAILURE = 'UPDATE_AFLEVERING_FAILURE';
export const DELETE_ERROR_MESSAGE = 'DELETE_ERROR_MESSAGE';
export const ADD_ERROR_MESSAGE = 'ADD_ERROR_MESSAGE';


export const INCREMENT = 'INCREMENT';

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

export class FetchAfleveringenInProgress implements Action {
  readonly type = FETCH_AFLEVERINGEN_IN_PROGRESS;

  constructor() {
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

export class DeleteErrorMessage implements Action {
  readonly type = DELETE_ERROR_MESSAGE;

  constructor(public payload: IAlert) {
  }
}

export class AddErrorMessage implements Action {
  readonly type = ADD_ERROR_MESSAGE;

  constructor(public payload: IAlert) {
  }
}

export class Increment implements Action {
  readonly type = INCREMENT;
}

export type All =
  | Increment
  | DeleteErrorMessage
  | FetchKandidatenInProgress
  | FetchKandidatenSuccess
  | FetchKandidatenFailure
  | FetchAfleveringenInProgress
  | FetchAfleveringenSuccess
  | FetchAfleveringenFailure
  | UpdateAfleveringInProgress
  | UpdateAfleveringSuccess
  | UpdateAfleveringFailure;

