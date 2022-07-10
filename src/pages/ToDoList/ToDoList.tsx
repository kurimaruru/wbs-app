import { Grid } from '@material-ui/core';
import { ToDoListCard } from './ToDoListCard';
import { NavBar } from '../../components/NavBar';
import bordPicture from '../../image/bord.png';

export const ToDoList = () => {
  return (
    <>
      <NavBar />
      <Grid container>
        <Grid item xs={12}>
          <p>以下の画像みたいな感じでお願いします。</p>
          <p>アイコンを使う場合はmaterial ui icons v4 から使用</p>
          <p>あとはこのフォルダ内であれば何やっても大丈夫！</p>
          <p>コンパイルエラーがない状態でコミット＆プッシュお願いします。</p>
          <img src={bordPicture} alt='bord' />
        </Grid>
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
