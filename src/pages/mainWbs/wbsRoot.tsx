import { WbsTable } from './wbsTable';
import { wbsTestDatas } from '../../TestDatas/WbsTestDatas';
import { NavBar } from '../../components/NavBar';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { callGetWbsAllDatas, WbsDataSelector } from '../../redux/wbsSlice';
import { useCallback, useEffect } from 'react';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

export const WbsRoot = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const getWbsAllData = useCallback(async () => {
    try {
      const res = callGetWbsAllDatas();
      return res;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }, []);

  // 初期表示
  getWbsAllData();

  const wbsState = useSelector((state: RootState) => state.wbs);
  console.log(wbsState);
  return (
    <>
      <NavBar />
      <WbsTable wbsTestDatas={wbsTestDatas} />
    </>
  );
};

//(state: CombinedState<{ wbs: WbsState; }>)
//=> WbsTestData[] | undefined'

//(state: RootState) => WbsTestData[] | undefined'
