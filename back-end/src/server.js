import { MongoClient } from "mongodb";
import express from "express";
import {
  cartItems as cartItemsRaw,
  products as productsRaw,
} from "./products.js";
import path from "path";

let cartItems = cartItemsRaw;
let products = productsRaw;

// Connect MongoDB when the server is started
async function start() {
  const mongodbURL = `mongodb+srv://vaultpixel-db:769s46jD1a2fLPNK@database1.sqf5wlh.mongodb.net/?retryWrites=true&w=majority&appName=Database1`;
  const client = new MongoClient(mongodbURL);

  await client.connect();
  const db = client.db("vaultpixel-db");

  const app = express();
  app.use(express.json());
  app.use("/images", express.static(path.join(__dirname, "../assets"))); // This should enable Express server to serve images for the front-end

  async function populatedCartIds(ids) {
    return Promise.all(
      ids.map((id) => db.collection("products").findOne({ id })) // Equivalent to using map() in API calling level
    );
  }

  // ------ Read items in the database using app.get() call back
  app.get("/api/products", async (req, res) => {
    const products = await db.collection("products").find({}).toArray();
    res.send(products);
  });

  app.get("/api/users/:userId/cart", async (req, res) => {
    const user = await db
      .collection("users")
      .findOne({ id: req.params.userId });
    const populatedCart = await populatedCartIds(user.cartItems); // passing cartItems as ids argument
    res.json(populatedCart);
  });

  app.get("/api/product/:productId", async (req, res) => {
    const productId = req.params.productId;
    const product = await db.collection("products").findOne({ id: productId });
    res.json(product);
  });

  // ------ Add item to cart w/ POST callback function
  app.post("/api/users/:userId/cart", async (req, res) => {
    const userId = req.params.userId;
    const productId = req.body.id;

    await db.collection("users").updateOne(
      { id: userId },
      {
        $addToSet: { cartItems: productId }, // $addToSet doesn't add duplicate like $push
      }
    );
    const user = await db
      .collection("users")
      .findOne({ id: req.params.userId });
    const populatedCart = await populatedCartIds(user.cartItems); // passing cartItems as ids argument
    res.json(populatedCart);
  });

  // ------ Remove item from cart w/ DELETE callback function
  app.delete("/api/users/:userId/cart/:productId", async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    await db.collection("users").updateOne(
      { id: userId },
      {
        $pull: { cartItems: productId },
      }
    );
    const user = await db
      .collection("users")
      .findOne({ id: req.params.userId });
    const populatedCart = await populatedCartIds(user.cartItems); // passing cartItems as ids argument
    res.json(populatedCart);
  });

  app.listen(8000, () => {
    console.log("Server is listening on port 8000");
  });
}

start();
