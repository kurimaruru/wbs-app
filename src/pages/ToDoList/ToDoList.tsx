import { Grid } from '@material-ui/core';
import { ToDoListCard } from './ToDoListCard';
import { NavBar } from '../../components/NavBar';

export const ToDoList = () => {
  return (
    <>
      <NavBar />
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
    </>
  );
};
