import express from "express";
import {
  cartItems as cartItemsRaw,
  products as productsRaw,
} from "./products.js";

let cartItems = cartItemsRaw;
let products = productsRaw;

const app = express();

// need this to use .body (for POST, DELETE functions)
app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Hello from server.js");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/cart", (req, res) => {
  res.json(cartItems);
});

app.get("/product/:productId", (req, res) => {
  const productId = req.params.productId;
  const product = products.find(
    (product) => product.id.toString() === productId
  );
  // console.log("Product ID:", productId);
  // console.log("Found product:", product);

  res.json(product);
});

// Add item to cart w/ POST callback function
app.post("/cart", (req, res) => {
  // need product ID in request body
  const productId = req.body.id;
  const product = products.find(
    (product) => product.id.toString() === productId
  );
  // push the item into cart
  cartItems.push(product);
  res.json(cartItems);
});

// Remove item from cart w/ DELETE callback function
app.delete("/cart/:productId", (req, res) => {
  // need product ID in request body
  const productId = req.params.productId;
  cartItems = cartItems.filter((product) => product.id !== productId);
  res.json(cartItems);
});

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
