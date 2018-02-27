import {ActionReducerMap} from '@ngrx/store';
import {IKandidaat} from '../interface/IKandidaat';
import {IAflevering} from '../interface/IAflevering';
import {IAlert} from '../interface/IAlert';
import {kandidatenReducer} from './kandidaten/kandidaten.reducer';
import {afleveringenReducer} from './afleveringen/afleveringen.reducer';
import {alertReducer} from './alerts/alerts.reducers';


export interface IAppState {
  kandidaten: IKandidaat[];
  afleveringen: IAflevering[];
  alerts: IAlert[];
}

export const reducers: ActionReducerMap<IAppState> = {
  kandidaten: kandidatenReducer,
  afleveringen: afleveringenReducer,
  alerts: alertReducer
};
