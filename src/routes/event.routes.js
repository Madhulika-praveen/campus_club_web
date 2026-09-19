const express = require("express");
const router = express.Router();

const {
  getApprovedEvents,
  getEventById,
} = require("../controllers/event.controller");

router.get("/", getApprovedEvents);

router.get("/:id", getEventById);

module.exports = router;