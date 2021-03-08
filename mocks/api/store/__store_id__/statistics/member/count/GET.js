module.exports = function (request, response) {
  response.json({
    // 평균 직원수
    date: '2021-02-19',
    memberCount: 65.2,
    userTypeCount: [
      {
        userType: 'boss',
        memberCount: 99,
      },
      {
        userType: 'manager',
        memberCount: 66,
      },
      {
        userType: 'staff',
        memberCount: 55,
      },
      {
        userType: 'employee',
        memberCount: 2,
      },
    ],
  });
};
