import { MenuItem } from '@material-ui/core';
import { useMemo, useState } from 'react';
import { uniq } from 'lodash';
import { Link } from 'react-router-dom';
import { ResWbsData } from '../../redux/apiResType';

type WbsDetailLinkPorps = {
  wbsDatas: ResWbsData[];
};

export const WbsDetailLink = ({
  wbsDatas,
}: WbsDetailLinkPorps): JSX.Element => {
  const repList = useMemo(() => {
    const rep = wbsDatas.map((data) => data.rep);
    return uniq(rep);
  }, [wbsDatas]);
  // mapループ時のキー
  let key = 0;
  const createKey = () => {
    key += 1;
    return key;
  };
  return (
    <>
      <Link to={`/wbs`} style={{ textDecoration: 'none', color: 'black' }}>
        <MenuItem>全て</MenuItem>
      </Link>
      {repList.map((rep) => (
        <Link
          to={`/wbsdetail?user=${rep}`}
          style={{ textDecoration: 'none', color: 'black' }}
          key={createKey()}
        >
          <MenuItem>{rep}</MenuItem>
        </Link>
      ))}
    </>
  );
};
