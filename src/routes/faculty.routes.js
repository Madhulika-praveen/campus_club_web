const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const {
  getPendingEvents,
  approveEvent,
  rejectEvent,
} = require("../controllers/faculty.controller");

router.get(
  "/events/pending",
  authenticate,
  authorize("FACULTY"),
  getPendingEvents
);

router.put(
  "/events/:id/approve",
  authenticate,
  authorize("FACULTY"),
  approveEvent
);

router.put(
  "/events/:id/reject",
  authenticate,
  authorize("FACULTY"),
  rejectEvent
);

module.exports = router;