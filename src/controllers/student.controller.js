const recommendationService = require("../services/recommendation.service");

const getRecommendations = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 10;

    const recommendations =
      await recommendationService.getRecommendations(
        req.user.id,
        limit
      );

    res.json(recommendations);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRecommendations,
};