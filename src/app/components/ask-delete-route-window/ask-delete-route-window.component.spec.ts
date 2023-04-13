import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskDeleteRouteWindowComponent } from './ask-delete-route-window.component';

describe('AskDeleteRouteWindowComponent', () => {
  let component: AskDeleteRouteWindowComponent;
  let fixture: ComponentFixture<AskDeleteRouteWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskDeleteRouteWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskDeleteRouteWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
