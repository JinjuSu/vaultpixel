<template>
  <div class="container my-5">
    <div v-if="product">
      <div class="row justify-content-center text-center gx-5">
        <div class="col-8 col-md-6">
          <div class="image-product-details">
            <img
              class="img-fluid rounded-start"
              :src="product.imageURL"
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
          <div class="button" @click="signIn" v-if="!user">
            <a
              href="#!"
              class="btn btn-sm btn-dark button-shop"
              data-mdb-ripple-init
            >
              Sign in to add to cart
            </a>
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
import { cartItems } from "@/assets/product-details/products";
import NotFoundView from "./NotFoundView.vue";
import axios from "axios";
import {
  getAuth,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
} from "firebase/auth";

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
      await axios.post(`/api/users/${this.user.uid}/cart`, {
        id: this.$route.params.id,
      });
      alert("Successfully added item to cart!");
    },
    async signIn() {
      const email = prompt("Please enter your email to sign in");
      const auth = getAuth();
      const actionCodeSettings = {
        url: `https://fj16bq7r-8080.aue.devtunnels.ms/product/${this.$route.params.id}`,
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      alert("A login link was sent to the email you provided");
      window.localStorage.setItem("emailForSignIn", email);
    },
  },
  async created() {
    const auth = getAuth();
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem("emailForSignIn");
      await signInWithEmailLink(auth, email, window.location.href);
      alert("Successfully signed in");
      window.localStorage.removeItem("emailForSignIn");
    }

    const response = await axios.get(`/api/product/${this.$route.params.id}`);
    const product = response.data;
    this.product = product;
    // console.log("Product ID:", response);
    // console.log("Product Details:", this.product);
    console.log("this user: ", this.user);
    console.log("this UID: ", this.user.uid);
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
