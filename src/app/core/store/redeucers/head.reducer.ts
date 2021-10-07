import { IHomeState } from "../../../shared/interfaces";
import { initialState } from "./home.reducer";

export function headReducer(state: IHomeState = initialState, action: any) {
  switch (action.type) {
    // case 'searchDiscount':
      // return { ...state, searchIsActive: true };// todo search value or string?
      // return state;
    case 'requestDiscounts':
      return { ...state, discounts: action.data };
    default:
      return state;
  }
}
