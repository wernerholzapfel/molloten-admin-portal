import {Action} from '@ngrx/store';
import {TestvraagModel} from '../../testvragen.service';

export const FETCH_TESTVRAGEN_IN_PROGRESS = 'FETCH_TESTVRAGEN_IN_PROGRESS';
export const FETCH_TESTVRAGEN_SUCCESS = 'FETCH_TESTVRAGEN_SUCCESS';
export const FETCH_TESTVRAGEN_FAILURE = 'FETCH_TESTVRAGEN_FAILURE';
export const ADD_TESTVRAAG_IN_PROGRESS = 'ADD_TESTVRAAG_IN_PROGRESS';
export const ADD_TESTVRAAG_SUCCESS = 'ADD_TESTVRAAG_SUCCESS';
export const ADD_TESTVRAAG_FAILURE = 'ADD_TESTVRAAG_FAILURE';
export const UPDATE_TESTVRAAG_IN_PROGRESS = 'UPDATE_TESTVRAAG_IN_PROGRESS';
export const UPDATE_TESTVRAAG_SUCCESS = 'UPDATE_TESTVRAAG_SUCCESS';
export const UPDATE_TESTVRAAG_FAILURE = 'UPDATE_TESTVRAAG_FAILURE';

export const SET_AFLEVERING_TESTVRAGEN = 'SET_AFLEVERING_TESTVRAGEN';


export class FetchTestvragenInProgress implements Action {
  readonly type = FETCH_TESTVRAGEN_IN_PROGRESS;

  constructor(public payload: number) {
  }
}

export class FetchTestvragenSuccess implements Action {
  readonly type = FETCH_TESTVRAGEN_SUCCESS;

  constructor(public payload: TestvraagModel[]) {
  }
}

export class FetchTestvragenFailure implements Action {
  readonly type = FETCH_TESTVRAGEN_FAILURE;

  constructor(public payload: any) {
  }
}

export class AddTestVraagInProgress implements Action {
  readonly type = ADD_TESTVRAAG_IN_PROGRESS;

  constructor(public payload: TestvraagModel) {

  }
}

export class AddTestVraagSuccess implements Action {
  readonly type = ADD_TESTVRAAG_SUCCESS;

  constructor(public payload: TestvraagModel) {

  }
}

export class AddTestVraagFailure implements Action {
  readonly type = ADD_TESTVRAAG_FAILURE;

  constructor(public payload: any) {

  }
}

export class UpdateTestVraagInProgress implements Action {
  readonly type = UPDATE_TESTVRAAG_IN_PROGRESS;

  constructor(public payload: TestvraagModel) {

  }
}

export class UpdateTestVraagSuccess implements Action {
  readonly type = UPDATE_TESTVRAAG_SUCCESS;

  constructor(public payload: TestvraagModel) {

  }
}

export class UpdateTestVraagFailure implements Action {
  readonly type = UPDATE_TESTVRAAG_FAILURE;

  constructor(public payload: any) {

  }
}

// export class SetAfleveringTestvragen implements Action {
//   readonly type = SET_AFLEVERING_TESTVRAGEN;
//
//   constructor(public payload: number) {
//   }
// }



