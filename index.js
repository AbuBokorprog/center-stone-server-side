const express = require("express");
const app = express();
require("dotenv").config();
var cors = require("cors");
const { default: mongoose } = require("mongoose");
const port = process.env.PORT || 5000;
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(router);

const uri = `mongodb+srv://${process.env.S3_BUCKET}:${process.env.SECRET_KEY}@cluster0.kq57d4a.mongodb.net/goldenStone?retryWrites=true&w=majority`;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("connected successfully");
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
