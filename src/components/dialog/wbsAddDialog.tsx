import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import { Chip, Grid } from '@material-ui/core';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ResWbsData } from '../../redux/apiResType';

const useStyles = makeStyles({
  editDialog: {
    width: '550px',
    height: '300px',
  },
});

type WbsAddDialogProps = {
  createWbsData: (wbs: ResWbsData) => Promise<void>;
  open: boolean;
  closeCreateDialog: () => void;
};
export const WbsAddDialog = ({
  createWbsData,
  open,
  closeCreateDialog,
}: WbsAddDialogProps): JSX.Element => {
  const classes = useStyles();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<ResWbsData>();
  const handleSubmitAction: SubmitHandler<ResWbsData> = (wbs) => {
    // wbs新規追加
    createWbsData(wbs);
    // 新規追加ダイアログを閉じる
    closeCreateDialog();
  };

  return (
    <Dialog
      open={open}
      onClose={closeCreateDialog}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>WBS新規追加</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitAction)}>
        <DialogContent className={classes.editDialog}>
          <Grid container>
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin='dense'
                id='mainItem'
                label='項目'
                type='text'
                fullWidth
                {...register('mainItem')}
              />
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin='dense'
                id='subItem'
                label='中項目'
                type='text'
                fullWidth
                {...register('subItem')}
              />
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={12} style={{ marginTop: '5px' }}>
              <Chip label='予定' variant='outlined' color='primary' />
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin='dense'
                id='plansStart'
                label='開始日'
                type='date'
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register('plansStartDay')}
              />
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin='dense'
                id='plansFinish'
                label='終了日'
                type='date'
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register('plansFinishDay')}
              />
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin='dense'
                id='cost'
                label='工数'
                type='number'
                fullWidth
                {...register('productionCost')}
              />
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin='dense'
                id='rep'
                label='担当者'
                type='text'
                fullWidth
                {...register('rep')}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeCreateDialog}
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
            追加
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
