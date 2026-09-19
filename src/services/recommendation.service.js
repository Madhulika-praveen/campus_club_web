const getRecommendations = async (studentId, limit) => {
  const { getRecommendations: recommend } = require("../../recommend");

  return recommend(studentId, limit);
};

module.exports = {
  getRecommendations,
};