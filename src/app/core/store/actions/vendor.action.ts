import { createAction, props } from '@ngrx/store';

export const saveVendorData = createAction(
  'SaveVendorData',
  props<{ id: string , name: string, description: string, contacts: string}>()
);

