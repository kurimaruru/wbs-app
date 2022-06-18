import { WbsTable } from './wbsTable';
import { wbsTestDatas } from '../../TestDatas/WbsTestDatas';

export const WbsRoot = (): JSX.Element => {
  return <WbsTable wbsTestDatas={wbsTestDatas} />;
};
