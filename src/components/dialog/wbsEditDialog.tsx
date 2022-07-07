import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

type WbsEditDialogProps = {
  open: boolean;
  closeEditDialog: () => void;
};
export const WbsEditDialog = ({
  open,
  closeEditDialog,
}: WbsEditDialogProps): JSX.Element => {
  return (
    <Dialog
      open={open}
      onClose={closeEditDialog}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>WBS編集</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Email Address'
          type='email'
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeEditDialog} variant='contained'>
          キャンセル
        </Button>
        <Button onClick={closeEditDialog} color='primary' variant='contained'>
          更新
        </Button>
      </DialogActions>
    </Dialog>
  );
};
