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
type CommentListType = {
  user: string;
  createTime: string;
  comment: string;
};
type WbsCommentTableProps = {
  open: boolean;
  commentHist: CommentListType[];
};
export const WbsCommentTable = ({
  open,
  commentHist,
}: WbsCommentTableProps) => {
  // mapループ時のキー
  let key = 0;
  const createKey = () => {
    key += 1;
    return key;
  };

  return (
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
                      <TableCell style={{ width: '20%' }}>ユーザー</TableCell>
                      <TableCell style={{ width: '15%' }}>日時</TableCell>
                      <TableCell style={{ width: '65%' }}>コメント</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {commentHist.map((data) => (
                      <TableRow style={{ width: '100%' }} key={createKey()}>
                        <TableCell />
                        <TableCell>{data.user}</TableCell>
                        <TableCell>{data.createTime}</TableCell>
                        <TableCell>{data.comment}</TableCell>
                      </TableRow>
                    ))}

                    <TableRow style={{ width: '100%' }}>
                      <TableCell />
                      <TableCell align='left'>
                        {/* コメントが０件なら追加、あれば返信 */}
                        {commentHist ? (
                          <Button>
                            <ReplyOutlined />
                            返信
                          </Button>
                        ) : (
                          <Button>
                            <AddCircleOutlineOutlined />
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
  );
};
