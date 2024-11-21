import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { DashBoardActions, DashboardActionsFacade } from './dashboard.actions';
import { DashboardService } from '../services/dashboard.service';

@Injectable()
export class DashboardEffects {
  loadCryptos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashBoardActions.loadCrypto),
      mergeMap(() =>
        this.dashboardService.getData().pipe(
          map((cryptos) =>
            DashBoardActions.loadCryptoSuccess({ cryptos: cryptos })
          ),
          catchError((error) => {
            console.error('loadCryptos effect caught an error:', error.message);
            return of(
              DashBoardActions.loadCryptoFailure({ error: error.message })
            );
          })
        )
      )
    )
  );

  //        Facade pattern        //
  //////////////////////////////////
  //        CryptoList Effects    //
  //////////////////////////////////

  loadCryptoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActionsFacade.DashboardCryptoActions.loadCryptoList),
      mergeMap(() =>
        this.dashboardService.getData().pipe(
          map((response) =>
            DashboardActionsFacade.DashboardCryptoActions.loadCryptoListSuccess(
              { cryptoList: response }
            )
          ),
          catchError((error) => {
            console.error(
              'loadCryptoList effect caught an error:',
              error.message
            );
            return of(
              DashboardActionsFacade.DashboardCryptoActions.loadCryptoListFailure(
                { error: error.message }
              )
            );
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService
  ) {}
}
