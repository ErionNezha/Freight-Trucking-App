import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterTransportVehicleDetailsComponent } from './enter-transport-vehicle-details.component';

describe('EnterTransportVehicleDetailsComponent', () => {
  let component: EnterTransportVehicleDetailsComponent;
  let fixture: ComponentFixture<EnterTransportVehicleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterTransportVehicleDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterTransportVehicleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
