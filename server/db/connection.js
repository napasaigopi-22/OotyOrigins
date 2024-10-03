const mongoose = require('mongoose');

// const uri = "mongodb+srv://mahesh:maheshaa@cluster0.umn1m4x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const MONGO_URL = 'mongodb://127.0.0.1:27017/'

const express = require("express");
// const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
// require("dotenv").config();
const PORT = 4000;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:4000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());