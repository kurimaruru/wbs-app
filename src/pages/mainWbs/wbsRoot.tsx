import { WbsTable } from './wbsTable';
import { NavBar } from '../../components/NavBar';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  callGetWbsAllDatas,
  callPatchWbsData,
  callDeleteWbsData,
} from '../../redux/wbsSlice';
import { useEffect } from 'react';
import { RootState } from '../../redux/store';

export const WbsRoot = (): JSX.Element => {
  const dispatch = useAppDispatch();

  // WBS一覧画面表示時、wbs一覧取得
  useEffect(() => {
    dispatch(callGetWbsAllDatas());
  }, [dispatch]);

  const wbsState = useAppSelector((state: RootState) => state.wbs);
  return (
    <>
      <NavBar />
      <WbsTable
        wbsDatas={wbsState.getWbsAllDataResponce}
        callGetWbsAllDatas={callGetWbsAllDatas}
        callPatchWbsData={callPatchWbsData}
        callDeleteeWbsData={callDeleteWbsData}
      />
    </>
  );
};
