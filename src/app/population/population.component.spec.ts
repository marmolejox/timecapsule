import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationComponent } from './population.component';

describe('PopulationComponent', () => {
  let component: PopulationComponent;
  let fixture: ComponentFixture<PopulationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopulationComponent]
    });
    fixture = TestBed.createComponent(PopulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
