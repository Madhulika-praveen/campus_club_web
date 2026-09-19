const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const {
  getOrganizerEvents,
} = require("../controllers/organizer.controller");

router.get(
  "/events",
  authenticate,
  authorize("ORGANIZER"),
  getOrganizerEvents
);

module.exports = router;