import { Button, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  addButton: {
    marginRight: '30px',
    marginTop: '15px',
  },
});

/**
 * @returns 操作メニュー
 */
export const WbsOperationMenu = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid container justifyContent='flex-end'>
      <Grid item>
        <Button
          color='primary'
          variant='contained'
          className={classes.addButton}
        >
          追加
        </Button>
      </Grid>
    </Grid>
  );
};
