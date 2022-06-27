import { Grid } from '@material-ui/core';
import { ToDoListCard } from './ToDoListCard';

export const ToDoList = () => {
  return (
    <Grid container>
      <Grid item xs={4}>
        <ToDoListCard />
      </Grid>
      <Grid item xs={4}>
        <ToDoListCard />
      </Grid>
      <Grid item xs={4}>
        <ToDoListCard />
      </Grid>
    </Grid>
  );
};
