import {API} from '@lib/API';
import {IInvoice} from '@models/APIModels';
import {SLICE_NAME} from '@models/generalTypes';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {APP_URLS} from '@utilities/constants';
import {APIResponse} from '@utilities/types';
import {getExceptionPayload, showAlertDialog} from '@utilities/utils';

interface AppState {
  invoicesList: IInvoice[];
  loading: boolean;
}

const initialAppState: AppState = {
  invoicesList: [],
  loading: false,
};

export const getInvoicesList = createAsyncThunk(
  'eService/getInvoicesList',
  async (queryParams: string, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const response = await API().get<APIResponse<IInvoice[]>>(
        `${APP_URLS.GET_INVOICES_LIST}?${queryParams}`,
      ); //here you fetch data with catgeories
      return await response.data.data;
    } catch (error) {
      showAlertDialog(getExceptionPayload(error).message);
      return rejectWithValue(getExceptionPayload(error));
    }
  },
);

const dashboardSlice = createSlice({
  name: SLICE_NAME.DASHBOARD,
  initialState: initialAppState,
  reducers: {
    onUpdateInvoiceList: (state, {payload}: PayloadAction<IInvoice[]>) => {
      state.invoicesList = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getInvoicesList.pending, state => {
      state.loading = true;
    });
    builder.addCase(getInvoicesList.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.invoicesList = payload ?? [];
    });
    builder.addCase(getInvoicesList.rejected, (state, {payload}) => {
      state.loading = false;
    });
  },
});

export const DashboardReducer = dashboardSlice.reducer;

export const DashboardAction = {
  ...dashboardSlice.actions,
};
