import {IKandidaat} from '../../interface/IKandidaat';
import {FETCH_KANDIDATEN_SUCCESS, UPDATE_KANDIDAAT_SUCCESS} from './kandidaten.actions';
import {createFeatureSelector, createSelector, State} from '@ngrx/store';
import {getActies} from '../acties/acties.reducer';
import {getAfleveringVoorTestvragen} from '../testvragen/testvragen.reducer';

export function kandidatenReducer(state: IKandidaat[] = [], action): IKandidaat[] {
  switch (action.type) {
    case FETCH_KANDIDATEN_SUCCESS:
      return [...action.payload];
    case UPDATE_KANDIDAAT_SUCCESS:
      return [
        ...state.map(
          current => (current.id === action.payload.id ? action.payload : current))
      ];
    default:
      return [...state];
  }
}



export const getKandidaten = createFeatureSelector<IKandidaat[]>('kandidaten');

export const getActiveKandidaten = createSelector(getKandidaten, getAfleveringVoorTestvragen, (kandidaten, aflevering) => {
  return kandidaten.filter(kandidaat => kandidaat.aflevering > aflevering || !kandidaat.aflevering);
});
