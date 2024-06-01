<template>
  <MDBContainer bg="light ">
    <div class="container py-5" v-if="cartItems.length > 0">
      <!-- Cart Component with binded props -->
      <CartComp
        @remove-from-cart="removeFromCart($event)"
        :cartItems="cartItems"
      />
      <!-- Proceed button (outside the loop) -->
      <div class="my-5">
        <router-link :to="'/payment'">
          <a
            href="#!"
            class="btn btn-sm btn-dark button-shop"
            data-mdb-ripple-init
          >
            Proceed to payment
          </a>
        </router-link>
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
      //product: {},
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
  methods: {
    async removeFromCart(productId) {
      const response = await axios.delete(
        `/api/users/${this.user.uid}/cart/${productId}`
      );
      const updatedCart = response.data;
      this.cartItems = updatedCart;
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
