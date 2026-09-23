import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { EllipsisPipe } from './pipes/ellipsis/ellipsis.pipe';
import { SpinnerComponent } from './services/custom-spinner/spinner.component';
import { UnsavedChangesGuard } from './guards/unsaved-changes/unsaved-changes.guard';
import { LoginComponent } from './dialogs/login/login.component';

import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

import { DatetimeAdapter, MTX_DATETIME_FORMATS } from '@ng-matero/extensions/core';
import { MomentDatetimeAdapter } from '@ng-matero/extensions-moment-adapter';


export const Material_Date_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'DD MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const Mtx_Date_FORMATs = {
  parse: {
    dateInput: 'DD MMM YYYY',
    monthInput: 'MMMM',
    timeInput: 'HH:mm',
    datetimeInput: 'YYYY-MM-DD HH:mm',
  },
  display: {
    dateInput: 'DD MMM YYYY',
    monthInput: 'MMMM',
    timeInput: 'HH:mm',
    datetimeInput: 'DD MMM YYYY HH:mm A',
    monthYearLabel: 'YYYY MMMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
    popupHeaderDateLabel: 'MMM DD, ddd',
  },
}

const BASE_MODULES = [
  FormsModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  MaterialModule,
];

const Guards = [UnsavedChangesGuard];


@NgModule({
  declarations: [EllipsisPipe, LoginComponent,SpinnerComponent],
  imports: [CommonModule, RouterModule, BASE_MODULES],
  providers:[Guards,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: Material_Date_FORMATS },
    {
      provide: DatetimeAdapter,
      useClass: MomentDatetimeAdapter,
    },
    {
      provide: MTX_DATETIME_FORMATS,
      useValue: Mtx_Date_FORMATs
    },
  ],
  exports: [EllipsisPipe, BASE_MODULES],
})
export class SharedModule {}
