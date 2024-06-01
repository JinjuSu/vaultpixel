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
  app.use("/images", express.static(path.join(__dirname, "../assets/wallets"))); // This should enable Express server to serve images for the front-end

  async function populatedCartIds(ids) {
    return Promise.all(
      ids.map((id) => db.collection("products").findOne({ id })) // Equivalent to using map() in API calling level
    );
  }

  // ------ Read items in the database using app.get() call back

  // Get orders from order table
  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await db.collection("orders").find({}).toArray();
      console.log("Orders fetched from database:", orders);
      res.send(orders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // Get products from products table
  app.get("/api/products", async (req, res) => {
    const products = await db.collection("products").find({}).toArray();
    res.send(products);
  });

  app.get("/api/users/:userId/cart", async (req, res) => {
    const user = await db
      .collection("users")
      .findOne({ id: req.params.userId });
    const populatedCart = await populatedCartIds(user?.cartItems || []); // passing cartItems as ids argument
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

    const existingUser = await db.collection("users").findOne({ id: userId }); // id in MongoBD's user collection that is equal to userId from firebaseAuth

    if (!existingUser) {
      await db.collection("users").insertOne({ id: userId, cartItems: [] }); // If not there already, insert into the collection.
    }

    await db.collection("users").updateOne(
      { id: userId },
      {
        $addToSet: { cartItems: productId }, // $addToSet doesn't add duplicate items like $push
      }
    );
    const user = await db
      .collection("users")
      .findOne({ id: req.params.userId });
    const populatedCart = await populatedCartIds(user?.cartItems || []); // passing cartItems as ids argument
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
    const populatedCart = await populatedCartIds(user?.cartItems || []); // passing cartItems as ids argument
    res.json(populatedCart);
  });

  app.listen(8000, () => {
    console.log("Server is listening on port 8000");
  });
}

start();
