import { NgModule } from '@angular/core';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { dashboardReducer } from './store/dashboard.reducer';
import { DashboardEffects } from './store/dashboard.effects';

export const ROUTES: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('dashboard', dashboardReducer),
    EffectsModule.forFeature([DashboardEffects]),
  ],
  declarations: [],
})
export class DashboardModule {}
