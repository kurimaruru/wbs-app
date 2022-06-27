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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FilterListSharp } from '@material-ui/icons';
import { WbsTableBody } from './wbsTableBody';
import { PagenationAction } from '../../components/PagenationActions';
import { useState } from 'react';

const useStyles = makeStyles({
  tableContainer: {
    overflow: 'scroll',
  },
  table: {
    width: '100%',
  },
});

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
};

type WbsTablePorps = {
  wbsTestDatas: WbsTestData[];
};

export const WbsTable = ({ wbsTestDatas }: WbsTablePorps): JSX.Element => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TableContainer className={classes.tableContainer}>
          <Table
            stickyHeader
            aria-label='sticky-table'
            style={{ tableLayout: 'fixed' }}
          >
            <TableHead>
              <TableRow>
                <TableCell rowSpan={2} />
                <TableCell rowSpan={2}>項目</TableCell>
                <TableCell rowSpan={2}>中項目</TableCell>
                <TableCell colSpan={3}>予定</TableCell>
                <TableCell colSpan={5}>実績</TableCell>
                <TableCell rowSpan={2}>工数</TableCell>
                <TableCell rowSpan={2}>
                  <Button>
                    <FilterListSharp />
                  </Button>
                  担当
                </TableCell>
                <TableCell rowSpan={2}>
                  <Button>
                    <FilterListSharp />
                  </Button>
                  状態
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>開始日</TableCell>
                <TableCell>日数</TableCell>
                <TableCell>終了日</TableCell>
                <TableCell>開始日</TableCell>
                <TableCell>日数</TableCell>
                <TableCell>終了日</TableCell>
                <TableCell>遅れ</TableCell>
                <TableCell>進捗</TableCell>
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
