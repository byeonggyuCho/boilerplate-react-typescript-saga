module.exports = function (request, response) {
  response.json({
    page: 0,
    itemCountPerPage: 0,
    itemTotalCount: 0,
    items: [
      {
        storeId: 8888,
        storeName: '호식이 두마리 치킨',
        address:
          '서울특별시 서초구 강남대로 53길 8, 마이워크스페이스 4호점 7층 호식이 네네 황금 올리브 두마리치킨',
        bossName: '김호식',
        bossMobile: '01033338888',
        storeCreated: '2021-02-09',
        memberCount: 65,
        performanceIn7Days: 50,
        checkCountIn30days: 20,
        boardCountIn30Days: 70,
        state: 'USED',
      },
      {
        storeId: 7777,
        storeName: '교촌 치킨',
        address:
          '서울특별시 서초구 강남대로 53길 8, 마이워크스페이스 4호점 7층 호식이 교촌 두마리치킨',
        bossName: '김호식',
        bossMobile: '01033338888',
        storeCreated: '2021-02-09',
        memberCount: 65,
        performanceIn7Days: 50,
        checkCountIn30days: 20,
        boardCountIn30Days: 70,
        state: 'UNUSED',
      },
      {
        storeId: 9999,
        storeName: 'BBQ 황금올리브 치킨',
        address:
          '서울특별시 서초구 강남대로 53길 8, 마이워크스페이스 4호점 7층 BBQ 황금올리브 치킨',
        bossName: '김호식',
        bossMobile: '01033338888',
        storeCreated: '2021-02-09',
        memberCount: 65,
        performanceIn7Days: 50,
        checkCountIn30days: 20,
        boardCountIn30Days: 70,
        state: 'CLOSED',
      },
      {
        storeId: 9999,
        storeName: '프라닭',
        address:
          '서울특별시 서초구 강남대로 53길 8, 마이워크스페이스 4호점 7층 프라닭',
        bossName: '김호식',
        bossMobile: '01033338888',
        storeCreated: '2021-02-09',
        memberCount: 65,
        performanceIn7Days: 50,
        checkCountIn30days: 20,
        boardCountIn30Days: 70,
        state: 'CLOSED',
      },
    ],
  });

  // const result = Array(30)
  //   .fill(0)
  //   .reduce((prev, cur, idx) => {
  //     return [...prev, ...templateData];
  //   }, []);

  // response.json(result);
};
