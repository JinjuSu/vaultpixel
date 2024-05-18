import express from "express";
import {
  cartItems as cartItemsRaw,
  products as productsRaw,
} from "./products.js";

let cartItems = cartItemsRaw;
let products = productsRaw;

const app = express();

function populatedCartIds(ids) {
  return ids.map((id) => products.find((product) => product.id === id));
}

// need this to use .body (for POST request)
app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Hello from server.js");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/cart", (req, res) => {
  const populatedCart = populatedCartIds(cartItems); // passing cartItems as ids argument
  res.json(populatedCart);
});

app.get("/product/:productId", (req, res) => {
  const productId = req.params.productId;
  const product = products.find(
    (product) => product.id.toString() === productId
  );
  res.json(product);
});

// Add item to cart w/ POST callback function
app.post("/cart", (req, res) => {
  const productId = req.body.id;
  // push the item into cart directly using productId
  cartItems.push(productId);
  const populatedCart = populatedCartIds(cartItems);
  res.json(populatedCart);
});

// Remove item from cart w/ DELETE callback function
app.delete("/cart/:productId", (req, res) => {
  // need product ID in request params
  const productId = req.params.productId;
  console.log(productId);
  cartItems = cartItems.filter((id) => id.toString() !== productId);
  const populatedCart = populatedCartIds(cartItems);

  res.json(populatedCart);
});

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
