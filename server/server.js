const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoutes");
const Rout = require("./routes/ControllerRoutes")

const PostRout = require("./routes/PostRouts")
const MONGO_URL = 'mongodb://127.0.0.1:27017/Main'
const PORT = 4000;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());

app.use("/public", express.static("Controllers/public"));
app.use("/", authRoute);



app.use("/get",Rout );

app.use("/post",PostRout);
 
app.use(express.static('Controllers/public'))