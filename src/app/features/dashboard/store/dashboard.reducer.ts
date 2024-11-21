import { createReducer, on } from '@ngrx/store';
import { DashBoardActions, DashboardActionsFacade } from './dashboard.actions';
import { Crypto } from '../services/dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  failure,
  inProgress,
  notAsked,
  RemoteData,
  success,
} from 'ngx-remotedata';

export interface CryptoListState {
  data: RemoteData<Crypto[], HttpErrorResponse>;
}

export interface DashboardState {
  cryptos: Crypto[];
  error: string | null;
  status: string;
  cryptoList: CryptoListState;
}

const initialCryptoListState: CryptoListState = {
  data: notAsked(),
};

export const initialState: DashboardState = {
  cryptos: [],
  error: null,
  status: 'idle',
  cryptoList: initialCryptoListState,
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
  })),

  //        Facade pattern        //
  //////////////////////////////////
  //        CryptoList Handlers   //
  //////////////////////////////////
  on(DashboardActionsFacade.DashboardCryptoActions.loadCryptoList, (state) => ({
    ...state,
    cryptoList: {
      ...state.cryptoList,
      data: inProgress() as any,
    },
  })),

  on(
    DashboardActionsFacade.DashboardCryptoActions.loadCryptoListSuccess,
    (state, { cryptoList }) => ({
      ...state,
      cryptoList: {
        ...state.cryptoList,
        data: {
          ...state.cryptoList.data,
          ...(success(cryptoList) as any),
        },
      },
    })
  ),
  on(
    DashboardActionsFacade.DashboardCryptoActions.loadCryptoListFailure,
    (state, { error }) => ({
      ...state,
      cryptoList: {
        ...state.cryptoList,
        data: failure(error) as any,
      },
    })
  )
);
