import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateFreightComponent } from './allocate-freight.component';

describe('AllocateFreightComponent', () => {
  let component: AllocateFreightComponent;
  let fixture: ComponentFixture<AllocateFreightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllocateFreightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateFreightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
