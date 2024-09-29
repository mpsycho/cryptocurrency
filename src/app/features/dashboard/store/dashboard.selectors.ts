import { createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';
import { AppState } from '../../../reducers';

export const selectDashboard = (state: AppState) => state.dashboard;
export const selectCryptos = createSelector(
  selectDashboard,
  (state: DashboardState) => state.cryptos
);
