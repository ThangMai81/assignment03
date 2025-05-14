const Product = require("../models/product");

// Get all products
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

// Get a product by specific id
exports.getProductById = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).json({
        message: "Product not found.",
        status: 400,
      });
    }

    res.status(200).json({
      message: "Product fetched successfully.",
      status: 200,
      product: product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
      status: 500,
    });
  }
};
