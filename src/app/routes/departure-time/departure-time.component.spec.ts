import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureTimeComponent } from './departure-time.component';

describe('DepartureTimeComponent', () => {
  let component: DepartureTimeComponent;
  let fixture: ComponentFixture<DepartureTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartureTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartureTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
