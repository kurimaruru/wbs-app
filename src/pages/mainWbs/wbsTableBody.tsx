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
import { useCallback, useState } from 'react';
import { AccountCircle } from '@material-ui/icons';
import { DateTime } from 'luxon';
import { round } from 'lodash';
import { useAppDispatch } from '../../redux/store';
import { WbsCommentTable } from './wbsCommentTable';
import { WbsEditDialog } from '../../components/dialog/wbsEditDialog';
import { WbsDeleteDialog } from '../../components/dialog/wbsDeleteDialog';
import { ResultDialog } from '../../components/dialog/resultDialog';
import { ResWbsData } from '../../redux/apiResType';
import { AsyncThunk } from '@reduxjs/toolkit';

const useStyles = makeStyles({
  delay: {
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
});

type WbsTableBodyPorps = {
  wbsDatas: ResWbsData;
  /** wbs一覧取得 */
  callGetWbsAllDatas: AsyncThunk<ResWbsData[], void, {}>;
  /** wbs更新 */
  callPatchWbsData: AsyncThunk<void, ResWbsData, {}>;
  /** wbs削除 */
  callDeleteeWbsData: AsyncThunk<void, number, {}>;
};

export const WbsTableBody = ({
  wbsDatas,
  callGetWbsAllDatas,
  callPatchWbsData,
  callDeleteeWbsData,
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
      const dayCount = start.diff(finish, 'days');
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
    // 進捗が遅れている場合はその日数を返す
    if (round(delay.days) !== 0 && !resultFinishDay) {
      delayDays = round(delay.days).toString();
      return <span className={classes.delay}>{`${delayDays}日`}</span>;
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

  return (
    <>
      <TableRow className={classes.tableRow}>
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
          {wbsDatas.mainItem}
        </TableCell>
        <TableCell align='left'>{wbsDatas.subItem}</TableCell>
        <TableCell align='left'>{wbsDatas.plansStartDay}</TableCell>
        <TableCell align='center'>
          {calculatePlanDayCount(
            wbsDatas.plansStartDay,
            wbsDatas.plansFinishDay
          )}
        </TableCell>
        <TableCell align='left'>{wbsDatas.plansFinishDay}</TableCell>
        <TableCell align='left'>{wbsDatas.resultStartDay}</TableCell>
        <TableCell align='center'>3</TableCell>
        <TableCell align='left'>{wbsDatas.resultsFinishDay}</TableCell>
        <TableCell align='left'>{wbsDatas.progress}</TableCell>
        <TableCell align='left'>{wbsDatas.productionCost}</TableCell>
        <TableCell align='left'>
          <Box style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <AccountCircle />
            {wbsDatas.rep}
          </Box>
        </TableCell>
        <TableCell align='left'>
          {calculateDelay(wbsDatas.plansFinishDay, wbsDatas.resultsFinishDay)}
        </TableCell>
        <TableCell align='center'>
          <Button onClick={openWbsEditDialog}>
            <EditIcon fontSize='medium' />
          </Button>
        </TableCell>
        <TableCell align='center'>
          <Button onClick={openWbsDeleteDialog}>
            <DeleteIcon fontSize='medium' style={{ color: 'red' }} />
          </Button>
        </TableCell>
      </TableRow>

      <WbsCommentTable open={open} />
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
