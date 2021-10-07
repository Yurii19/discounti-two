import { createAction, props } from '@ngrx/store';

interface Action {
  type: string;
}

export const getDescription = createAction(
  'getDescription',
  props<{ id: string }>()
);

export const requestDescription = createAction(
  'requestDescription',
  props<{ data: any }>()
);

export const addToFavourite = createAction(
  'addToFavourite',
  props<{ discountId: string}>()
);

export const removeFromFavourite = createAction(
  'removeFromFavourite',
  props<{ discountId: string}>()
);
