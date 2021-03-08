module.exports = function (request, response) {
  console.log(request.params);

  response.json({
    date: '2021-02-18',
    period: 6.5,
    brandPeriod: 0,
    userTypePeriod: [
      {
        userType: 'partner',
        period: 600,
      },
      {
        userType: 'chief-manager',
        period: 400,
      },
      {
        userType: 'employee',
        period: 200,
      },
      {
        userType: 'manager',
        period: 400,
      },
      {
        userType: 'staff',
        period: 100,
      },
    ],
    brandUserTypePeriod: [
      {
        userType: 'partner',
        period: 600,
      },
      {
        userType: 'chief-manager',
        period: 400,
      },
      {
        userType: 'employee',
        period: 200,
      },
      {
        userType: 'manager',
        period: 400,
      },
      {
        userType: 'staff',
        period: 100,
      },
    ],
  });
};
