import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllocateFreightToTransporterComponent } from './allocate-freight-to-transporter/allocate-freight-to-transporter.component';
import { AllocateFreightComponent } from './allocate-freight-to-transporter/allocate-freight/allocate-freight.component';
import { InviteEditTransportersComponent } from './allocate-freight-to-transporter/invite-edit-transporters/invite-edit-transporters.component';
import { AddEditBusinessLocationDetailsComponent } from './business-location-details/add-edit-business-location-details/add-edit-business-location-details.component';
import { BusinessLocationDetailsComponent } from './business-location-details/business-location-details.component';
import { SelectFromRegisteredBusinessesComponent } from './business-location-details/select-from-registered-businesses/select-from-registered-businesses.component';
import { AddEditTransportVehiclesDetailsComponent } from './enter-transport-vehicle-details/add-edit-transport-vehicles-details/add-edit-transport-vehicles-details.component';
import { EnterTransportVehicleDetailsComponent } from './enter-transport-vehicle-details/enter-transport-vehicle-details.component';
import { FreightTruckingTrackingManagementAppComponent } from './freight-trucking-tracking-management-app.component';
import { AddEditManageTruckerTransporterComponent } from './manage-trucker-transporter/add-edit-manage-trucker-transporter/add-edit-manage-trucker-transporter.component';
import { EditAreasServedComponent } from './manage-trucker-transporter/edit-areas-served/edit-areas-served.component';
import { EditUserPermissionsComponent } from './manage-trucker-transporter/edit-user-permissions/edit-user-permissions.component';
import { ManageTruckerTransporterComponent } from './manage-trucker-transporter/manage-trucker-transporter.component';
import { AddEditPlanFreightLoadComponent } from './plan-freight-load/add-edit-plan-freight-load/add-edit-plan-freight-load.component';
import { PlanFreightLoadComponent } from './plan-freight-load/plan-freight-load.component';
import { AddEditTrackingDeviceComponent } from './track-freight/add-edit-tracking-device/add-edit-tracking-device.component';
import { TrackFreightComponent } from './track-freight/track-freight.component';

const routes: Routes = [
  {
    path: '',
    component: FreightTruckingTrackingManagementAppComponent,
    children: [
      { path: 'plan-freight-load', component: PlanFreightLoadComponent },
       {path:"plan-freight-load/add-edit-plan-freight-load", component:AddEditPlanFreightLoadComponent},


      { path: "allocate-freight-to-transporter", component: AllocateFreightToTransporterComponent },
      {path:"allocate-freight-to-transporter/invite-edit-transporters", component:InviteEditTransportersComponent},
      {path:"allocate-freight-to-transporter/allocate-freight", component:AllocateFreightComponent},

      { path: "enter-transport-vehicle-details", component: EnterTransportVehicleDetailsComponent },
      { path: "enter-transport-vehicle-details/add-edit-transport-vehicles-details", component: AddEditTransportVehiclesDetailsComponent },

      

   

      { path: "track-freight", component: TrackFreightComponent }, 
      { path: "track-freight/edit-freight-load", component: AddEditPlanFreightLoadComponent }, 

      { path: "track-freight/add-edit-tracking-device", component: AddEditTrackingDeviceComponent },
      
      
      
      

      { path: "manage-trucker-transporter", component: ManageTruckerTransporterComponent }, 
      { path: "manage-trucker-transporter/add-edit-manage-trucker-transporter", component: AddEditManageTruckerTransporterComponent },
      { path: "manage-trucker-transporter/edit-areas-served", component: EditAreasServedComponent }, 
      { path: "manage-trucker-transporter/edit-user-permissions", component: EditUserPermissionsComponent }, 

   
      { path: "business-locations-details", component: BusinessLocationDetailsComponent }, 
      { path: "business-locations-details/select-from-registered-businesses", component: SelectFromRegisteredBusinessesComponent }, 

      { path: "business-locations-details/select-from-registered-businesses/add-edit-business-location-details", component: AddEditBusinessLocationDetailsComponent }
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreightTruckingTrackingManagementAppRoutingModule {}
