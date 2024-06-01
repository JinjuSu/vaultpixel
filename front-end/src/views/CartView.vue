<template>
  <MDBContainer bg="light ">
    <div class="container py-5" v-if="cartItems.length > 0">
      <!-- Cart Component with binded props -->
      <CartComp
        @remove-from-cart="removeFromCart($event)"
        :cartItems="cartItems"
      />
      <div class="row justify-content-between my-3">
        <div class="col-auto">
          <h1>Total</h1>
        </div>
        <div class="col-auto">
          <h1>{{ totalAmount }}</h1>
        </div>
      </div>
      <!-- Payment button (outside the loop) -->
      <div class="my-5">
        <a
          href="#!"
          class="btn btn-sm btn-dark button-shop"
          data-mdb-ripple-init
          @click="proceedToPayment"
        >
          Proceed to payment
        </a>
      </div>
    </div>
    <div v-else-if="cartItems.length === 0" class="container my-5 text-center">
      <div class="row justify-content-center">
        <div class="col-5 ms-0">
          <h1>Your cart is empty</h1>
          <img
            src="../assets/icons/cart-icon.png"
            class="img-fluid image-empty-cart"
          />
          <div class="">
            <router-link :to="'/products'"
              ><a
                href="#!"
                class="btn btn-sm btn-dark button-shop"
                data-mdb-ripple-init
                >Start browsing
              </a></router-link
            >
          </div>
        </div>
      </div>
    </div>
  </MDBContainer>
</template>

<script>
import CartComp from "@/components/CartComp.vue";
import axios from "axios";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn,
  mdbRipple,
} from "mdb-vue-ui-kit";

export default {
  name: "Cart",
  data() {
    return {
      cartItems: [],
      purchasedOrders: [],
    };
  },
  props: ["user"], // passed down from router-view, App.vue
  components: {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBIcon,
    MDBBtn,
    CartComp,
  },
  directives: {
    mdbRipple,
  },
  watch: {
    async user(newUserValue) {
      if (newUserValue) {
        const cartResponse = await axios.get(
          `/api/users/${newUserValue.uid}/cart`
        );
        const cartItems = cartResponse.data;
        this.cartItems = cartItems;
      }
    },
  },
  computed: {
    totalAmount() {
      return this.cartItems
        .reduce((total, product) => {
          return total + product.price * product.qty;
        }, 0)
        .toFixed(2);
    },
  },
  methods: {
    async removeFromCart(productId) {
      const response = await axios.delete(
        `/api/users/${this.user.uid}/cart/${productId}`
      );
      const updatedCart = response.data;
      this.cartItems = updatedCart;
    },
    async proceedToPayment() {
      try {
        const response = await axios.get(`/api/orders/last`);
        const lastOrder = response.data;
        const newOrderId = (parseInt(lastOrder.orderId) + 1).toString();

        const newOrder = {
          orderId: newOrderId,
          userId: this.user.uid,
          orderItems: this.cartItems,
          address: {},
          paymentDetails: {},
        };

        console.log("Last Order: ", lastOrder);
        console.log("New Order Id: ", newOrderId);
        console.log("New Order: ", newOrder);

        await axios.post(`/api/orders`, newOrder);
        await axios.put(`/api/users/${this.user.uid}/purchasedOrders`, {
          orderId: newOrderId,
        });
        this.$router.push("/payment");
      } catch (error) {
        console.error("Failed to create new order:", error);
      }
    },
  },
  async created() {
    if (this.user) {
      const response = await axios.get(`/api/users/${this.user.uid}/cart`);
      const cartItems = response.data;
      this.cartItems = cartItems;
    }
  },
};
</script>
