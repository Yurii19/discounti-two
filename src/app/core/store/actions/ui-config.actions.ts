import { createAction, props } from '@ngrx/store';

interface Action {
  type: string;
}

//export const resetFilterConfigReqest = createAction('resetFilterConfigReqest');

export const setSortValue = createAction(
  'setSortValue',
  props<{ param: string }>()
);

export const setFilterConfigReqest = createAction(
  'setFilterConfigRequestParam',
  props<{ param: string }>()
);

export const setContent = createAction(
  'ToggleHomeContent',
  props<{ isMap: boolean }>()
);

export const setDisable = createAction(
  'FocusBlurSearch',
  props<{ isSearchOnFocus: boolean }>()
);

export const setLanguage = createAction(
  'ToggleLanguage',
  props<{ language: string }>()
);
