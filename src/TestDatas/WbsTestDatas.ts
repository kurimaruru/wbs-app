type CommentListType = {
  user: string;
  createTime: string;
  comment: string;
};

export type WbsTestData = {
  mainItem: string;
  subItem: string;
  plansStartDay: string;
  plansDayCount: number;
  plansFinishDay: string;
  resultsStartDay: string;
  resultsDayCount: number;
  resultsFinisyDay: string;
  delay: number;
  progress: number;
  productionCosts: number;
  rep: string;
  state: string;
  commentList: CommentListType[];
};

// TODO 遅れはDBに値持たせなくても良い。画面側で調整
export const wbsTestDatas: WbsTestData[] = [
  {
    mainItem: '遅れ',
    subItem: `subItem0`,
    plansStartDay: `2022-06-01`,
    plansDayCount: 3,
    plansFinishDay: `2022-07-01`,
    resultsStartDay: `2022-07-01`,
    resultsDayCount: 1,
    resultsFinisyDay: '',
    delay: 0,
    progress: 100,
    productionCosts: 4.5,
    rep: `user`,
    state: '',
    commentList: [
      {
        user: '田中',
        createTime: '2022-07-01',
        comment: '進捗に遅れが出ていますが、どう対応しますか？',
      },
    ],
  },
  {
    mainItem: '未完了',
    subItem: `subItem0`,
    plansStartDay: `2022-06-01`,
    plansDayCount: 3,
    plansFinishDay: `2022-07-03`,
    resultsStartDay: `2022-06-01`,
    resultsDayCount: 1,
    resultsFinisyDay: '',
    delay: 2,
    progress: 100,
    productionCosts: 4.5,
    rep: `user`,
    state: '',
    commentList: [
      {
        user: '鈴木',
        createTime: '2022-07-01',
        comment: 'コメントです。',
      },
    ],
  },
];

for (let i = 1; i < 28; i += 1) {
  wbsTestDatas.push({
    mainItem: `mainItem${i}`,
    subItem: `subItem${i}`,
    plansStartDay: `2022-06-0${i}`,
    plansDayCount: i,
    plansFinishDay: `2022-06-0${i}`,
    resultsStartDay: `2022-06-0${i}`,
    resultsDayCount: i,
    resultsFinisyDay: `2022-06-0${i}`,
    delay: 0,
    progress: 100,
    productionCosts: 4.5,
    rep: `user${i}`,
    state: '完了',
    commentList: [
      {
        user: `鈴木${i}`,
        createTime: `2022-07-${i}`,
        comment: `コメント${i}です。`,
      },
    ],
  });
}

export const wbsDetailDatas: WbsTestData[] = [
  {
    mainItem: '遅れ',
    subItem: `subItem0`,
    plansStartDay: `2022-06-01`,
    plansDayCount: 3,
    plansFinishDay: `2022-07-01`,
    resultsStartDay: `2022-07-01`,
    resultsDayCount: 1,
    resultsFinisyDay: '',
    delay: 0,
    progress: 100,
    productionCosts: 4.5,
    rep: `user`,
    state: '',
    commentList: [
      {
        user: '田中',
        createTime: '2022-07-01',
        comment: '進捗に遅れが出ていますが、どう対応しますか？',
      },
    ],
  },
  {
    mainItem: '未完了',
    subItem: `subItem0`,
    plansStartDay: `2022-06-01`,
    plansDayCount: 3,
    plansFinishDay: `2022-07-03`,
    resultsStartDay: `2022-06-01`,
    resultsDayCount: 1,
    resultsFinisyDay: '',
    delay: 2,
    progress: 100,
    productionCosts: 4.5,
    rep: `user`,
    state: '',
    commentList: [
      {
        user: '鈴木',
        createTime: '2022-07-01',
        comment: 'コメントです。',
      },
    ],
  },
];
