import { MongoClient } from "mongodb";
import express from "express";
import {
  cartItems as cartItemsRaw,
  products as productsRaw,
} from "./products.js";

let cartItems = cartItemsRaw;
let products = productsRaw;

async function populatedCartIds(ids) {
  await client.connect();
  const db = client.db("vaultpixel-db");
  return Promise.all(
    ids.map((id) => db.collection("products").findOne({ id })) //equivalent to using map() in API calling level
  );
}

const mongodbURL = `mongodb+srv://vaultpixel-db:769s46jD1a2fLPNK@database1.sqf5wlh.mongodb.net/?retryWrites=true&w=majority&appName=Database1`;
const client = new MongoClient(mongodbURL);

const app = express();
// need this to use .body (for POST request)
app.use(express.json());

// app.get("/hello", async (req, res) => {
//   await client.connect();
//   const db = client.db("vaultpixel-db"); //name of the database as arg
//   const products = await db.collection("products").find({}).toArray();
//   res.send(products);
// });

// ------ Read items in the database using app.get() call back
app.get("/products", async (req, res) => {
  await client.connect();
  const db = client.db("vaultpixel-db"); //name of the database as arg
  const products = await db.collection("products").find({}).toArray();
  res.send(products);
});

app.get("/users/:userId/cart", async (req, res) => {
  await client.connect();
  const db = client.db("vaultpixel-db");
  const user = await db.collection("users").findOne({ id: req.params.userId });
  const populatedCart = await populatedCartIds(user.cartItems); // passing cartItems as ids argument
  res.json(populatedCart);
});

app.get("/product/:productId", async (req, res) => {
  await client.connect();
  const db = client.db("vaultpixel-db");
  const productId = req.params.productId;
  const product = await db.collection("products").findOne({ id: productId });
  res.json(product);
});

// ------ Add item to cart w/ POST callback function
app.post("/cart", (req, res) => {
  const productId = req.body.id;
  // push the item into cart directly using productId
  cartItems.push(productId);
  const populatedCart = populatedCartIds(cartItems);
  res.json(populatedCart);
});

// ------ Remove item from cart w/ DELETE callback function
app.delete("/cart/:productId", (req, res) => {
  // need product ID in request params
  const productId = req.params.productId;
  console.log(productId);
  cartItems = cartItems.filter((id) => id.toString() !== productId);
  console.log(cartItems);
  const populatedCart = populatedCartIds(cartItems);
  console.log(populatedCart);
  res.json(populatedCart);
});

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
