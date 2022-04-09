const express = require("express");
const app = express();
const port = process.env.PORT || 5555;
const cors = require("cors");
const bodyParser = require("body-parser");

const loginRouter = require("./routers/loginRouter");
const adminRouter = require("./routers/adminRouter");
const uploadFileRouter = require("./routers/uploadFileRouter");
const userRouter = require("./routers/userRouter");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyParser());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static("uploads"));

app.use("", uploadFileRouter);
app.use("", userRouter);
app.use("", adminRouter);
app.use("", loginRouter);

app.get("/", (req, res) => {
  res.send("sikeres csatlakozás");
});

app.listen(port, () => {
  console.log(`A szerver fut: ${port}`);
});
