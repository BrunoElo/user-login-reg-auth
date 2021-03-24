const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
// Routes
const usersRouter = require("./controllers/auth");
const homeRouter = require("./controllers/home");
const middleware = require("./utils/middleware");
// Connect to DB
console.log("connecting to database");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("Error connecting to database:", error.message);
  });

app.use(express.json());

// Route Middleware
app.use("/api", usersRouter);
app.use("/api/home", homeRouter);
app.use(middleware.errorHandler);

module.exports = app;
