<template>
  <div class="container my-5">
    <div v-if="product">
      <div class="row justify-content-center text-center gx-5">
        <div class="col-8 col-md-6">
          <div class="image-product-details">
            <img
              class="img-fluid rounded-start"
              :src="product.image"
              alt="first-card"
            />
          </div>
        </div>

        <div class="col-8 col-md-6">
          <!-- Details go here -->
          <div class="text-start">
            <h1>{{ product.name }}</h1>
            <p>{{ product.description }}</p>
            <p>{{ product.price }}</p>
            <p>rating: {{ product.rating }}/5</p>
          </div>
          <div class="button" @click="addToCart" v-if="user && !itemIsInCart">
            <a
              href="#!"
              class="btn btn-sm btn-dark button-shop"
              data-mdb-ripple-init
            >
              Add to cart
            </a>
          </div>
          <div class="text-start" v-if="user && itemIsInCart">
            <p class="text-secondary">You have this item your cart!</p>
            <router-link to="/cart">
              <div class="button btn btn-dark button-shop">
                Check out
              </div></router-link
            >
          </div>
          <div class="button" v-if="!user">
            <router-link :to="'/login'">
              <a
                href="#!"
                class="btn btn-sm btn-dark button-shop"
                data-mdb-ripple-init
              >
                Log in to add to cart
              </a>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <NotFoundView></NotFoundView>
    </div>
  </div>
</template>
<script>
import NotFoundView from "./NotFoundView.vue";
import axios from "axios";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "ProductDetailsView",
  data() {
    return {
      product: {},
      cartItems: [],
    };
  },
  props: ["user"], // passed down from router-view, App.vue
  components: {
    NotFoundView,
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
    itemIsInCart() {
      return this.cartItems.some((item) => item.id === this.$route.params.id);
    },
  },
  methods: {
    async addToCart() {
      try {
        await axios.post(`/api/users/${this.user.uid}/cart`, {
          id: this.$route.params.id,
        });
        // alert("Successfully added item to cart!");

        // Update cartItems array immediately
        const cartResponse = await axios.get(
          `/api/users/${this.user.uid}/cart`
        );
        this.cartItems = cartResponse.data;
      } catch (error) {
        console.error("Error adding item to cart:", error);
        alert("Failed to add item to cart. Please try again.");
      }
    },
    async signIn() {
      const email = prompt("Please enter your email to sign in");
      const password = prompt("Please enter your password");
      const auth = getAuth();

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        alert("Successfully signed in");
        console.log("User Details:", userCredential);
      } catch (error) {
        alert(`Login failed: ${error.message}`);
        console.error("Login error:", error);
      }
    },
  },
  async created() {
    const response = await axios.get(`/api/product/${this.$route.params.id}`);
    const product = response.data;
    this.product = product;
    console.log("Product ID:", response, typeof response); // return the whole product object
    console.log("Product Details:", this.product, typeof this.product); // return

    if (this.user) {
      console.log("this user: ", this.user);
      console.log("this UID: ", this.user.uid);
      const cartResponse = await axios.get(`/api/users/${this.user.uid}/cart`);
      const cartItems = cartResponse.data;
      this.cartItems = cartItems;
    }
  },
};
</script>
