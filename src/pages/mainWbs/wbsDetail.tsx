import { WbsTable } from './wbsTable';
import { wbsDetailDatas } from '../../TestDatas/WbsTestDatas';
import { NavBar } from '../../components/NavBar';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useSearchParams } from 'react-router-dom';

export const WbsDetail = (): JSX.Element => {
  // urlからuserを取得し、Filterをかける。
  const [userParam] = useSearchParams();
  const getUserParams = () => {
    const userName = userParam.get('user');
    const filterUserName = wbsDetailDatas.filter((x) => x.rep === userName);
  };
  return (
    <>
      <NavBar />
      <WbsTable wbsTestDatas={wbsDetailDatas} />
    </>
  );
};
