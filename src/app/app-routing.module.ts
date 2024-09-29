import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: '**', pathMatch: 'full', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
