import {Alert} from 'react-native';
import {APIError} from './types';
import {InternalError} from '@lib/API';
import axios, {AxiosError} from 'axios';

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
