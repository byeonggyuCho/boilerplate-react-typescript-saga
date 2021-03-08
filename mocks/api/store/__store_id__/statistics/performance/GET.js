module.exports = function (request, response) {
  response.json({
    storePerformance: 60,
    brandPerformance: 50,
    storeTypePerformance: 80,
  });
};
