import { IDescription } from "../../../shared/interfaces";
import { addToFavourite } from "../actions/description.actions";

export interface DescriptionState {
  description: IDescription | {};
}

export const initialState: DescriptionState = {
  description:{
    id: "b28349b5-0b39-45ee-bb3c-4f96c1abfe75",
    active: true,
    favorite: false,
    category: { name: 'Sport'},
    description: "Initial description",
    archived: false,
    name: "Initial name",
    img:['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVe9r47bhQVcZJ4jEd4wQuYH0LsAz5qKOTBATYRG8c7C3waYKbB2Z1My-HtoY2nzv4XmY&usqp=CAU'],
    endTime: "2021-06-20T12:00:00",
    startTime: '2021-06-20T12:00:00',
    percent: 25,
    promo: 'Some initial promo code',
    tags: [{name:'Yoga'}],
    vendor: "string",
    vendorLocations: [{city: {countryName: 'Initial country', name: 'Initial city'}, latitude:0 ,longitude:0 }]
  }
};

export function descriptionReducer(state: DescriptionState = initialState, action: any) {
  switch (action.type) {
    case 'getDescription':
      return state;
    case 'requestDescription':
      return {
        ...state,
        description: action.data
      };
    case 'addToFavourite':
      return {
        ...state,
        description: action.data
      };
    case 'removeFromFavourite':
      return {
        ...state,
        description: action.data
      };
    default:
      return state;
  }
}
