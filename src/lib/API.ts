import {AtuhActions} from '@redux/reducer/AuthSlice';
import {store} from '@redux/store';
import {APP_URLS} from '@utilities/constants';
import {APIError} from '@utilities/types';
import {Logger, showAlertDialog} from '@utilities/utils';
import axios, {AxiosRequestConfig} from 'axios';

const instance = axios.create({
  baseURL: APP_URLS.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//interceptor for request
instance.interceptors.request.use(
  config => {
    const {token, org_token} = store.getState().auth;
    Logger.log('request url ', config.baseURL);
    Logger.log('request url ', config.url);

    if (token) {
      config.headers!!['Authorization'] = 'Bearer ' + token;
    }
    if (org_token !== '') {
      config.headers!!['org-token'] = org_token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

//interceptor for response
instance.interceptors.response.use(
  res => {
    return res;
  },
  async err => {
    // const token = store.getState().auth.token;
    const originalConfig = err.config;
    const requestUrl = originalConfig.url as String;
    Logger.warn('request url err', err.response.status);
    Logger.warn('request url err-', !originalConfig._retry);

    if (!requestUrl.includes(APP_URLS.GET_TOKEN) && err.response) {
      // Access Token was expired
      // here add logic to refresh token or logout user
      if (err.response.status === 401 && !originalConfig._retry) {
        showAlertDialog('Your session has expired. Please login again.');
        store.dispatch(AtuhActions.onLogout());
        // originalConfig._retry = true;

        // try {
        //   const rs = await instance.post("/auth/refreshtoken");
        //   const { accessToken } = rs.data;
        //   dispatch(refreshToken(accessToken));
        //   return axiosInstance(originalConfig);
        // } catch (_error) {
        //   return Promise.reject(_error);
        // }
      }
    }

    return Promise.reject(err);
  },
);

export const API = () => {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}) => {
      return instance.get<T>(url, config);
    },
    delete: <T>(url: string, config: AxiosRequestConfig = {}) => {
      return instance.delete<T>(url, config);
    },
    put: <T>(url: string, body?: unknown, config: AxiosRequestConfig = {}) => {
      return instance.put<T>(url, body, config);
    },
    post: <T>(url: string, body?: unknown, config: AxiosRequestConfig = {}) => {
      return instance.post<T>(url, body, config);
    },
  };
};
export default instance;

export const InternalError: APIError = {
  message: 'Some error occured',
  code: -500,
};
