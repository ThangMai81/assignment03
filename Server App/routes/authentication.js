console.log("authen route loaded");
const express = require("express");

const router = express.Router();

const authenticationController = require("../controllers/authenticationController");

router.post("/sign-up", authenticationController.signUp);

module.exports = router;
