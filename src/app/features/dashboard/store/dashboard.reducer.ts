import { createReducer, on } from '@ngrx/store';
import { DashBoardActions } from './dashboard.actions';
import { Crypto } from '../services/dashboard.service';

export interface DashboardState {
  cryptos: Crypto[];
  error: string | null;
  status: string;
}

export const initialState: DashboardState = {
  cryptos: [],
  error: null,
  status: 'idle',
};

export const dashboardReducer = createReducer(
  initialState,
  on(DashBoardActions.loadCrypto, (state) => ({ ...state, status: 'loading' })),
  on(DashBoardActions.loadCryptoSuccess, (state, { cryptos }) => ({
    ...state,
    cryptos: cryptos,
    error: null,
    status: 'success',
  })),
  on(DashBoardActions.loadCryptoFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);
