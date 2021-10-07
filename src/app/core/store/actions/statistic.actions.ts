import { createAction, props } from '@ngrx/store';

interface Action {
  type: string;
}

export const getStatisticVendors = createAction(
  'getStatisticVendors',
    props<{ sortBy:string, sortDirection:string, page:number }>()
);

