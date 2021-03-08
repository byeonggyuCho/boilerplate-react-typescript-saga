module.exports = function (request, response) {
  console.log(request.params);

  response.json({
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
  });
};
