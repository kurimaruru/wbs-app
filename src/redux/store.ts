import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './counterSlice';
// ルートとなるReducerを作成
const rootReducer = combineReducers({
  counter: counterSlice.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
