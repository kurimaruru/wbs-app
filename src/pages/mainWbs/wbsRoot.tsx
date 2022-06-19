import { WbsTable } from './wbsTable';
import { wbsTestDatas } from '../../TestDatas/WbsTestDatas';
import { NavBar } from '../../components/NavBar';
export const WbsRoot = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <WbsTable wbsTestDatas={wbsTestDatas} />
    </>
  );
};
