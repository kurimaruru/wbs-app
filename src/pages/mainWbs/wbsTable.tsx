import {
  Button,
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
  return (
    <TableContainer>
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
            <WbsTableBody wbsTestDatas={data} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
