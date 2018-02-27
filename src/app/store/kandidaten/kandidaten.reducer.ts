import {IKandidaat} from '../../interface/IKandidaat';
import {FETCH_KANDIDATEN_FAILURE, FETCH_KANDIDATEN_SUCCESS} from './kandidaten.actions';

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
