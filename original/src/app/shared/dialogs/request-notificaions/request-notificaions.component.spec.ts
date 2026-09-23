import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestNotificaionsComponent } from './request-notificaions.component';


describe('RequestNotificaionsComponent', () => {
  let component: RequestNotificaionsComponent;
  let fixture: ComponentFixture<RequestNotificaionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestNotificaionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestNotificaionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
