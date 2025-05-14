const express = require("express");

const router = express.Router();

const productController = require("../controllers/product");

router.get("/get-all", productController.getProducts);

module.exports = router;
