const express = require("express");
const app = express();
require("dotenv").config();
var cors = require("cors");
const mongoose = require("mongoose");
const jewelry = require("./model/jewelry");
const router = express.Router();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(router);

// const uri = `mongodb+srv://${process.env.S3_BUCKET}:${process.env.SECRET_KEY}@cluster0.kq57d4a.mongodb.net/?retryWrites=true&w=majority`;
const Name = "CenterStoneServer";

// router.get("/jewelry", async (req, res) => {
//   try {
//     const result = await jewelry.find();
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json({
//       error: err.message,
//     });
//   }
// });

// router.post("/jewelry", async (req, res) => {
//   try {
//     const newJewelry = new jewelry(req.body);
//     const result = await newJewelry.save();
//     console.log(result);
//     res.status(200).json(result);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Server side error" });
//   }
// });

// ----------------------------------------------------
app.get("/", (req, res) => {
  res.send("Hello World!");
});

function globalError(err, req, res, next) {
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

mongoose
  .connect(`mongodb://127.0.0.1:27017/${Name}`)
  .then(() => {
    console.log("connected successfully");
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
