import express from "express";
import { cartItems, products } from "./products.js";

const app = express();

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

app.post("/cart", (req, res) => {});

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
