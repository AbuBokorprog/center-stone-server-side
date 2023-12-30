const express = require("express");
const app = express();
require("dotenv").config();
var cors = require("cors");
const { default: mongoose } = require("mongoose");
const jewelry = require("./model/jewelry");
const blogs = require("./model/blogs");
const User = require("./model/User");
const AddCart = require("./model/addCart");
const wishlist = require("./model/wishlist");
const port = process.env.PORT || 5000;
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(router);

const uri = `mongodb+srv://${process.env.S3_BUCKET}:${process.env.SECRET_KEY}@cluster0.kq57d4a.mongodb.net/goldenStone?retryWrites=true&w=majority`;

router.get("/users", async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      Error: "This is an server side error in users",
    });
  }
});

router.post("/users", async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    const newUser = new User(req.body);
    const result = await newUser.save();

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server side error in user creation",
    });
  }
});

router.get("/users/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const result = await User.find({ email: email });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      Error: "This is a user server error.",
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

router.get("/jewelry/:Name", async (req, res) => {
  try {
    const name = req.params.Name;
    console.log(name);
    const result = await jewelry.find({ Name: name });
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: "This is a server error",
    });
  }
});

router.post("/blogs", async (req, res) => {
  try {
    const newBlog = new blogs(req.body);
    const result = await newBlog.save();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: "This is a server error",
    });
  }
});

router.get("/blogs", async (req, res) => {
  try {
    const result = await blogs.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: "This is a server error",
    });
  }
});

router.post("/cart", async (req, res) => {
  try {
    const { title, image, cost, email } = req.body;
    const existCart = await AddCart.findOne({
      title,
      image,
      cost,
      email,
    });

    if (existCart) {
      existCart.quantity += 1;
      const result = await existCart.save();
      console.log(result);
      res.status(200).json(result);
    } else {
      const newCart = new AddCart({ title, image, cost, email, quantity: 1 });
      const result = await newCart.save();
      res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "This is a server error in cart",
    });
  }
});

router.get("/cart", async (req, res) => {
  try {
    const result = await AddCart.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: "This is a server error in get cart",
    });
  }
});

router.get("/cart/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const result = await AddCart.find({ email: email });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: "This is a server error in get cart by email",
    });
  }
});

router.post("/wishlist", async (req, res) => {
  try {
    const newWishlist = new wishlist(req.body);
    const result = await newWishlist.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: "This is a server error in",
    });
  }
});
router.get("/wishlist", async (req, res) => {
  try {
    const result = await wishlist.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: "This is a server error in",
    });
  }
});
router.get("/wishlist/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const result = await wishlist.find({ email: email });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: "This is a server error in",
    });
  }
});

router.delete("/wishlist/:email/:title", async (req, res) => {
  try {
    const { email, title } = req.params;
    const deletedItem = await wishlist.findOneAndDelete({
      email: email,
      title: title,
    });
    if (deletedItem) {
      res.status(200).json({
        message: "Wishlist item deleted successfully",
        deletedItem,
      });
    } else {
      res.status(404).json({
        error: "Wishlist item not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "This is a server error in wishlist delete",
    });
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
