import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ResWbsData } from './apiResType';
import { CustomAxios } from '../CustomAxios';

const customAxios = CustomAxios();

// WBS初期表示
export const callGetWbsAllDatas = createAsyncThunk(
  'wbs/getWbsData',
  async () => {
    console.log('call api getAllWbs');
    try {
      const data = await customAxios
        .get<ResWbsData[]>('/api/wbs')
        .then((res) => res.data)
        .catch((error) => {
          console.log(error);
          throw error;
        });
      return data;
    } catch (e) {
      throw e;
    }
  }
);
// WBS詳細情報取得
export const callGetWbsDetailData = createAsyncThunk(
  'wbs/getDetailWbs',
  async (user: string) => {
    console.log('call api getDetailWbs');
    try {
      const data = await customAxios
        .get<ResWbsData[]>('/api/wbsDetail', {
          params: {
            user: user,
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          console.log(error);
          throw error;
        });
      return data;
    } catch (e) {
      throw e;
    }
  }
);

// WBS更新
export const callPatchWbsData = createAsyncThunk(
  'wbs/patchWbsData',
  async (wbs: ResWbsData) => {
    await customAxios
      .patch(`/api/wbs/${wbs.id}`, {
        mainItem: wbs.mainItem,
        subItem: wbs.subItem,
        plansStartDay: wbs.plansStartDay,
        plansFinishDay: wbs.plansFinishDay,
        resultStartDay: wbs.resultStartDay,
        resultsFinishDay: wbs.resultsFinishDay,
        progress: wbs.progress,
        productionCost: wbs.productionCost,
        rep: wbs.rep,
      })
      .then((res) => res.data)
      .catch((e) => {
        throw e;
      });
  }
);

// wbs削除
export const callDeleteWbsData = createAsyncThunk(
  'wbs/deleteWbsData',
  async (id: number) => {
    await customAxios
      .delete(`/api/wbs/${id}`)
      .then((res) => res.data)
      .catch((e) => {
        throw e;
      });
  }
);

export type WbsState = {
  getWbsAllDataResponce: ResWbsData[] | undefined;
  getwbsDetailResponce: ResWbsData[] | undefined;
  isPosting: boolean;
  isRejected: boolean;
};

const initialState: WbsState = {
  getWbsAllDataResponce: undefined,
  getwbsDetailResponce: undefined,
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

export const wbsSlice = createSlice({
  name: 'wbs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // wbs一覧取得
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
    // wbs詳細取得
    builder.addCase(callGetWbsDetailData.pending, (state) => {
      state.isPosting = true;
      state.isRejected = false;
    });
    builder.addCase(callGetWbsDetailData.fulfilled, (state, action) => {
      state.isPosting = false;
      state.isRejected = false;
      state.getwbsDetailResponce = action.payload;
    });
    builder.addCase(callGetWbsDetailData.rejected, (state) => {
      state.isPosting = false;
      state.isRejected = true;
    });
    // wbs更新
    builder.addCase(callPatchWbsData.pending, (state) => {
      state.isPosting = true;
      state.isRejected = false;
    });
    builder.addCase(callPatchWbsData.fulfilled, (state) => {
      state.isPosting = false;
      state.isRejected = false;
    });
    builder.addCase(callPatchWbsData.rejected, (state) => {
      state.isPosting = false;
      state.isRejected = true;
    });
  },
});
