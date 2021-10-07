export interface IUiConfigState {
  searchIsActive: boolean;
  homeIsMap: boolean;
  appLanguage: string;
  requestConfig: {
    filterRequestParams: string;
    sortValue: string;
  };
}

export interface IFilterState {
  controlsValues: IFilterControls;
  formValues: IFilterFormsValues;
}

export interface ISimpleVar {
  id: string;
  name: string;
}
export interface IFilterFormsValues {
  categories: ISimpleVar[];
  city: ILocationCountry | null;
  vendors: ISimpleVar[];
  chips: ISimpleVar[];
}
export interface IFilterControls {
  locations: ILocationCountry[];
  categories: { id: string; name: string }[];
  tags: { id: string; name: string }[];
  vendors: { id: string; name: string }[];
}
export interface ILocationCountry {
  id: string;
  name: string;
  cities: { id: string; name: string }[];
}

export interface IMapMarker {
  cords: number[][];
  text: string;
}

export interface IDescription {
  id: string;
  value: number,
  discountType: string,
  favorite: boolean;
  active: boolean;
  archived: boolean;
  category:{};
  description: string;
  name: string;
  discountImages: string[];
  endTime: string;
  startTime: string;
  percent: number;
  promo: string;
  tags: any;
  vendor: {
    name: any;
    description: any;
    contacts: any;
  };
  vendorLocations: [
    {
      vendorLocations: any;
      city: {
        countryName: string;
        name: string;
      };
      latitude: number;
      longitude: number;
    }
  ];
}

export interface IDescriptionState {
  description: IDescription;
}

export interface IHomeState {
  sortValue: string;
  discounts: IDiscount[];
}

export interface IAppState {
  home: IHomeState;
  uiConfig: IUiConfigState;
  description: IDescriptionState;
  filter: IFilterState;
  notifications: any;
  vendor: IVendorState;
  statistic:{
    vendors: any;
  }
}

export interface IVendorState {
  selectedVendor: {
    id: string;
    name: string;
    description: string;
    contacts: string;
  };
}

export interface IDiscount {
  id: number;
  name: string;
  vendor: string;
  added: string;
  expired: string;
  location: string;
  tag: string;
  category: string;
  isActive: boolean;
  description: string;
  percent: string;
  image: string;
  coordinates: number[][];
  favorite: boolean;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: string;
  city: {
    id: string;
    name: string;
    countryId: string;
    countryName: string;
  };
}

export interface IUserLogin {
  username: string;
  password: string;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IVendor {
  [x: string]: any;
  id: string;
  name: string;
  description: string;
  vendorLocations: Array<Object>;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface ITag {
  id: string;
  name: string;
}

export interface IFavoritesProfile {
  id: string;
  discount: {
    id: string;
    category: {
      id: string;
      name: string;
    };
    name: string;
    description: string;
    promo: string;
    discountType: string;
    value: number;
    startTime: string;
    endTime: string;
    active: boolean;
    archived: boolean;
    tags: [
      {
        id: string;
        name: string;
      }
    ];
    vendorLocations: [
      {
        id: string;
        latitude: number;
        longitude: number;
        city: {
          id: string;
          name: string;
          countryId: string;
          countryName: string;
        };
      }
    ];
    vendor: {
      id: string;
      name: string;
      description: string;
      contacts: string;
    };
    favorite: boolean;
  };
}

export interface StatisticApi {
  items: VendorStatistic[];
  total_count: number;
}

export interface VendorStatistic {
  numberOfGettingPromo: number;
  name: string;
  discountsNumber: number;
  viewNumber: number;
}

export interface CategoriesStatistic {
  numberOfGettingPromo: number;
  name: string;
  discountsNumber: number;
  viewNumber: number;
}

