import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Grid,
} from '@material-ui/core';
import { Collapse } from '@material-ui/core';
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';
import { useState } from 'react';
import {
  AccountCircle,
  ReplyOutlined,
  AddCircleOutlineOutlined,
} from '@material-ui/icons';

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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Grid container>
                <Grid item xs={12}>
                  <Table size='small' aria-label='purchases'>
                    <TableHead>
                      <TableRow>
                        <TableCell />
                        <TableCell style={{ width: '300px' }}>
                          ユーザー
                        </TableCell>
                        <TableCell style={{ width: '300px' }}>日時</TableCell>
                        <TableCell style={{ width: '500px' }}>
                          コメント
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow style={{ width: '100%' }}>
                        <TableCell />
                        <TableCell>田中</TableCell>
                        <TableCell>06-30 09:00</TableCell>
                        <TableCell>
                          進捗に遅れが出ていますが、どう対応しますか？
                        </TableCell>
                      </TableRow>
                      <TableRow style={{ width: '100%' }}>
                        <TableCell />
                        <TableCell />
                        <TableCell align='left'>
                          <Button>
                            <AddCircleOutlineOutlined />
                            コメント追加
                          </Button>
                        </TableCell>
                        <TableCell align='left'>
                          <Button>
                            <ReplyOutlined />
                            返信
                          </Button>
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
