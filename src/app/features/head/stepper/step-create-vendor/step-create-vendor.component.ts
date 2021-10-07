import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Event } from '@angular/router';
import { createSelector, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/core.module';
import { VendorsService } from 'src/app/core/services/vendors.service';
import { saveVendorData } from 'src/app/core/store/actions/vendor.action';
import { API_URL } from 'src/app/shared/constants';
import {
  IAppState,
  ISimpleVar,
  IVendor,
  IVendorState,
} from 'src/app/shared/interfaces';

@Component({
  selector: 'app-step-create-vendor',
  templateUrl: './step-create-vendor.component.html',
  styleUrls: ['./step-create-vendor.component.scss'],
})
export class StepCreateVendorComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  vendorForm!: FormGroup;
  vendors$: Observable<IVendor[]>;
  selectedVendor$: Observable<any>;

  vSub!: Subscription;
  svSub!: Subscription;
  subVendorId!: Subscription;
  subAddCountry!: Subscription;
  subAddCity!: Subscription;
  subFindVendor!: Subscription;
  subInitCountries!: Subscription;
  subInitCities!: Subscription;
  subDeleteVendor!: Subscription;
  subAddCoordinates!: Subscription;
  subDeleteLocationReq!: Subscription;
  subGetLocationsSelectVendor!: Subscription;
  subGetLocationsReq!: Subscription;
  subRemoveVendorReq!: Subscription;

  latControl = new FormControl();
  longControl = new FormControl();
  locationsControl = new FormControl();

  countryControl = new FormControl('');
  countryOptions: { id: string; name: string }[] = [
    { id: 'One', name: 'Two' },
    { id: 'three', name: 'four' },
  ];
  filteredCountry: Observable<{ id: string; name: string }[]> | undefined;
  currentCountryId: string = '';

  cityControl = new FormControl('');
  cityOptions: { id: string; name: string }[] = [
    { id: 'One', name: 'Paris' },
    { id: 'three', name: 'Athes' },
  ];
  filteredCities: Observable<{ id: string; name: string }[]> | undefined;
  currentCityId: string = '';
  isCity: boolean = false;

  vLocationsOptions$: any = [{}];
  selectedLocation: any = '';

  constructor(
    private notification: NotificationService,
    private vendorsService: VendorsService,
    private store: Store<IAppState>,
    private http: HttpClient
  ) {
    this.vendors$ = this.vendorsService.getVendors();
    const selectVendorState = (state: IAppState) => state.vendor;
    const selectVendorData = createSelector(
      selectVendorState,
      (state: IVendorState) => state.selectedVendor
    );
    this.selectedVendor$ = this.store.select(selectVendorData);

    //END OF CONSTRUCTOR
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.cityControl.disable();
    this.latControl.disable();
    this.longControl.disable();
    this.initCities();
    this.initCountries();
    this.countryControl.disable();
    this.locationsControl.disable();

    this.vendorForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      contacts: new FormControl(null, [Validators.required]),
    });

    // this.http.get(`${API_URL}/coupons`).subscribe(resp => {
    //   console.log(resp);
    // })
  }

  ngOnDestroy(): void {
    if (this.vSub) {
      this.vSub.unsubscribe();
    }
    if (this.svSub) {
      this.svSub.unsubscribe();
    }
    if (this.subVendorId) {
      this.subVendorId.unsubscribe();
    }
    if (this.subAddCountry) {
      this.subAddCountry.unsubscribe();
    }
    if (this.subAddCity) {
      this.subAddCity.unsubscribe();
    }
    if (this.subFindVendor) {
      this.subFindVendor.unsubscribe();
    }
    if (this.subInitCountries) {
      this.subInitCountries.unsubscribe();
    }
    if (this.subInitCities) {
      this.subInitCities.unsubscribe();
    }
    if (this.subAddCoordinates) {
      this.subAddCoordinates.unsubscribe();
    }
    if (this.subDeleteLocationReq) {
      this.subDeleteLocationReq.unsubscribe();
    }
    if (this.subGetLocationsSelectVendor) {
      this.subGetLocationsSelectVendor.unsubscribe();
    }
    if (this.subRemoveVendorReq) {
      this.subRemoveVendorReq.unsubscribe();
    }
  }

  selectCity(cityId: string) {
    this.currentCityId = cityId;
    this.cityControl.enable();
    this.initCities();
    this.latControl.enable();
    this.longControl.enable();
  }
  
  selectCountry(countryId: string) {
    this.currentCountryId = countryId;
    this.cityControl.enable();
    this.initCities();
    this.clearLocationForms();
  }

  selectLocation(location: any) {
    this.selectedLocation = location;
  }

  selectVendor(vendor: any) {
    this.store.dispatch(saveVendorData(vendor));
    this.vendorForm.patchValue({
      description: vendor.description,
      contacts: vendor.contacts,
    });
    this.countryControl.enable();
    this.locationsControl.enable();
    this.getLocations();
  }

  removeVendor() {
    this.subDeleteVendor = this.selectedVendor$.subscribe((vendor) => {
      if (confirm(`Do you really want delete vendor ${vendor.name}?`)) {
        const vendorId = vendor.id;
        const vendorName = vendor.name;
        this.subRemoveVendorReq = this.http
          .delete<any>(`${API_URL}/vendors/${vendorId}`)
          .subscribe((resp) => {
            this.notification.info(
              `Vendor : ${vendorName} successfully deleted !`
            );
            this.resetForm();
            this.store.dispatch(saveVendorData({
              id: '',
              name: '. . .',
              description: 'description',
              contacts: 'action.contacts ',
            }))
            this.vendors$ = this.vendorsService.getVendors();
          });
      }
    });
    this.subDeleteVendor.unsubscribe();
  }

  addCoordinates() {
    let vendorid = '';
    this.subVendorId = this.selectedVendor$.subscribe(
      (selectedVendor) => (vendorid = selectedVendor.id)
    );
    const req = {
      cityId: this.currentCityId,
      latitude: this.latControl.value,
      longitude: this.longControl.value,
      vendorId: vendorid,
    };
    // console.log(this.latControl.value)
    // console.log(this.longControl.value)
    // console.log(req)
    this.subAddCoordinates = this.http
      .post<any>(`${API_URL}/locations`, req)
      .subscribe((resp) => {
        this.notification.success('Coordinates successfully added!');
        this.getLocations();
      });
  }

  removeLocation() {
    const location = this.locationsControl.value;
    if (!this.locationsControl.value) {
      this.notification.error('Vndor location is empty');
      return;
    }
    if (
      window.confirm(
        `Do you really want delete location ${location.city} : ${(
          location.lat + ''
        ).substr(0, 6)}  ${(location.long + '').substr(0, 6)} ?`
      )
    ) {
      this.subDeleteLocationReq = this.http
        .delete<any>(`${API_URL}/locations/${location.id}`)
        .subscribe((resp) => {
          console.log(resp);
          this.notification.info(
            `Location ${location.city} : ${(location.lat + '').substr(
              0,
              6
            )}  ${(location.long + '').substr(0, 6)} successfully deleted !`
          );
          this.getLocations();
        });
    }
  }

  removeCity() {
    const targetCity = this.cityControl.value;
    if (window.confirm(`Do you really want delete city ${targetCity}?`)) {
      this.http
        .delete<any>(
          `${API_URL}/countries/${this.currentCountryId}/cities/${this.currentCityId}`
        )
        .subscribe((data) => {
          this.initCities();
          this.notification.info(`City ${targetCity} successfully removed !`);
        });
      this.clearLocationForms();
    }
  }

  removeCountry() {
    const targetCountry = this.countryControl.value;
    if (window.confirm(`Do you really want delete country ${targetCountry}?`)) {
      this.http
        .delete<any>(`${API_URL}/countries/${this.currentCountryId}`)
        .subscribe((data) => {
          this.initCountries();
          this.clearLocationForms();
          this.countryControl.patchValue('');
        });
    }
  }

  addCity() {
    const newCity = this.cityControl.value;
    this.subAddCity = this.http
      .post<any>(`${API_URL}/countries/${this.currentCountryId}/cities`, {
        name: newCity,
      })
      .subscribe((data) => {
        this.initCities();
        this.cityControl.patchValue('');
        this.notification.success(`City ${newCity} successfully added!`);
      });
  }

  addCountry() {
    const newCountry = this.countryControl.value;
    this.subAddCountry = this.http
      .post<any>(`${API_URL}/countries`, { name: newCountry })
      .subscribe((data) => {
        this.initCountries();
        this.countryControl.patchValue('');
        this.notification.success('Сountry successfully added!');
      });
  }

  reformatLocation(location: any) {
    return { id: location.id, name: location.name };
  }

  displayVendorName(val: any) {
    if (val) {
      return val.name;
    }
  }

  saveVendor(): void {
    const vendorName = this.vendorForm.get('name')?.value;
    this.vendorForm.disable();
    const vendorFormData = this.vendorForm.value;
    this.svSub = this.vendorsService.createVendor(vendorFormData).subscribe(
      (data) => {
        const vendorData = {
          id: data.id,
          name: data.name,
          description: data.description,
          contacts: data.contacts,
        };
        this.store.dispatch(saveVendorData(vendorData));
        this.vendors$ = this.vendorsService.getVendors();
      },
      (err) => {
        console.error(err);
        this.vendorForm.enable();
      },
      () => {
        this.resetForm();
        this.vendorForm.enable();
        this.notification.success(`Vendor ${vendorName} successfully added!`);
      }
    );
  }

  focusOncountry() {}

  getLocations() {
    this.subGetLocationsSelectVendor = this.selectedVendor$.subscribe(
      (vendor) => {
        if(!vendor.id){
          return;
        }
        this.subGetLocationsReq = this.vendorsService
          .getVendorLocations(vendor.id)
          .subscribe((data) => {
            this.vLocationsOptions$ = data.map((location: any) => ({
              id: location.id,
              city: location.city.name,
              lat: location.latitude,
              long: location.longitude,
            }));
          });
      }
    );
  }

  initCountries() {
    this.subInitCountries = this.http
      .get(API_URL + '/countries')
      .subscribe((data: any) => {
        this.countryOptions = data.map((el: any) => {
          return this.reformatLocation(el);
        });
        this.filteredCountry = this.countryControl.valueChanges.pipe(
          startWith(''),
          map((value) => {
            return this._filter(value);
          })
        );
      });
  }

  initCities() {
    if (!this.currentCountryId) return;
    this.subInitCities = this.http
      .get(API_URL + '/countries/' + this.currentCountryId)
      .subscribe((data: any) => {
        this.cityOptions = data.cities.map((el: any) => {
          return this.reformatLocation(el);
        });
        this.filteredCities = this.cityControl.valueChanges.pipe(
          startWith(''),
          map((value) => {
            return this._filterCity(value);
          })
        );
      });
  }

  private _filter(value: string): any {
    const filterValue = value.toLowerCase();
    return this.countryOptions.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  private _filterCity(value: string): any {
    const filterValue = value.toLowerCase();
    return this.cityOptions.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  resetForm() {
    this.vendorForm.reset();
  }

  clearLocationForms() {
    this.cityControl.patchValue('');
    this.latControl.patchValue('');
    this.longControl.patchValue('');
  }

 // addNewLocation(location: string) {}
}
