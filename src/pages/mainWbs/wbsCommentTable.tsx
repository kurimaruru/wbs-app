import { ReplyOutlined, AddCircleOutlineOutlined } from '@material-ui/icons';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Grid,
  Collapse,
} from '@material-ui/core';
import { callPostCommentData, callGetCommentData } from '../../redux/wbsSlice';
import { CommentAddDialog } from '../../components/dialog/commentAddDialog';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { useCallback, useEffect, useState } from 'react';
import { ResultDialog } from '../../components/dialog/resultDialog';
import { CommentListType } from '../../redux/apiResType';

type WbsCommentTableProps = {
  open: boolean;
  wbsId: number;
  // setConfirmCounts: React.Dispatch<React.SetStateAction<number>>;
};
export const WbsCommentTable = ({
  open,
  wbsId,
}: // setConfirmCounts,
WbsCommentTableProps) => {
  const dispatch = useAppDispatch();
  // --------------------------------------------
  // 処理結果ダイアログ
  // --------------------------------------------
  const [openResult, setOpenResult] = useState(false);
  const [actionResult, setActionResult] = useState('');
  const openWbsResultDialog = () => {
    setOpenResult(true);
  };
  const closeWbsResultDialog = () => {
    setOpenResult(false);
    // 再レンダリング
    dispatch(callGetCommentData(wbsId));
  };
  // --------------------------------------------
  // 追加ダイアログ
  // --------------------------------------------
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const openWbsCommentDialog = () => {
    setOpenCommentDialog(true);
  };
  const closeCommentDialog = () => {
    setOpenCommentDialog(false);
  };
  // コメント一覧をStoreから取得
  const [commentHist, setCommentHist] = useState<
    CommentListType[] | undefined
  >();
  // コメント取得
  useEffect(() => {
    if (open) {
      try {
        dispatch(callGetCommentData(wbsId));
      } catch (e) {
        console.log(e);
      }
    }
  }, [dispatch, open, wbsId]);
  // コメント追加
  const addCommentAction = useCallback(
    async (comment: string) => {
      const commentParams: CommentListType = {
        wbsId: wbsId,
        user: 'LoginUserを想定',
        comment: comment,
        createdTime: '',
        confirmFlag: 0,
      };
      try {
        await dispatch(callPostCommentData(commentParams));
        setActionResult('WBS更新');
        // ここで処理結果ダイアログを開く
        openWbsResultDialog();
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch, wbsId]
  );
  // mapループ時のキー
  let key = 0;
  const createKey = () => {
    key += 1;
    return key;
  };
  const commentList = useAppSelector((state: RootState) => state.wbs);
  useEffect(() => {
    if (commentList.getCommentResponce !== undefined) {
      setCommentHist(
        commentList.getCommentResponce.filter((data) => data.wbsId === wbsId)
      );
    }
  }, [commentList]);

  return (
    <>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Grid container>
                <Grid item xs={12}>
                  <Table size='small' aria-label='purchases'>
                    <TableHead>
                      <TableRow>
                        <TableCell />
                        <TableCell style={{ width: '20%', fontWeight: 'bold' }}>
                          ユーザー
                        </TableCell>
                        <TableCell style={{ width: '15%', fontWeight: 'bold' }}>
                          日時
                        </TableCell>
                        <TableCell style={{ width: '65%', fontWeight: 'bold' }}>
                          コメント
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {commentHist !== undefined &&
                        commentHist.map((data) => (
                          <TableRow style={{ width: '100%' }} key={createKey()}>
                            <TableCell />
                            <TableCell>{data.user}</TableCell>
                            <TableCell>{data.createdTime}</TableCell>
                            <TableCell>{data.comment}</TableCell>
                          </TableRow>
                        ))}

                      <TableRow style={{ width: '100%' }}>
                        <TableCell />
                        <TableCell align='left'>
                          {/* コメントが０件なら追加、あれば返信 */}
                          {commentHist?.length !== 0 ? (
                            <Button onClick={openWbsCommentDialog}>
                              <ReplyOutlined fontSize={'small'} />
                              返信
                            </Button>
                          ) : (
                            <Button onClick={openWbsCommentDialog}>
                              <AddCircleOutlineOutlined fontSize={'small'} />
                              コメント追加
                            </Button>
                          )}
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <CommentAddDialog
        addCommentAction={addCommentAction}
        closeCommentDialog={closeCommentDialog}
        open={openCommentDialog}
      />
      <ResultDialog
        open={openResult}
        closeResultDialog={closeWbsResultDialog}
        actionResult={actionResult}
      />
    </>
  );
};
