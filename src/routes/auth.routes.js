const express = require("express");
const router = express.Router();

const { loginStudent } = require("../controllers/auth.controller");

router.post("/student/login", loginStudent);

module.exports = router;