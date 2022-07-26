export type CommentListType = {
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
  resultStartDay: string;
  resultsFinishDay: string;
  progress: number;
  productionCost: number;
  rep: string;
};

// export type ResWbsData = {
//   wbs: WbsData[];
// };
