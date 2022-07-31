import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Menu,
} from '@material-ui/core';
import { WbsDetailLink } from './wbsDetailLink';
import { makeStyles } from '@material-ui/styles';
import { FilterListSharp } from '@material-ui/icons';
import { WbsTableBody } from './wbsTableBody';
import { PagenationAction } from '../../components/PagenationActions';
import { useState } from 'react';
import { WbsOperationMenu } from './wbsOperationMenu';
import { CommentListType, ResWbsData } from '../../redux/apiResType';
import { WbsAddDialog } from '../../components/dialog/wbsAddDialog';
import { AsyncThunk } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { useAppDispatch } from '../../redux/store';
import { ResultDialog } from '../../components/dialog/resultDialog';

const useStyles = makeStyles({
  tableContainer: {
    overflow: 'scroll',
  },
  table: {
    width: '100%',
  },
});

/** WbsTableProps */
type WbsTableProps = {
  /** wbsに表示するWBSのデータ */
  wbsDatas?: ResWbsData[];
  /** wbs一覧取得 */
  callGetWbsAllDatas: AsyncThunk<ResWbsData[], void, {}>;
  /** wbs新規追加 */
  callPostWbsData: AsyncThunk<void, ResWbsData, {}>;
  /** wbs更新 */
  callPatchWbsData: AsyncThunk<void, ResWbsData, {}>;
  /** wbs削除 */
  callDeleteeWbsData: AsyncThunk<void, number, {}>;
  /** コメント取得 */
  callGetCommentData: AsyncThunk<CommentListType[], number, {}>;
};

/**
 * @returns wbs一覧
 */
export const WbsTable = ({
  wbsDatas,
  callGetWbsAllDatas,
  callPostWbsData,
  callPatchWbsData,
  callDeleteeWbsData,
  callGetCommentData,
}: WbsTableProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // Menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleRepButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
  // --------------------------------------------
  // 追加ダイアログ
  // --------------------------------------------
  const [openCreate, setOpenCreate] = useState(false);
  const openWbsCreateDialog = () => {
    setOpenCreate(true);
  };
  const closeWbsCreateDialog = () => {
    setOpenCreate(false);
  };

  //wbs追加
  const createWbsData = useCallback(
    async (wbs: ResWbsData) => {
      try {
        await dispatch(callPostWbsData(wbs));
        setActionResult('WBS新規追加');
        // ここで処理結果ダイアログを開く
        openWbsResultDialog();
      } catch (e) {
        console.log(e);
      }
    },
    [callPostWbsData, dispatch]
  );

  return (
    <Grid container spacing={1}>
      <WbsOperationMenu openWbsCreateDialog={openWbsCreateDialog} />
      {wbsDatas && (
        <Grid item xs={12}>
          <TableContainer className={classes.tableContainer}>
            <Table
              stickyHeader
              aria-label='sticky-table'
              style={{ tableLayout: 'fixed' }}
            >
              <TableHead>
                <TableRow>
                  <TableCell rowSpan={2} style={{ width: '2%' }} />
                  <TableCell
                    rowSpan={2}
                    style={{ fontWeight: 'bold', width: '6%' }}
                  >
                    項目
                  </TableCell>
                  <TableCell
                    rowSpan={2}
                    style={{ fontWeight: 'bold', width: '6%' }}
                  >
                    中項目
                  </TableCell>
                  <TableCell
                    colSpan={3}
                    style={{ fontWeight: 'bold', width: '20%' }}
                  >
                    予定
                  </TableCell>
                  <TableCell
                    colSpan={4}
                    style={{ fontWeight: 'bold', width: '25%' }}
                  >
                    実績
                  </TableCell>
                  <TableCell
                    rowSpan={2}
                    style={{ fontWeight: 'bold', width: '5%' }}
                  >
                    工数
                  </TableCell>
                  <TableCell
                    rowSpan={2}
                    style={{ fontWeight: 'bold', width: '10%' }}
                    align='center'
                  >
                    <Button
                      aria-controls='simple-menu'
                      aria-haspopup='true'
                      onClick={handleRepButtonClick}
                    >
                      <FilterListSharp style={{ margin: '0px' }} />
                    </Button>
                    <Menu
                      id='simple-menu'
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <WbsDetailLink wbsDatas={wbsDatas} />
                    </Menu>
                    担当
                  </TableCell>
                  <TableCell
                    rowSpan={2}
                    style={{ fontWeight: 'bold', width: '10%' }}
                    align='center'
                  >
                    状態
                  </TableCell>
                  {/* <TableCell
                    rowSpan={2}
                    style={{ fontWeight: 'bold', width: '5%' }}
                  >
                    通知
                  </TableCell> */}
                  <TableCell
                    style={{ fontWeight: 'bold' }}
                    rowSpan={2}
                    align='center'
                  >
                    編集
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: 'bold' }}
                    rowSpan={2}
                    align='center'
                  >
                    削除
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>開始日</TableCell>
                  <TableCell align='center' style={{ fontWeight: 'bold' }}>
                    日数
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>終了日</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>開始日</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }} align='center'>
                    日数
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>終了日</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>進捗</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wbsDatas
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((data) => (
                    <WbsTableBody
                      wbsDatas={data}
                      callGetWbsAllDatas={callGetWbsAllDatas}
                      callPatchWbsData={callPatchWbsData}
                      callDeleteeWbsData={callDeleteeWbsData}
                      callGetCommentData={callGetCommentData}
                      key={data.id}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component='div'
            count={wbsDatas.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={PagenationAction}
          />
        </Grid>
      )}
      <WbsAddDialog
        createWbsData={createWbsData}
        open={openCreate}
        closeCreateDialog={closeWbsCreateDialog}
      />
      <ResultDialog
        open={openResult}
        closeResultDialog={closeWbsResultDialog}
        actionResult={actionResult}
      />
    </Grid>
  );
};
