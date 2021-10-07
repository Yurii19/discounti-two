import { IFilterState } from 'src/app/shared/interfaces';

export const initialState: IFilterState = {
  controlsValues: {
    locations: [
      {
        id: '0',
        name: 'Belarus',
        cities: [
          { id: '0', name: 'Minsk' },
          { id: '1', name: 'Mogilev' },
          { id: '2', name: 'Grodno' },
          { id: '3', name: 'Gomel' },
        ],
      },
    ],
    categories: [
      { id: '0', name: 'Food' },
      { id: '1', name: 'Gadzhets' },
    ],
    tags: [
      { id: '0', name: 'Apple' },
      { id: '1', name: 'Samsung' },
      { id: '2', name: 'Manicure' },
      { id: '3', name: 'Vocation' },
      { id: '4', name: 'Cinema' },
      { id: '5', name: 'Yoga' },
    ],
    vendors: [
      { id: '0', name: 'Vylka' },
      { id: '1', name: 'Stara poshta' },
    ],
  },

  formValues: {
    categories: [],
    city: null,
    vendors: [],
    chips: [],
  },
};

export function filterReducer(state: IFilterState = initialState, action: any) {
  switch (action.type) {
    case 'requestFilteredData':
      console.log(action.data);
      return state;

    case 'getFilteredData':
      return state;

    case 'saveControls':
      return { ...state, formValues: action.values };

    case 'requestControlsValues':
      return { ...state, controlsValues: action.data };

    case 'getControls':
      return state;

    case 'addChip':
      if (action.tag.name === 'resetSelectedTags') {
        return { ...state, formValues: { ...state.formValues, chips: [] } };
      }
      if (state.formValues.chips.includes(action.tag)) {
        return state;
      }
      return {
        ...state,
        formValues: {
          ...state.formValues,
          chips: [...state.formValues.chips, action.tag],
        },
      };

    case 'removeChip':
      return {
        ...state,
        formValues: {
          ...state.formValues,
          chips: [
            ...state.formValues.chips.filter((el: any) => el !== action.tag),
          ],
        },
      };
    default:
      return state;
  }
}
