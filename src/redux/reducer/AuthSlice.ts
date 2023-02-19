import {IAuthResponse, IProfileResponse} from '@models/APIModels';
import {SLICE_NAME} from '@models/generalTypes';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {APP_URLS} from '@utilities/constants';
import {APIResponse} from '@utilities/types';
import {getExceptionPayload, showAlertDialog} from '@utilities/utils';
import API from '../../lib/API';

export interface AuthStateType {
  token: string;
  org_token: string;
  userData: IAuthResponse;
  loading: boolean;
  isLoggedIn: boolean;
  profileData: IProfileResponse;
}

export const initialAppState: AuthStateType = {
  token: '',
  org_token: '',
  isLoggedIn: false,
  loading: false,
  userData: {
    access_token: '',
    refresh_token: '',
    id_token: '',
    scope: '',
    token_type: '',
    expires_in: 0,
  },
  profileData: {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    status: '',
    memberships: [],
  },
};

// for login purposes
export const authLogin = createAsyncThunk(
  'simpleInvoice/authLogin',
  async (
    {
      userName,
      password,
    }: {
      userName: string;
      password: string;
    },
    thunkAPI,
  ) => {
    const {rejectWithValue, dispatch} = thunkAPI;
    try {
      /**
       * temp setting these secret keys here, they will be fetched from .env file,
       * env isnt working becuase of some issues in setup,  because of little time will debug that latter
       */
      const reqData = new URLSearchParams({
        client_id: 'oO8BMTesSg9Vl3_jAyKpbOd2fIEa',
        client_secret: '0Exp4dwqmpON_ezyhfm0o_Xkowka',
        scope: 'openid',
        grant_type: 'password',
        username: userName,
        password: password,
      });
      const response = await API.post<IAuthResponse>(
        APP_URLS.GET_TOKEN,
        reqData.toString(),
        {headers: {'content-type': 'application/x-www-form-urlencoded'}},
      );
      dispatch(getProfile(response.data.access_token));
      return await response.data;
    } catch (error) {
      showAlertDialog(getExceptionPayload(error).message);
      return rejectWithValue(getExceptionPayload(error));
    }
  },
);

//get profile for getting user's profile and org-token that will be used in next calls
export const getProfile = createAsyncThunk(
  'simpleInvoice/getProfile',
  async (token: string, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const response = await API.get<APIResponse<IProfileResponse>>(
        APP_URLS.GET_PROFILE,
        {headers: {Authorization: 'Bearer ' + token}},
      );
      return await response.data.data;
    } catch (error) {
      showAlertDialog(getExceptionPayload(error).message);
      return rejectWithValue(getExceptionPayload(error));
    }
  },
);

const authSlice = createSlice({
  name: SLICE_NAME.AUTH,
  initialState: initialAppState,
  reducers: {
    onSetToken: (state, {payload}: PayloadAction<string>) => {
      state.token = payload;
    },
    onLogout: state => {
      state.token = '';
      state.org_token = '';
      state.userData = initialAppState.userData;
      state.profileData = initialAppState.profileData;
      state.isLoggedIn = false;
    },
    onLogin: state => {
      state.isLoggedIn = true;
    },
    onLoadApp: state => {
      state.loading = true;
    },
  },
  extraReducers: builder => {
    builder.addCase(authLogin.pending, state => {
      state.loading = true;
    });
    builder.addCase(authLogin.fulfilled, (state, {payload}) => {
      state.token = payload.access_token;
      state.userData = payload;
    });
    builder.addCase(authLogin.rejected, (state, {payload}) => {
      state.loading = false;
    });
    builder.addCase(getProfile.pending, state => {
      state.loading = true;
    });
    builder.addCase(getProfile.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.profileData = payload ?? initialAppState.profileData;
      state.org_token = payload?.memberships.length
        ? payload?.memberships[0].token
        : '';
      state.isLoggedIn = true;
    });
    builder.addCase(getProfile.rejected, (state, {payload}) => {
      state.loading = false;
    });
  },
});

export const AuthReducer = authSlice.reducer;

export const AtuhActions = {
  ...authSlice.actions,
};
