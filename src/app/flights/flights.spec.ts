import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsComponent } from './flights';


describe('FlightsComponent', () => {
  let component: FlightsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FlightsComponent]
    });
    const fixture = TestBed.createComponent(FlightsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

