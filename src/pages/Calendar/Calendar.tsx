import { Scheduler } from '@aldabil/react-scheduler';
import { Grid } from '@material-ui/core';
import ja from 'date-fns/locale/ja';

export const Calendar = (): JSX.Element => {
  return (
    <Grid container>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <Scheduler
          locale={ja}
          view='month'
          month={{
            weekDays: [0, 1, 2, 3, 4, 5, 6],
            weekStartOn: 0,
            startHour: 0,
            endHour: 23,
          }}
          events={[
            {
              event_id: 1,
              title: 'Event 1',
              start: new Date('2022/7/2 09:30'),
              end: new Date('2022/7/2 10:30'),
            },
            {
              event_id: 2,
              title: 'Event 2',
              start: new Date('2022/7/4 10:00'),
              end: new Date('2022/7/7 11:00'),
            },
          ]}
        />
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};
