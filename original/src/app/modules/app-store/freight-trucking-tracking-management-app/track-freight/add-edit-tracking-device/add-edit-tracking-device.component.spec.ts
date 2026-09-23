import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTrackingDeviceComponent } from './add-edit-tracking-device.component';

describe('AddEditTrackingDeviceComponent', () => {
  let component: AddEditTrackingDeviceComponent;
  let fixture: ComponentFixture<AddEditTrackingDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTrackingDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTrackingDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
