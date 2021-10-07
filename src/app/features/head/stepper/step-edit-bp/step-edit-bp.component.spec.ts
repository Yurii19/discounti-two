import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepEditBpComponent } from './step-edit-bp.component';

describe('StepEditBpComponent', () => {
  let component: StepEditBpComponent;
  let fixture: ComponentFixture<StepEditBpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepEditBpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepEditBpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
