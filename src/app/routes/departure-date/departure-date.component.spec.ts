import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureDateComponent } from './departure-date.component';

describe('DepartureDateComponent', () => {
  let component: DepartureDateComponent;
  let fixture: ComponentFixture<DepartureDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartureDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartureDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
