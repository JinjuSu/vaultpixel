<template>
  <MDBNavbar expand="lg" dark bg="dark" container>
    <MDBNavbarBrand href="#" class="fw-bold"
      ><router-link class="link-text" to="/products"
        >VaultPixel</router-link
      ></MDBNavbarBrand
    >

    <MDBNavbarNav class="mb-2 mb-lg-0">
      <MDBNavbarItem to="#" active>
        <router-link class="link-text" to="/">Home</router-link>
      </MDBNavbarItem>
      <MDBNavbarItem href="#">
        <router-link class="link-text" to="/products">Products</router-link>
      </MDBNavbarItem>
      <MDBNavbarItem href="#" v-if="user">
        <router-link class="link-text" :to="'/purchasehistory'"
          >Purchase history</router-link
        >
      </MDBNavbarItem>
    </MDBNavbarNav>

    <div>
      <MDBBtn outline="light" @click="signOut" v-if="user"> Log out</MDBBtn>
    </div>

    <div v-if="!user">
      <MDBBtn color="light" @click="signUp"> Sign up</MDBBtn>
      <MDBBtn outline="light" @click="signIn">Log in</MDBBtn>
    </div>
    <!-- Cart icon logic -->

    <MDBBtn v-if="cartItems.length > 0" color="light"
      ><router-link to="/cart"
        ><img
          class="image-icon-cart"
          src="../assets/icons/cart-item-icon.png" /></router-link
    ></MDBBtn>

    <MDBBtn v-else-if="cartItems.length === 0" color="light"
      ><router-link to="/cart"
        ><img
          class="image-icon-cart"
          src="../assets/icons/cart-icon.png" /></router-link
    ></MDBBtn>
  </MDBNavbar>
</template>
<!-- Navbar script -->
<script>
import {
  MDBBtn,
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-vue-ui-kit";
import axios from "axios";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default {
  name: "NavbarComp",
  data() {
    return {
      cartItems: [],
    };
  },
  props: ["user"], // getting user props passed down from Navrbar component tag, App.vue
  components: {
    MDBBtn,
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
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
    async signUp() {
      const email = prompt("Please enter your email to sign up");
      const password = prompt("Please enter your password");

      const auth = getAuth();
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        alert("Account created successfully!");
        console.log(userCredential);
      } catch (error) {
        alert(`Failed to create account: ${error.message}`);
        console.error("Signup error:", error);
      }
    },
    signOut() {
      const auth = getAuth();
      signOut(auth);
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
    if (this.user) {
      console.log("this user: ", this.user);
      console.log("this UID: ", this.user.uid);
      const response = await axios.get(`/api/users/${this.user.uid}/cart`);
      const cartItems = response.data;
      this.cartItems = cartItems;
    }
  },
};
</script>
