<template>
  <body class="animated-background">
    <div class="container">
      <!-- Jombotron starts here -->
      <div class="row justify-content-between my-2">
        <div class="col">
          <div class="row">
            <div class="my-5">
              <h1>The smartest way to secure your crypto</h1>
            </div>
            <div class="my-5">
              <h4>
                Buy, exchange, grow and manage over 5,500 coins and tokens
              </h4>
            </div>
          </div>
          <div class="row">
            <div class="">
              <button class="btn btn-sm btn-dark p-3 fw-bold fs-5">
                Get started
              </button>
            </div>
          </div>
        </div>
        <div class="col-5">
          <img
            src="../assets/wallets/Ledger_Nano_X_WVRPS.png"
            alt=""
            class="img-fluid"
          />
        </div>
      </div>
      <!-- Jombotron ends here -->

      <!-- Carousel starts here-->
      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div
            class="carousel-item"
            v-for="(order, index) in orders"
            :key="order._id"
            :class="{ active: index === 0 }"
          >
            <img
              src="../assets/transparent.png"
              class="d-block w-100"
              alt="Order Comment"
            />
            <div class="carousel-caption d-none d-md-block">
              <h3>{{ order.comment }}</h3>
              <p>Order #{{ order.orderId }}</p>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <!-- Carousel ends here -->
      <div>
        <section id="up"></section>
        <section id="down"></section>
        <section id="left"></section>
        <section id="right"></section>
      </div>
    </div>
  </body>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeView",
  data() {
    return {
      orders: [],
    };
  },
  created() {
    this.fetchCommentedOrders();
  },
  methods: {
    fetchCommentedOrders() {
      axios
        .get("/api/orders/commented")
        .then((response) => {
          this.orders = response.data;
        })
        .catch((error) => {
          console.error("Failed to fetch commented orders:", error);
        });
    },
  },
};
</script>

<style scoped>
body {
  background-color: black;
  color: white;
}
.carousel-item img {
  height: 150px;
  width: 50px;
  object-fit: cover;
}
.carousel-caption {
  border-radius: 10px;
}

.animated-background {
  position: relative;
  overflow: hidden;
  z-index: 0;
}

#up,
#down,
#left,
#right {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: -1; /* Behind everything else */
}

#up {
  position: absolute;
  height: 800px;
  width: 800px;
  border-radius: 50%;
  background-image: linear-gradient(
    80deg,
    rgb(5, 124, 172),
    rgb(43, 247, 202, 0.5)
  );
  filter: blur(80px);
  animation: down 30s 1s infinite;
}
#down {
  position: absolute;
  right: 0;
  height: 500px;
  width: 500px;
  border-radius: 50%;
  background-image: linear-gradient(
    80deg,
    rgb(245, 207, 82, 0.8),
    rgb(199, 10, 114)
  );
  filter: blur(80px);
  animation: up 30s 1s infinite;
}

#left {
  position: absolute;
  right: 0;
  height: 500px;
  width: 500px;
  border-radius: 50%;
  background-image: linear-gradient(
    80deg,
    rgb(5, 124, 172),
    rgb(183, 253, 52, 0.8)
  );
  filter: blur(80px);
  animation: left 30s 1s infinite;
}

#right {
  position: absolute;
  right: 0;
  height: 500px;
  width: 500px;
  border-radius: 50%;
  background-image: linear-gradient(
    80deg,
    rgb(26, 248, 18, 0.6),
    rgb(199, 10, 52, 0.8)
  );
  filter: blur(80px);
  animation: right 40s 0.5s infinite;
}

@keyframes down {
  0%,
  100% {
    top: -100px;
  }
  70% {
    top: 700px;
  }
}

@keyframes up {
  0%,
  100% {
    bottom: -100px;
  }
  70% {
    bottom: 700px;
  }
}

@keyframes left {
  0%,
  100% {
    left: -100px;
  }
  70% {
    left: 1300px;
  }
}

@keyframes right {
  0%,
  100% {
    right: -100px;
  }
  70% {
    right: 1300px;
  }
}
</style>
