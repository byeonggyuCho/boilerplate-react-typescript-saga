module.exports = function (request, response) {
  console.log(request.params);

  response.json([
    {
      date: '2021-02-01',
      performance: 30,
      checkCount: 60,
      checklistCount: 100,
      brandPerformance: 0,
      storeTypePerformance: 0,
      categoryPerformances: [
        {
          categoryName: '카테고리1',
          categoryPerformance: 40,
        },
        {
          categoryName: '카테고리2',
          categoryPerformance: 30,
        },
        {
          categoryName: '카테고리3',
          categoryPerformance: 10,
        },
      ],
    },
    {
      date: '2021-02-02',
      performance: 60,
      checkCount: 30,
      checklistCount: 70,
      brandPerformance: 0,
      storeTypePerformance: 0,
      categoryPerformances: [
        {
          categoryName: '카테고리1',
          categoryPerformance: 10,
        },
        {
          categoryName: '카테고리2',
          categoryPerformance: 20,
        },
        {
          categoryName: '카테고리3',
          categoryPerformance: 30,
        },
      ],
    },
    {
      date: '2021-02-03',
      performance: 90,
      checkCount: 30,
      checklistCount: 70,
      brandPerformance: 0,
      storeTypePerformance: 0,
      categoryPerformances: [
        {
          categoryName: '카테고리1',
          categoryPerformance: 10,
        },
        {
          categoryName: '카테고리2',
          categoryPerformance: 20,
        },
        {
          categoryName: '카테고리3',
          categoryPerformance: 30,
        },
      ],
    },
    {
      date: '2021-02-04',
      performance: 55,
      checkCount: 30,
      checklistCount: 70,
      brandPerformance: 0,
      storeTypePerformance: 0,
      categoryPerformances: [
        {
          categoryName: '카테고리1',
          categoryPerformance: 10,
        },
        {
          categoryName: '카테고리2',
          categoryPerformance: 20,
        },
        {
          categoryName: '카테고리3',
          categoryPerformance: 30,
        },
      ],
    },
    {
      date: '2021-02-05',
      performance: 60,
      checkCount: 30,
      checklistCount: 70,
      brandPerformance: 0,
      storeTypePerformance: 0,
      categoryPerformances: [
        {
          categoryName: '카테고리1',
          categoryPerformance: 10,
        },
        {
          categoryName: '카테고리2',
          categoryPerformance: 20,
        },
        {
          categoryName: '카테고리3',
          categoryPerformance: 30,
        },
      ],
    },
    {
      date: '2021-02-06',
      performance: 40,
      checkCount: 30,
      checklistCount: 70,
      brandPerformance: 0,
      storeTypePerformance: 0,
      categoryPerformances: [
        {
          categoryName: '카테고리1',
          categoryPerformance: 10,
        },
        {
          categoryName: '카테고리2',
          categoryPerformance: 20,
        },
        {
          categoryName: '카테고리3',
          categoryPerformance: 30,
        },
      ],
    },
    {
      date: '2021-02-07',
      performance: 90,
      checkCount: 30,
      checklistCount: 70,
      brandPerformance: 0,
      storeTypePerformance: 0,
      categoryPerformances: [
        {
          categoryName: '카테고리1',
          categoryPerformance: 10,
        },
        {
          categoryName: '카테고리2',
          categoryPerformance: 20,
        },
        {
          categoryName: '카테고리3',
          categoryPerformance: 30,
        },
      ],
    },
  ]);
};
