import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { IDiscount, IAppState, IMapMarker } from 'src/app/shared/interfaces';

import { Store } from '@ngrx/store';
import {
  setContent,
  setSortValue,
} from 'src/app/core/store/actions/ui-config.actions';
import { HttpClient } from '@angular/common/http';
import { getNewDiscounts } from 'src/app/core/store/actions/home.actions';
import { HomeService } from 'src/app/core/services/home.service';
import {
  selectDiscounts,
  selectMarkers,
  selectMap,
  selectRequestConfig,
} from '../home.selectors';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @Input() isSearchOnFocus$: Observable<boolean> | undefined;

  isMap: Observable<boolean>;
  discountsData: Observable<IDiscount[]>;
  markers$: Observable<IMapMarker[]>;

  sortControl: FormControl;
  observableRequestConfig: Observable<any>;
  subscribedRequestConfig: Subscription;
  sortValuesSet: any;

  filterRequestParam: string | undefined;

  currentSortValue: any;

  constructor(
    private store: Store<IAppState>,
    private http: HttpClient,
    private filterService: HomeService
  ) {
    this.sortValuesSet = [
      { value: 'id', uiValue: 'COMMON.Home.default' },
      { value: 'startTime', uiValue: 'COMMON.Home.startTime' },
      { value: 'endTime', uiValue: 'COMMON.Home.endTime' },
      { value: 'name', uiValue: 'COMMON.Home.name' },
    ];

    this.isMap = this.store.select(selectMap);

    this.discountsData = this.store.select(selectDiscounts);

    this.markers$ = this.store.select(selectMarkers);

    this.sortControl = new FormControl();

    this.observableRequestConfig = this.store.select(selectRequestConfig);

    this.subscribedRequestConfig = this.observableRequestConfig.subscribe(
      (data) => {
        const sortParam = data.sortValue;
        const filterParam = data.filterRequestParams;
        let fullParamRequest = '';
        fullParamRequest += sortParam || filterParam ? '?' : '';
        fullParamRequest += filterParam;
        fullParamRequest +=
          filterParam && sortParam
            ? `&sortBy=${sortParam}`
            : sortParam
            ? `sortBy=${sortParam}`
            : '';
        this.store.dispatch(getNewDiscounts({ sortParam: fullParamRequest }));

        return (this.filterRequestParam = data);
      }
    );
    // END OF CONSTRUCTOR
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscribedRequestConfig.unsubscribe();
  }
  setIsMap(val: any): void {
    this.store.dispatch(setContent({ isMap: val !== 'list' }));
  }

  sortDiscountsData(value: string): void {
    this.store.dispatch(setSortValue({ param: value }));
  }
}
