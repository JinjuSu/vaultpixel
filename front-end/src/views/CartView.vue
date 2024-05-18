<template>
  <MDBContainer bg="light ">
    <div class="container py-5" v-if="cartItems.length > 0">
      <!-- Cart Component with binded props -->
      <CartComp :cartItems="cartItems" />
      <!-- Proceed button (outside the loop) -->
      <div class="my-5">
        <a
          href="#!"
          class="btn btn-sm btn-dark button-shop"
          data-mdb-ripple-init
        >
          Proceed to check out
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
import { cartItems } from "@/assets/product-details/products";
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
      cartItems,
      product: {
        id: "",
        name: "",
        price: "",
        description: "",
        rating: "",
        image: "",
        qty: "",
      },
    };
  },
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
  methods: {
    addFunction(product) {
      return product.qty++;
    },
    deductFunction(product) {
      if (product.qty > 0) {
        return product.qty--;
      }
    },
  },
  mounted() {
    console.log("cartItems in Cart View: ", cartItems);
  },
};
</script>
