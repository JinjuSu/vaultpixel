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

  app.use(
    express.static(path.resolve(__dirname, "../dist"), {
      maxAge: "1y",
      etag: false,
    })
  );

  async function populatedCartIds(ids) {
    return Promise.all(
      ids.map((id) => db.collection("products").findOne({ id })) // Equivalent to using map() in API calling level
    );
  }

  // ------------ users starts here ------------//
  app.post("/api/users", async (req, res) => {
    const { uid, username } = req.body;
    const users = db.collection("users");

    try {
      // Check if user already exists
      const existingUser = await users.findOne({ id: uid });
      if (existingUser) {
        res.status(409).send("User already exists");
        return;
      }

      // Insert new user if not exists
      await users.insertOne({
        id: uid,
        username: username,
        createdAt: new Date(),
      });

      res.status(201).send("User added successfully");
    } catch (error) {
      console.error("Failed to insert user:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // ------------ uers ends here ------------//

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

  // Get a specific order by orderId
  app.get("/api/payment/:orderId", async (req, res) => {
    try {
      const orderId = parseInt(req.params.orderId); // Convert orderId to integer if stored as integer in MongoDB
      const order = await db.collection("orders").findOne({ orderId });
      if (!order) {
        res.status(404).send("Order not found");
      } else {
        res.json(order);
      }
    } catch (error) {
      console.error("Failed to fetch order:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // PUT endpoint to update order
  app.put("/api/orders/:orderId/update", async (req, res) => {
    const orderId = parseInt(req.params.orderId);
    const { address, paymentDetails, orderStatus } = req.body;

    try {
      const result = await db.collection("orders").updateOne(
        { orderId: orderId },
        {
          $set: {
            address: address,
            paymentDetails: paymentDetails,
            orderStatus: orderStatus,
          },
        }
      );

      if (result.modifiedCount === 0) {
        res.status(404).send("Order not found");
      } else {
        res.status(200).send("Order updated");
      }
    } catch (error) {
      console.error("Failed to update order:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // Get all orders for a specific user
  app.get("/api/orders/user/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const orders = await db
        .collection("orders")
        .find({ userId: userId })
        .toArray();
      if (orders.length === 0) {
        // Instead of sending a 404 error, return an empty array with a 200 status
        res.status(200).json([]);
      } else {
        res.status(200).json(orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders for user:", error);
      res.status(500).send("Internal Server Stor Error");
    }
  });

  // PUT endpoint to update order's comment
  app.put("/api/orders/:orderId/comment", async (req, res) => {
    const orderId = parseInt(req.params.orderId);
    const { comment } = req.body;

    try {
      const result = await db
        .collection("orders")
        .updateOne({ orderId: orderId }, { $set: { comment: comment } });

      if (result.modifiedCount === 0) {
        res.status(404).send("Order not found or no update needed.");
      } else {
        res.status(200).send("Comment updated successfully.");
      }
    } catch (error) {
      console.error("Failed to update comment:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // Get all commented orders
  app.get("/api/orders/commented", async (req, res) => {
    try {
      const ordersWithComments = await db
        .collection("orders")
        .find({ comment: { $nin: ["", null] } }) // This query selects orders where comment is neither "" nor null
        .toArray();
      if (ordersWithComments.length === 0) {
        res.status(404).send("No commented orders found.");
      } else {
        res.json(ordersWithComments);
      }
    } catch (error) {
      console.error("Failed to fetch commented orders:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  // ------------------------ end of orders ------------------------
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
    console.log("productId :", typeof productId, productId);
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

  // -------------------- Deployment starts here --------------------
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
  });

  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log("Server is listening on port " + port);
  });
}

start();
