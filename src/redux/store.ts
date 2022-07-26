import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { wbsSlice } from './wbsSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// ルートとなるReducerを作成
const rootReducer = combineReducers({
  wbs: wbsSlice.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
