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

  useEffect(() => {
    dispatch(callGetWbsAllDatas());
  }, [dispatch]);

  const wbsState = useSelector((state: RootState) => state.wbs);
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
