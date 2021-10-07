import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepCreateVendorComponent } from './step-create-vendor.component';

describe('StepCreateVendorComponent', () => {
  let component: StepCreateVendorComponent;
  let fixture: ComponentFixture<StepCreateVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepCreateVendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepCreateVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
