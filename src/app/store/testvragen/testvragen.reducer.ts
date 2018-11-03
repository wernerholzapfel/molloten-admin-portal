import {
  ADD_TESTVRAAG_SUCCESS,
  FETCH_TESTVRAGEN_FAILURE,
  FETCH_TESTVRAGEN_IN_PROGRESS,
  FETCH_TESTVRAGEN_SUCCESS,
  UPDATE_TESTVRAAG_SUCCESS
} from './testvragen.actions';
import {TestvraagModel} from '../../testvragen.service';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface ITestvragen {
  aflevering?: number;
  testvragen?: TestvraagModel[];
}

export function testvragenReducer(state: ITestvragen, action): ITestvragen {
  switch (action.type) {
    case FETCH_TESTVRAGEN_IN_PROGRESS:
      return {
        ...state,
        aflevering: action.payload,
        testvragen: []
  };
      case FETCH_TESTVRAGEN_SUCCESS:
      return {
        ...state,
        testvragen: action.payload
      };
      case FETCH_TESTVRAGEN_FAILURE:
      return {
        ...state,
        testvragen: []
      };
    case ADD_TESTVRAAG_SUCCESS:
      return {
        ...state,
        testvragen: [...state.testvragen, action.payload]
      };
      case UPDATE_TESTVRAAG_SUCCESS:
      return {
        ...state,
        testvragen: [...state.testvragen.map(current => (current.id === action.payload.id ? action.payload : current))]
      };
    default:
      return state;
  }
}


export const getTestvragenStore = createFeatureSelector<ITestvragen>('testvragen');

export const getTestvragen = createSelector(getTestvragenStore, (testvragenstore: ITestvragen) => testvragenstore.testvragen);

export const getAfleveringVoorTestvragen =
  createSelector(getTestvragenStore, (testvragenstore) => testvragenstore.aflevering ? testvragenstore.aflevering : 1);
