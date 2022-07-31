export type CommentListType = {
  wbsId: number;
  user: string;
  comment: string;
  createdTime: string;
  confirmFlag: number;
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
