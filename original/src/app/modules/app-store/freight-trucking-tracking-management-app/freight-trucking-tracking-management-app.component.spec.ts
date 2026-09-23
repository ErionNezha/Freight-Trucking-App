import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppNameComponent } from './freight-trucking-tracking-management-app.component';

describe('AppNameComponent', () => {
  let component: AppNameComponent;
  let fixture: ComponentFixture<AppNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
