import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FilterListSharp } from '@material-ui/icons';
import { WbsTableBody } from './wbsTableBody';

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
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TableContainer className={classes.tableContainer}>
          <Table stickyHeader aria-label='sticky-table'>
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
              {wbsTestDatas.map((data) => (
                <WbsTableBody wbsTestDatas={data} key={data.mainItem} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
