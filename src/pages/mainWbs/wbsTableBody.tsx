import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@material-ui/core';
import { Collapse } from '@material-ui/core';
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';
import { useState } from 'react';
import { AccountCircle } from '@material-ui/icons';

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

type WbsTableBodyPorps = {
  wbsTestDatas: WbsTestData;
};

export const WbsTableBody = ({
  wbsTestDatas,
}: WbsTableBodyPorps): JSX.Element => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = useState(false);

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
        <TableCell align='left'>{wbsTestDatas.delay}</TableCell>
        <TableCell align='left'>{wbsTestDatas.progress}</TableCell>
        <TableCell align='left'>{wbsTestDatas.productionCosts}</TableCell>
        <TableCell align='right'>
          <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <AccountCircle />
            {wbsTestDatas.rep}
          </Box>
        </TableCell>
        <TableCell align='center'>{wbsTestDatas.state}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align='left'>Amount</TableCell>
                    <TableCell align='left'>Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component='th' scope='row'>
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align='left'>{historyRow.amount}</TableCell>
                      <TableCell align='left'>
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
