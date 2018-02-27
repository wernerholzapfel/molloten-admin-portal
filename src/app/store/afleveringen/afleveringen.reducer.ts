import {IAflevering} from '../../interface/IAflevering';
import {FETCH_AFLEVERINGEN_SUCCESS, UPDATE_AFLEVERING_FAILURE, UPDATE_AFLEVERING_SUCCESS} from './afleveringen.actions';
import {FETCH_KANDIDATEN_FAILURE} from '../kandidaten/kandidaten.actions';

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
