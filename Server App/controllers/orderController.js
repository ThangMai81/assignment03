const Order = require("../models/order");
const Product = require("../models/product");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Create new order
exports.placeOrder = async (req, res) => {
  const token = req.cookies.token;
  const { email, name, phone, address, products } = req.body;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided", status: 401 });
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, "your_jwt_secret_key"); // replace with env in production

    if (!decoded.email || !decoded.password || !decoded.role) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid token", status: 401 });
    }

    // Validate body
    if (
      !email ||
      !name ||
      !phone ||
      !address ||
      !products ||
      !products.length
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required.", status: 400 });
    }

    // Build cart with product refs
    const cart = await Promise.all(
      products.map(async (p) => {
        const product = await Product.findById(p.product);
        if (!product) throw new Error("Product not found");
        return {
          product: product._id,
          price: p.price,
          count: p.count,
        };
      })
    );

    // Create and save order
    const newOrder = new Order({ email, name, phone, address, cart });
    await newOrder.save();

    // Send email using nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your_email@gmail.com",
        pass: "your_app_password", // Use App Password for Gmail
      },
    });

    const mailOptions = {
      from: "your_email@gmail.com",
      to: email,
      subject: "Order Confirmation",
      html: `
        <h2>Thank you for your order, ${name}!</h2>
        <p>We've received your order and will process it soon.</p>
        <p><strong>Shipping Address:</strong> ${address}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <h3>Order Details:</h3>
        <ul>
          ${cart
            .map(
              (item) => `
            <li>Product ID: ${item.product}, Price: $${item.price}, Quantity: ${item.count}</li>
          `
            )
            .join("")}
        </ul>
        <p>We'll send you another email once your order is shipped.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(201)
      .json({ message: "Order placed successfully!", status: 201 });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: 500 });
  }
};

// View orders history
exports.getOrderHistory = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided", status: 401 });
  }

  try {
    // Verify and decode the JWT token
    const decoded = jwt.verify(token, "your_jwt_secret_key"); // use env var in production

    const { email, password } = decoded;

    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid token", status: 401 });
    }

    // Find all orders by matching email and password
    const orders = await Order.find({ email });

    if (!orders.length) {
      return res.status(404).json({
        message: "No order history found for this account.",
        status: 404,
        orders: [],
      });
    }

    return res.status(200).json({
      message: "Fetched order history successfully!",
      status: 200,
      orders,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: 500 });
  }
};
