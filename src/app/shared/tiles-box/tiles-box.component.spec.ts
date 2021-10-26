import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilesBoxComponent } from './tiles-box.component';

describe('TilesBoxComponent', () => {
  let component: TilesBoxComponent;
  let fixture: ComponentFixture<TilesBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TilesBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TilesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
