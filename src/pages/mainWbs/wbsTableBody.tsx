import {
  Box,
  TableCell,
  TableRow,
  IconButton,
  makeStyles,
  Button,
} from '@material-ui/core';
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useCallback, useState, useMemo, useEffect } from 'react';
import { AccountCircle } from '@material-ui/icons';
// import { DateTime } from 'luxon';
import { round } from 'lodash';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { WbsCommentTable } from './wbsCommentTable';
import { WbsEditDialog } from '../../components/dialog/wbsEditDialog';
import { WbsDeleteDialog } from '../../components/dialog/wbsDeleteDialog';
import { ResultDialog } from '../../components/dialog/resultDialog';
import { CommentListType, ResWbsData } from '../../redux/apiResType';
import { AsyncThunk } from '@reduxjs/toolkit';
import { NotificationBar } from '../../components/NotificationBar';

const useStyles = makeStyles({
  delay: {
    fontSize: '10px',
    fontWeight: 'bold',
    color: 'red',
  },
  finish: {
    fontWeight: 'bold',
    color: 'blue',
  },
  tableRow: {
    backgroundColor: '#f4f4f4',
  },
  tableCell: {
    padding: '0px',
  },
});

type WbsTableBodyPorps = {
  wbsDatas: ResWbsData;
  /** wbs一覧取得 */
  callGetWbsAllDatas: AsyncThunk<ResWbsData[], void, {}>;
  /** wbs更新 */
  callPatchWbsData: AsyncThunk<void, ResWbsData, {}>;
  /** wbs削除 */
  callDeleteeWbsData: AsyncThunk<void, number, {}>;
  /** コメント取得 */
  callGetCommentData: AsyncThunk<CommentListType[], number, {}>;
};

export const WbsTableBody = ({
  wbsDatas,
  callGetWbsAllDatas,
  callPatchWbsData,
  callDeleteeWbsData,
  callGetCommentData,
}: WbsTableBodyPorps): JSX.Element => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // 現在時刻
  const [nowTime] = useState(DateTime.now());


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
  // --------------------------------------------
  // 処理結果ダイアログ
  // --------------------------------------------
  const [openResult, setOpenResult] = useState(false);
  const [actionResult, setActionResult] = useState('');
  const openWbsResultDialog = () => {
    setOpenResult(true);
  };
  const closeWbsResultDialog = () => {
    setOpenResult(false);
    // 再レンダリング
    dispatch(callGetWbsAllDatas());
  };
  /**
   * 開始日、終了日の差分日数を計算する
   * @param planStartDay
   * @param planFinishDay
   * @returns
   */
  const calculatePlanDayCount = (
    planStartDay: string,
    planFinishDay: string
  ) => {
    // 終了日が入力されていない場合、空文字を返す。
    if (!planFinishDay) {
      return '';
    }
    // 両方がundefinedじゃないとき計算を行う。
    if (planStartDay && planFinishDay) {
      const start = DateTime.fromSQL(planStartDay);
      const finish = DateTime.fromSQL(planFinishDay);
      const dayCount = finish.diff(start, 'days');
      const roundDayCount = round(dayCount.days).toString();
      return roundDayCount;
    }
  };
  /**
   * 進捗の遅れを計算する関数
   * @param planFinishDay
   * @param resultFinishDay
   * @returns
   */
  const calculateDelay = (planFinishDay: string, resultFinishDay: string) => {
    let delayDays = '';
    const finishDay = DateTime.fromSQL(planFinishDay);
    const delay = nowTime.diff(finishDay, 'days');
    // 終了日が未入力かつ遅れなし
    if (round(delay.days) <= 0 && !resultFinishDay) {
      return delayDays;
    }
    // 進捗が遅れている場合はその日数を返す
    if (round(delay.days) !== 0 && !resultFinishDay) {
      delayDays = round(delay.days).toString();
      return <span className={classes.delay}>{`遅れ${delayDays}日`}</span>;
    }

    // 進捗が完了している場合
    if (resultFinishDay) {
      return <span className={classes.finish}>完了</span>;
    }
    return delayDays;
  };

  //wbs更新
  const updateWbsData = useCallback(
    async (wbs: ResWbsData) => {
      try {
        await dispatch(callPatchWbsData(wbs));
        setActionResult('WBS更新');
        // ここで処理結果ダイアログを開く
        openWbsResultDialog();
      } catch (e) {
        console.log(e);
      }
    },
    [callPatchWbsData, dispatch]
  );

  //wbs削除
  const deleteWbsData = useCallback(
    async (id: number) => {
      try {
        dispatch(callDeleteeWbsData(id));
        setActionResult('WBS削除');
        // ここで処理結果ダイアログを開く
        openWbsResultDialog();
      } catch (e) {
        console.log(e);
      }
    },
    [callDeleteeWbsData, dispatch]
  );
  // コメント一覧を開くボタン押下時のアクション
  const openCommentListTable = useCallback(async () => {
    try {
      setOpen(!open);
      // コメント取得
      dispatch(callGetCommentData(wbsDatas.id));
      // 取得結果はコメントテーブル側でselectorにより取得する。
    } catch (e) {
      console.log(e);
    }
  }, [callGetCommentData, dispatch, open, wbsDatas.id]);
  // // コメント件数の仕様は今回は一旦見送り
  // useEffect(() => {
  //   dispatch(callGetCommentData(wbsDatas.id));
  // }, []);
  // const commentHist = useAppSelector((state: RootState) => state.wbs);
  // useMemo(() => {
  //   let counts: CommentListType[] = [];
  //   if (commentHist.getCommentResponce !== undefined) {
  //     counts = commentHist.getCommentResponce.filter(
  //       (data) => data.confirmFlag === 0
  //     );
  //     console.log(commentHist);
  //     setConfirmCounts(counts.length);
  //   }
  // }, [commentHist, setConfirmCounts]);
  return (
    <>
      <TableRow className={classes.tableRow}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={openCommentListTable}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {wbsDatas.mainItem}
        </TableCell>
        <TableCell align='center'>{wbsDatas.subItem}</TableCell>
        <TableCell align='center' className={classes.tableCell}>
          {wbsDatas.plansStartDay}
        </TableCell>
        <TableCell align='center' className={classes.tableCell}>
          {calculatePlanDayCount(
            wbsDatas.plansStartDay,
            wbsDatas.plansFinishDay
          )}
        </TableCell>
        <TableCell align='center' className={classes.tableCell}>
          {wbsDatas.plansFinishDay}
        </TableCell>
        <TableCell align='center' className={classes.tableCell}>
          {wbsDatas.resultStartDay}
        </TableCell>
        <TableCell align='center' className={classes.tableCell}>
          {calculatePlanDayCount(
            wbsDatas.resultStartDay,
            wbsDatas.resultsFinishDay
          )}
        </TableCell>
        <TableCell align='center' className={classes.tableCell}>
          {wbsDatas.resultsFinishDay}
        </TableCell>
        <TableCell align='center' className={classes.tableCell}>
          {wbsDatas.progress}
        </TableCell>
        <TableCell align='center' className={classes.tableCell}>
          {wbsDatas.productionCost}
        </TableCell>
        <TableCell align='left' className={classes.tableCell}>
          <Box style={{ display: 'flex', paddingLeft: '50%' }}>
            <AccountCircle />
            {wbsDatas.rep}
          </Box>
        </TableCell>
        <TableCell align='center' className={classes.tableCell}>
          {calculateDelay(wbsDatas.plansFinishDay, wbsDatas.resultsFinishDay)}
        </TableCell>
        {/* 通知機能一旦見送り */}
        {/* <TableCell align='center' className={classes.tableCell}>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <NotificationBar>
              <Badge
                overlap='rectangular'
                badgeContent={confirmCounts}
                color='error'
              >
                <Notifications style={{ color: '#ffcc00' }} />
              </Badge>
            </NotificationBar>
          </Box>
        </TableCell> */}
        <TableCell align='center' className={classes.tableCell}>
          <Button onClick={openWbsEditDialog}>
            <EditIcon fontSize='medium' style={{ color: '#33ccff' }} />
          </Button>
        </TableCell>
        <TableCell align='center' className={classes.tableCell}>
          <Button onClick={openWbsDeleteDialog}>
            <DeleteIcon fontSize='medium' style={{ color: 'red' }} />
          </Button>
        </TableCell>
      </TableRow>
      {/* コメント一覧 */}
      <WbsCommentTable
        open={open}
        wbsId={wbsDatas.id}
        // setConfirmCounts={setConfirmCounts}
      />
      <WbsEditDialog
        wbsData={wbsDatas}
        updateWbsData={updateWbsData}
        open={openEdit}
        closeEditDialog={closeWbsEditDialog}
      />
      <WbsDeleteDialog
        open={openDelete}
        deleteWbsData={deleteWbsData}
        closeDeleteDialog={closeWbsDeleteDialog}
        wbsId={wbsDatas.id}
        mainItem={wbsDatas.mainItem}
      />
      <ResultDialog
        open={openResult}
        closeResultDialog={closeWbsResultDialog}
        actionResult={actionResult}
      />
    </>
  );
};
