import { Component, OnInit } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState, IVendorState } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-stepper-wrapper',
  templateUrl: './stepper-wrapper.component.html',
  styleUrls: ['./stepper-wrapper.component.scss']
})
export class StepperWrapperComponent implements OnInit {
  selectedVendor$: Observable<any>;

  constructor(
    private store: Store<IAppState>,
  ) {

    const selectVendorState = (state: IAppState) => state.vendor;
    const selectVendorData = createSelector(
      selectVendorState,
      (state: IVendorState) => state.selectedVendor
    );
    this.selectedVendor$ = this.store.select(selectVendorData);
   }

  ngOnInit(): void {
 
  }

};
