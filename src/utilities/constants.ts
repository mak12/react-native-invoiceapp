import {Map} from './types';

export const APP_ACTIONS = {
  LOGOUT: 'Logout',
};
//App urls
export const APP_URLS = {
  BASE_URL: 'https://sandbox.101digital.io/',
  GET_TOKEN: 'token',
  GET_PROFILE: 'membership-service/1.2.0/users/me',
  GET_INVOICES_LIST: 'invoice-service/2.0.0/invoices',
};

// password validations for yup
export const AuthValidations = {
  passwordMin: 3,
  passwordMax: 20,
};

//invoice order status filter data
export const ORDER_STATUS_FILTER_DATA = [
  {
    label: 'All orders',
    value: '',
  },
  {
    label: 'Paid orders',
    value: 'Paid',
  },
  {
    label: 'Due orders',
    value: 'Due',
  },
  {
    label: 'Overdue orders',
    value: 'Overdue',
  },
];
//invoice order sort data
export const ORDER_SORT_DATA = [
  {
    label: 'Ascending order',
    value: 'ASCENDING',
  },
  {
    label: 'Descending order',
    value: 'DESCENDING',
  },
];
// native base config
export const NATIVE_BASE_CONFIG = {
  fontConfig: {
    Poppins: {
      100: {
        normal: 'Poppins-Light',
        italic: 'Poppins-LightItalic',
      },
      200: {
        normal: 'Poppins-Light',
        italic: 'Poppins-LightItalic',
      },
      300: {
        normal: 'Poppins-Light',
        italic: 'Poppins-LightItalic',
      },
      400: {
        normal: 'Poppins-Regular',
        italic: 'Poppins-Italic',
      },
      500: {
        normal: 'Poppins-Medium',
      },
      600: {
        normal: 'Poppins-Medium',
        italic: 'Poppins-MediumItalic',
      },
      700: {
        normal: 'Poppins-SemiBold',
        italic: 'Poppins-SemiBoldItalic',
      },
      800: {
        normal: 'Poppins-Bold',
        italic: 'Poppins-BoldItalic',
      },
      900: {
        normal: 'Poppins-Bold',
        italic: 'Poppins-BoldItalic',
      },
    },
  },
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
    mono: 'Poppins',
  },
  colors: {
    brand: {
      900: '#8287af',
      800: '#7c83db',
      700: '#b3bef6',
    },
    primary: {
      50: '#E3F2F9',
      100: '#C5E4F3',
      200: '#A2D4EC',
      300: '#7AC1E4',
      400: '#47A9DA',
      500: '#0088CC',
      600: '#007AB8',
      700: '#006BA1',
      800: '#005885',
      900: '#003F5E',
    },
  },
};
