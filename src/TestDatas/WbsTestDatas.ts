type WbsTestData = {
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
};

export const wbsTestDatas: WbsTestData[] = [];

for (let i = 1; i < 25; i += 1) {
  wbsTestDatas.push({
    mainItem: `mainItem${i}`,
    subItem: `subItem${i}`,
    plansStartDay: `2022/06/0${i}`,
    plansDayCount: i,
    plansFinishDay: `2022/06/0${i}`,
    resultsStartDay: `2022/06/0${i}`,
    resultsDayCount: i,
    resultsFinisyDay: `2022/06/0${i}`,
    delay: 0,
    progress: 100,
    productionCosts: 4.5,
    rep: `user${i}`,
    state: '完了',
  });
}
