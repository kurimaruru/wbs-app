import {
  Box,
  TableCell,
  TableRow,
  IconButton,
  makeStyles,
  Button,
} from '@material-ui/core';
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';
import { useState } from 'react';
import { AccountCircle } from '@material-ui/icons';
// import { DateTime } from 'luxon';
import { round } from 'lodash';
import { WbsCommentTable } from './wbsCommentTable';
import { WbsEditDialog } from '../../components/dialog/wbsEditDialog';
import { WbsDeleteDialog } from '../../components/dialog/wbsDeleteDialog';

const useStyles = makeStyles({
  delay: {
    fontWeight: 'bold',
    color: 'red',
  },
  finish: {
    fontWeight: 'bold',
    color: 'blue',
  },
});

type CommentListType = {
  user: string;
  createTime: string;
  comment: string;
};

type WbsTestData = {
  mainItem: string;
  subItem: string;
  plansStartDay: string;
  plansDayCount: number;
  plansFinishDay: string;
  resultsStartDay: string;
  resultsDayCount: number;
  resultsFinisyDay: string;
  delay: number;
  progress: number;
  productionCosts: number;
  rep: string;
  state: string;
  commentList: CommentListType[];
};

type WbsTableBodyPorps = {
  wbsTestDatas: WbsTestData;
};

export const WbsTableBody = ({
  wbsTestDatas,
}: WbsTableBodyPorps): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // 現在時刻
  // const [nowTime, setNowTime] = useState(DateTime.now());

  // --------------------------------------------
  // 編集ダイアログ
  // --------------------------------------------
  const [openEdit, setOpenEdit] = useState(false);
  const openWbsEditDialog = () => {
    setOpenEdit(true);
  };
  const closeWbsEditDialog = () => {
    setOpenEdit(false);
  };
  // --------------------------------------------
  // 削除ダイアログ
  // --------------------------------------------
  const [openDelete, setOpenDelete] = useState(false);
  const openWbsDeleteDialog = () => {
    setOpenDelete(true);
  };
  const closeWbsDeleteDialog = () => {
    setOpenDelete(false);
  };

  const calculateDelay = (planFinishDay: string, resultFinishDay: string) => {
    let delayDays = '';
    // const finishDay = DateTime.fromSQL(planFinishDay);
    // const delay = nowTime.diff(finishDay, 'days');
    // 進捗が遅れている場合はその日数を返す
    // if (round(delay.days) !== 0 && !resultFinishDay) {
    //   delayDays = round(delay.days).toString();
    //   return <span className={classes.delay}>{`${delayDays}日`}</span>;
    // }
    // 進捗が完了している場合
    if (resultFinishDay) {
      return <span className={classes.finish}>完了</span>;
    }
    return delayDays;
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {wbsTestDatas.mainItem}
        </TableCell>
        <TableCell align='left'>{wbsTestDatas.subItem}</TableCell>
        <TableCell align='left'>{wbsTestDatas.plansFinishDay}</TableCell>
        <TableCell align='left'>{wbsTestDatas.plansDayCount}</TableCell>
        <TableCell align='left'>{wbsTestDatas.plansFinishDay}</TableCell>
        <TableCell align='left'>{wbsTestDatas.resultsStartDay}</TableCell>
        <TableCell align='left'>{wbsTestDatas.resultsDayCount}</TableCell>
        <TableCell align='left'>{wbsTestDatas.resultsFinisyDay}</TableCell>
        <TableCell align='left'>{wbsTestDatas.progress}</TableCell>
        <TableCell align='left'>{wbsTestDatas.productionCosts}</TableCell>
        <TableCell align='left'>
          <Box style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <AccountCircle />
            {wbsTestDatas.rep}
          </Box>
        </TableCell>
        <TableCell align='left'>
          {calculateDelay(
            wbsTestDatas.plansFinishDay,
            wbsTestDatas.resultsFinisyDay
          )}
        </TableCell>
        <TableCell>
          <Button
            color='primary'
            variant='contained'
            onClick={openWbsEditDialog}
          >
            編集
          </Button>
        </TableCell>
        <TableCell>
          <Button
            color='secondary'
            variant='contained'
            onClick={openWbsDeleteDialog}
          >
            削除
          </Button>
        </TableCell>
      </TableRow>
      <WbsCommentTable open={open} commentHist={wbsTestDatas.commentList} />
      <WbsEditDialog
        wbsData={wbsTestDatas}
        open={openEdit}
        closeEditDialog={closeWbsEditDialog}
      />
      <WbsDeleteDialog
        open={openDelete}
        closeDeleteDialog={closeWbsDeleteDialog}
        mainItem={wbsTestDatas.mainItem}
      />
    </>
  );
};
