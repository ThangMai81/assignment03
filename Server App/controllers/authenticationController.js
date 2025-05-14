const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Sign up
exports.signUp = async (req, res, next) => {
  const { email, password, name, phone, role } = req.body;

  try {
    // Check for missing fields
    if (!email || !password || !name || !phone || !role) {
      return res.status(400).json({
        message: "All fields are required.",
        status: 400,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists.",
        status: 409,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      phone,
      role,
    });

    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { email: user.email, password: user.password, role: user.role },
      "your_jwt_secret_key", // Replace with an environment variable in production like this process.env.JWT_SECRET
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Signup successful.",
      status: 201,
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
      status: 500,
    });
  }
};

// Sign in
exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
        status: 400,
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
        status: 401,
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password.",
        status: 401,
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, password: user.password, role: user.role },
      "your_jwt_secret_key", // Replace with process.env.JWT_SECRET in production
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Signin successful.",
      status: 200,
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
      status: 500,
    });
  }
};

// Get full user name by sending token
exports.getFullName = async (req, res) => {
  const token = req.cookies.token; // or req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: "Token not provided", status: 401 });
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret_key");

    // Use email to find user
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ message: "User not found", status: 404 });
    }

    res.status(200).json({
      message: "User retrieved successfully",
      status: 200,
      name: user.name,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token", status: 401 });
  }
};
