import {ActionReducerMap} from '@ngrx/store';
import {IKandidaat} from '../interface/IKandidaat';
import {IAflevering} from '../interface/IAflevering';
import {IAlert} from '../interface/IAlert';
import {kandidatenReducer} from './kandidaten/kandidaten.reducer';
import {afleveringenReducer} from './afleveringen/afleveringen.reducer';
import {alertReducer} from './alerts/alerts.reducers';
import {IActies} from '../interface/IActies';
import {actiesReducer} from './acties/acties.reducer';


export interface IAppState {
  kandidaten: IKandidaat[];
  afleveringen: IAflevering[];
  alerts: IAlert[];
  acties: IActies;
}

export const reducers: ActionReducerMap<IAppState> = {
  kandidaten: kandidatenReducer,
  afleveringen: afleveringenReducer,
  alerts: alertReducer,
  acties: actiesReducer
};
