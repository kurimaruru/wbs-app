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
    height: '350px',
  },
});

type WbsAddDialogProps = {
  wbsData: ResWbsData;
  updateWbsData: (wbs: ResWbsData) => Promise<void>;
  open: boolean;
  closeEditDialog: () => void;
};
export const WbsAddDialog = ({
  wbsData,
  updateWbsData,
  open,
  closeEditDialog,
}: WbsAddDialogProps): JSX.Element => {
  const classes = useStyles();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<ResWbsData>();
  const handleSubmitAction: SubmitHandler<ResWbsData> = (wbs) => {
    // wbs更新
    updateWbsData(wbs);
    // 編集ダイアログを閉じる
    closeEditDialog();
  };

  return (
    <Dialog
      open={open}
      onClose={closeEditDialog}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>WBS編集</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitAction)}>
        <DialogContent className={classes.editDialog}>
          <input type='hidden' value={wbsData.id} {...register('id')} />
          <Grid container>
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin='dense'
                id='mainItem'
                label='項目'
                type='text'
                fullWidth
                defaultValue={wbsData.mainItem}
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
                defaultValue={wbsData.subItem}
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
                defaultValue={wbsData.plansStartDay}
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
                defaultValue={wbsData.plansFinishDay}
                {...register('plansFinishDay')}
              />
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={12} style={{ marginTop: '5px' }}>
              <Chip label='実績' variant='outlined' color='primary' />
            </Grid>
            <Grid item xs={3}>
              <TextField
                autoFocus
                margin='dense'
                id='resultsStart'
                label='開始日'
                type='date'
                fullWidth
                defaultValue={wbsData.resultStartDay}
                {...register('resultStartDay')}
              />
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={3}>
              <TextField
                autoFocus
                margin='dense'
                id='resultsFinish'
                label='終了日'
                type='date'
                fullWidth
                defaultValue={wbsData.resultsFinishDay}
                InputLabelProps={{
                  shrink: true,
                }}
                {...register('resultsFinishDay')}
              />
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={2}>
              <TextField
                autoFocus
                margin='dense'
                id='progress'
                label='進捗'
                type='number'
                fullWidth
                defaultValue={wbsData.progress}
                {...register('progress')}
              />
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin='dense'
                id='cost'
                label='工数'
                type='number'
                fullWidth
                defaultValue={wbsData.productionCost}
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
                defaultValue={wbsData.rep}
                {...register('rep')}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeEditDialog}
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
            更新
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
