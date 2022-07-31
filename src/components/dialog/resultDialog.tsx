import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  deleteDialog: {
    width: '350px',
    height: '120px',
  },
});

type ResultDialogProps = {
  open: boolean;
  closeResultDialog: () => void;
  actionResult: string;
};
export const ResultDialog = ({
  open,
  closeResultDialog,
  actionResult,
}: ResultDialogProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={closeResultDialog}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>処理結果確認</DialogTitle>
      <DialogContent className={classes.deleteDialog}>
        <DialogContentText>{`${actionResult}が成功しました。`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={closeResultDialog}
          color='primary'
          variant='contained'
          style={{ width: '120px' }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
