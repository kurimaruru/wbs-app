import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './counterSlice';
// ルートとなるReducerを作成
const rootReducer = combineReducers({
  counter: counterSlice.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
});

// issue-1を作成
// merge request test
// バックマージ練習
// プルリク練習
