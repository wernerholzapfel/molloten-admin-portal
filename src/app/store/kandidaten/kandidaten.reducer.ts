import {IKandidaat} from '../../interface/IKandidaat';
import {FETCH_KANDIDATEN_SUCCESS, UPDATE_KANDIDAAT_SUCCESS} from './kandidaten.actions';

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
