import { createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';
import { AppState } from '../../../reducers';
import { state } from '@angular/animations';

export const selectDashboardState = (state: AppState) => state.dashboard;
export const selectCryptos = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.cryptos
);

//        Facade pattern        //
//////////////////////////////////
//     CryptoList Selectors     //
//////////////////////////////////

//Select the entire cryptoList response object (RemoteData)
const selectCryptoListApiResponse = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.cryptoList.data
);

export const CryptoListSelectors = {
  selectCryptoListApiResponse,
};

export const DashboardSelectors = {
  CryptoListSelectors,
};
