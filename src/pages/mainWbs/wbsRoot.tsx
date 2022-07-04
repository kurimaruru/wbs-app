import { WbsTable } from './wbsTable';
import { wbsTestDatas } from '../../TestDatas/WbsTestDatas';
import { NavBar } from '../../components/NavBar';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
export const WbsRoot = (): JSX.Element => {
  const test = useSelector<RootState>((state) => state.counter.value);
  return (
    <>
      <NavBar />
      <WbsTable wbsTestDatas={wbsTestDatas} />
    </>
  );
};
