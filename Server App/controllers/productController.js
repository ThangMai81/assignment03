const Product = require("../models/product");
exports.getProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find();
    if (allProducts) {
      return res.status(200).json({
        message: "Fetch all products successfully!",
        status: 200,
        products: allProducts,
      });
    } else {
      const error = new Error("Internal Server Error");
      error.statusCode = 500;
      next(error);
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};
