import { IHomeState } from '../../../shared/interfaces';

export const initialState: IHomeState = {
  sortValue: '',
  discounts: [
    {
      id: 0,
      name: 'Very long discount name very long discount name',
      vendor: 'Discount vendor0',
      added: '2021-06-20T12:00:00',
      expired: '2021-07-20T12:00:00',
      location: 'Vitebsk',
      tag: 'tag',
      category: 'category',
      favorite: false,
      isActive: true,
      description:
        'Here is a short description Here is a short description Here is a short description Here is a short description',
      percent: '10%',
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      coordinates: [[49.094, 28.981]],
    },
    {
      id: 0,
      name: 'Very long discount name very long discount name',
      vendor: 'Discount vendor0',
      added: '2021-06-20T12:00:00',
      expired: '2021-07-20T12:00:00',
      location: 'Vitebsk',
      favorite: false,
      tag: 'tag',
      category: 'category',
      isActive: true,
      description: ' Here is a short description Here is a short description',
      percent: '15%',
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      coordinates: [[50.094, 26.981]],
    },
  ],
};

export function homeReducer(state: IHomeState = initialState, action: any) {
  switch (action.type) {
    case 'setSortValue':
      return { ...state, sortValue: action.value };
    case 'requestDiscounts':
      return { ...state, discounts: action.data };
    case 'getNewDiscounts':
      return state;
    case 'addDiscount':
      const newState = {
        ...state,
        ...{ discounts: [...state.discounts, action.newDiscount] },
      };
      return newState;
    default:
      return state;
  }
}
