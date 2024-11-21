import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { Crypto } from '../services/dashboard.service';

export const DashBoardActions = createActionGroup({
  source: 'Dashboard',
  events: {
    'Load Crypto': emptyProps(),
    'Load Crypto Success': props<{ cryptos: Crypto[] }>(),
    'Load Crypto Failure': props<{ error: string }>(),
  },
});

//        Facade pattern        //
//////////////////////////////////
//        Crypto Actions        //
//////////////////////////////////

const loadCryptoList = createAction('[Dashboard] Load Crypto List');
const loadCryptoListSuccess = createAction(
  '[Dashboard] Load Crypto List Success',
  props<{ cryptoList: Crypto[] }>()
);
const loadCryptoListFailure = createAction(
  '[Dashboard] Load Crypto List Failure',
  props<{ error: string }>()
);

const DashboardCryptoActions = {
  loadCryptoList,
  loadCryptoListSuccess,
  loadCryptoListFailure,
};

// TODO rename to DashboardActions when all actions are moved to the facade
export const DashboardActionsFacade = {
  DashboardCryptoActions,
};

//////////////////////////////////
//        Other Actions         //
//////////////////////////////////
