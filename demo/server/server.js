const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 3000;
require('dotenv').config();

// Database Connection
mongoose.connect(
    'mongodb+srv://twojay:PtTS83QW2JVJsB7j@cluster0.ueoejsn.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true, dbName: "bookshelf" }
  )
mongoose.connection.once("open", () => {
  console.log("Connected to Database");
});

// Express App Requirements
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const booksRouter = require("./routes/booksRouter.js");
app.use("/bookshelf", booksRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express Error Handler Caught Unknown Middleware Error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
