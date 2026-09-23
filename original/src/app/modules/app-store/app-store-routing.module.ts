import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppStoreComponent } from './app-store.component';

const routes: Routes = [
  { path: 'app-store', component: AppStoreComponent },
  { path: '', redirectTo: 'app-store', pathMatch: 'full' },
  {

    //  /app-store-routing.module.ts

    path: 'freight-trucking-tracking-management-app',
    loadChildren: () =>
      import('./freight-trucking-tracking-management-app/freight-trucking-tracking-management-app.module').then((m) => m.FreightTruckingTrackingManagementAppModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppStoreRoutingModule {}
