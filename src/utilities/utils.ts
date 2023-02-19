import {Alert} from 'react-native';
import {APIError} from './types';
import {InternalError} from '@lib/API';
import axios, {AxiosError} from 'axios';
import * as Yup from 'yup';
import {AuthValidations} from './constants';

//common logger (have to use JSON.stringify to be able to see logs in flipper using ios simulator)
export const Logger = {
  log: (...args: any[]) => {
    if (__DEV__) console.log('Mobile App : ', JSON.stringify(args));
  },
  warn: (...args: any[]) => {
    if (__DEV__) console.warn('Mobile App : ', JSON.stringify(args));
  },
};

//common are strings equal
export const areStringsEqual = (
  firstString: string,
  secondString: string,
): boolean =>
  firstString.toLocaleLowerCase() === secondString.toLocaleLowerCase();

//common string included
export const isStringIncluded = (
  firstString: string,
  secondString: string,
): boolean =>
  firstString.toLocaleLowerCase().includes(secondString.toLocaleLowerCase());

//generic alert for messages
export const showAlertDialog = (
  msg?: string,
  title?: string,
  allowCancel?: boolean,
  onOkPressed?: () => void,
) => {
  Alert.alert(
    title ? title : 'Mobile App',
    msg,
    allowCancel
      ? [
          {
            text: 'CANCEL',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              onOkPressed && onOkPressed();
            },
            style: 'default',
          },
        ]
      : [
          {
            text: 'OK',
            onPress: () => {},
            style: 'cancel',
          },
        ],
    {
      cancelable: false,
    },
  );
};

//common handler for axios error
export const getExceptionPayload = (
  error: AxiosError | Error | any,
): APIError => {
  Logger.log('err ', error);

  if (axios.isAxiosError(error)) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.data) {
        return {
          message: error.response.data[`title`] ?? 'Something went wrong',
          code: error.response.status,
        };
      } else {
        return {
          message: error.message,
          code: error.response.status ?? -500,
        };
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return {
        message: error.request,
        code: error.status ?? -500,
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      return {
        message: error.message,
        code: error.status ?? -500,
      };
    }
  } else {
    Logger.log('err else', error.response);
    return InternalError;
  }
};

//Login YUP validations
export const GetLoginFormValidations = () =>
  Yup.object().shape({
    password: Yup.string()
      .min(AuthValidations.passwordMin, 'Too Short!')
      .max(AuthValidations.passwordMax, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

//Create invoice YUP validations
export const GetCreateInvoiceFormValidations = () =>
  Yup.object().shape({
    reference: Yup.string()
      .required('Enter reference')
      .matches(/^[0-9]+$/, 'Must be only digits'),
    date: Yup.date()
      .max(
        new Date().toISOString().substring(0, 10),
        'Date cannot be of future',
      )
      .required(),
    description: Yup.string().required('Enter description'),
    amount: Yup.string().required('Enter amount'),
  });

export const RandomNumberGenerator = (limit: number) => {
  return Math.random()
    .toString()
    .slice(2, 2 + limit);
};

//get random description
export const GetRandomDescription = (randomNumber: number) => {
  let vehicles = [
    'Honda 125',
    'Suzuki 250',
    'Baneli 150',
    'Vitz 2010',
    'Accord 2000',
    'Yamaha 125',
    'Suzuki 150',
    'Mehran 2010',
  ];
  return randomNumber < vehicles.length
    ? vehicles[randomNumber]
    : 'Accord 2000';
};
