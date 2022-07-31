import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { useForm, SubmitHandler } from 'react-hook-form';

const useStyles = makeStyles({
  editDialog: {
    width: '400px',
    height: '150px',
  },
});

type FormType = {
  comment: string;
};

type CommentAddDialogProps = {
  addCommentAction: (comment: string) => Promise<void>;
  open: boolean;
  closeCommentDialog: () => void;
};
export const CommentAddDialog = ({
  addCommentAction,
  open,
  closeCommentDialog,
}: CommentAddDialogProps): JSX.Element => {
  const classes = useStyles();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormType>();
  const handleSubmitAction: SubmitHandler<FormType> = (comment) => {
    // wbs新規追加
    addCommentAction(comment.comment);
    // 新規追加ダイアログを閉じる
    closeCommentDialog();
  };

  return (
    <Dialog
      open={open}
      onClose={closeCommentDialog}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>コメント追加</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitAction)}>
        <DialogContent className={classes.editDialog}>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin='dense'
                id='mainItem'
                label='コメント'
                type='text'
                fullWidth
                {...register('comment')}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeCommentDialog}
            variant='outlined'
            style={{ width: '150px' }}
          >
            キャンセル
          </Button>
          <Button
            color='primary'
            variant='contained'
            style={{ width: '150px' }}
            type='submit'
          >
            登録
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
