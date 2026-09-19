const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const {
  getRecommendations,
} = require("../controllers/student.controller");

router.get(
  "/events/recommended",
  authenticate,
  authorize("STUDENT"),
  getRecommendations
);

module.exports = router;