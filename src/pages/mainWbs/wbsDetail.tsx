import { WbsTable } from './wbsTable';
import { NavBar } from '../../components/NavBar';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { RootState } from '../../redux/store';
import { useSearchParams } from 'react-router-dom';
import {
  callGetWbsDetailData,
  callGetWbsAllDatas,
  callPatchWbsData,
  callDeleteWbsData,
} from '../../redux/wbsSlice';
import { useEffect } from 'react';

export const WbsDetail = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [userParam] = useSearchParams();
  console.log(userParam.get('user'));

  // WBS詳細画面表示時、WBS詳細情報取得
  useEffect(() => {
    const prop = userParam.get('user');
    if (prop !== null) {
      dispatch(callGetWbsDetailData(prop));
    }
  }, [dispatch, userParam]);
  const wbsDetailState = useAppSelector((state: RootState) => state.wbs);
  return (
    <>
      <NavBar />
      <WbsTable
        wbsDatas={wbsDetailState.getwbsDetailResponce}
        callGetWbsAllDatas={callGetWbsAllDatas}
        callPatchWbsData={callPatchWbsData}
        callDeleteeWbsData={callDeleteWbsData}
      />
    </>
  );
};
