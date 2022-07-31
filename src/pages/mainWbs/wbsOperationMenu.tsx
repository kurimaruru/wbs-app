import { Button, Grid, makeStyles } from '@material-ui/core';
import { useCallback } from 'react';

const useStyles = makeStyles({
  addButton: {
    marginRight: '30px',
    marginTop: '15px',
  },
});

type WbsOperationMenuProps = {
  openWbsCreateDialog: () => void;
};

/**
 * @returns 操作メニュー
 */
export const WbsOperationMenu = ({
  openWbsCreateDialog,
}: WbsOperationMenuProps): JSX.Element => {
  const classes = useStyles();

  const openCreateDialog = useCallback(() => {
    openWbsCreateDialog();
  }, [openWbsCreateDialog]);
  return (
    <Grid container justifyContent='flex-end'>
      <Grid item>
        <Button
          color='primary'
          variant='contained'
          className={classes.addButton}
          onClick={openCreateDialog}
        >
          追加
        </Button>
      </Grid>
    </Grid>
  );
};
