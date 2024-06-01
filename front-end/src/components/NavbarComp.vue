<template>
  <MDBNavbar expand="lg" light bg="light" container>
    <MDBNavbarBrand href="#" class="fw-bold"
      ><router-link class="link-text" to="/products"
        >VaultPixel</router-link
      ></MDBNavbarBrand
    >
    <MDBNavbarToggler
      @click="collapse1 = !collapse1"
      target="#navbarSupportedContent"
    ></MDBNavbarToggler>
    <MDBCollapse v-model="collapse1" id="navbarSupportedContent">
      <MDBNavbarNav class="mb-2 mb-lg-0">
        <MDBNavbarItem to="#" active>
          <router-link class="link-text" to="/">Home</router-link>
        </MDBNavbarItem>
        <MDBNavbarItem href="#">
          <router-link class="link-text" to="/products">Products</router-link>
        </MDBNavbarItem>
        <MDBNavbarItem href="#">
          <router-link class="link-text" to="/about">About</router-link>
        </MDBNavbarItem>
      </MDBNavbarNav>

      <div>
        <MDBBtn color="dark" @click="signOut" v-if="user"> Log out</MDBBtn>
      </div>

      <div v-if="!user">
        <MDBBtn color="dark" @click="signUp"> Sign up</MDBBtn>
        <MDBBtn outline="dark" @click="signIn">Log in</MDBBtn>
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
    </MDBCollapse>
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
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
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
        console.log(userCredential); // You can log or do something with userCredential
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
      const password = prompt("Please enter your password"); // Get the password from user
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
      // const email = prompt("Please enter your email to sign in");
      // const auth = getAuth();
      // const actionCodeSettings = {
      //   url: `https://fj16bq7r-8080.aue.devtunnels.ms/product/${this.$route.params.id}`,
      //   handleCodeInApp: true,
      // };
      // await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      // alert("A login link was sent to the email you provided");
      // window.localStorage.setItem("emailForSignIn", email); // open modal
    },
  },
  async created() {
    const auth = getAuth();
    // if (isSignInWithEmailLink(auth, window.location.href)) {
    //   const email = window.localStorage.getItem("emailForSignIn");
    //   await signInWithEmailLink(auth, email, window.location.href);
    //   alert("Successfully signed in");
    //   window.localStorage.removeItem("emailForSignIn"); // close modal
    // }

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
