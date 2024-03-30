import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobesComponent } from './globes.component';

describe('GlobesComponent', () => {
  let component: GlobesComponent;
  let fixture: ComponentFixture<GlobesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlobesComponent]
    });
    fixture = TestBed.createComponent(GlobesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
