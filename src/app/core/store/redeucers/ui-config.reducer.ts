import { IUiConfigState } from '../../../shared/interfaces';
import {createAction, props} from "@ngrx/store";

export const initialState: IUiConfigState = {
  searchIsActive: false,
  homeIsMap: false,
  appLanguage: 'en',
  requestConfig: {
    filterRequestParams: '',
    sortValue: '',
  },
}

export function uiConfigReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case 'setSortValue':
      return {
        ...state,
        requestConfig: { ...state.requestConfig, sortValue: action.param },
      };
    case 'setFilterConfigRequestParam':
      return {
        ...state,
        requestConfig: {
          ...state.requestConfig,
          filterRequestParams: action.param,
        },
      };
    case 'ToggleHomeContent': //ToggleHomeContent
      return { ...state, homeIsMap: action.isMap };
      case 'FocusBlurSearch':
      return { ...state, searchIsActive: action.isSearchOnFocus };
    case 'ToggleLanguage':
      return { ...state, appLanguage: action.language };
    default:
      return state;
  }
}
