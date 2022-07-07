import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    // 裏側でActionCreaterも作成されている。
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// ActionsCreaterをエクスポート。ViewへExportする必要がある。
export const { increment, decrement } = counterSlice.actions;
