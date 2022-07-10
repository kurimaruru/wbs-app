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
  MenuItem,
} from '@material-ui/core';
import { uniq } from 'lodash';
import { makeStyles } from '@material-ui/styles';
import { FilterListSharp } from '@material-ui/icons';
import { WbsTableBody } from './wbsTableBody';
import { PagenationAction } from '../../components/PagenationActions';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { WbsOperationMenu } from './wbsOperationMenu';

const useStyles = makeStyles({
  tableContainer: {
    overflow: 'scroll',
  },
  table: {
    width: '100%',
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

/** WbsTableProps */
type WbsTableProps = {
  /** wbsに表示するWBSのデータ */
  wbsTestDatas: WbsTestData[];
};

/**
 * @returns wbs一覧
 */
export const WbsTable = ({ wbsTestDatas }: WbsTableProps): JSX.Element => {
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
  // 担当者一覧リスト
  const repList = useMemo(() => {
    const repListArray: string[] = [];
    wbsTestDatas.map((data) => repListArray.push(data.rep));
    return uniq(repListArray);
  }, [wbsTestDatas]);

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

  // mapループ時のキー
  let key = 0;
  const createKey = () => {
    key += 1;
    return key;
  };
  return (
    <Grid container spacing={1}>
      <WbsOperationMenu />
      <Grid item xs={12}>
        <TableContainer className={classes.tableContainer}>
          <Table
            stickyHeader
            aria-label='sticky-table'
            style={{ tableLayout: 'fixed' }}
          >
            <TableHead>
              <TableRow>
                <TableCell rowSpan={2} style={{ width: '20px' }} />
                <TableCell
                  rowSpan={2}
                  style={{ fontWeight: 'bold', width: '5%' }}
                >
                  項目
                </TableCell>
                <TableCell
                  rowSpan={2}
                  style={{ fontWeight: 'bold', width: '5%' }}
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
                  style={{ fontWeight: 'bold', width: '8%' }}
                >
                  <Button
                    aria-controls='simple-menu'
                    aria-haspopup='true'
                    onClick={handleRepButtonClick}
                  >
                    <FilterListSharp />
                  </Button>
                  <Menu
                    id='simple-menu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <Link
                      to={`/wbs`}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <MenuItem>全て</MenuItem>
                    </Link>
                    {repList
                      ? repList.map((rep) => (
                          <Link
                            to={`/wbsdetail?user=${rep}`}
                            style={{ textDecoration: 'none', color: 'black' }}
                            key={createKey()}
                          >
                            <MenuItem>{rep}</MenuItem>
                          </Link>
                        ))
                      : ''}
                  </Menu>
                  担当
                </TableCell>
                <TableCell rowSpan={2} style={{ fontWeight: 'bold' }}>
                  状態
                </TableCell>
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
                <TableCell style={{ fontWeight: 'bold' }}>日数</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>終了日</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>開始日</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>日数</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>終了日</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>進捗</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wbsTestDatas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data) => (
                  <WbsTableBody wbsTestDatas={data} key={data.mainItem} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component='div'
          count={wbsTestDatas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={PagenationAction}
        />
      </Grid>
    </Grid>
  );
};
