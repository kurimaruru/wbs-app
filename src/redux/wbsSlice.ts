import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ResWbsData } from './apiResType';
import axios from 'axios';
import { CustomAxios } from '../CustomAxios';

const customAxios = CustomAxios();

export const callGetWbsAllDatas = createAsyncThunk(
  'wbs/getWbsData',
  async () => {
    console.log('call api');
    try {
      const data = await customAxios
        .get<ResWbsData[]>('/api/wbs')
        .then((res) => res.data)
        .catch((error) => {
          console.log(error);
          throw error;
        });
      console.log(data);
      return data;
    } catch (e) {
      throw e;
    }
  }
);

export type WbsState = {
  getWbsAllDataResponce: ResWbsData[] | undefined;
  isPosting: boolean;
  isRejected: boolean;
};

const initialState: WbsState = {
  getWbsAllDataResponce: undefined,
  isPosting: false,
  isRejected: false,
};

type RootState = {
  wbsData: WbsState;
};

export const WbsDataSelector = (state: RootState) => {
  return state.wbsData.getWbsAllDataResponce;
};

export const isPostingSelector = (state: RootState) => {
  return state.wbsData.isPosting;
};

export const counterSlice = createSlice({
  name: 'wbs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(callGetWbsAllDatas.pending, (state) => {
      state.isPosting = true;
      state.isRejected = false;
    });
    builder.addCase(callGetWbsAllDatas.fulfilled, (state, action) => {
      state.isPosting = false;
      state.isRejected = false;
      state.getWbsAllDataResponce = action.payload;
    });
    builder.addCase(callGetWbsAllDatas.rejected, (state) => {
      state.isPosting = false;
      state.isRejected = true;
    });
  },
});
