type CommentListType = {
  wbsId: number;
  user: string;
  createTime: string;
  comment: string;
  createdTime: string;
};

export type ResWbsData = {
  id: number;
  mainItem: string;
  subItem: string;
  plansStartDay: string;
  plansFinishDay: string;
  resultsStartDay: string;
  resultsFinisyDay: string;
  progress: number;
  productionCosts: number;
  rep: string;
  commentList: CommentListType[];
};
