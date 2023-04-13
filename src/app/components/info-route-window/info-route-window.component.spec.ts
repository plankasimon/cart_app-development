import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoRouteWindowComponent } from './info-route-window.component';

describe('InfoRouteWindowComponent', () => {
  let component: InfoRouteWindowComponent;
  let fixture: ComponentFixture<InfoRouteWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoRouteWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoRouteWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
