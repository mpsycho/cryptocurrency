/**
 * Facade for Crypto list observables and actions
 */

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RemoteData } from 'ngx-remotedata';
import { Observable } from 'rxjs';
import { AppState } from '../../../reducers';
import { Store } from '@ngrx/store';
import { DashboardActionsFacade } from './dashboard.actions';
import { DashboardSelectors } from './dashboard.selectors';

interface CryptoListStateFacade {
  readonly stateObservables: {
    readonly cryptoListApiResponse$: Observable<
      RemoteData<any, HttpErrorResponse> //TODOO any to Crypto[]
    >;
  };
  readonly dispatchActions: {
    loadCryptoList: () => void;
  };
}

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  /**
   * Crypto list facade
   */
  public cryptoListFacade: Readonly<CryptoListStateFacade> = {
    stateObservables: {
      // TODOO
      cryptoListApiResponse$: this.store.select(
        DashboardSelectors.CryptoListSelectors.selectCryptoListApiResponse
      ),
    },
    dispatchActions: {
      loadCryptoList: () =>
        this.store.dispatch(
          DashboardActionsFacade.DashboardCryptoActions.loadCryptoList()
        ),
    },
  };

  constructor(private store: Store<AppState>) {}
}
