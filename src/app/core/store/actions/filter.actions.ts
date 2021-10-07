import { createAction, props } from '@ngrx/store';
import { IDiscount, ILocationCountry, ISimpleVar } from '../../../shared/interfaces';

interface Action {
  type: string;
}

export const getFilteredData = createAction('getFilteredData', props<{data: any}>());

export const requestFilteredData = createAction(
  'requestFilteredData',
  props<{ data: any }>()
);

export const getControlsValues = createAction('getControls');

export const requestControlsValues = createAction(
  'requestControls',
  props<{ data: ILocationCountry }>()
);

export const addChips = createAction('addChip', props<{ tag: ISimpleVar }>());

export const removeChips = createAction('removeChip', props<{ tag: ISimpleVar }>());

export const saveFormsValues = createAction(
  'saveControls',
  props<{ values: any }>()
);
