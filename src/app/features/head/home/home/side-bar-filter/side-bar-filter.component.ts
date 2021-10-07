import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  addChips,
  getControlsValues,
  getFilteredData,
  removeChips,
  saveFormsValues,
} from 'src/app/core/store/actions/filter.actions';
import {
  IAppState,
  IFilterFormsValues,
  ILocationCountry,
  ISimpleVar,
} from 'src/app/shared/interfaces';
import {
  selectChips,
  selectControlsLocations,
  selectControlsCathegories,
  selectControlsTags,
  selectControlsVendors,
  selectFormValues,
} from '../../home.selectors';
import { FilterService } from 'src/app/core/services/filter.service';
import { setFilterConfigReqest } from 'src/app/core/store/actions/ui-config.actions';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-side-bar-filter',
  templateUrl: './side-bar-filter.component.html',
  styleUrls: ['./side-bar-filter.component.scss'],
})
export class SideBarFilterComponent implements OnInit, OnDestroy {
  filterForm!: FormGroup;
  chips$: Observable<ISimpleVar[]>;
  tags$: Observable<ISimpleVar[]>;
  categories$: Observable<ISimpleVar[]>;
  locations$: Observable<ILocationCountry[]>;
  vendors$: Observable<ISimpleVar[]>;

  storedFormValues: Observable<IFilterFormsValues>;
  subscribedFormValues: Subscription;
  subscribedChips: Subscription;
  formValues: any;
  selectedChips: any;

  inputControl: FormControl;

  constructor(
    private store: Store<IAppState>,
    private filterServices: FilterService, 
  ) {
    this.locations$ = this.store.select(selectControlsLocations);
    this.categories$ = this.store.select(selectControlsCathegories);
    this.tags$ = this.store.select(selectControlsTags);
    this.chips$ = this.store.select(selectChips); // === SELECTED TAGS
    this.vendors$ = this.store.select(selectControlsVendors);
    this.storedFormValues = this.store.select(selectFormValues);


    this.subscribedFormValues = this.storedFormValues.subscribe(
      (data) => (this.formValues = data)
    );
    this.subscribedChips = this.chips$.subscribe(
      (data) => (this.selectedChips = data)
    );

    this.filterForm = new FormGroup({
      category: new FormControl(this.formValues.categories),
      city: new FormControl(this.formValues.city),
      vendor: new FormControl(this.formValues.vendors),
      chips: new FormControl(),
    });
    this.inputControl = new FormControl();
    // END OF CONSTRUCTOR    
  }

  ngOnInit(): void {
    this.store.dispatch(getControlsValues());
  }

  ngOnDestroy(): void {
    const configControls = {
      values: {
        vendors: this.filterForm.get('vendor')?.value
          ? this.filterForm.get('vendor')?.value
          : [],
        city: this.filterForm.get('city')?.value || '',
        categories: this.filterForm.get('category')?.value || [],
        chips: this.selectedChips,
      },
    };
    this.store.dispatch(saveFormsValues({ values: configControls.values }));
    this.subscribedFormValues.unsubscribe();
    this.subscribedChips.unsubscribe();
  }
  
  filterDiscounts() {
    const configControls = {
      values: {
        vendors: this.filterForm.get('vendor')?.value
          ? this.filterForm.get('vendor')?.value
          : [],
        city: this.filterForm.get('city')?.value || null,
        categories: this.filterForm.get('category')?.value || [],
        chips: this.selectedChips,
      },
    };

    const src = this.filterServices.requestFilteredData(configControls.values);
    this.store.dispatch(setFilterConfigReqest({ param: src }));
    this.store.dispatch(getFilteredData({ data: configControls.values }));
  }


  resetForm() {
    this.filterForm.reset();
    this.store.dispatch(
      addChips({ tag: { id: 'a', name: 'resetSelectedTags' } })
    );
    this.store.dispatch(setFilterConfigReqest({ param: '' }));
  }

  selectCathegory() {
    const cathegoryValue = this.filterForm.get('category')?.value;
  }

  selectCity() {
    const theCity = this.filterForm.get('cities')?.value;
  }

  removeChips(chip: ISimpleVar) {
    this.store.dispatch(removeChips({ tag: chip }));
  }

  addChip(slectedTag: any) {
    this.filterForm.patchValue({ chips: '' });
    if (slectedTag.name !== 'none') {
      this.store.dispatch(addChips({ tag: slectedTag }));
    } else {
      this.filterForm.get('chips')?.reset();
    }
  }
}
