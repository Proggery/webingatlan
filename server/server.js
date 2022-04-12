const express = require("express");
const app = express();
const port = process.env.PORT || 5555;
const cors = require("cors");
const bodyParser = require("body-parser");

const loginRouter = require("./routers/loginRouter");
const adminRouter = require("./routers/adminRouter");
const uploadFileRouter = require("./routers/uploadFileRouter");
const sliderRouter = require("./routers/sliderRouter");
const aboutRouter = require("./routers/aboutRouter");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyParser());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static("uploads"));

app.use("", uploadFileRouter);
app.use("", sliderRouter);
app.use("", adminRouter);
app.use("", loginRouter);
app.use("", aboutRouter);

app.get("/", (req, res) => {
  res.send("sikeres csatlakozás");
});

app.listen(port, () => {
  console.log(`A szerver fut: ${port}`);
});
