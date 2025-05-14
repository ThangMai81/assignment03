const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const corsOptions = {
  origin: ["http://localhost:3001", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204, // cho preflight trả về 204 thay vì 200
};

const productRoutes = require("./routes/product");
const authenticationRoutes = require("./routes/authentication");

const PORT = process.env.PORT || 5000;
const HOST = "localhost";

app.use(cors(corsOptions));

app.use(bodyParser.json());

// Base route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API" });
});

// Other routes
app.use("/product", productRoutes);
app.use("/auth", authenticationRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  return res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    `mongodb+srv://maithang18122003:Thang18122003@cluster0.6lqg4.mongodb.net/phone_shop?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then((result) => {
    console.log("Database connect successful");
    app.listen(PORT, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
