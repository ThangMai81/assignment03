const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authenticationController");

router.post("/sign-up", authenticationController.signUp);
router.post("/sign-in", authenticationController.signIn);

module.exports = router;
