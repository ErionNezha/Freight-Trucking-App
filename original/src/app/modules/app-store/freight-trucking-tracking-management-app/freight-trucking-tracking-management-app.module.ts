import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FreightTruckingTrackingManagementAppRoutingModule } from './freight-trucking-tracking-management-app.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { PortalModule } from '@angular/cdk/portal';
import { PlanFreightLoadComponent } from './plan-freight-load/plan-freight-load.component';
import { AllocateFreightToTransporterComponent } from './allocate-freight-to-transporter/allocate-freight-to-transporter.component';
import { RouterModule } from '@angular/router';
import { TrackFreightComponent } from './track-freight/track-freight.component';
import { ManageTruckerTransporterComponent } from './manage-trucker-transporter/manage-trucker-transporter.component';
import { BusinessLocationDetailsComponent } from './business-location-details/business-location-details.component';
import { FreightTruckingTrackingManagementAppComponent } from './freight-trucking-tracking-management-app.component';
import { AudiTrailTableComponent } from './audi-trail-table/audi-trail-table.component';
import { AddEditPlanFreightLoadComponent } from './plan-freight-load/add-edit-plan-freight-load/add-edit-plan-freight-load.component';
import { InviteEditTransportersComponent } from './allocate-freight-to-transporter/invite-edit-transporters/invite-edit-transporters.component';
import { AllocateFreightComponent } from './allocate-freight-to-transporter/allocate-freight/allocate-freight.component';
import { AddEditManageTruckerTransporterComponent } from './manage-trucker-transporter/add-edit-manage-trucker-transporter/add-edit-manage-trucker-transporter.component';
import { EditAreasServedComponent } from './manage-trucker-transporter/edit-areas-served/edit-areas-served.component';
import { EditUserPermissionsComponent } from './manage-trucker-transporter/edit-user-permissions/edit-user-permissions.component';
import { SelectFromRegisteredBusinessesComponent } from './business-location-details/select-from-registered-businesses/select-from-registered-businesses.component';
import { AddEditBusinessLocationDetailsComponent } from './business-location-details/add-edit-business-location-details/add-edit-business-location-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestNotificaionsComponent } from 'src/app/shared/dialogs/request-notificaions/request-notificaions.component';
import { EnterTransportVehicleDetailsComponent } from './enter-transport-vehicle-details/enter-transport-vehicle-details.component';
import { AddEditTransportVehiclesDetailsComponent } from './enter-transport-vehicle-details/add-edit-transport-vehicles-details/add-edit-transport-vehicles-details.component';
import { AddEditTrackingDeviceComponent } from './track-freight/add-edit-tracking-device/add-edit-tracking-device.component';
import { AuditTrailDialogComponent } from 'src/app/shared/audit-trail-dialog/audit-trail-dialog.component';



@NgModule({
  declarations: [
    FreightTruckingTrackingManagementAppComponent,
 
    AllocateFreightToTransporterComponent,
    TrackFreightComponent,
    ManageTruckerTransporterComponent,
    BusinessLocationDetailsComponent,
    AudiTrailTableComponent,

    PlanFreightLoadComponent,
      AddEditPlanFreightLoadComponent,
      InviteEditTransportersComponent,
      AllocateFreightComponent,
      AddEditManageTruckerTransporterComponent,
      EditAreasServedComponent,
      EditUserPermissionsComponent,
      SelectFromRegisteredBusinessesComponent,
      AddEditBusinessLocationDetailsComponent,
      RequestNotificaionsComponent,
      EnterTransportVehicleDetailsComponent,
      AddEditTransportVehiclesDetailsComponent,
      AddEditTrackingDeviceComponent,
      
      AuditTrailDialogComponent
    // child components of PlanFreightLoadComponent
    //AddEditPlanFreightLoadComponent,

  ],
  imports: [CommonModule,ReactiveFormsModule, FreightTruckingTrackingManagementAppRoutingModule,RouterModule, SharedModule, PortalModule],
  providers:[
  ]
})
export class FreightTruckingTrackingManagementAppModule {}
