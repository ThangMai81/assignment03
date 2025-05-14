const express = require("express");

const router = express.Router();

const authenticationController = require("../controllers/authenticationController");

router.get("/sign-up", authenticationController.signUp);

module.exports = router;
