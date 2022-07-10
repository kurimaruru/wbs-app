import React from 'react';
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

type WbsDeleteDialogProps = {
  open: boolean;
  closeDeleteDialog: () => void;
  mainItem: string;
};
export const WbsDeleteDialog = ({
  open,
  closeDeleteDialog,
  mainItem,
}: WbsDeleteDialogProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={closeDeleteDialog}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>削除確認</DialogTitle>
      <DialogContent className={classes.deleteDialog}>
        <DialogContentText>
          {`${mainItem}を削除します。よろしいですか。`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={closeDeleteDialog}
          color='primary'
          variant='contained'
          style={{ width: '150px' }}
        >
          キャンセル
        </Button>
        <Button
          onClick={closeDeleteDialog}
          color='secondary'
          variant='contained'
          style={{ width: '150px' }}
        >
          削除
        </Button>
      </DialogActions>
    </Dialog>
  );
};
