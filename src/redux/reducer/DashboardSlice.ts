import {
  IActiveWorkOrders,
  IAppliances,
  IAppliancesBrand,
  IWoCategory,
} from '@models/APIModels';
import {SLICE_NAME} from '@models/generalTypes';
import {store} from '@redux/store';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {APP_URLS} from '@utilities/constants';
import {getExceptionPayload, Logger} from '@utilities/utils';
import API from '../../lib/API';

interface AppState {
  activeWorkOrders: IActiveWorkOrders[];
  brands: IAppliancesBrand[];
  woCategories: IWoCategory[];
  loading: boolean;
}

const initialAppState: AppState = {
  activeWorkOrders: [],
  brands: [],
  woCategories: [],
  loading: false,
};

export const getActiveWorkOrders = createAsyncThunk(
  'eService/getActiveWorkOrders',
  async (customerId: number, thunkAPI) => {
    Logger.log('customerId ', customerId);
    const {rejectWithValue} = thunkAPI;
    try {
      const response = await API.post<IActiveWorkOrders[]>(
        `${APP_URLS.GET_ACTIVE_WORK_ORDERS}${customerId}`,
      ); //here you fetch data with catgeories
      return await response.data;
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error));
    }
  },
);

export const getBrands = createAsyncThunk(
  'eService/getBrands',
  async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const response = await API.post<IAppliancesBrand[]>(
        `${APP_URLS.GET_APPLIANCES_BRANDS}`,
      ); //here you fetch data with catgeories
      return await response.data;
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error));
    }
  },
);

export const getWoCategories = createAsyncThunk(
  'eService/getWoCategories',
  async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const response = await API.post<IWoCategory[]>(
        `${APP_URLS.GET_WOCATEGORIES}`,
      ); //here you fetch data with catgeories
      return await response.data;
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error));
    }
  },
);
const dashboardSlice = createSlice({
  name: SLICE_NAME.DASHBOARD,
  initialState: initialAppState,
  reducers: {
    onSetArticleQuerry: (state, {payload}: PayloadAction<string>) => {},
    onSetAppliances: (state, {payload}: PayloadAction<[]>) => {
      state.activeWorkOrders = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getActiveWorkOrders.pending, state => {
      state.loading = true;
    });
    builder.addCase(getActiveWorkOrders.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.activeWorkOrders = payload;
    });
    builder.addCase(getActiveWorkOrders.rejected, (state, {payload}) => {
      state.loading = false;
    });
    //get brands
    builder.addCase(getBrands.pending, state => {
      // state.loading = true;
    });
    builder.addCase(getBrands.fulfilled, (state, {payload}) => {
      // state.loading = false;
      state.brands = payload;
    });
    builder.addCase(getBrands.rejected, (state, {payload}) => {
      // state.loading = false;
    });
    //get wocategories
    builder.addCase(getWoCategories.pending, state => {
      // state.loading = true;
    });
    builder.addCase(getWoCategories.fulfilled, (state, {payload}) => {
      // state.loading = false;
      state.woCategories = payload;
    });
    builder.addCase(getWoCategories.rejected, (state, {payload}) => {
      // state.loading = false;
    });
  },
});

export const DashboardReducer = dashboardSlice.reducer;

export const DashboardAction = {
  ...dashboardSlice.actions,
};
