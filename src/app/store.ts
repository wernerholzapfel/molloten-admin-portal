import {IAflevering} from './interface/IAflevering';
import {IKandidaat} from './interface/IKandidaat';
import {
  ADD_ERROR_MESSAGE,
  DELETE_ERROR_MESSAGE,
  FETCH_AFLEVERINGEN_SUCCESS,
  FETCH_KANDIDATEN_FAILURE,
  FETCH_KANDIDATEN_SUCCESS,
  INCREMENT,
  UPDATE_AFLEVERING_FAILURE,
  UPDATE_AFLEVERING_SUCCESS
} from './actions';
import {ActionReducerMap} from '@ngrx/store';
import {IAlert} from './interface/IAlert';


export interface IAppState {
  counter: number;
  kandidaten: IKandidaat[];
  afleveringen: IAflevering[];
  errors: IAlert[];
}

export const COUNTER_STATE = 0;

export function counterReducer(state: number = COUNTER_STATE, action): number {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    default:
      return state;
  }
}

export function kandidatenReducer(state: IKandidaat[] = [], action): IKandidaat[] {
  switch (action.type) {
    case FETCH_KANDIDATEN_SUCCESS:
      return action.payload;
    case FETCH_KANDIDATEN_FAILURE:
      return state;
    default:
      return state;
  }
}

export function errorReducer(state: IAlert[] = [], action) {
  switch (action.type) {
    case ADD_ERROR_MESSAGE:
      return [...state, action.payload];
    case DELETE_ERROR_MESSAGE:
      return state.filter(t => t !== action.payload);
    default:
      return state;
  }
}

export function afleveringenReducer(state: IAflevering[] = [], action): IAflevering[] {
  switch (action.type) {
    case FETCH_AFLEVERINGEN_SUCCESS:
      return action.payload;
    case FETCH_KANDIDATEN_FAILURE:
      return state;
    case UPDATE_AFLEVERING_SUCCESS:
      return state.map(
        current => (current.aflevering === action.payload.aflevering ? action.payload : current));
    case UPDATE_AFLEVERING_FAILURE:
      return [...state];
    default:
      return state;
  }
}

export const reducers: ActionReducerMap<IAppState> = {
  counter: counterReducer,
  kandidaten: kandidatenReducer,
  afleveringen: afleveringenReducer,
  errors: errorReducer
};
