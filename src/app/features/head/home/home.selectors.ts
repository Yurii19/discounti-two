import { createSelector } from '@ngrx/store';
import {
  IAppState,
  IFilterControls,
  IFilterFormsValues,
  IFilterState,
  IHomeState,
  IUiConfigState,
} from 'src/app/shared/interfaces';

export const selectFilter = (state: IAppState) => state.filter;
export const selectHome = (state: IAppState)=> state.home;
export const selecUiConfig = (state: IAppState) => state.uiConfig;

export const selectRequestConfig = createSelector(
  selecUiConfig,
  (state: IUiConfigState) => state.requestConfig
);

export const selectMap = createSelector(
  selecUiConfig,
  (state: IUiConfigState) => state.homeIsMap
);

export const selectMarkers = createSelector(selectHome, (state) =>
state.discounts.map((el) => ({
  cords: el.coordinates,
  text: el.name,
}))
);

export const selectDiscounts = createSelector(
  selectHome,
  (state: IHomeState) => state.discounts
);

export const selectFormValues = createSelector(
  selectFilter,
  (state: IFilterState) => state.formValues
);

export const selectChips = createSelector(
  selectFormValues,
  (state: IFilterFormsValues) => state.chips
);

export const selectControls = createSelector(
  selectFilter,
  (state: IFilterState) => state.controlsValues
);
export const selectControlsLocations = createSelector(
  selectControls,
  (state: IFilterControls) => state.locations
);
export const selectControlsCathegories = createSelector(
  selectControls,
  (state: IFilterControls) => state.categories
);
export const selectControlsTags = createSelector(
  selectControls,
  (state: IFilterControls) => state.tags
);
export const selectControlsVendors = createSelector(
  selectControls,
  (state: IFilterControls) => state.vendors
);
