const initialState = {
  selectedVendor: {
    id: '',
    name: '. . .',
    description: 'description',
    contacts: 'action.contacts ',
  },
};

export function vendorReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case 'SaveVendorData':
      return {
        selectedVendor: {
          id: action.id,
          name: action.name,
          description: action.description,
          contacts: action.contacts,
        },
      };
    default:
      return state;
  }
}
