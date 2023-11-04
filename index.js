const express = require("express");
const app = express();
require("dotenv").config();
var cors = require("cors");
const { default: mongoose } = require("mongoose");
const jewelry = require("./model/jewelry");
const user = require("./model/User");
const port = process.env.PORT || 5000;
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(router);

const uri = `mongodb+srv://${process.env.S3_BUCKET}:${process.env.SECRET_KEY}@cluster0.kq57d4a.mongodb.net/goldenStone?retryWrites=true&w=majority`;

router.get("/users", async (req, res) => {
  try {
    const result = await user.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      Error: "This is an server side error in users",
    });
  }
});

router.post("/users", async (req, res) => {
  try {
    const newUser = new user(req.body);
    const result = await newUser.save();
    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({
      error: "This is an server side error in user",
    });
  }
});

router.get("/jewelry", async (req, res) => {
  try {
    const result = await jewelry.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.post("/jewelry", async (req, res) => {
  try {
    const newJewelry = new jewelry(req.body);
    const result = await newJewelry.save();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server side error" });
  }
});

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
