import { MongoClient } from "mongodb";
import path from "path";
import express from "express";

// Connect MongoDB when the server is started
async function start() {
  const mongodbURL = `mongodb+srv://vaultpixel-db:769s46jD1a2fLPNK@database1.sqf5wlh.mongodb.net/?retryWrites=true&w=majority&appName=Database1`;
  const client = new MongoClient(mongodbURL);

  await client.connect();
  const db = client.db("vaultpixel-db");

  const app = express();

  app.use(express.json());
  app.use("/images", express.static(path.join(__dirname, "../assets/wallets"))); // Enable Express server to serve images for the front-end

  async function populatedCartIds(ids) {
    return Promise.all(
      ids.map((id) => db.collection("products").findOne({ id })) // Equivalent to using map() in API calling level
    );
  }

  // ------ Read items in the database using app.get() call back

  // Get all orders from orders table
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

  // Get the last order from orders table
  app.get("/api/orders/last", async (req, res) => {
    try {
      const lastOrder = await db
        .collection("orders")
        .find({})
        .sort({ orderId: -1 })
        .limit(1)
        .toArray();
      if (lastOrder.length === 0) {
        res.status(404).send("No orders found");
      } else {
        res.send(lastOrder[0]);
      }
    } catch (error) {
      console.error("Failed to fetch last order:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // Post a new order into orders table
  app.post("/api/orders", async (req, res) => {
    try {
      const newOrder = req.body;
      await db.collection("orders").insertOne(newOrder);
      res.status(201).send("Order created");
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // Update user's purchasedOrders list
  app.put("/api/users/:userId/purchasedOrders", async (req, res) => {
    try {
      const userId = req.params.userId;
      const { orderId } = req.body;

      await db.collection("users").updateOne(
        { id: userId },
        {
          $addToSet: { purchasedOrders: orderId }, // $addToSet prevents duplicates
        }
      );

      res.status(200).send("Purchased orders updated");
    } catch (error) {
      console.error("Failed to update purchased orders:", error);
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
