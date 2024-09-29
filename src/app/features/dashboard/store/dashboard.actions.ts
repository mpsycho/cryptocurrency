import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Crypto } from '../services/dashboard.service';

export const DashBoardActions = createActionGroup({
  source: 'Dashboard',
  events: {
    'Load Crypto': emptyProps(),
    'Load Crypto Success': props<{ cryptos: Crypto[] }>(),
    'Load Crypto Failure': props<{ error: string }>(),
  },
});
