import { Scheduler } from '@aldabil/react-scheduler';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import ja from 'date-fns/locale/ja';
import { useCallback } from 'react';
import { wbsTestDatas } from '../../TestDatas/WbsTestDatas';
import { NavBar } from '../../components/NavBar';
import { ProcessedEvent } from '@aldabil/react-scheduler/dist/types';

export const Calendar = (): JSX.Element => {
  //---------------------------------------------------------------
  // ※ Schedulerライブラリを使用しているが、本来の使用方法とは少し逸脱している。
  //   スケジュールは参照のみで、編集や削除はこの画面ではさせたくない。
  //---------------------------------------------------------------
  // const clickScheduleDisp = useCallback(() => {
  //   console.log('click');
  //   const button = document.getElementsByClassName(
  //     'MuiButtonBase-root css-10d1a0h-MuiButtonBase-root'
  //   ) as HTMLCollectionOf<HTMLButtonElement>;
  //   for (let i = 0; i < button.length; i++) {
  //     button[i].style.pointerEvents = 'none';
  //   }
  // }, []);

  const eventLists: ProcessedEvent[] = [];
  wbsTestDatas.forEach((data, i) => {
    eventLists.push({
      event_id: i,
      title: data.mainItem,
      start: new Date(data.plansStartDay),
      end: new Date(data.plansFinishDay),
    });
  });

  return (
    <>
      <NavBar />
      <Grid container style={{ marginTop: '30px' }}>
        <Grid item xs={1} />
        <Grid item xs={10} id='schedular'>
          <Paper elevation={2}>
            <Box style={{ padding: '15px' }}>
              <Typography variant='h5'>スケジュール参照</Typography>
            </Box>
            {/* <Box onMouseMoveCapture={clickScheduleDisp}> */}
            <Box>
              {/* スケジュールカレンダーの表示 */}
              <Scheduler
                locale={ja}
                view='month'
                week={null}
                day={null}
                resourceViewMode='tabs'
                month={{
                  weekDays: [0, 1, 2, 3, 4, 5, 6],
                  weekStartOn: 0,
                  startHour: 0,
                  endHour: 23,
                  cellRenderer: ({ height, start, onClick }) => {
                    const days = start.getDay();
                    const disabled = 0 <= days;
                    return (
                      <Button
                        style={{
                          height: '100%',
                          background: 'transparent',
                          pointerEvents: 'none',
                        }}
                        disableRipple={disabled}
                      ></Button>
                    );
                  },
                }}
                events={eventLists}
                loading={false}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </>
  );
};
