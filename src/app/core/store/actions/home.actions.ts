import { createAction, props } from '@ngrx/store';
import { IDiscount } from '../../../shared/interfaces';

interface Action {
  type: string;
}

// export const setSortValue = createAction(
//   'setSortValue',
//   props<{ value: string }>()
// );

export const getNewDiscounts = createAction(
  'getNewDiscounts',
  props<{ sortParam: string }>()
);

export const requestDiscounts = createAction(
  'requestDiscounts',
  props<{ data: any }>()
);

export const addDiscount = createAction(
  'addDiscount',
  props<{ newDiscount: IDiscount }>()
);
