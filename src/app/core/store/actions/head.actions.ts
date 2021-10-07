import { createAction, props } from '@ngrx/store';

interface Action {
  type: string;
}

export const searchDiscount = createAction(
  'searchDiscount',
  props<{ searchText: string }>()
);
