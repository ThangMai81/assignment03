const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/", orderController.placeOrder);
router.get("/history", orderController.getOrderHistory);

module.exports = router;
