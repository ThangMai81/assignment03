const express = require("express");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/product");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const corsOptions = {
  origin: ["http://localhost:3001", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204, // cho preflight trả về 204 thay vì 200
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/", productRoutes);
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
    app.listen(5000);
  })
  .catch((err) => console.log(err));
