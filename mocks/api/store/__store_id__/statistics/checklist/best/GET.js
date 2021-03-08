module.exports = function (request, response) {
  console.log(request.params);

  response.json([
    {
      ranking: 0,
      checklistName: '매대 정리 및 보충',
      checkCount: 100,
      performance: 80,
    },
    {
      ranking: 1,
      checklistName: '외부시식대 정리 및 청소',
      checkCount: 77,
      performance: 70,
    },
    {
      ranking: 2,
      checklistName: '유통기한 확인',
      checkCount: 60,
      performance: 70,
    },
    {
      ranking: 3,
      checklistName: '워크인 관리',
      checkCount: 50,
      performance: 70,
    },
    {
      ranking: 4,
      checklistName: '마감 인수인계',
      checkCount: 40,
      performance: 70,
    },
  ]);
};
