import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import { Chip, Grid } from '@material-ui/core';
import { WbsTestData } from '../../TestDatas/WbsTestDatas';
import { useForm, SubmitHandler } from 'react-hook-form';

const useStyles = makeStyles({
  editDialog: {
    width: '550px',
    height: '350px',
  },
});

type FormDataType = {
  mainItem: string;
  subItem: string;
  plansStartDay: string;
  plansFinishDay: string;
  resultsStartDay: string;
  resultsFinisyDay: string;
  progress: number;
  productionCosts: number;
  rep: string;
};

type WbsEditDialogProps = {
  wbsData: WbsTestData;
  open: boolean;
  closeEditDialog: () => void;
};
export const WbsEditDialog = ({
  wbsData,
  open,
  closeEditDialog,
}: WbsEditDialogProps): JSX.Element => {
  const classes = useStyles();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormDataType>();
  const handleSubmitAction: SubmitHandler<FormDataType> = (data) =>
    console.log(data);
  return (
    <Dialog
      open={open}
      onClose={closeEditDialog}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>WBS編集</DialogTitle>
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
            <Grid item xs={4} style={{ marginTop: '5px' }}>
              <Chip label='実績' variant='outlined' color='primary' />
            </Grid>
            <Grid item xs={4} style={{ marginTop: '5px' }} />
            <Grid item xs={4} style={{ marginTop: '5px' }} />
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin='dense'
                id='resultsStart'
                label='開始日'
                type='date'
                fullWidth
                defaultValue={wbsData.resultsStartDay}
                {...register('resultsStartDay')}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin='dense'
                id='resultsFinish'
                label='終了日'
                type='date'
                fullWidth
                defaultValue={wbsData.resultsFinisyDay}
                InputLabelProps={{
                  shrink: true,
                }}
                {...register('resultsFinisyDay')}
              />
            </Grid>
            <Grid item xs={4}>
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
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin='dense'
                id='cost'
                label='工数'
                type='number'
                fullWidth
                defaultValue={wbsData.productionCosts}
                {...register('productionCosts')}
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
            style={{ width: '120px' }}
          >
            キャンセル
          </Button>
          <Button
            onClick={closeEditDialog}
            color='primary'
            variant='contained'
            style={{ width: '120px' }}
            type='submit'
          >
            更新
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
