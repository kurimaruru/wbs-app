import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommentListType, ResWbsData } from './apiResType';
import { CustomAxios } from '../CustomAxios';

const customAxios = CustomAxios();

// WBS初期表示
export const callGetWbsAllDatas = createAsyncThunk(
  'wbs/getWbsData',
  async () => {
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

// WBS新規作成
export const callPostWbsData = createAsyncThunk(
  'wbs/postWbsData',
  async (wbs: ResWbsData) => {
    await customAxios
      .post('/api/wbs', {
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

// コメント取得
export const callGetCommentData = createAsyncThunk(
  'wbs/getComment',
  async (id: number) => {
    const data = await customAxios
      .get<CommentListType[]>(`/api/comment/${id}`)
      .then((res) => res.data)
      .catch((e) => {
        throw e;
      });
    return data;
  }
);

// コメント新規作成
export const callPostCommentData = createAsyncThunk(
  'wbs/postCommentData',
  async (comment: CommentListType) => {
    await customAxios
      .post('/api/comment', {
        wbsId: comment.wbsId,
        user: comment.user,
        comment: comment.comment,
        confirmFlag: comment.confirmFlag,
      })
      .then((res) => res.data)
      .catch((e) => {
        throw e;
      });
  }
);

// コメント更新
export const callPatchCommentData = createAsyncThunk(
  'wbs/patchCommentData',
  async (comment: CommentListType) => {
    await customAxios
      .patch(`/api/comment/${comment.wbsId}`, {
        wbsId: comment.wbsId,
        user: comment.user,
        comment: comment.comment,
      })
      .then((res) => res.data)
      .catch((e) => {
        throw e;
      });
  }
);

// コメント削除
export const callDeleteCommentData = createAsyncThunk(
  'wbs/deleteCommentData',
  async (id: number) => {
    await customAxios
      .delete(`/api/comment/${id}`)
      .then((res) => res.data)
      .catch((e) => {
        throw e;
      });
  }
);

// カレンダー上でWBSのスケジュール更新
export const callPatchWbsOnCalendar = createAsyncThunk(
  'wbs/patchWbsOnCalendar',
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

// カレンダー上でWBSのスケジュール削除
export const callDeleteWbsDataOnCalendar = createAsyncThunk(
  'wbs/deleteWbsOnCalendar',
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
  getCommentResponce: CommentListType[] | undefined;
  isPosting: boolean;
  isRejected: boolean;
};

const initialState: WbsState = {
  getWbsAllDataResponce: undefined,
  getwbsDetailResponce: undefined,
  getCommentResponce: undefined,
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
    // wbs新規作成
    builder.addCase(callPostWbsData.pending, (state) => {
      state.isPosting = true;
      state.isRejected = false;
    });
    builder.addCase(callPostWbsData.fulfilled, (state) => {
      state.isPosting = false;
      state.isRejected = false;
    });
    builder.addCase(callPostWbsData.rejected, (state) => {
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
    // wbs削除
    builder.addCase(callDeleteWbsData.pending, (state) => {
      state.isPosting = true;
      state.isRejected = false;
    });
    builder.addCase(callDeleteWbsData.fulfilled, (state) => {
      state.isPosting = false;
      state.isRejected = false;
    });
    builder.addCase(callDeleteWbsData.rejected, (state) => {
      state.isPosting = false;
      state.isRejected = true;
    });
    // comment取得
    builder.addCase(callGetCommentData.pending, (state) => {
      state.isPosting = true;
      state.isRejected = false;
    });
    builder.addCase(callGetCommentData.fulfilled, (state, action) => {
      state.isPosting = false;
      state.isRejected = false;
      state.getCommentResponce = action.payload;
    });
    builder.addCase(callGetCommentData.rejected, (state) => {
      state.isPosting = false;
      state.isRejected = true;
    });
    // コメント新規作成
    builder.addCase(callPostCommentData.pending, (state) => {
      state.isPosting = true;
      state.isRejected = false;
    });
    builder.addCase(callPostCommentData.fulfilled, (state) => {
      state.isPosting = false;
      state.isRejected = false;
    });
    builder.addCase(callPostCommentData.rejected, (state) => {
      state.isPosting = false;
      state.isRejected = true;
    });
    // コメント更新
    builder.addCase(callPatchCommentData.pending, (state) => {
      state.isPosting = true;
      state.isRejected = false;
    });
    builder.addCase(callPatchCommentData.fulfilled, (state) => {
      state.isPosting = false;
      state.isRejected = false;
    });
    builder.addCase(callPatchCommentData.rejected, (state) => {
      state.isPosting = false;
      state.isRejected = true;
    });
    // コメント削除
    builder.addCase(callDeleteCommentData.pending, (state) => {
      state.isPosting = true;
      state.isRejected = false;
    });
    builder.addCase(callDeleteCommentData.fulfilled, (state) => {
      state.isPosting = false;
      state.isRejected = false;
    });
    builder.addCase(callDeleteCommentData.rejected, (state) => {
      state.isPosting = false;
      state.isRejected = true;
    });
    // カレンダー上でwbs更新
    builder.addCase(callPatchWbsOnCalendar.pending, (state) => {
      state.isPosting = true;
      state.isRejected = false;
    });
    builder.addCase(callPatchWbsOnCalendar.fulfilled, (state) => {
      state.isPosting = false;
      state.isRejected = false;
    });
    builder.addCase(callPatchWbsOnCalendar.rejected, (state) => {
      state.isPosting = false;
      state.isRejected = true;
    });
    // カレンダー上でwbs削除
    builder.addCase(callDeleteWbsDataOnCalendar.pending, (state) => {
      state.isPosting = true;
      state.isRejected = false;
    });
    builder.addCase(callDeleteWbsDataOnCalendar.fulfilled, (state) => {
      state.isPosting = false;
      state.isRejected = false;
    });
    builder.addCase(callDeleteWbsDataOnCalendar.rejected, (state) => {
      state.isPosting = false;
      state.isRejected = true;
    });
  },
});
