import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromDashboard from '../features/dashboard/store/dashboard.reducer';

export interface AppState {
  dashboard: fromDashboard.DashboardState;
}

export const reducers: ActionReducerMap<AppState> = {
  dashboard: fromDashboard.dashboardReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [];
